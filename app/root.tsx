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

export function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const isSeleccionarNumero = location.pathname === "/seleccionar-numero";

  const logDeviceInfo = async () => {
    try {
      const deviceInfo = {
        appVersion: navigator.appVersion,
        localTime: new Date().toString(),
        userAgent: navigator.userAgent,
      };

      // Log en consola
      console.log("=== INFORMACIÓN DEL DISPOSITIVO ===");
      console.log("📊 Datos del visitante:", deviceInfo);

      // Guardar en Firebase en la colección "devices"
      await deviceService.logDevice(deviceInfo);
      console.log("✅ Datos guardados en Firebase (colección: devices)");

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
