//Create the map object with options
var map = L.map("map-id",{
    //center:[37.09,-95.71],
    center:[37.09,-95.71],
    zoom:5
});

//create title layer that will be the background map
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom:18,
    id: "mapbox.streets",
    accessToken: API_KEY
  }).addTo(map);

//Store API endpoint inside link
var link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

// Grabbing GeoJSON data
d3.json(link, function(data) {
    // Creating a GeoJSON layer with the retrieved data
    L.geoJson(data).addTo(map);
  });
  
// Loop through the cities array and create one marker for each city object
for (var i = 0; i < features.length; i++) {

    // Conditionals for countries points
    var color = "";
    if (features.properties[i].mag > 0) {
      color = '#800026';
    }
    else if (features.properties[i].mag > 1) {
      color = '#BD0026';
    }
    else if (features.properties[i].mag > 2) {
      color = '#E31A1C';
    }
    else if (features.properties[i].mag > 3) {
      color = '#FEB24C';
    }
    else if (features.properties[i].mag > 4) {
      color = '#FED976';
    }
    else {
      color = '#FF0000';
    }
  
    // Add circles to map
    L.circle(features[i].features.properties.geometry.coordinates[1],features.properties.geometry.coordinates[0], {
      fillOpacity: 0.75,
      color: "white",
      fillColor: color,
      // Adjust radius
      radius: features.properties[i].mag * 1500
    }).bindPopup("<h1>" + features.properties[i].title + "</h1> <hr> <h3>Magnitude: " + features.properties[i].mag + "</h3>").addTo(myMap);
  }
  

var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 1, 2, 3, 4, 5, 5],
        labels = [];

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + color(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }

    return div;
};

legend.addTo(map);




