import { useEffect } from "react";
import "./App.css";
import AppRoutes from "./routes/AppRoutes";
import { deviceService } from "./hooks/useFirebase";

// Funciones de detección de dispositivo (copiadas del root.tsx original)
const getDeviceType = (userAgent) => {
  if (/tablet|ipad|playbook|silk/i.test(userAgent)) {
    return "Tablet";
  }
  if (
    /mobile|iphone|ipod|android|blackberry|opera|mini|windows\sce|palm|smartphone|iemobile/i.test(
      userAgent
    )
  ) {
    return "Mobile";
  }
  return "Desktop";
};

const getBrowserInfo = (userAgent) => {
  if (userAgent.includes("Chrome")) return "Chrome";
  if (userAgent.includes("Firefox")) return "Firefox";
  if (userAgent.includes("Safari") && !userAgent.includes("Chrome"))
    return "Safari";
  if (userAgent.includes("Edge")) return "Edge";
  if (userAgent.includes("Opera")) return "Opera";
  return "Unknown";
};

const getDeviceModel = (userAgent) => {
  // iPhone
  if (/iPhone/.test(userAgent)) {
    const match = userAgent.match(/iPhone OS ([\d_]+)/);
    return match ? `iPhone iOS ${match[1].replace(/_/g, ".")}` : "iPhone";
  }

  // Android
  if (/Android/.test(userAgent)) {
    const versionMatch = userAgent.match(/Android ([\d.]+)/);
    const modelMatch = userAgent.match(/\(([^)]*)\)/);
    const version = versionMatch ? versionMatch[1] : "Unknown";
    const model = modelMatch ? modelMatch[1].split(";")[1]?.trim() : "Unknown";
    return `Android ${version} - ${model}`;
  }

  // iPad
  if (/iPad/.test(userAgent)) {
    return "iPad";
  }

  return "Unknown";
};

const getApproximateLocation = async () => {
  try {
    const response = await fetch("https://ipapi.co/json/", {
      timeout: 5000,
    });
    if (response.ok) {
      const data = await response.json();
      return `${data.city || "Unknown"}, ${data.region || "Unknown"}, ${
        data.country_name || "Unknown"
      }`;
    }
  } catch (error) {
    console.log("No se pudo obtener ubicación por IP:", error);
  }
  return "Unknown";
};

const getConnectionType = () => {
  const connection =
    navigator.connection ||
    navigator.mozConnection ||
    navigator.webkitConnection;
  if (connection) {
    return connection.effectiveType || connection.type || "Unknown";
  }
  return "Unknown";
};

function App() {
  // Log de información del dispositivo
  const logDeviceInfo = async () => {
    try {
      const userAgent = navigator.userAgent;
      const deviceType = getDeviceType(userAgent);
      const browserInfo = getBrowserInfo(userAgent);
      const deviceModel = getDeviceModel(userAgent);
      const connectionType = getConnectionType();
      const approximateLocation = await getApproximateLocation();

      const infoString = `Device: ${deviceType} - ${deviceModel} | Browser: ${browserInfo} | Screen: ${
        screen.width
      }x${screen.height} | Location: ${approximateLocation} | Timezone: ${
        Intl.DateTimeFormat().resolvedOptions().timeZone
      } | Language: ${navigator.language} | Platform: ${
        navigator.platform
      } | Connection: ${connectionType} | Time: ${new Date().toString()} | AppVersion: ${
        navigator.appVersion
      } | UserAgent: ${userAgent}`;

      const deviceInfo = {
        info: infoString,
      };

      console.log("=== INFORMACIÓN COMPLETA DEL DISPOSITIVO ===");
      console.log("📱 Dispositivo:", deviceType, "-", deviceModel);
      console.log("🌐 Navegador:", browserInfo);
      console.log("🌍 Ubicación:", approximateLocation);
      console.log("📺 Pantalla:", `${screen.width}x${screen.height}`);
      console.log("📡 Conexión:", connectionType);
      console.log("📄 String completo:", infoString);

      await deviceService.logDevice(deviceInfo);
      console.log(
        "✅ Datos guardados como string en Firebase (colección: devices, campo: info)"
      );
    } catch (error) {
      console.error("Error al recopilar información del dispositivo:", error);
    }
  };

  // Ejecutar logging al cargar la aplicación
  useEffect(() => {
    // Configurar metadatos del documento
    document.title = "Rifa de Papelería";

    // Configurar favicon
    const favicon =
      document.querySelector("link[rel*='icon']") ||
      document.createElement("link");
    favicon.type = "image/jpeg";
    favicon.rel = "shortcut icon";
    document.getElementsByTagName("head")[0].appendChild(favicon);

    // Log de dispositivo
    logDeviceInfo();
  }, []);

  return <AppRoutes />;
}

export default App;
