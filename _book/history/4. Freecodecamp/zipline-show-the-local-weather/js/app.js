$(function() {
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            alert(position.coords.lagitude + ',' + position.coords.longitude);
        });
        
    }
});
