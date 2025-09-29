import { useState, useEffect } from "react";
import ProgressBar from "../components/ProgressBar";
import ImageGallery from "../components/ImageGallery";
import PremiosGallery from "../components/PremiosGallery";
import { ticketService } from "../hooks/useFirebase";
import { useNavigation } from "../hooks/useNavigation";

export default function Home() {
  const { handleNavigate } = useNavigation();
  const [soldTickets, setSoldTickets] = useState([]);
  const totalBoletas = 300;

  // Escuchar cambios en los tickets vendidos para mostrar mensaje de agotado
  useEffect(() => {
    const unsubscribe = ticketService.onSoldTicketsChange((tickets) => {
      setSoldTickets(tickets);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="home-container">
      <div className="hero-section">
        <img
          src="https://iili.io/KcVzhg4.md.png"
          alt="Rifa de Papelería"
          className="titulo-image"
        />

        <img
          src="https://iili.io/KcVuGX1.md.jpg"
          alt="Portada Rifa"
          className="portada-image"
        />

        <p className="gallery-title gallery-title-home">
          Papelería, miscelanea y perfumería
        </p>

        <p className="info-text">
          ✨✅ <strong>Bien surtido</strong>
          <br />
          ✨🏅 <strong>Bien acreditado con más de 18 años</strong>
          <br />
          ✨📍 <strong>Bien ubicado</strong>
          <br />
          <br />
          🎉 Se sorteará con{" "}
          <strong>balotera en presencia de los 300 participantes</strong> 🎉
          <br />
          <br />
          💥 Además se sortearán otros <strong>
            5 ¡buenísimos premios!
          </strong>{" "}
          💥
          <br />
          <br />
          🚀 ¡Esta gran oportunidad es para ti! 👉 Si has pensado en{" "}
          <strong>montar tu propio negocio</strong>, manejar tu tiempo ⏰,
          ponerte tu sueldo 💵, sin perder horas en el transporte 🚌 y con la
          libertad de irte de vacaciones cuando quieras 🏖️…
        </p>

        <ProgressBar />

        <ImageGallery onViewAll={() => handleNavigate("inventario")} />

        {soldTickets.length === totalBoletas && (
          <div className="sold-out-message">
            🎊 ¡Todas las boletas vendidas! 🎊
          </div>
        )}

        <p className="gallery-title gallery-title-home">
          ⁉️ ¿Cómo será la rifa?
        </p>
        <p className="info-text">
          📞 Para más información visítanos en la calle principal comercial del
          barrio Planadas, cerca al paradero en la{" "}
          <strong>Carrera 12a # 4a - 15</strong>
          <br />
          <br />
          📆 La fecha del sorteo dependerá de los cupos 👉 calculamos aprox. el
          <strong> 31 de octubre</strong> a primeras{" "}
          <strong>semanas de noviembre</strong>, pero si es necesario daremos
          más tiempo para que todos puedan participar y cancelar su boleta.
          <br />
          <br />
          👥 Quienes aparten su boleta ingresarán a un{" "}
          <strong>grupo exclusivo de WhatsApp</strong>, donde recibirán todas
          las actualizaciones y detalles del sorteo.
          <br /> <br />✨ Esta oportunidad llega porque{" "}
          <strong>cambiamos de lugar de residencia</strong> ✨ Y nuestra
          clientela y acreditación se encuentran en este punto.
        </p>

        <p className="gallery-title gallery-title-home">
          🎁 Premios adicionales
        </p>

        <PremiosGallery />
      </div>
    </div>
  );
}
