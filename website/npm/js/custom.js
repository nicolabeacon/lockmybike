// custom JS code
var mymap; 
var lyrOSM;
var lyrLocate;
var sidebar;
var leafletSearch;
var rackIcon;
var herenow;
var content;
var matchLi;



$(document).ready(function() {


  // Instantiate a map layer thanks to Open Street Map

  mymap = L.map('map', {
    maxZoom: 20,
    minZoom: 6,
    zoomControl: false
  }).setView([42.358918, -71.063828], 13);
  lyrOSM = L.tileLayer(
    'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox/streets-v11',
      accessToken: 'pk.eyJ1IjoibmljZW9sYTg4IiwiYSI6ImNrNmZpMTcwczF6Z24zbm4zeXhnbGZocngifQ.VBUYpku7fhmot35fpOp8fQ',
    }
  ).addTo(mymap);

  // add zoom control button where I want it to go

  L.control.zoom({
    position: 'bottomleft'
  }).addTo(mymap);

  // button filters map based on text input

  leafletSearch = L.Control.openCageSearch({
    key: 'd7f2af1decc940898adba6b32b6a2e7d',
    limit: 10,
    placeholder: 'Enter an address or zipcode',
    collapsed: false,
    position: 'topleft',
  }).addTo(mymap);

  // create a sidebar

  sidebar = L.control.sidebar('sidebar', {
    position: 'left',
  });

  mymap.addControl(sidebar);

  // add a custom button to toggle sidebar

  L.easyButton(
    'fa-arrows-alt-h',
    function() {
      if (sidebar.isVisible()) {
        sidebar.hide();
      } else {
        sidebar.show();
      }
    },
    'toggle the sidebar'
  ).addTo(mymap);

  // enable sidebar closing when on mobile device

  $($('#btnCloseMobileSidebar')).click(function() {
    sidebar.hide();
  });

  // add a location button

  L.easyButton(
    'fas fa-crosshairs',
    function() {
      mymap.locate();
    },
    'look for stations near you'
  ).addTo(mymap);

  
  // create markers icons to reuse
  
rackIcon = L.icon({
          iconUrl: '../images/bikeRing.png',
          iconSize: [70, 39.2],
          popupAnchor: [7, -9],
        });
         

  // success, a location is found

  mymap.on('locationfound', function(e) {

  // look for layers, if they exist - clear them and then add a new one

    if ((mymap.hasLayer(lyrLocate) && mymap.hasLayer(lyrFiltered)) || (mymap.hasLayer(lyrLocate) || mymap.hasLayer(lyrFiltered))) {

        mymap.eachLayer(function(layer) {
        mymap.removeLayer(layer);
      });

      $("#listOfData li").remove();
      
      
        lyrOSM = L.tileLayer(
    'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox/streets-v11',
      accessToken: 'pk.eyJ1IjoibmljZW9sYTg4IiwiYSI6ImNrNmZpMTcwczF6Z24zbm4zeXhnbGZocngifQ.VBUYpku7fhmot35fpOp8fQ',
    }).addTo(mymap);
        
 // display bike icon on my current location       
        
           herenow = L.marker([e.latitude, e.longitude], {
             icon: L.icon({
               iconUrl: '../images/iconBike.png',
               iconSize: [30, 30],
               popupAnchor: [7, -9],
               riseOnHover: true,
             })
           }).addTo(mymap).bindPopup('You are here!').openPopup();
      
// load markers from my geojson file
      $.getJSON('../bikedata.geojson', function(data) {
        const nearestResults = leafletKnn(L.geoJson(data)).nearest(e.latlng, 10);
   
        lyrLocate = L.geoJson(data, {
          
        
          pointToLayer: function(feature, latlng) {
            return L.marker(latlng, {
              icon: rackIcon,
              riseOnHover: true,
            });
          },
          onEachFeature: function(feature, layer) {
            layer.bindPopup(
              'Address:' + '&nbsp' + feature.properties.rack_street_address
            );
            $("#listOfData").append("<li class='list-group-item'>" + "at the address" + "&nbsp" + feature.properties.rack_street_address + "&nbsp" + " you will find" + "&nbsp" + feature.properties.qty + "&nbsp" + "spot/s" +  "</li>");
            sidebar.show();
          },
          filter: nearbyMarkers,
        }).addTo(mymap);
        mymap.fitBounds(lyrLocate.getBounds());
        mymap.setZoom(13);
        
// assign an id to every li shown in the sidebar    
        if ($("#listOfData li")) {
   $("#listOfData li").each(function(i) {
     $(this).attr('id',i + 1);
   });
 } // end of if statement
 
            $("#listOfData li").click(function(){
           content = $(this).text();
           matchLi = content.match(/(?<=address)(.*)(?=you will)/);
          alert('the li with id:' + " " + $(this).attr('id') + " " +  'has been pressed');
     
});
 
        function nearbyMarkers(feature) {
          var found = false;
          for (let i = 0; i < nearestResults.length; i++) {
            const nearestResult = nearestResults[i];

            if (found) return true;

            found =
              nearestResult.lat == feature.properties.lat &&
              nearestResult.lon == feature.properties.long;
          }
        } // end of filtering function narbyMarkers
      }); // end of loading data to the map function
    } else {
      
 // display bike icon on my current location          
      
           herenow = L.marker([e.latitude, e.longitude], {
             icon: L.icon({
               iconUrl: '../images/iconBike.png',
               iconSize: [30, 30],
               popupAnchor: [7, -9],
               riseOnHover: true,
             })
           }).addTo(mymap).bindPopup('You are here!').openPopup();
      
      $.getJSON('../bikedata.geojson', function(data) {
        const nearestResults = leafletKnn(L.geoJson(data)).nearest(e.latlng, 10);
   

        lyrLocate = L.geoJson(data, {
          pointToLayer: function(feature, latlng) {
            return L.marker(latlng, {
              icon: rackIcon,
              riseOnHover: true,
            });
          },
          onEachFeature: function(feature, layer) {
            layer.bindPopup(
              'Address:' + '&nbsp' + feature.properties.rack_street_address
            );
            $("#listOfData").append("<li class='list-group-item'>" + "at the address" + "&nbsp" + feature.properties.rack_street_address + "&nbsp" + " you will find" + "&nbsp" + feature.properties.qty + "&nbsp" + "spot/s" + "</li>");
            sidebar.show();
          },
          filter: nearbyMarkers,
        }).addTo(mymap);
        mymap.fitBounds(lyrLocate.getBounds());
        mymap.setZoom(13);
        
   // assign an id to every li shown in the sidebar    
  if ($("#listOfData li")) {
   $("#listOfData li").each(function(i) {
     $(this).attr('id',i + 1);
   });
 } // end of if statement
 
           $("#listOfData li").click(function(){
           content = $(this).text();
           matchLi = content.match(/(?<=address)(.*)(?=you will)/);
          alert('the li with id:' + " " + $(this).attr('latitude') + " " +  'has been pressed');

});

        function nearbyMarkers(feature) {
          var found = false;
          for (let i = 0; i < nearestResults.length; i++) {
            const nearestResult = nearestResults[i];

            if (found) return true;

            found =
              nearestResult.lat == feature.properties.lat &&
              nearestResult.lon == feature.properties.long;
          }
        } // end of filtering function narbyMarkers
      }); // end of loading data to the map function
    } // end of else statement, no prior layer was found
  }); // end of location found
  

  // handle a location error

  mymap.on('locationerror', function(e) {
    alert('the location was not found');
  });


}); // end of document ready function
