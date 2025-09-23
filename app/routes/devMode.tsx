import { useState } from "react";
import { Link } from "react-router";
import { ticketService } from "../hooks/useFirebase";

export default function DevMode() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authCode, setAuthCode] = useState("");
  const [ticketNumber, setTicketNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Función de hash simple para el código de acceso
  const hashCode = (code: string): string => {
    let hash = 0;
    for (let i = 0; i < code.length; i++) {
      const char = code.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash; // Convertir a 32-bit integer
    }
    // Añadir salt personalizado
    const salt = "rifa2024";
    const saltedHash = hash + salt.length * 157;
    return Math.abs(saltedHash).toString();
  };

  // Hash precalculado - el código real no aparece en el código fuente
  const correctHashedCode = "1479850";

  const handleAuth = () => {
    const hashedInput = hashCode(authCode);
    console.log("Hash generado:", hashedInput); // Para debug
    console.log("Hash esperado:", correctHashedCode); // Para debug
    if (hashedInput === correctHashedCode) {
      setIsAuthenticated(true);
    } else {
      alert("Código incorrecto");
    }
  };

  const handleMarkTicket = async () => {
    if (ticketNumber.length >= 1 && ticketNumber.length <= 3) {
      // Convertir a número para validar rango
      const ticketAsNumber = parseInt(ticketNumber, 10);

      // Validar que esté en el rango 1-300
      if (ticketAsNumber < 1 || ticketAsNumber > 300) {
        alert("Ingresa un número válido entre 1 y 300");
        return;
      }

      // Formatear el número con ceros a la izquierda
      const formattedTicket = ticketNumber.padStart(3, "0");

      setIsLoading(true); // Activar loader

      try {
        console.log(
          `🔄 Marcando boleta ${formattedTicket} como vendida en Firebase...`
        );
        const success = await ticketService.markTicketAsSold(ticketAsNumber);

        if (success) {
          alert(
            `✅ Boleta ${formattedTicket} marcada como vendida exitosamente`
          );
          setTicketNumber("");
        } else {
          alert(
            `❌ Error al marcar la boleta ${formattedTicket}. Intenta de nuevo.`
          );
        }
      } catch (error) {
        console.error("Error al marcar ticket:", error);
        alert(`❌ Error de conexión. Verifica tu conexión a internet.`);
      } finally {
        setIsLoading(false); // Desactivar loader siempre
      }
    } else {
      alert("Ingresa un número válido entre 1 y 300");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent, action: () => void) => {
    if (e.key === "Enter") {
      action();
    }
  };

  return (
    <div className="home-container">
      {isLoading && (
        <div className="devmode-loader">
          <div className="loader-content">
            <div className="loader-spinner"></div>
            <p>Guardando...</p>
          </div>
        </div>
      )}

      <div className="hero-section">
        <Link to="/" className="back-link">
          ↩️ Ir atrás
        </Link>

        {!isAuthenticated ? (
          // Pantalla de autenticación
          <div className="dev-auth-section">
            <p className="gallery-title">🔧 DevMode</p>

            <div className="dev-input-container">
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                value={authCode}
                disabled={isLoading}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, ""); // Solo números
                  if (value.length <= 4) {
                    setAuthCode(value);
                  }
                }}
                onKeyPress={(e) => handleKeyPress(e, handleAuth)}
                placeholder="0000"
                className="dev-input auth-input ticket-input"
                maxLength={4}
              />
              <button
                onClick={handleAuth}
                className="dev-button"
                disabled={isLoading}
              >
                OK
              </button>
            </div>
          </div>
        ) : (
          // Pantalla principal del DevMode
          <div className="dev-main-section">
            <p className="gallery-title">🎫 Marcar boleta vendida</p>

            <div className="dev-input-container">
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                value={ticketNumber}
                disabled={isLoading}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, ""); // Solo números
                  const numValue = parseInt(value, 10);

                  // Permitir entrada vacía o números válidos (1-300)
                  if (value === "" || (numValue >= 1 && numValue <= 300)) {
                    setTicketNumber(value);
                  }
                }}
                onKeyPress={(e) => handleKeyPress(e, handleMarkTicket)}
                placeholder="001"
                className="dev-input ticket-input"
                maxLength={3}
              />
              <button
                onClick={handleMarkTicket}
                className="dev-button"
                disabled={isLoading}
              >
                {isLoading ? "Guardando..." : "Marcar"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
