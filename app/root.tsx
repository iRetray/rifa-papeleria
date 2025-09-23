import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  Link,
  useLocation,
} from "react-router";
import "./app.css";
import whatsappIcon from "./images/WhatsApp.svg.webp";

export function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const isSeleccionarNumero = location.pathname === "/seleccionar-numero";

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
