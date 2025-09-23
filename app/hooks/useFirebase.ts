import {
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../lib/firebase";

// Tipo para los datos del dispositivo
export interface DeviceLog {
  info: string;
}

// Tipo para los tickets vendidos
export interface TicketsData {
  soldTickets: string[];
}

// Funciones para logs de dispositivos
export const deviceService = {
  // Registrar dispositivo en la colección "devices"
  async logDevice(data: DeviceLog) {
    try {
      const docRef = await addDoc(collection(db, "devices"), {
        info: data.info,
      });
      console.log("📱 Dispositivo guardado con ID:", docRef.id);
      return docRef.id;
    } catch (error) {
      console.error("Error al registrar dispositivo:", error);
      throw error;
    }
  },

  // Obtener estadísticas de dispositivos
  async getDeviceCount() {
    try {
      const querySnapshot = await getDocs(collection(db, "devices"));
      return querySnapshot.size;
    } catch (error) {
      console.error("Error al obtener estadísticas de dispositivos:", error);
      return 0;
    }
  },
};

// Funciones para tickets vendidos
export const ticketService = {
  // Obtener tickets vendidos desde Firestore (una sola vez)
  async getSoldTickets(): Promise<string[]> {
    try {
      // Asumiendo que tienes un solo documento en la colección "tickets"
      const ticketsCollection = collection(db, "tickets");
      const querySnapshot = await getDocs(ticketsCollection);

      if (!querySnapshot.empty) {
        // Tomar el primer documento (ya que mencionaste que solo hay uno)
        const firstDoc = querySnapshot.docs[0];
        const data = firstDoc.data() as TicketsData;

        console.log("🎫 Tickets vendidos obtenidos:", data.soldTickets);
        return data.soldTickets || [];
      } else {
        console.log("🎫 No hay documentos en la colección tickets");
        return [];
      }
    } catch (error) {
      console.error("Error al obtener tickets vendidos:", error);
      return [];
    }
  },

  // Escuchar cambios en tiempo real de tickets vendidos
  onSoldTicketsChange(callback: (tickets: string[]) => void): () => void {
    try {
      const ticketsCollection = collection(db, "tickets");

      // Configurar listener en tiempo real
      const unsubscribe = onSnapshot(
        ticketsCollection,
        (snapshot) => {
          if (!snapshot.empty) {
            const firstDoc = snapshot.docs[0];
            const data = firstDoc.data() as TicketsData;
            const soldTickets = data.soldTickets || [];

            console.log("🔄 Tickets actualizados en tiempo real:", soldTickets);
            callback(soldTickets);
          } else {
            console.log("🔄 No hay documentos en la colección tickets");
            callback([]);
          }
        },
        (error) => {
          console.error("❌ Error en el listener de tickets:", error);
        }
      );

      console.log("👂 Listener de tickets vendidos configurado");
      return unsubscribe; // Función para cancelar la suscripción
    } catch (error) {
      console.error("Error al configurar listener de tickets:", error);
      return () => {}; // Función vacía si hay error
    }
  },
};
