CACHE_NAME = "pwa_demo" + "-v11";
CACHE_CONTENT = [
    "./",
    "./sw.js",
    "./index.html",
    "./manifest.json",
    "./styles.css",
    "https://fonts.googleapis.com/css?family=Lobster"
]

self.addEventListener("install", function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            cache.addAll(CACHE_CONTENT);
        })
    );
});

self.addEventListener("activate", function (event) {
    console.log("service worker activated");
    event.waitUntil(
        caches.keys().then(function (keyList) {
            return Promise.all(keyList.map(function (key) {
                if (key !== CACHE_NAME) {
                    console.log("Removing old cache", key)
                    return caches.delete(key);
                }
            }))
        })
    );
    return self.clients.claim();
});

self.addEventListener("fetch", function (event) {
    event.respondWith(
        caches.match(event.request).then(function (result) {
            console.log("request");
            if (result) {
                return result;
            } else {
                return fetch(event.request).then(function (response) {
                    return caches.open(CACHE_NAME).then(function (cache) {
                        cache.put(event.request.url, response.clone());
                        return response;
                    });
                });
            }
        }).catch(function (error) {

        })
    )
});