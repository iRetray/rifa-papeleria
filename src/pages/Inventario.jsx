const images = [
  { src: "https://iili.io/KcVuwdv.md.jpg", alt: "Inventario 1" },
  { src: "https://iili.io/KcVuOep.md.jpg", alt: "Inventario 2" },
  { src: "https://iili.io/KcVuemN.md.jpg", alt: "Inventario 3" },
  { src: "https://iili.io/KcVu8Xt.md.jpg", alt: "Inventario 4" },
  { src: "https://iili.io/KcVuSLX.md.jpg", alt: "Inventario 5" },
  { src: "https://iili.io/KcVugBn.md.jpg", alt: "Inventario 6" },
  { src: "https://iili.io/KcVur1s.md.jpg", alt: "Inventario 7" },
];

export default function Inventario({ onNavigate }) {
  return (
    <div className="home-container">
      <div className="hero-section">
        <button onClick={() => onNavigate("home")} className="back-link">
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
