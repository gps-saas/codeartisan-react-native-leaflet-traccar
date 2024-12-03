"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyScripts = void 0;
const icons_1 = require("./utils/icons");
const generateMarkers = (markers) => {
    let markersString = '';
    if (markers.length > 0) {
        markers.forEach((element, i) => {
            const iconUrl = (0, icons_1.getIconForCategory)(element.category);
            const rotation = element.heading || 0;
            const title = element.title ? `<b>${element.title}</b>` : '';
            markersString += `
        L.marker([${element.latitude}, ${element.longitude}], {
          icon: L.divIcon({
            className: "custom-icon",
            html: \`
              <img
                src="${iconUrl}"
                style="transform: rotate(${rotation}deg); width: 30px; height: 30px;"
              />
            \`,
            iconSize: [30, 30],
            iconAnchor: [15, 15],
          })
        })
        .addTo(map)
        .bindPopup('<div style="text-align: center;">${title}${element.description ? '<br>' + element.description : ''}</div>');
      `;
        });
    }
    return markersString;
};
const addMarkerCenter = (markerCenter) => markerCenter
    ? `
    var center = map.getCenter(); // Get center map
    var markerX = L.marker([center.lat, center.lng]).addTo(map);
    markerX.bindPopup('This Center').openPopup();
  `
    : ``;
const fitBounds = (locations) => {
    if (locations.length > 0) {
        const bounds = locations.map((location) => [
            location.latitude,
            location.longitude,
        ]);
        return `
      map.fitBounds(${JSON.stringify(bounds)});
    `;
    }
    else {
        return ``;
    }
};
exports.MyScripts = {
    generateMarkers,
    addMarkerCenter,
    fitBounds,
};
