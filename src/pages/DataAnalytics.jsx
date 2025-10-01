import { useState } from "react";
import { deviceService } from "../hooks/useFirestoreOptimized";
import { useNavigation } from "../hooks/useNavigation";

export default function DataAnalytics() {
  const { handleNavigate } = useNavigation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authInput, setAuthInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [analytics, setAnalytics] = useState({
    totalUsers: 0,
    deviceTypes: {},
    locations: {},
    browsers: {},
    visitsByDay: {},
    languages: {},
    connections: {},
    screenResolutions: {},
  });

  const AUTH_CODE = "0101";

  const handleAuth = () => {
    if (authInput === AUTH_CODE) {
      setIsAuthenticated(true);
      loadDeviceData();
    } else {
      alert("Código incorrecto");
    }
  };

  const parseDeviceInfo = (infoString) => {
    const data = {};

    // Validar que infoString existe y es una cadena
    if (!infoString || typeof infoString !== "string") {
      console.warn("Invalid device info string:", infoString);
      return data;
    }

    try {
      // Parse device type
      const deviceMatch = infoString.match(/Device: ([^|]+)/);
      if (deviceMatch) {
        const deviceInfo = deviceMatch[1].trim();
        const parts = deviceInfo.split(" - ");
        data.deviceType = parts[0];
        data.deviceModel = parts.slice(1).join(" - ");
      }

      // Parse browser
      const browserMatch = infoString.match(/Browser: ([^|]+)/);
      if (browserMatch) {
        data.browser = browserMatch[1].trim();
      }

      // Parse screen resolution
      const screenMatch = infoString.match(/Screen: ([^|]+)/);
      if (screenMatch) {
        data.screen = screenMatch[1].trim();
      }

      // Parse location
      const locationMatch = infoString.match(/Location: ([^|]+)/);
      if (locationMatch) {
        data.location = locationMatch[1].trim();
      }

      // Parse language
      const languageMatch = infoString.match(/Language: ([^|]+)/);
      if (languageMatch) {
        data.language = languageMatch[1].trim();
      }

      // Parse connection
      const connectionMatch = infoString.match(/Connection: ([^|]+)/);
      if (connectionMatch) {
        data.connection = connectionMatch[1].trim();
      }

      // Parse time
      const timeMatch = infoString.match(/Time: ([^|]+)/);
      if (timeMatch) {
        const timeString = timeMatch[1].trim();
        const parsedTime = new Date(timeString);
        // Validar que la fecha es válida
        if (!isNaN(parsedTime.getTime())) {
          data.time = parsedTime;
        }
      }
    } catch (error) {
      console.error("Error parsing device info:", error, "String:", infoString);
    }

    return data;
  };

  const analyzeDevices = (devicesData) => {
    const analysis = {
      totalUsers: devicesData.length,
      deviceTypes: {},
      locations: {},
      browsers: {},
      visitsByDay: {},
      languages: {},
      connections: {},
      screenResolutions: {},
    };

    let processedDevices = 0;
    let skippedDevices = 0;

    devicesData.forEach((device, index) => {
      try {
        // Validar que el dispositivo tiene la información necesaria
        if (!device || !device.info) {
          console.warn(`Device at index ${index} missing info:`, device);
          skippedDevices++;
          return;
        }

        const parsed = parseDeviceInfo(device.info);
        processedDevices++;

        // Count device types
        if (parsed.deviceType && parsed.deviceType.trim()) {
          const deviceType = parsed.deviceType.trim();
          analysis.deviceTypes[deviceType] =
            (analysis.deviceTypes[deviceType] || 0) + 1;
        }

        // Count locations (city level)
        if (
          parsed.location &&
          parsed.location !== "Unknown" &&
          parsed.location.trim()
        ) {
          const city = parsed.location.split(",")[0].trim();
          if (city) {
            analysis.locations[city] = (analysis.locations[city] || 0) + 1;
          }
        }

        // Count browsers
        if (parsed.browser && parsed.browser.trim()) {
          const browser = parsed.browser.trim();
          analysis.browsers[browser] = (analysis.browsers[browser] || 0) + 1;
        }

        // Count visits by day
        if (
          parsed.time &&
          parsed.time instanceof Date &&
          !isNaN(parsed.time.getTime())
        ) {
          const day = parsed.time.toISOString().split("T")[0];
          analysis.visitsByDay[day] = (analysis.visitsByDay[day] || 0) + 1;
        }

        // Count languages
        if (parsed.language && parsed.language.trim()) {
          const language = parsed.language.trim();
          analysis.languages[language] =
            (analysis.languages[language] || 0) + 1;
        }

        // Count connections
        if (
          parsed.connection &&
          parsed.connection !== "Unknown" &&
          parsed.connection.trim()
        ) {
          const connection = parsed.connection.trim();
          analysis.connections[connection] =
            (analysis.connections[connection] || 0) + 1;
        }

        // Count screen resolutions
        if (parsed.screen && parsed.screen.trim()) {
          const screen = parsed.screen.trim();
          analysis.screenResolutions[screen] =
            (analysis.screenResolutions[screen] || 0) + 1;
        }
      } catch (error) {
        console.error(
          `Error processing device at index ${index}:`,
          error,
          device
        );
        skippedDevices++;
      }
    });

    console.log(
      `Analytics processed: ${processedDevices} devices, skipped: ${skippedDevices}`
    );
    return analysis;
  };

  const loadDeviceData = async () => {
    setLoading(true);
    try {
      console.log("Cargando datos de dispositivos...");
      const devicesData = await deviceService.getAllDevices();
      console.log("Datos obtenidos:", devicesData.length, "dispositivos");

      // Verificar la estructura de los primeros elementos
      if (devicesData.length > 0) {
        console.log("Muestra de datos (primeros 3):", devicesData.slice(0, 3));
      }

      const analysis = analyzeDevices(devicesData);
      console.log("Análisis completado:", analysis);
      setAnalytics(analysis);
    } catch (error) {
      console.error("Error loading device data:", error);
      console.error("Error stack:", error.stack);
      alert(`Error al cargar los datos: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const formatPercentage = (value, total) => {
    return total > 0 ? ((value / total) * 100).toFixed(1) : "0.0";
  };

  const sortObjectByValue = (obj) => {
    return Object.entries(obj)
      .sort(([, a], [, b]) => b - a)
      .reduce((r, [k, v]) => ({ ...r, [k]: v }), {});
  };

  if (!isAuthenticated) {
    return (
      <div className="home-container">
        <div className="hero-section">
          <button onClick={() => handleNavigate("home")} className="back-link">
            ↩️ Ir atrás
          </button>
          <p className="gallery-title">📊 Analytics - Acceso Restringido</p>

          <div className="dev-auth-section">
            <div className="dev-input-container">
              <input
                type="password"
                value={authInput}
                onChange={(e) => setAuthInput(e.target.value)}
                placeholder="Código"
                className="dev-input auth-input"
                onKeyPress={(e) => e.key === "Enter" && handleAuth()}
              />
              <button onClick={handleAuth} className="dev-button">
                Acceder
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="home-container">
        <div className="hero-section">
          <button onClick={() => handleNavigate("home")} className="back-link">
            ↩️ Ir atrás
          </button>
          <p className="gallery-title">📊 Cargando Analytics...</p>
          <div className="loading-spinner">⏳</div>
        </div>
      </div>
    );
  }

  return (
    <div className="home-container">
      <div className="hero-section">
        <button onClick={() => handleNavigate("home")} className="back-link">
          ↩️ Ir atrás
        </button>
        <p className="gallery-title">📊 Dashboard de Analytics</p>

        <div className="analytics-container">
          {/* Overview Stats */}
          <div className="analytics-section">
            <h3 className="analytics-section-title">📈 Resumen General</h3>
            <div className="analytics-stats-grid">
              <div className="analytics-stat-card">
                <div className="stat-number">{analytics.totalUsers}</div>
                <div className="stat-label">Usuarios Únicos</div>
              </div>
              <div className="analytics-stat-card">
                <div className="stat-number">
                  {Object.keys(analytics.locations).length}
                </div>
                <div className="stat-label">Ciudades</div>
              </div>
              <div className="analytics-stat-card">
                <div className="stat-number">
                  {Object.keys(analytics.visitsByDay).length}
                </div>
                <div className="stat-label">Días Activos</div>
              </div>
            </div>
          </div>

          {/* Device Types */}
          <div className="analytics-section">
            <h3 className="analytics-section-title">📱 Tipos de Dispositivo</h3>
            <div className="analytics-chart">
              {Object.entries(sortObjectByValue(analytics.deviceTypes)).map(
                ([device, count]) => (
                  <div key={device} className="chart-bar">
                    <div className="chart-label">{device}</div>
                    <div className="chart-bar-container">
                      <div
                        className="chart-bar-fill"
                        style={{
                          width: `${formatPercentage(
                            count,
                            analytics.totalUsers
                          )}%`,
                        }}
                      ></div>
                    </div>
                    <div className="chart-value">
                      {count} ({formatPercentage(count, analytics.totalUsers)}%)
                    </div>
                  </div>
                )
              )}
            </div>
          </div>

          {/* Locations */}
          <div className="analytics-section">
            <h3 className="analytics-section-title">🌍 Ubicaciones (Top 10)</h3>
            <div className="analytics-chart">
              {Object.entries(sortObjectByValue(analytics.locations))
                .slice(0, 10)
                .map(([location, count]) => (
                  <div key={location} className="chart-bar">
                    <div className="chart-label">{location}</div>
                    <div className="chart-bar-container">
                      <div
                        className="chart-bar-fill"
                        style={{
                          width: `${formatPercentage(
                            count,
                            analytics.totalUsers
                          )}%`,
                        }}
                      ></div>
                    </div>
                    <div className="chart-value">
                      {count} ({formatPercentage(count, analytics.totalUsers)}%)
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Browsers */}
          <div className="analytics-section">
            <h3 className="analytics-section-title">🌐 Navegadores</h3>
            <div className="analytics-chart">
              {Object.entries(sortObjectByValue(analytics.browsers)).map(
                ([browser, count]) => (
                  <div key={browser} className="chart-bar">
                    <div className="chart-label">{browser}</div>
                    <div className="chart-bar-container">
                      <div
                        className="chart-bar-fill"
                        style={{
                          width: `${formatPercentage(
                            count,
                            analytics.totalUsers
                          )}%`,
                        }}
                      ></div>
                    </div>
                    <div className="chart-value">
                      {count} ({formatPercentage(count, analytics.totalUsers)}%)
                    </div>
                  </div>
                )
              )}
            </div>
          </div>

          {/* Visits by Day */}
          <div className="analytics-section">
            <h3 className="analytics-section-title">📅 Visitas por Día</h3>
            <div className="analytics-chart">
              {Object.entries(analytics.visitsByDay)
                .sort(([a], [b]) => new Date(b) - new Date(a))
                .slice(0, 14)
                .map(([date, count]) => (
                  <div key={date} className="chart-bar">
                    <div className="chart-label">
                      {new Date(date).toLocaleDateString("es-CO")}
                    </div>
                    <div className="chart-bar-container">
                      <div
                        className="chart-bar-fill"
                        style={{
                          width: `${formatPercentage(
                            count,
                            Math.max(...Object.values(analytics.visitsByDay))
                          )}%`,
                        }}
                      ></div>
                    </div>
                    <div className="chart-value">{count}</div>
                  </div>
                ))}
            </div>
          </div>

          {/* Languages */}
          <div className="analytics-section">
            <h3 className="analytics-section-title">🗣️ Idiomas</h3>
            <div className="analytics-chart">
              {Object.entries(sortObjectByValue(analytics.languages)).map(
                ([language, count]) => (
                  <div key={language} className="chart-bar">
                    <div className="chart-label">{language}</div>
                    <div className="chart-bar-container">
                      <div
                        className="chart-bar-fill"
                        style={{
                          width: `${formatPercentage(
                            count,
                            analytics.totalUsers
                          )}%`,
                        }}
                      ></div>
                    </div>
                    <div className="chart-value">
                      {count} ({formatPercentage(count, analytics.totalUsers)}%)
                    </div>
                  </div>
                )
              )}
            </div>
          </div>

          {/* Connection Types */}
          <div className="analytics-section">
            <h3 className="analytics-section-title">📡 Tipos de Conexión</h3>
            <div className="analytics-chart">
              {Object.entries(sortObjectByValue(analytics.connections)).map(
                ([connection, count]) => (
                  <div key={connection} className="chart-bar">
                    <div className="chart-label">{connection}</div>
                    <div className="chart-bar-container">
                      <div
                        className="chart-bar-fill"
                        style={{
                          width: `${formatPercentage(
                            count,
                            analytics.totalUsers
                          )}%`,
                        }}
                      ></div>
                    </div>
                    <div className="chart-value">
                      {count} ({formatPercentage(count, analytics.totalUsers)}%)
                    </div>
                  </div>
                )
              )}
            </div>
          </div>

          {/* Screen Resolutions */}
          <div className="analytics-section">
            <h3 className="analytics-section-title">
              📺 Resoluciones de Pantalla (Top 10)
            </h3>
            <div className="analytics-chart">
              {Object.entries(sortObjectByValue(analytics.screenResolutions))
                .slice(0, 10)
                .map(([resolution, count]) => (
                  <div key={resolution} className="chart-bar">
                    <div className="chart-label">{resolution}</div>
                    <div className="chart-bar-container">
                      <div
                        className="chart-bar-fill"
                        style={{
                          width: `${formatPercentage(
                            count,
                            analytics.totalUsers
                          )}%`,
                        }}
                      ></div>
                    </div>
                    <div className="chart-value">
                      {count} ({formatPercentage(count, analytics.totalUsers)}%)
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Refresh Button */}
          <div className="analytics-section">
            <button
              onClick={loadDeviceData}
              className="dev-button"
              disabled={loading}
            >
              🔄 Actualizar Datos
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
