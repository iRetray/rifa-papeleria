import { useState, useEffect } from "react";
import { Link } from "react-router";
import NumberElement from "../components/NumberElement";
import whatsappIcon from "../images/WhatsApp.svg.webp";
import { ticketService } from "../hooks/useFirebase";

export default function SeleccionarNumero() {
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null);
  const [soldTickets, setSoldTickets] = useState<number[]>([]);
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

  // Los tickets vendidos ya son números
  const checkedNumbers = soldTickets;

  const handleNumberClick = (number: number) => {
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
        <Link to="/" className="back-link">
          ↩️ Ir atrás
        </Link>
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
                isChecked={checkedNumbers.includes(number)}
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
        <img src={whatsappIcon} alt="WhatsApp" className="whatsapp-icon" />
        ¡Comprar mi boleta!
      </a>
    </div>
  );
}
