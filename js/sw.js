console.log('SW Installed Successfully');

//Installs an event listener so that when the service work is installed properly
//we can do stuff like cache files... lol
self.addEventListener('install', function(e) {
  //wait until the installation is complete
  e.waitUntil(
    //open the cache object matching the cache name
    caches.open('v1').then(function(cache) {
      //adds file names to the cache
      return cache.addAll(cacheFiles);
    })
  );
});

const cacheFiles = [
  '/',
  '/index.html',
  '/restaurant.html',
  '/css/styles.css',
  '/js/dbhelper.js',
  '/js/main.js',
  '/js/restaurant_info.js',
  '/data/restaurants.json',
  '/img/1.jpg',
  '/img/2.jpg',
  '/img/3.jpg',
  '/img/4.jpg',
  '/img/5.jpg',
  '/img/6.jpg',
  '/img/7.jpg',
  '/img/8.jpg',
  '/img/9.jpg',
  '/img/10.jpg'
];

//now let's fetch the event!
self.addEventListener('fetch', function(e) {
  //prevents the default fetch event and provides a promise
  e.respondWith(
    //utilization of the match method to make sure the event request URL doesn't already exist in the cache
    caches.match(e.request)
    //.then a promise
    .then(function(response) {
      //determine it the cache match was successful or not
      if (response) {
        console.log('Found ', e.request, ' in cache');
        return response;
      }else{
        console.log('Could not find ', e.request, ' in cache, still working on it!');
        //fetch request and add it to the cache for later
        return fetch(e.request)
        .then(function(response) {
          //to avoid errors from having multiple responses
          const repeatedResponse = response.clone();
          caches.open('v1')
          .then(function(cache) {
            cache.put(e.request, repeatedResponse);
          })
          return response;
        })
        .catch(function(error) {
          console.error(error);
        });
      }
    })
  );
});

//Big thank you to Matthew Cranford for the help! www.matthewcranford.com
