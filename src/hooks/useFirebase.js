// Lazy loading Firebase - no importar hasta que se necesite
let firebaseInstance = null;

const getFirebaseInstance = async () => {
  if (!firebaseInstance) {
    // Solo importar lo mínimo necesario de Firebase
    const [
      { initializeApp },
      { getFirestore, collection, addDoc, getDocs, doc, onSnapshot, updateDoc, arrayUnion, setDoc }
    ] = await Promise.all([
      import('firebase/app'),
      import('firebase/firestore')
    ]);

    // Configuración mínima solo para Firestore
    const firebaseConfig = {
      apiKey: "AIzaSyAxxfl8vvZtoFxG70-0Vl6goI4PRjM72bA",
      projectId: "rifa-papeleria",
    };

    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    firebaseInstance = {
      db,
      collection,
      addDoc,
      getDocs,
      doc,
      onSnapshot,
      updateDoc,
      arrayUnion,
      setDoc
    };
  }
  return firebaseInstance;
};

// Tipo para los datos del dispositivo
export const deviceService = {
  // Registrar dispositivo en la colección "devices"
  async logDevice(data) {
    try {
      const firebase = await getFirebaseInstance();
      const docRef = await firebase.addDoc(firebase.collection(firebase.db, "devices"), {
        info: data.info,
        timestamp: new Date(),
      });
      console.log("📱 Dispositivo guardado con ID:", docRef.id);
      return docRef.id;
    } catch (error) {
      console.error("Error al registrar dispositivo:", error);
      throw error;
    }
  },

  // Obtener todos los dispositivos registrados
  async getAllDevices() {
    try {
      const firebase = await getFirebaseInstance();
      const devicesCollection = firebase.collection(firebase.db, "devices");
      const querySnapshot = await firebase.getDocs(devicesCollection);

      const devices = [];
      querySnapshot.forEach((doc) => {
        devices.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      console.log("📱 Dispositivos obtenidos:", devices.length);
      return devices;
    } catch (error) {
      console.error("Error al obtener dispositivos:", error);
      throw error;
    }
  },
};

// Funciones para tickets vendidos
export const ticketService = {
  // Escuchar cambios en tiempo real de tickets vendidos
  async onSoldTicketsChange(callback) {
    try {
      const firebase = await getFirebaseInstance();
      const ticketsCollection = firebase.collection(firebase.db, "tickets");

      // Configurar listener en tiempo real
      const unsubscribe = firebase.onSnapshot(
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
      const firebase = await getFirebaseInstance();
      const ticketsCollection = firebase.collection(firebase.db, "tickets");
      const querySnapshot = await firebase.getDocs(ticketsCollection);

      if (!querySnapshot.empty) {
        // Usar el primer documento existente
        const firstDoc = querySnapshot.docs[0];
        const docRef = firebase.doc(firebase.db, "tickets", firstDoc.id);

        // Agregar el ticket al array usando arrayUnion (evita duplicados automáticamente)
        await firebase.updateDoc(docRef, {
          soldTickets: firebase.arrayUnion(ticketNumber),
        });

        console.log(`✅ Ticket ${ticketNumber} marcado como vendido`);
        return true;
      } else {
        // Si no existe ningún documento, crear uno nuevo
        const docRef = firebase.doc(firebase.db, "tickets", "main");
        await firebase.setDoc(docRef, {
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
