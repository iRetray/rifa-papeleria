# Rifa de Papelería v2

Una aplicación web para gestionar una rifa de papelería con sistema de selección de números en tiempo real.

## 🔄 Migración a Vite + React Router

Esta aplicación fue migrada para utilizar **Vite** como build tool y **React Router** para navegación real con URLs. La migración mantiene todas las funcionalidades originales pero mejora el rendimiento y la navegación.

### Cambios principales:
- ✅ Migrado de Create React App/Webpack a Vite
- ✅ Implementado React Router para rutas reales
- ✅ Configuración optimizada para Netlify
- ✅ Funcionalidad completa de Firebase preservada
- ✅ Todos los componentes actualizados para usar React Router
- ✅ Estilos CSS completamente preservados

## 🚀 Características

- **Página Principal**: Vista general de la rifa con carrusel de imágenes
- **Selección de Números**: Interfaz para elegir números de boletas (1-300)
- **Inventario**: Galería completa de fotos de la mercancía
- **Sistema en Tiempo Real**: Actualización automática de boletas vendidas
- **Responsive Design**: Optimizado para móviles y escritorio
- **Logging de Dispositivos**: Seguimiento automático de visitantes

## 🛠️ Tecnologías

- **React 19** - Framework principal
- **Vite** - Build tool y desarrollo
- **Firebase Firestore** - Base de datos en tiempo real
- **CSS3** - Estilos personalizados
- **Responsive Design** - Compatible con todos los dispositivos

## 📦 Instalación

```bash
# Clonar el proyecto
git clone [repo-url]

# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Build para producción
npm run build
```

## 🔗 Navegación

La aplicación utiliza React Router con URLs reales:

- `/` - Página principal
- `/seleccionar-numero` - Selección de números
- `/inventario` - Galería de mercancía
- `/devHome` - Panel administrativo (requiere código)

## 🏗️ Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── ImageGallery.jsx    # Carrusel de imágenes
│   ├── NumberElement.jsx   # Elemento de número individual
│   ├── PremiosGallery.jsx  # Galería de premios
│   └── ProgressBar.jsx     # Barra de progreso
├── pages/              # Páginas principales
│   ├── Home.jsx           # Página de inicio
│   ├── SeleccionarNumero.jsx # Selección de números
│   ├── Inventario.jsx     # Galería de inventario
│   └── DevMode.jsx        # Panel administrativo
├── hooks/              # Hooks personalizados
│   └── useFirebase.js     # Servicios de Firebase
├── lib/                # Configuraciones
│   └── firebase.js        # Configuración de Firebase
├── images/             # Recursos de imágenes
└── App.jsx             # Componente principal
```

## ⚙️ Configuración de Firebase

El proyecto está configurado para usar Firebase Firestore. La configuración está en `src/lib/firebase.js`.

### Colecciones utilizadas:
- `tickets` - Boletas vendidas
- `devices` - Logs de dispositivos

## 🎮 Modo Desarrollador

Accede a `#devmode` para el panel administrativo que permite:
- Marcar boletas como vendidas manualmente
- Monitorear el estado de la rifa
- Control de acceso con código

**Código de acceso**: `123` (cambiar en producción)

## 📱 Características Móviles

- Diseño completamente responsive
- Optimizado para touch
- Botón flotante de WhatsApp
- Detección automática de dispositivo
- Logging de información del usuario

## 🔄 Sistema en Tiempo Real

La aplicación utiliza Firebase Firestore para sincronización en tiempo real:
- Las boletas vendidas se actualizan instantáneamente
- Múltiples usuarios pueden ver cambios al mismo tiempo
- Progreso de ventas actualizado automáticamente

## 🚀 Deploy en Netlify

Esta aplicación está configurada para desplegarse en Netlify con Vite. 

### Configuración automática:

1. **Build Command**: `npm run build`
2. **Publish Directory**: `dist`
3. **Node Version**: 18

### Archivos de configuración incluidos:

- `netlify.toml` - Configuración principal de Netlify
- `public/_redirects` - Redireccionamiento SPA para React Router

### Deploy manual:

```bash
npm run build
```

Los archivos de producción estarán en la carpeta `dist/`.

### Deploy automático:

1. Conecta tu repositorio a Netlify
2. Netlify detectará automáticamente la configuración de Vite
3. Las rutas SPA funcionarán correctamente gracias a los archivos de configuración

## 🐛 Resolución de Problemas

### Problemas comunes:

1. **Firebase no conecta**: Verificar configuración en `firebase.js`
2. **Imágenes no cargan**: Verificar rutas en la carpeta `src/images/`
3. **Navegación no funciona**: Verificar que los hashes estén correctos

## 📄 Licencia

Proyecto privado para rifa de papelería.

---

**Desarrollado con ❤️ para una gran oportunidad de negocio**+ Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
