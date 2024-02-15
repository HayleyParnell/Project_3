let link ="http://127.0.0.1:5000/data"

function createMap(lowC,mediumC,highC){

    // Create the tile layer 
    let streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });

    // Create an object to hold the base map
    let baseMap = {
        View : streetmap
    };

    // Create the overlay map object
    let overlayMaps = {
        "0%-50% Confidence": lowC,
        "50%-74% Confidence": mediumC,
        "+75% Confidence": highC
    };

    // Create the map object
    let myMap = L.map("map", {
        center: [39.106667,-94.676392],
        zoom: 5,
        layers: [streetmap,lowC,mediumC,highC]
    });


    // Create the layer control and pass the base and overlay maps
    L.control.layers(baseMap, overlayMaps, {
        collapsed: false
    }).addTo(myMap);
};

function init() {
  let year = d3.select("#selDataset")
  // Retrieve JSON data
  d3.json(link).then(function(yearlyFires) {
  let years = yearlyFires.year;
  for (let i =0; i < years.length; i++) {
    selector.append("option").text(years[i]).property("value", years[i]);
  }
  console.log(yearlyFires);

  let firstSubject = years[0];

  info(firstSubject);
  charts(firstSubject);
  })
}

init();

// // Adding the tile layer
// L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
// }).addTo(myMap);

// let url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/15-Mapping-Web/Water_Hydrant_WCORP_070_WA_GDA2020_Public.geojson";

// d3.json(url).then(function(response) {

//   //console.log(response);
//   features = response.features;

//   //console.log(features);

//   // Comment this line in to render all 80,000 markers
//   // let marker_limit = features.length;
//   let marker_limit = 1000;

//   for (let i = 0; i < marker_limit; i++) {

//     let location = features[i].geometry;
//     if(location){
//       L.marker([location.coordinates[1], location.coordinates[0]]).addTo(myMap);
//     }

//   }

// });
