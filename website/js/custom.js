// custom JS code
var mymap;
var lyrOSM;
var markerCurrentLocation;

$(document).ready(function(){
mymap = L.map('map').setView([42.358918, -71.063828], 13);
lyrOSM = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
maxZoom: 18,
id: 'mapbox/streets-v11',
accessToken: 'pk.eyJ1IjoibmljZW9sYTg4IiwiYSI6ImNrNmZpMTcwczF6Z24zbm4zeXhnbGZocngifQ.VBUYpku7fhmot35fpOp8fQ'
}).addTo(mymap);

mymap.on('keypress',function(e){
   console.log(e);
   });

// find your location adding a circle if keypress is L or button "locate" is pressed; also, handle location failure

mymap.on('keypress', function(e) {
    if (e.originalEvent.key=="l") {
        mymap.locate();
    }
});

mymap.on('locationfound', function(e) {
    console.log(e);
    if (markerCurrentLocation) {
        markerCurrentLocation.remove();
    }
    markerCurrentLocation = L.circleMarker(e.latlng).addTo(mymap);
    mymap.setView(e.latlng, 15);
    $("#current-location").html(e.latlng.toString());
});

mymap.on('locationerror', function(e) {
    console.log(e);
    alert('the location was not found');
});

//have a button start location process

$('#btnLocate').click(function(){
    mymap.locate();
});

// grab coordinates of where the mouse is pointing

mymap.on('mousemove', function(e) {
    $("#mouse-location").html(e.latlng.toString());
});



});

// end of document.ready function


