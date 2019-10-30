var CACHE_DYNAMIC_VERSION = 'v1';

self.addEventListener('fetch', function (event) {
    console.log('[Service Worker] Fetching something ...');
    event.respondWith(
        // キャッシュの存在チェック
        caches.match(event.request)
            .then(function (response) {
                if (response) {
                    return response;
                } else {
                    // キャッシュがなければリクエストを投げて、レスポンスをキャッシュに入れる
                    return fetch(event.request)
                        .then(function (res) {
                            return caches.open(CACHE_DYNAMIC_VERSION)
                                .then(function (cache) {
                                    // 最後に res を返せるように、ここでは clone() する必要がある
                                    cache.put(event.request.url, res.clone());
                                    return res;
                                })
                        })
                        .catch(function () {
                            // エラーが発生しても何もしない
                        });
                }
            })
    );
});