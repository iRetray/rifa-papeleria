import { useState, useEffect } from "react";
import { ticketService } from "../hooks/useFirebase";

interface ProgressBarProps {
  className?: string;
}

export default function ProgressBar({}: ProgressBarProps) {
  const [soldTickets, setSoldTickets] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const total = 300; // Total de boletas disponibles
  const sold = soldTickets.length;
  const percentage = Math.min((sold / total) * 100, 100);

  // Cargar y escuchar tickets vendidos en tiempo real desde Firebase
  useEffect(() => {
    console.log("🔥 Configurando listener para ProgressBar");

    // Configurar listener en tiempo real
    const unsubscribe = ticketService.onSoldTicketsChange((tickets) => {
      console.log("📊 ProgressBar actualizada con tickets:", tickets);
      setSoldTickets(tickets);
      setLoading(false);
    });

    // Cleanup: cancelar suscripción cuando el componente se desmonte
    return () => {
      console.log("🔌 Desconectando listener de ProgressBar");
      unsubscribe();
    };
  }, []);

  return (
    <div className={`progress-container`}>
      {loading ? (
        <div className="loading-state">
          <p>Cargando progreso...</p>
        </div>
      ) : (
        <>
          <div className="progress-header">
            <p>
              <span className="progress-label">Boletas vendidas: </span>
              <span className="progress-numbers">
                {sold}/{total}
              </span>
            </p>
          </div>
          <div className="progress-bar-wrapper">
            <div
              className="progress-bar-fill"
              style={{ width: `${percentage}%` }}
            />
            <div className="progress-bar-bg" />
          </div>
        </>
      )}
    </div>
  );
}
