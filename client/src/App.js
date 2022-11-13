import './App.css';
//import Users from './components/User';

const API_KEY = `${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`;
var crd;

function App() {
    return (
        returnRecommendations()
        //navigator.geolocation.getCurrentPosition(success, error, options)
        //initialize();
    );
}

function returnRecommendations() {
    loadScript(`https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=places&callback=initMap`);
    navigator.geolocation.getCurrentPosition(success, error, options);
}

const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
};

function success(pos) {
    crd = pos.coords;

    console.log('Your current position is:');
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);
    initialize();
}

function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
}

var map;
var service;
var infowindow;

function initialize() {
    var pyrmont = new window.google.maps.LatLng(crd.latitude, crd.longitude);

    map = new window.google.maps.Map(document.getElementById('map'), {
        center: pyrmont,
        zoom: 15
    });

    var request = {
        location: pyrmont,
        radius: '500',
        type: ['restaurant']
    };

    service = new window.google.maps.places.PlacesService(map);
    service.nearbySearch(request, callback);
}

function callback(results, status) {
    if (status == window.google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
            createMarker(results[i]);
        }
    }
}

function loadScript(url) {
    let index = window.document.getElementsByTagName("script")[0];
    let script = window.document.createElement("script");
    script.src = url;
    script.async = true;
    script.defer = true;
    index.parentNode.insertBefore(script, index);
}

function createMarker(place) {
    var marker = new window.google.maps.Marker({
        map: map,
        title: place.name,
        icon: {
            url: 'https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png',
            anchor: new window.google.maps.Point(10, 10),
            scaledSize: new window.google.maps.Size(20, 20)
        },
        position: place.geometry.location
    });

    marker.addListener('click', function () {

        var request = {
            reference: place.reference
        }

        let placePicture = place.photos ? place.photos[0].getUrl({ maxWidth: 300, maxHeight: 300 }) : 'https://via.placeholder.com/300';

        let content = `
        <h2>${place.name}</h2>
        <img src=${placePicture}>
        <ul>
          <li>${place.formatted_address}</li>
          <li>${place.formatted_phone_number}</li>
        </ul>
      `;
        infowindow.setContent(content);
        infowindow.open(map, marker);

    })
}


export default App;
