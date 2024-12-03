import { MarkerProps } from "./MyTypes";
import { getIconForCategory } from "./utils/icons";

const generateMarkers = (markers: MarkerProps[]) => {
  let markersString = '';

  if (markers.length > 0) {
    markers.forEach((element, i) => {
      const iconUrl = getIconForCategory(element.category);
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

const addMarkerCenter = (markerCenter: boolean) =>
  markerCenter
    ? `
    var center = map.getCenter(); // Get center map
    var markerX = L.marker([center.lat, center.lng]).addTo(map);
    markerX.bindPopup('This Center').openPopup();
  `
    : ``;

const fitBounds = (locations: MarkerProps[]) => {
  if (locations.length > 0) {
    const bounds: [number, number][] = locations.map((location) => [
      location.latitude,
      location.longitude,
    ]);

    return `
      map.fitBounds(${JSON.stringify(bounds)});
    `;
  } else {
    return ``;
  }
};

export const MyScripts = {
  generateMarkers,
  addMarkerCenter,
  fitBounds,
};
