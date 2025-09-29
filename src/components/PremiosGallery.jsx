const premiosImages = [
  {
    images: ["https://iili.io/KcVuMLF.md.png"],
    name: "Bicicleta RIN 29 - Marco en Aluminio - Freno hidraulico",
  },
  {
    images: [
      "https://iili.io/KcVuX1a.md.png",
      "https://iili.io/KEEidpp.md.png",
      "https://iili.io/KEEi3TN.md.png",
    ],
    name: "Cobijas + Sabanas + Cubrelechos",
  },
  {
    images: ["https://iili.io/KcVuhrJ.md.png"],
    name: "Vajilla de Lujo Marca Corona",
  },
  {
    images: ["https://iili.io/KcVuWqg.png"],
    name: "Cafetera Universal - 12 Tazas",
  },
  {
    images: ["https://iili.io/KcVuN7R.png"],
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
          <div className="premio-images-container">
            {premio.images.map((imageSrc, imgIndex) => (
              <div key={imgIndex} className="premio-image-container">
                <img
                  src={imageSrc}
                  alt={`Premio: ${premio.name} - Imagen ${imgIndex + 1}`}
                  className="premio-image"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
