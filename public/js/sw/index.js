self.addEventListener('install', function (event) {
    let urlsToCache = [
        '/',
        'js/main.js',
        'css/main.css',
        'imgs/icon.png',
        'https://fonts.gstatic.com/s/roboto/v15/2UX7WLTfW3W8TclTUvlFyQ.woff',
        'https://fonts.gstatic.com/s/roboto/v15/d-6IYplOFocCacKzxwXSOD8E0i7KZn-EPnyo3HZu7kw.woff'
    ];

    event.waitUntil(
        // TODO: open a cache named 'wittr-static-v1'
        // Add cache the urls from urlsToCache
        caches.open('wittr-static-v1').then(function(cache) {
           return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener('fetch', function (event) {
    // TODO: respond with an entry from the cache if there is one.
    // If there isn't, fetch from the network.
    // hint: call event.respondWith synchronously, you can't call it within a promise handler, that's too late.

    // instructor solution
    /*event.respondWith(
        caches.match(event.request).then(function(response) {
            if (response) return response;
            return fetch(event.request);
        })
    );*/

    // my code
    let cache_promise = caches.open('wittr-static-v1').then(function(cache) {
        console.log('Cache opened successfully.');
        return cache.match(event.request).then(function(response) {
            if (!response) throw Error("Not found in cache.");
            console.log(response);
            return response;
        }).catch(function(error) {
            console.log(error);
            return fetch(event.request);
        });
    });

    console.log('Cache_promise: ' + cache_promise);
    event.respondWith(cache_promise);

    // my code, edited slightly with instructor's answer input
    /*event.respondWith(
        caches.open('wittr-static-v1').then(function(cache) {
            console.log('Cache opened successfully.');
            return cache.match(event.request).then(function(response) {
                if (response) return response;
                return fetch(event.request);
            });
        }));*/
});