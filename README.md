# lockmybike
creating the Lock My Bike project 

----- V 1.0 ----

Boston February 22nd, 2020
Hi, welcome to my lockmybike project which I created as a capstone for my digital media design degree.

Lock My Bike is a website with the goal to display available bike docks installed in your city.
Users will be able to filter the map based on the address they provide, but also simply find racks near them, thanks to the GPS inside most of modern cellphones or geolocation of clients'computers/tablets.
The data on installed racks have been kindly provided by the Boston Transportation Department, or BTD (https://www.boston.gov/departments/transportation)
Users will be able to submit forms where they can suggest the addition of new bike racks; following a submission review, said data point will be added to the geojson database.

The project relies on geomapping visuals powered by Leaflet (https://leafletjs.com/); a Javascript library that enables developers to display markers/shapes on a map.

Thanks to the leaflet locate method, paired with the Leaflet-KNN plugin (https://github.com/mapbox/leaflet-knn), I was able to return an index of k-nearest neigboring bike racks compared to the current user's location.

Lastly, the Liedman's Leaflet routing machine plugin enabled the addition of a routing control, fully responsive, to give users both direction from one marker to an address searched with the OpenCage geocoder; and from one of the nearest markers to the user's current location.

For the styling of this work I used Bootstrap (https://getbootstrap.com/), which thorough documentation makes styling decision a creative endeavor, and not a taxing coding one.

Another technology I am thankful for is Jquery (https://jquery.com/), which makes Javascript work a lot easier.

---------------
