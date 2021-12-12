function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    } else {
        console.log("Geolocation is not supported by this browser.");
    }
}

function onSuccess(position) {
    console.log("Latitude: " + position.coords.latitude + " Longitude: " + position.coords.longitude);
}

function onError(error) {
    switch(error.code)
    {
        case error.PERMISSION_DENIED:
            console.log("User denied the request for Geolocation.");
            break;
        case error.POSITION_UNAVAILABLE:
            console.log("Location information is unavailable.");
            break;
        case error.TIMEOUT:
            console.log("The request to get user location timed out.");
            break;
        case error.UNKNOWN_ERROR:
            console.log("An unknown error occurred.");
            break;
    }
}