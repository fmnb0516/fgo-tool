var CACHE_NAME  = "app-version-1.0.0-rev6";

var urlsToCache = [
    "index.html",
    "favicon.ico",
    "resources/bootstrap/css/bootstrap.min.css",
    "resources/jquery-ui-1.12.1/jquery-ui.min.css",
    "resources/marked/github-markdown.min.css",
    "app/list.js",
    "app/calc.js",
    "app/view.js",
    "app/article.js",
    "app/changelog.js",
    "app/articleview.js",
    "resources/jquery/jquery-3.4.1.min.js",
    "resources/jquery-ui-1.12.1/jquery-ui.min.js",
    "resources/bootstrap/js/bootstrap.js",
    "resources/handlebars/handlebars-v4.2.0.js",
    "resources/marked/marked.min.js",
    "resources/fgoutil/fgocalc.js",
    "servant.js",
    "articles.js",
    "https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,700,400italic",
    "https://fonts.gstatic.com/s/sourcesanspro/v13/6xK3dSBYKcSV-LCoeQqfX1RYOo3qOK7l.woff2",
    "https://fonts.gstatic.com/s/sourcesanspro/v13/6xKydSBYKcSV-LCoeQqfX1RYOo3ig4vwlxdu.woff2"
];

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches
        .open(CACHE_NAME)
        .then(function(cache){
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches
            .match(event.request)
            .then(function(response) {
                if(response){
                    return response;
                }

                console.log(event.request.url);
                return fetch(event.request);
            })
    );
});

self.addEventListener('message', function(event) {
    switch (event.data) {
        case 'updateCache':
            event.waitUntil(
                caches
                .open(CACHE_NAME)
                .then(function(cache){
                    return cache.addAll(urlsToCache);
                })
            );
        break;
    }
});