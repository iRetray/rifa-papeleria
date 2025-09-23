import { useEffect, useState } from "react";

const images = [
  "https://iili.io/KcVuwdv.md.jpg",
  "https://iili.io/KcVuOep.md.jpg",
  "https://iili.io/KcVuemN.md.jpg",
  "https://iili.io/KcVu8Xt.md.jpg",
  "https://iili.io/KcVuSLX.md.jpg",
  "https://iili.io/KcVugBn.md.jpg",
  "https://iili.io/KcVur1s.md.jpg",
];

export default function ImageGallery({ onViewAll }) {
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
            className={`gallery-indicator ${
              index === currentIndex ? "active" : ""
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>

      {/* Botón Ver Todo */}
      <div className="gallery-button-container">
        <button onClick={onViewAll} className="gallery-view-all-button">
          📦 Ver todas las fotos de la mercancia
        </button>
      </div>
    </div>
  );
}
