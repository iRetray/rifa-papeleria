import { useState } from "react";
import { Link } from "react-router";
import NumberElement from "../components/NumberElement";
import whatsappIcon from "../images/WhatsApp.svg.webp";

export default function SeleccionarNumero() {
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null);

  // Crear array de números del 1 al 300
  const numbers = Array.from({ length: 300 }, (_, i) => i + 1);

  // Por ahora, algunos números están marcados como ejemplo
  const checkedNumbers = [
    1, 3, 7, 12, 15, 18, 23, 28, 31, 34, 39, 42, 45, 48, 52, 56, 61, 67, 72, 75,
    79, 84, 89, 92, 97, 103, 108, 112, 117, 123, 128, 133, 138, 142, 147, 151,
    156, 162, 167, 171, 176, 181, 185, 189, 194, 198, 203, 208, 213, 218, 223,
    227, 232, 234, 239, 243, 248, 252, 256, 261, 267, 272, 276, 281, 285, 289,
    294, 298, 24, 58, 91, 124, 158, 192, 225, 259, 36, 69, 102, 135, 169, 202,
    236, 270, 14, 47, 81, 115, 149, 183, 217, 251, 285, 19, 53, 87, 121, 155,
    189, 223, 257, 291, 6,
  ];

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
