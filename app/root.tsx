import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  Link,
  useLocation,
} from "react-router";
import { useEffect } from "react";
import "./app.css";
import whatsappIcon from "./images/WhatsApp.svg.webp";
import { analytics } from "./lib/firebase";
import { deviceService } from "./hooks/useFirebase";

// Función para detectar el tipo de dispositivo
const getDeviceType = (userAgent: string): string => {
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

// Función para extraer información del navegador
const getBrowserInfo = (userAgent: string): string => {
  if (userAgent.includes("Chrome")) return "Chrome";
  if (userAgent.includes("Firefox")) return "Firefox";
  if (userAgent.includes("Safari") && !userAgent.includes("Chrome"))
    return "Safari";
  if (userAgent.includes("Edge")) return "Edge";
  if (userAgent.includes("Opera")) return "Opera";
  return "Unknown";
};

// Función para detectar modelo aproximado (principalmente móviles)
const getDeviceModel = (userAgent: string): string => {
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

// Función para obtener ubicación aproximada por IP (gratuito)
const getApproximateLocation = async (): Promise<string> => {
  try {
    const response = await fetch("https://ipapi.co/json/", {
      timeout: 5000,
    } as RequestInit);
    if (response.ok) {
      const data = await response.json();
      return `${data.city || "Unknown"}, ${data.region || "Unknown"}, ${data.country_name || "Unknown"}`;
    }
  } catch (error) {
    console.log("No se pudo obtener ubicación por IP:", error);
  }
  return "Unknown";
};

// Función para obtener tipo de conexión
const getConnectionType = (): string => {
  // @ts-ignore - connection API experimental
  const connection =
    navigator.connection ||
    navigator.mozConnection ||
    navigator.webkitConnection;
  if (connection) {
    return connection.effectiveType || connection.type || "Unknown";
  }
  return "Unknown";
};

export function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const isSeleccionarNumero = location.pathname === "/seleccionar-numero";

  const logDeviceInfo = async () => {
    try {
      const userAgent = navigator.userAgent;
      const deviceType = getDeviceType(userAgent);
      const browserInfo = getBrowserInfo(userAgent);
      const deviceModel = getDeviceModel(userAgent);
      const connectionType = getConnectionType();
      const approximateLocation = await getApproximateLocation();

      // Crear string de una línea con toda la información
      const infoString = `Device: ${deviceType} - ${deviceModel} | Browser: ${browserInfo} | Screen: ${screen.width}x${screen.height} | Location: ${approximateLocation} | Timezone: ${Intl.DateTimeFormat().resolvedOptions().timeZone} | Language: ${navigator.language} | Platform: ${navigator.platform} | Connection: ${connectionType} | Time: ${new Date().toString()} | AppVersion: ${navigator.appVersion} | UserAgent: ${userAgent}`;

      const deviceInfo = {
        info: infoString,
      };

      // Log en consola
      console.log("=== INFORMACIÓN COMPLETA DEL DISPOSITIVO ===");
      console.log("� Dispositivo:", deviceType, "-", deviceModel);
      console.log("🌐 Navegador:", browserInfo);
      console.log("🌍 Ubicación:", approximateLocation);
      console.log("📺 Pantalla:", `${screen.width}x${screen.height}`);
      console.log("📡 Conexión:", connectionType);
      console.log("📄 String completo:", infoString);

      // Guardar en Firebase en la colección "devices"
      await deviceService.logDevice(deviceInfo);
      console.log(
        "✅ Datos guardados como string en Firebase (colección: devices, campo: info)"
      );
    } catch (error) {
      console.error("Error al recopilar información del dispositivo:", error);
    }
  };

  // Ejecutar logging de información del dispositivo al cargar
  useEffect(() => {
    logDeviceInfo();
  }, []);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <Meta />
        <Links />
      </head>
      <body>
        {children}

        {/* Floating WhatsApp Button - Solo en home */}
        {!isSeleccionarNumero && (
          <Link to="/seleccionar-numero" className="floating-button">
            <img src={whatsappIcon} alt="WhatsApp" className="whatsapp-icon" />
            ¡Comprar mi boleta!
          </Link>
        )}

        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
