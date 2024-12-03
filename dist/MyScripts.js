"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyScripts = void 0;
const generateMarkers = (markers) => {
    var markersString = '';
    var iconScript = '';
    var title = '';
    if (markers.length > 0) {
        markers.forEach((element, i) => {
            iconScript = element.iconUrl
                ? (`L.icon({ iconUrl: '${element.iconUrl}', iconSize: [32, 32], iconAnchor: [16, 32], popupAnchor: [0, -32] })`)
                : (`L.icon({ iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png', iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34] })`);
            title = (element.title ? `<b>${element.title}</b>` : ``);
            markersString += (`\n\n marker_${i} = L.marker([${element.latitude}, ${element.longitude}], { icon: ${iconScript} })
            .addTo(map)
            .bindPopup('<div style="text-align: center;">${title}${element.description ? '<br>' + element.description : ''}</div>');`);
        });
    }
    return markersString;
};
const addMarkerCenter = (markerCenter) => markerCenter ? (`
    var center = map.getCenter(); // Get center map
    var markerX = L.marker([center.lat, center.lng]).addTo(map);
    markerX.bindPopup('This Center').openPopup();
`) : (``);
const fitBounds = (locations) => {
    if (locations.length > 0) {
        var bounds = [];
        locations.forEach((location) => {
            bounds.push([location.latitude, location.longitude]);
        });
        // STRINGIFY THE BOUNDS
        bounds = JSON.stringify(bounds);
        return (`
         map.fitBounds(${bounds});
        `);
    }
    else {
        return (``);
    }
};
exports.MyScripts = {
    generateMarkers,
    addMarkerCenter,
    fitBounds
};
