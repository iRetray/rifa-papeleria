import { useState, useEffect } from "react";
import { ticketService } from "../hooks/useFirestoreOptimized";

export default function ProgressBar() {
  const [soldTickets, setSoldTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  const total = 300; // Total de boletas disponibles
  const sold = soldTickets.length;
  const percentage = Math.min((sold / total) * 100, 100);

  // Cargar y escuchar tickets vendidos en tiempo real desde Firebase
  useEffect(() => {
    let unsubscribe = () => {};
    
    // Listener para tickets vendidos
    const setupListener = async () => {
      try {
        unsubscribe = await ticketService.onSoldTicketsChange((tickets) => {
          setSoldTickets(tickets);
        });
      } catch (error) {
        console.error('Error setting up tickets listener:', error);
      }
    };
    
    setupListener();

    return () => unsubscribe();
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