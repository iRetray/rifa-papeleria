import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../lib/firebase";

// Tipo para los datos del dispositivo
export interface DeviceLog {
  info: string;
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
