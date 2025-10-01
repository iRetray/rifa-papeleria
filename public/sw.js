// Service Worker para cachear recursos críticos
const CACHE_NAME = 'rifa-papeleria-v1';
const CRITICAL_RESOURCES = [
  '/',
  '/index.html',
  '/manifest.json'
];

// Install event - cachear recursos críticos
self.addEventListener('install', (event) => {
  console.log('SW: Installing service worker');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('SW: Caching critical resources');
        return cache.addAll(CRITICAL_RESOURCES);
      })
      .then(() => {
        console.log('SW: Critical resources cached');
        return self.skipWaiting();
      })
  );
});

// Activate event - limpiar cachés viejos
self.addEventListener('activate', (event) => {
  console.log('SW: Activating service worker');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('SW: Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      return self.clients.claim();
    })
  );
});

// Fetch event - estrategia Cache First para recursos estáticos
self.addEventListener('fetch', (event) => {
  // Solo cachear requests GET
  if (event.request.method !== 'GET') {
    return;
  }

  // Skip Firebase and API requests
  if (event.request.url.includes('firestore.googleapis.com') || 
      event.request.url.includes('ipapi.co')) {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        if (cachedResponse) {
          console.log('SW: Serving from cache:', event.request.url);
          return cachedResponse;
        }

        // Si no está en caché, fetch y cachear
        return fetch(event.request)
          .then((response) => {
            // Solo cachear respuestas exitosas
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clonar para cachear
            const responseToCache = response.clone();
            
            caches.open(CACHE_NAME)
              .then((cache) => {
                console.log('SW: Caching new resource:', event.request.url);
                cache.put(event.request, responseToCache);
              });

            return response;
          });
      })
  );
});