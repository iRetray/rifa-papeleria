import {
  collection,
  addDoc,
  getDocs,
  doc,
  onSnapshot,
  updateDoc,
  arrayUnion,
  setDoc,
} from "firebase/firestore";
import { db } from "../lib/firebase";

// Tipo para los datos del dispositivo
export const deviceService = {
  // Registrar dispositivo en la colección "devices"
  async logDevice(data) {
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
};

// Funciones para tickets vendidos
export const ticketService = {
  // Escuchar cambios en tiempo real de tickets vendidos
  onSoldTicketsChange(callback) {
    try {
      const ticketsCollection = collection(db, "tickets");

      // Configurar listener en tiempo real
      const unsubscribe = onSnapshot(
        ticketsCollection,
        (snapshot) => {
          if (!snapshot.empty) {
            const firstDoc = snapshot.docs[0];
            const data = firstDoc.data();
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
  async markTicketAsSold(ticketNumber) {
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
};