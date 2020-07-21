/////////////////////////////////////////////////////////////////////////////
// You can find dozens of practical, detailed, and working examples of 
// service worker usage on https://github.com/mozilla/serviceworker-cookbook
/////////////////////////////////////////////////////////////////////////////

// // Cache name
// function notifyMe() {
//   // Let's check if the browser supports notifications
//   if (!("Notification" in window)) {
//     alert("This browser does not support desktop notification");
//   }

//   // Let's check whether notification permissions have already been granted
//   else if (Notification.permission === "granted") {
//     // If it's okay let's create a notification
//     console.log(notification)
//     showNotification();
//   }

//   // Otherwise, we need to ask the user for permission
//   else if (Notification.permission !== "denied") {
//     Notification.requestPermission().then(function (permission) {
//       // If the user accepts, let's create a notification
//       console.log(permission)
//       if (permission === "granted") {
//         console.log(notification)
//         showNotification();
//       }
//     });
//   }

  // At last, if the user has denied notifications, and you 
  // want to be respectful there is no need to bother them any more.
// }



// function showNotification() {
//   const notification = new Notification('HEY ASAS BAUG', {
//     body: "DO YOU LOVE ME???",
//     icon: 'assets/MTLSAUVAGE-LOGO.png'

//   })

  // if (navigator.onLine) {
  //   console.log('online');
  // } else {
  //   console.log('offline');
  // }
// }



var CACHE_NAME = 'cache-version-1';

// Files required to make this app work offline
var REQUIRED_FILES = [
  'index.html',
  '/',
  'https://fonts.googleapis.com/css?family=Inter:400,500,700&display=swap',
  'https://unpkg.com/ionicons@5.0.0/dist/ionicons.js',
  'assets/js/lib/jquery-3.4.1.min.js',
  'assets/js/lib/popper.min.js',
  'assets/js/lib/bootstrap.min.js',
  'assets/js/plugins/owl-carousel/owl.carousel.min.js',
  'assets/js/base.js',
  'assets/css/inc/owl-carousel/owl.carousel.min.css',
  'assets/css/inc/owl-carousel/owl.theme.default.css',
  'assets/css/inc/bootstrap/bootstrap.min.css',
  'assets/css/style.css'

];

self.addEventListener('install', function(event) {
  // Perform install step:  loading each required file into cache
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        // Add all offline dependencies to the cache
        // notifyMe();
        return cache.addAll(REQUIRED_FILES);
      })
      .then(function() {
        return self.skipWaiting();
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return the response from the cached version
        if (response) {
          return response;
        }
        // Not in cache - return the result from the live server
        // `fetch` is essentially a "fallback"
        return fetch(event.request);
      }
    )
  );
});

self.addEventListener('activate', function(event) {
  // Calling claim() to force a "controllerchange" event on navigator.serviceWorker
  event.waitUntil(self.clients.claim());
});

