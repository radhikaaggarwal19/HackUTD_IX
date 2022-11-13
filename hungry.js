let map = null;

let mapOption = null;
let radiusOption = null;

function myFunction() {
    mapOption = document.getElementById("typeOption").value;
    radiusOption = document.getElementById("radiusOption").value;
    switch (document.getElementById("radiusOption").value) {
        case "slow": radiusOption = '1609'; break;
        case "medium": radiusOption = '3218'; break;
        case "high": radiusOption = '4827'; break;
    }

    console.log(mapOption, radiusOption);
    initMap();
}


function initMap() {

    let location = new Object();
    navigator.geolocation.getCurrentPosition(function (position) {

        var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        };

        map = new google.maps.Map(document.getElementById('map'), {
            center: { lat: pos.lat, lng: pos.lng },
            zoom: 15
        });
        getRestaurants(pos, mapOption, radiusOption);
    });
}

function getRestaurants(location, mapOption, radiusOption) {

    var pyrmont = new google.maps.LatLng(location.lat, location.lng);
    var request = {
        location: pyrmont,
        radius: radiusOption,
        type: [mapOption],
        openNow: true,
        rankby: 'distance'
    };
    service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, callback);
}

function callback(results, status) {
    console.log(status);
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        console.log(status);
        for (var i = 0; i < results.length; i++) {
            console.log(results);
            var place = results[i];
            let price = createPrice(place.price_level);
            let content = `<h3>${place.name}</h3>
            <h4>${place.vicinity}</h4>
            <p>Price: ${price}</br>
            Rating: ${place.rating}`;

            var marker = new google.maps.Marker({
                position: place.geometry.location,
                map: map,
                title: place.name
            });

            var infowindow = new google.maps.InfoWindow({
                content: content
            });

            bindInfoWindow(marker, map, infowindow, content);
            marker.setMap(map);

        }
    }
}

function bindInfoWindow(marker, map, infowindow, html) {
    marker.addListener('click', function () {
        infowindow.setContent(html);
        infowindow.open(map, this);
    });
}

function createPrice(level) {
    if (level != "" && level != null) {
        let out = "";
        for (var x = 0; x < level; x++) {
            out += "$";
        }
        return out;
    } else {
        return "?";
    }
}