import { useState } from "react";
import { ticketService } from "../hooks/useFirebase";

export default function DevMode({ onNavigate }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authInput, setAuthInput] = useState("");
  const [ticketInput, setTicketInput] = useState("");
  const [loading, setLoading] = useState(false);

  const AUTH_CODE = "123"; // Código de acceso simple

  const handleAuth = () => {
    if (authInput === AUTH_CODE) {
      setIsAuthenticated(true);
    } else {
      alert("Código incorrecto");
    }
  };

  const markTicketAsSold = async () => {
    const ticketNumber = parseInt(ticketInput);
    
    if (!ticketNumber || ticketNumber < 1 || ticketNumber > 300) {
      alert("Por favor ingresa un número válido entre 1 y 300");
      return;
    }

    setLoading(true);
    try {
      const success = await ticketService.markTicketAsSold(ticketNumber);
      if (success) {
        alert(`✅ Ticket ${ticketNumber} marcado como vendido`);
        setTicketInput("");
      } else {
        alert("❌ Error al marcar el ticket");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("❌ Error al procesar la solicitud");
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="home-container">
        <div className="hero-section">
          <button onClick={() => onNavigate('home')} className="back-link">
            ↩️ Ir atrás
          </button>
          <p className="gallery-title">🔐 Modo Desarrollador</p>

          <div className="dev-auth-section">
            <div className="dev-input-container">
              <input
                type="password"
                value={authInput}
                onChange={(e) => setAuthInput(e.target.value)}
                placeholder="Código"
                className="dev-input auth-input"
                onKeyPress={(e) => e.key === 'Enter' && handleAuth()}
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

  return (
    <div className="home-container">
      <div className="hero-section">
        <button onClick={() => onNavigate('home')} className="back-link">
          ↩️ Ir atrás
        </button>
        <p className="gallery-title">⚙️ Panel de Control</p>

        <div className="dev-main-section">
          <div className="dev-input-container">
            <input
              type="number"
              value={ticketInput}
              onChange={(e) => setTicketInput(e.target.value)}
              placeholder="Número de ticket (1-300)"
              className="dev-input ticket-input"
              min="1"
              max="300"
              disabled={loading}
            />
            <button 
              onClick={markTicketAsSold} 
              className="dev-button"
              disabled={loading || !ticketInput}
            >
              {loading ? "Procesando..." : "Marcar como Vendido"}
            </button>
          </div>

          <div className="dev-info">
            <p><strong>Instrucciones:</strong></p>
            <p>• Ingresa el número de la boleta (1-300)</p>
            <p>• Presiona "Marcar como Vendido"</p>
            <p>• El cambio se reflejará en tiempo real en toda la app</p>
          </div>
        </div>
      </div>
    </div>
  );
}