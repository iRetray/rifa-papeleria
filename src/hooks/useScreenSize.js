import { useState, useEffect } from 'react';

const useScreenSize = () => {
  const [screenSize, setScreenSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
    isMobile: typeof window !== 'undefined' ? window.innerWidth < 768 : true,
    isTablet: typeof window !== 'undefined' ? window.innerWidth >= 768 && window.innerWidth < 1200 : false,
    isDesktop: typeof window !== 'undefined' ? window.innerWidth >= 1200 : false,
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      setScreenSize({
        width,
        height,
        isMobile: width < 768,
        isTablet: width >= 768 && width < 1200,
        isDesktop: width >= 1200,
      });
    };

    // Agregar listener
    window.addEventListener('resize', handleResize);

    // Limpiar listener
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return screenSize;
};

export default useScreenSize;