import { useState } from "react";
import NumberElement from "../components/NumberElement";
import whatsappIcon from "../images/WhatsApp.svg.webp";

export default function SeleccionarNumero() {
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null);

  // Crear array de números del 1 al 300
  const numbers = Array.from({ length: 300 }, (_, i) => i + 1);

  // Por ahora, algunos números están marcados como ejemplo
  const checkedNumbers = [15, 23, 45, 67, 89, 123, 156, 189, 234, 267];

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
        <p className="gallery-title">Elige tu número:</p>

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
