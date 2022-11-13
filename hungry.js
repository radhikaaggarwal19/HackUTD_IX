let map = null;

function initMap() {
    let location = new Object();
    navigator.geolocation.getCurrentPosition(function (position) {

        var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        };

        //infoWindow.setPosition(pos);
        // infoWindow.setContent("You're here!");
        //  infoWindow.open(map);
        //map.setCenter(pos);

        // self.setState({
        //     lat: position.coords.latitude,
        //     lng: position.coords.longitude
        // })

        //location.lat = 32.9841206
        //console.log(typeof (location.lat));
        //location.lng = parseFloat(pos.coords.longitude.value);
        //console.log(typeof (location.lng));
        map = new google.maps.Map(document.getElementById('map'), {
            center: { lat: pos.lat, lng: pos.lng },
            zoom: 15
        });
        getRestaurants(pos);
    });
}

function getRestaurants(location) {
    var pyrmont = new google.maps.LatLng(location.lat, location.lng);
    var request = {
        location: pyrmont,
        radius: '3000',
        type: ['restaurant']
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