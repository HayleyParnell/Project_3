let url = "http://127.0.0.1:5000/data";

function createMap(fireMarkers, brightestFireMarker) {
    // Create the tile layer 
    let streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });

    // Create the map object
    let myMap = L.map("map", {
        center: [39.106667, -94.676392],
        zoom: 5,
        layers: [streetmap, fireMarkers, brightestFireMarker]
    });

    // Create the layer control and pass the base and overlay maps
    let baseMaps = {
        "Street Map": streetmap
    };
    let overlayMaps = {
        "Fires": fireMarkers,
        "Brightest Fire": brightestFireMarker
    };
    L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
    }).addTo(myMap);
};

function brightnessFire(brightness) {
    if (brightness > 0 && brightness <= 250) {
        return "lightyellow"
    } else if (brightness > 250 && brightness <= 300) {
        return "yellow"
    } else if (brightness > 300 && brightness <= 325) {
        return "orange"
    } else if (brightness > 325 && brightness < 350) {
        return "red"
    } else if (brightness > 350 && brightness <= 375) {
        return "darkred"
    } else {
        return "black"
    }
};

function fireMarkers(data) {
    let allFireMarkers = [];
    let brightestFire;
    let brightestFireMarker;

    for (let i = 0; i < data.length; i++) {
        let response = data[i];
        let lat_data = response[0];
        let lon_data = response[1];
        let fireBrightness = response[2];
        let startDate = response[3];
        let startTime = response[4];
        let satelliteID = response[5];
        let confidenceLvl = response[6];

        if (fireBrightness >= 500) {
            let markerColor = brightnessFire(fireBrightness);
            let markerRadius = 8;

            let fireMarker = L.circleMarker([lat_data, lon_data], {
                color: markerColor,
                fillColor: markerColor,
                fillOpacity: 0.75,
                radius: markerRadius,
                weight: 1
            }).bindPopup("<h3>Brightness: " + fireBrightness + "</h3><h3>Confidence level: " + confidenceLvl + "</h3>" +
                "<h3>Start Date: " + startDate + "</h3><h3>Start Time: " + startTime + "</h3><h3>Satellite: " + satelliteID + "</h3>");

            allFireMarkers.push(fireMarker);

            // Update brightest fire
            if (!brightestFire || fireBrightness > brightestFire[2]) {
                brightestFire = response;
                brightestFireMarker = fireMarker;
            }
        }
    }

    // Highlight brightest fire marker
    if (brightestFireMarker) {
        brightestFireMarker.setStyle({
            radius: 20, // Increase size
            weight: 2, // Increase border thickness
            color: 'black', // Change border color
            fillColor: 'gold', // Change fill color
            fillOpacity: 1 // Increase opacity
        });
    }

    let fireMarkersLayer = L.layerGroup(allFireMarkers);
    createMap(fireMarkersLayer, brightestFireMarker);
};

d3.json(url).then(fireMarkers);






