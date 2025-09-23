import {
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
  arrayUnion,
  setDoc,
} from "firebase/firestore";
import { db } from "../lib/firebase";

// Tipo para los datos del dispositivo
export interface DeviceLog {
  info: string;
}

// Tipo para los tickets vendidos
export interface TicketsData {
  soldTickets: number[];
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
  async getSoldTickets(): Promise<number[]> {
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
  onSoldTicketsChange(callback: (tickets: number[]) => void): () => void {
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

  // Marcar una boleta como vendida
  async markTicketAsSold(ticketNumber: number): Promise<boolean> {
    try {
      const ticketsCollection = collection(db, "tickets");
      const querySnapshot = await getDocs(ticketsCollection);

      if (!querySnapshot.empty) {
        // Usar el primer documento existente
        const firstDoc = querySnapshot.docs[0];
        const docRef = doc(db, "tickets", firstDoc.id);

        // Agregar el ticket al array usando arrayUnion (evita duplicados automáticamente)
        await updateDoc(docRef, {
          soldTickets: arrayUnion(ticketNumber),
        });

        console.log(`✅ Ticket ${ticketNumber} marcado como vendido`);
        return true;
      } else {
        // Si no existe ningún documento, crear uno nuevo
        const docRef = doc(db, "tickets", "main");
        await setDoc(docRef, {
          soldTickets: [ticketNumber],
        });

        console.log(
          `✅ Documento de tickets creado y ticket ${ticketNumber} marcado como vendido`
        );
        return true;
      }
    } catch (error) {
      console.error("❌ Error al marcar ticket como vendido:", error);
      return false;
    }
  },

  // Obtener ID del documento principal de tickets
  async getTicketsDocId(): Promise<string | null> {
    try {
      const ticketsCollection = collection(db, "tickets");
      const querySnapshot = await getDocs(ticketsCollection);

      if (!querySnapshot.empty) {
        return querySnapshot.docs[0].id;
      }
      return null;
    } catch (error) {
      console.error("Error al obtener ID del documento:", error);
      return null;
    }
  },
};
