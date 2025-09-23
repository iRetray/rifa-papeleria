import { useState } from "react";
import ProgressBar from "../components/ProgressBar";
import ImageGallery from "../components/ImageGallery";
import tituloImage from "../images/titulo.png";
import portadaImage from "../images/portada.jpeg";

export default function Home() {
  const [boletasVendidas, setBoletasVendidas] = useState(100);
  const totalBoletas = 300;

  return (
    <div className="home-container">
      <div className="hero-section">
        <img
          src={tituloImage}
          alt="Rifa de Papelería"
          className="titulo-image"
        />

        <img src={portadaImage} alt="Portada Rifa" className="portada-image" />

        <p className="info-text">
          ✨✅ <strong>Bien surtido</strong>
          <br />
          ✨🏅 <strong>Acreditado</strong>
          <br />
          ✨📍 <strong>Bien ubicado</strong>
          <br />
          <br />
          🎉 Se sorteará con{" "}
          <strong>balotera en presencia de los participantes</strong> 🎉
          <br />
          <br />
          💥 Además se sortearán otros <strong>¡buenísimos premios!</strong> 💥
          <br />
          <br />
          🚀 ¡Esta gran oportunidad es para ti! 👉 Si has pensado en{" "}
          <strong>montar tu propio negocio</strong>, manejar tu tiempo ⏰,
          ponerte tu sueldo 💵, sin perder horas en el transporte 🚌 y con la
          libertad de irte de vacaciones cuando quieras 🏖️…
          <br />
          📞 Para más información y <strong>apartar tu puesto</strong> llama al:{" "}
          <strong>3015628257</strong>
          <br />
          📍 O visítanos en la calle comercial del barrio Planadas, cerca al
          paradero en la <strong>Carrera 12a # 4a - 15</strong>
          <br />
          📆 La fecha del sorteo dependerá de los cupos 👉 calculamos aprox. el
          <strong> 15 de octubre</strong>, pero si es necesario daremos más
          tiempo para que todos puedan participar y cancelar su boleta.
          <br />
          👥 Quienes aparten su boleta ingresarán a un{" "}
          <strong>grupo exclusivo de WhatsApp</strong>, donde recibirán todas
          las actualizaciones y detalles del sorteo.
          <br />✨ Esta oportunidad llega porque{" "}
          <strong>cambiamos de lugar de residencia</strong> ✨
        </p>

        <ProgressBar sold={boletasVendidas} total={totalBoletas} />

        <ImageGallery />

        {boletasVendidas === totalBoletas && (
          <div className="sold-out-message">
            🎊 ¡Todas las boletas vendidas! 🎊
          </div>
        )}
      </div>
    </div>
  );
}
