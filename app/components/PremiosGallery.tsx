import { useEffect, useState } from "react";

// Importar todas las imágenes de premios
import bicicleta from "../images/premios/bicicleta.png";
import cafetera from "../images/premios/cafetera.png";
import cobijas from "../images/premios/cobijas.png";
import platos from "../images/premios/platos.png";
import toallas from "../images/premios/toallas.png";

const premiosImages = [
  {
    src: bicicleta,
    name: "Bicicleta RIN 29 - Marco en Aluminio - Freno hidraulico",
  },
  { src: cafetera, name: "Cafetera Universal - 12 Tazas" },
  { src: cobijas, name: "Cobijas + Sabanas + Cubrelechos" },
  { src: platos, name: "Vajilla de Lujo Marca Corona" },
  { src: toallas, name: "Set 2 toallas Cannon Excelente calidad" },
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
