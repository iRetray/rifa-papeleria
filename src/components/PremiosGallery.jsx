const premiosImages = [
  {
    src: "https://iili.io/KcVuMLF.md.png",
    name: "Bicicleta RIN 29 - Marco en Aluminio - Freno hidraulico",
  },
  {
    src: "https://iili.io/KcVuX1a.md.png",
    name: "Cobijas + Sabanas + Cubrelechos",
  },
  {
    src: "https://iili.io/KcVuhrJ.md.png",
    name: "Vajilla de Lujo Marca Corona",
  },
  { src: "https://iili.io/KcVuWqg.png", name: "Cafetera Universal - 12 Tazas" },
  {
    src: "https://iili.io/KcVuN7R.png",
    name: "Set 2 toallas Cannon Excelente calidad",
  },
];

export default function PremiosGallery() {
  return (
    <div className="premios-list-container">
      {premiosImages.map((premio, index) => (
        <div key={index} className="premio-item">
          <div className="premio-header">
            <h3 className="premio-puesto">Puesto #{index + 2}</h3>
            <h4 className="premio-name">{premio.name}</h4>
          </div>
          <div className="premio-image-container">
            <img
              src={premio.src}
              alt={`Premio: ${premio.name}`}
              className="premio-image"
              loading="lazy"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
