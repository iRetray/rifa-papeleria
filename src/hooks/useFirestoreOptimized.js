// Configuración optimizada solo para Firestore
let firestoreInstance = null;

export const getFirestore = async () => {
  if (!firestoreInstance) {
    // Importación dinámica solo de lo necesario
    const { initializeApp } = await import('firebase/app');
    const { 
      getFirestore: initFirestore,
      collection,
      addDoc,
      getDocs,
      doc,
      onSnapshot,
      updateDoc,
      arrayUnion,
      setDoc
    } = await import('firebase/firestore');

    // Configuración mínima
    const app = initializeApp({
      apiKey: "AIzaSyAxxfl8vvZtoFxG70-0Vl6goI4PRjM72bA",
      projectId: "rifa-papeleria",
    });

    const db = initFirestore(app);

    firestoreInstance = {
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
  
  return firestoreInstance;
};

// Servicios optimizados
export const deviceService = {
  async logDevice(data) {
    try {
      const firestore = await getFirestore();
      const docRef = await firestore.addDoc(
        firestore.collection(firestore.db, "devices"), 
        {
          info: data.info,
          timestamp: new Date(),
        }
      );
      console.log("📱 Dispositivo guardado con ID:", docRef.id);
      return docRef.id;
    } catch (error) {
      console.error("Error al registrar dispositivo:", error);
      throw error;
    }
  },

  async getAllDevices() {
    try {
      const firestore = await getFirestore();
      const devicesCollection = firestore.collection(firestore.db, "devices");
      const querySnapshot = await firestore.getDocs(devicesCollection);

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

export const ticketService = {
  async onSoldTicketsChange(callback) {
    try {
      const firestore = await getFirestore();
      const ticketsCollection = firestore.collection(firestore.db, "tickets");

      const unsubscribe = firestore.onSnapshot(
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
      return unsubscribe;
    } catch (error) {
      console.error("Error al configurar listener de tickets:", error);
      return () => {};
    }
  },

  async markTicketAsSold(ticketNumber) {
    try {
      const firestore = await getFirestore();
      const ticketsCollection = firestore.collection(firestore.db, "tickets");
      const querySnapshot = await firestore.getDocs(ticketsCollection);

      if (!querySnapshot.empty) {
        const firstDoc = querySnapshot.docs[0];
        const docRef = firestore.doc(firestore.db, "tickets", firstDoc.id);

        await firestore.updateDoc(docRef, {
          soldTickets: firestore.arrayUnion(ticketNumber),
        });

        console.log(`✅ Ticket ${ticketNumber} marcado como vendido`);
        return true;
      } else {
        const docRef = firestore.doc(firestore.db, "tickets", "main");
        await firestore.setDoc(docRef, {
          soldTickets: [ticketNumber],
        });

        console.log(`✅ Documento de tickets creado y ticket ${ticketNumber} marcado como vendido`);
        return true;
      }
    } catch (error) {
      console.error("❌ Error al marcar ticket como vendido:", error);
      return false;
    }
  },
};