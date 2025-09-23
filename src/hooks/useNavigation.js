import { useNavigate } from 'react-router-dom';

export const useNavigation = () => {
  const navigate = useNavigate();

  const handleNavigate = (page) => {
    // Hacer scroll al inicio de la página
    window.scrollTo(0, 0);
    
    // Navegar usando React Router
    switch (page) {
      case 'home':
        navigate('/');
        break;
      case 'seleccionar-numero':
        navigate('/seleccionar-numero');
        break;
      case 'inventario':
        navigate('/inventario');
        break;
      case 'devmode':
      case 'devMode':
        navigate('/devHome');
        break;
      default:
        navigate('/');
    }
  };

  return { handleNavigate };
};