import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import SeleccionarNumero from '../pages/SeleccionarNumero';
import Inventario from '../pages/Inventario';
import DevMode from '../pages/DevMode';
import FloatingWhatsAppButton from '../components/FloatingWhatsAppButton';

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/seleccionar-numero" element={<SeleccionarNumero />} />
        <Route path="/inventario" element={<Inventario />} />
        <Route path="/devHome" element={<DevMode />} />
        <Route path="/devmode" element={<DevMode />} />
        {/* Redirect old hash-based routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <FloatingWhatsAppButton />
    </Router>
  );
}