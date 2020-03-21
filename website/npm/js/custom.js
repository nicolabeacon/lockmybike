// custom JS code
var mymap;
var lyrOSM;
var markerCurrentLocation;
var sidebar;
var leafletSearch;

$(document).ready(function() {
  mymap = L.map('map').setView([42.358918, -71.063828], 13);
  lyrOSM = L.tileLayer(
    'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}',
    {
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox/streets-v11',
      accessToken:
        'pk.eyJ1IjoibmljZW9sYTg4IiwiYSI6ImNrNmZpMTcwczF6Z24zbm4zeXhnbGZocngifQ.VBUYpku7fhmot35fpOp8fQ'
    }
  ).addTo(mymap);

  
  // ?? add a filter function using .filter Leaflet method; filter based on zip will wrap all the marker displaying code. OR fetch zipcode and display a layer (multiple geoJSON files needed, one per zipcode)
  // load GeoJSON from an external file
  // repaste here jquery getjson app to filter if necessary

  // end of repaste here jquery getjson app to filter if necessary
  
  // build a sidebar

  sidebar = L.control.sidebar('sidebar', {
    position: 'left'
  });

  mymap.addControl(sidebar);

  // add a custom button to toggle sidebar

  L.easyButton('fa-arrows-alt-h', function() {
    if (sidebar.isVisible()) {
      sidebar.hide();
    } else {
      sidebar.show();
    }
  }).addTo(mymap);

  // find your location adding a circle if button "locate" is pressed; also, handle location failure

   $('#btnLocate').click(function() {
    mymap.locate();
  });

  mymap.on('locationfound', function(e) {
    console.log(e);
    if (markerCurrentLocation) {
      markerCurrentLocation.remove();
    }
    markerCurrentLocation = L.circleMarker(e.latlng).addTo(mymap);
    mymap.setView(e.latlng, 15);
    $('#current-location').html(e.latlng.toString());
  });

  mymap.on('locationerror', function(e) {
    console.log(e);
    alert('the location was not found');
  });

  
  // button filters map based on text input
  
  leafletSearch = L.Control.openCageSearch({key: 'd7f2af1decc940898adba6b32b6a2e7d',limit:10, position:'topleft' }).addTo(mymap);
  
   /*
  $('#btnSearch').click(function(){
   searchBoxVal = $('#searchBox').val();
    console.log (searchBoxVal);
  });
  */

  
 /* $('#searchBox').change(function(e) {
    // Load your JSON data
    // Search by input
    // When find a match, pass the lat and longitude to the map
  }); */
});

 
// end of document ready function
