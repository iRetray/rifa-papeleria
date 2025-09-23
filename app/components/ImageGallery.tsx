import { useEffect, useState } from "react";
import { Link } from "react-router";

// Importar todas las imágenes del inventario
import img1 from "../images/inventario/1.jpeg";
import img2 from "../images/inventario/2.jpeg";
import img3 from "../images/inventario/3.jpeg";
import img4 from "../images/inventario/4.jpeg";
import img5 from "../images/inventario/5.jpeg";
import img6 from "../images/inventario/6.jpeg";
import img7 from "../images/inventario/7.jpeg";

const images = [img1, img2, img3, img4, img5, img6, img7];

export default function ImageGallery() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000); // Cambia cada 2 segundos

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="gallery-container">
      <p className="gallery-title gallery-title-home">📸 Fotos del negocio</p>

      {/* Carrusel de imágenes */}
      <div className="gallery-carousel">
        <div
          className="gallery-track"
          style={{
            transform: `translateX(-${currentIndex * 14.285}%)`,
            transition: "transform 0.5s ease-in-out",
          }}
        >
          {images.map((img, index) => (
            <div key={index} className="gallery-slide">
              <img
                src={img}
                alt={`Inventario ${index + 1}`}
                className="gallery-image"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Indicadores */}
      <div className="gallery-indicators">
        {images.map((_, index) => (
          <button
            key={index}
            className={`gallery-indicator ${index === currentIndex ? "active" : ""}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>

      {/* Botón Ver Todo */}
      <div className="gallery-button-container">
        <Link to="/inventario" className="gallery-view-all-button">
          📦 Ver todas las fotos de la mercancia
        </Link>
      </div>
    </div>
  );
}
