// Importar todas las imágenes del inventario
import img1 from "../images/inventario/1.jpeg";
import img2 from "../images/inventario/2.jpeg";
import img3 from "../images/inventario/3.jpeg";
import img4 from "../images/inventario/4.jpeg";
import img5 from "../images/inventario/5.jpeg";
import img6 from "../images/inventario/6.jpeg";
import img7 from "../images/inventario/7.jpeg";

const images = [
  { src: img1, alt: "Inventario 1" },
  { src: img2, alt: "Inventario 2" },
  { src: img3, alt: "Inventario 3" },
  { src: img4, alt: "Inventario 4" },
  { src: img5, alt: "Inventario 5" },
  { src: img6, alt: "Inventario 6" },
  { src: img7, alt: "Inventario 7" },
];

export default function Inventario({ onNavigate }) {
  return (
    <div className="home-container">
      <div className="hero-section">
        <button onClick={() => onNavigate('home')} className="back-link">
          ↩️ Ir atrás
        </button>
        <p className="gallery-title">📦 Fotos de la mercancia</p>

        <div className="inventario-grid">
          {images.map((image, index) => (
            <div key={index} className="inventario-item">
              <img
                src={image.src}
                alt={image.alt}
                loading={index < 2 ? "eager" : "lazy"}
                decoding="async"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}