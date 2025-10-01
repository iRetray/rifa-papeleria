import { useEffect, useState } from 'react';

const DesktopLayout = ({ children, title, showSidebar = false, sidebarContent = null }) => {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 1200);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  if (!isDesktop) {
    // En móvil, renderizar children normalmente
    return <>{children}</>;
  }

  // En desktop, usar layout mejorado
  return (
    <div className="desktop-wrapper">
      {title && (
        <div className="desktop-nav">
          <div className="page-header">
            <h2 className="desktop-title">{title}</h2>
            <div className="desktop-nav-actions">
              {/* Aquí se pueden agregar acciones de navegación */}
            </div>
          </div>
        </div>
      )}
      
      <div className={showSidebar ? "desktop-layout" : "content-wrapper"}>
        {showSidebar && sidebarContent && (
          <div className="sidebar">
            {sidebarContent}
          </div>
        )}
        
        <div className={showSidebar ? "main-content" : "desktop-main"}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default DesktopLayout;