import { useEffect, useState } from "react";

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
  return (
    <div className="gallery-container">
      <p className="gallery-title">Fotos del negocio</p>
      <div className="gallery-wrapper">
        <div className="gallery-track">
          {/* Duplicamos las imágenes para crear el efecto infinito */}
          {[...images, ...images].map((img, index) => (
            <div key={index} className="gallery-item">
              <img
                src={img}
                alt={`Foto del negocio ${(index % images.length) + 1}`}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Botón Ver Todo */}
      <div className="gallery-button-container">
        <button className="gallery-view-all-button">Ver todo</button>
      </div>
    </div>
  );
}
