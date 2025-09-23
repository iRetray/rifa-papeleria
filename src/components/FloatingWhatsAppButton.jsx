import { useLocation, useNavigate } from 'react-router-dom';

export default function FloatingWhatsAppButton() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Solo mostrar el botón en la página de inicio
  if (location.pathname !== '/') {
    return null;
  }

  const handleClick = () => {
    navigate('/seleccionar-numero');
  };

  return (
    <button onClick={handleClick} className="floating-button">
      <img
        src="https://iili.io/KcVuEzP.md.webp"
        alt="WhatsApp"
        className="whatsapp-icon"
      />
      ¡Comprar mi boleta!
    </button>
  );
}