import { useState, useEffect } from "react";
import NumberElement from "../components/NumberElement";
import { ticketService } from "../hooks/useFirebase";

export default function SeleccionarNumero({ onNavigate }) {
  const [selectedNumber, setSelectedNumber] = useState(null);
  const [soldTickets, setSoldTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  // Crear array de números del 1 al 300
  const numbers = Array.from({ length: 300 }, (_, i) => i + 1);

  // Cargar y escuchar tickets vendidos en tiempo real desde Firebase
  useEffect(() => {
    // Configurar listener en tiempo real
    const unsubscribe = ticketService.onSoldTicketsChange((tickets) => {
      setSoldTickets(tickets);
      setLoading(false);
    });

    // Cleanup: cancelar suscripción cuando el componente se desmonte
    return () => {
      console.log("🔌 Desconectando listener de tickets");
      unsubscribe();
    };
  }, []);

  const handleNumberClick = (number) => {
    setSelectedNumber(selectedNumber === number ? null : number);
  };

  // Generar el enlace de WhatsApp
  const generateWhatsAppLink = () => {
    const phoneNumber = "573015628257";
    let message;

    if (selectedNumber) {
      const formattedNumber = selectedNumber.toString().padStart(3, "0");
      message = `*¡Hola señora Ruth!* 

Quiero comprar el número *${formattedNumber}* para ganarme la papelería.

¡Espero tener mucha suerte!`;
    } else {
      message = `¡Hola señora Ruth! 

Quiero comprar mi boleta para ganarme la papelería.

¡Esta gran oportunidad es para mí!`;
    }

    return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  };

  return (
    <div className="home-container">
      <div className="hero-section">
        <button onClick={() => onNavigate("home")} className="back-link">
          ↩️ Ir atrás
        </button>
        <p className="gallery-title">✅ Elige tu número:</p>
        <p className="tickets-remaining">
          (quedan {loading ? "..." : 300 - soldTickets.length} boletas)
        </p>

        {loading ? (
          <div className="loading-state">
            <p>Cargando números disponibles...</p>
          </div>
        ) : (
          <div className="numbers-grid">
            {numbers.map((number) => (
              <NumberElement
                key={number}
                number={number}
                isChecked={soldTickets.includes(number)}
                isSelected={selectedNumber === number}
                onClick={handleNumberClick}
              />
            ))}
          </div>
        )}
      </div>

      {/* Botón flotante específico para esta página */}
      <a
        href={generateWhatsAppLink()}
        target="_blank"
        rel="noopener noreferrer"
        className="floating-button"
      >
        <img
          src="https://iili.io/KcVuEzP.md.webp"
          alt="WhatsApp"
          className="whatsapp-icon"
        />
        ¡Comprar mi boleta!
      </a>
    </div>
  );
}
