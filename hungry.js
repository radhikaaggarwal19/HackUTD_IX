let map = null;

let mapOption = null;
let radiusOption = null;

let pos;

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

function distance(lat1,
    lat2, lon1, lon2) {

    // The math module contains a function
    // named toRadians which converts from
    // degrees to radians.
    lon1 = lon1 * Math.PI / 180;
    lon2 = lon2 * Math.PI / 180;
    lat1 = lat1 * Math.PI / 180;
    lat2 = lat2 * Math.PI / 180;

    // Haversine formula
    let dlon = lon2 - lon1;
    let dlat = lat2 - lat1;
    let a = Math.pow(Math.sin(dlat / 2), 2)
        + Math.cos(lat1) * Math.cos(lat2)
        * Math.pow(Math.sin(dlon / 2), 2);

    let c = 2 * Math.asin(Math.sqrt(a));

    // Radius of earth in kilometers. Use 3956
    // for miles
    let r = 6371;

    // calculate the result
    return (c * r);
}

function initMap() {

    let location = new Object();
    navigator.geolocation.getCurrentPosition(function (position) {

        pos = {
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
    };
    service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, callback);
}

function callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
            if (radiusOption == '4827' && distance(results[i].geometry.location['lat'](), pos.lat, results[i].geometry.location['lng'](), pos.lng) >= 2) {
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
            } else if (radiusOption == '3218' && distance(results[i].geometry.location['lat'](), pos.lat, results[i].geometry.location['lng'](), pos.lng) >= 1) {
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
            } else if (radiusOption == '1609') {
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