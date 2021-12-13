var latitude;
var longitude;

function getLocation(handler) 
{
    if (navigator.geolocation) 
    {
        navigator.geolocation.getCurrentPosition((position) => {
            handler(position.coords.latitude, position.coords.longitude, null);
        }, (err) => {
            handler(null, null, err);
        });
    } 
    else 
    {
        handler(null, null, new Error('Geolocation not supported by the browser'));
    }
}