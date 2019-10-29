const CACHE_VERSION = 'v2';
const CACHE_NAME = `${registration.scope}!${CACHE_VERSION}`;

const urlsToCache = [
    '.',
    'data/calcnp.html',
    'data/index.html',
    'data/list.html',
    'data/view.html',
    'resources/jquery/jquery-3.4.1.min.js',
    'resources/jquery-ui-1.12.1/jquery-ui.min.js',
    'resources/bootstrap/js/bootstrap.js',
    'resources/handlebars/handlebars-v4.2.0.js',
    "resources/fgoutil/fgocalc.js",
    "servant.js",
    "resources/bootstrap/css/bootstrap.min.css",
    "resources/jquery-ui-1.12.1/jquery-ui.min.css",
    "favicon.ico"
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return cacheNames.filter((cacheName) => {
                return cacheName.startsWith(`${registration.scope}!`) &&
                    cacheName !== CACHE_NAME;
            });
        }).then((cachesToDelete) => {
            return Promise.all(cachesToDelete.map((cacheName) => {
                return caches.delete(cacheName);
            }));
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                if (response) {
                    return response;
                }

                let fetchRequest = event.request.clone();

                return fetch(fetchRequest)
                    .then((response) => {
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }

                        let responseToCache = response.clone();
                        caches.open(CACHE_NAME)
                            .then((cache) => {
                                cache.put(event.request, responseToCache);
                            });

                        return response;
                    });
            })
    );
});