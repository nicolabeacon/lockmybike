// custom JS code
var mymap;
var lyrOSM;
var lyrLocate;
var nearSpotsIndex;
var sidebar;
var leafletSearch;


$(document).ready(function() {
  mymap = L.map('map').setView([42.358918, -71.063828], 13);
  lyrOSM = L.tileLayer(
    'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox/streets-v11',
      accessToken: 'pk.eyJ1IjoibmljZW9sYTg4IiwiYSI6ImNrNmZpMTcwczF6Z24zbm4zeXhnbGZocngifQ.VBUYpku7fhmot35fpOp8fQ'
    }
  ).addTo(mymap);


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
  }, 'look for stations near you').addTo(mymap);

  // find your location adding a circle if button "locate" is pressed; also, handle location failure

  
    function nearbyMarkers(e , feature) {
            nearSpotsIndex = leafletKnn(lyrLocate);
            var nearestResult = nearSpotsIndex.nearest(e.latlng, 10);
            return nearestResult.latlng === feature.latlng;
          }

  
   $('#btnLocate').click(function() {
    mymap.locate();
  });

  mymap.on('locationfound', function(e) {
    console.log(e);
        $.getJSON('../bikedata.geojson', function(data) {
      //add custom icons
      var rackIcon = L.icon({
        iconUrl: '../images/bikeRing.png',
        iconSize: [60, 33.6]
      });
      
      // add GeoJSON layer to the map once the file is loaded
       lyrLocate = L.geoJson(data, {
        pointToLayer: function(feature, latlng) {
          return L.marker(latlng, {
            icon: rackIcon
          });
        },
        onEachFeature: function(feature, layer) {
          layer.bindPopup(
            'Address:' + '&nbsp' + feature.properties.rack_street_address
          );
        },
        filter: nearbyMarkers
      }).addTo(mymap);
    });
  });

  mymap.on('locationerror', function(e) {
    console.log(e);
    alert('the location was not found');
  });
  
  
  






  //////////////////////////////////////////

  // button filters map based on text input

  leafletSearch = L.Control.openCageSearch({
    key: 'd7f2af1decc940898adba6b32b6a2e7d',
    limit: 10,
    position: 'topleft'
  }).addTo(mymap);

});


// end of document ready function