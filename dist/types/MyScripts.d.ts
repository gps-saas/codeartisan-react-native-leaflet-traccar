import { MarkerProps } from "./MyTypes";
export declare const MyScripts: {
    generateMarkers: (markers: MarkerProps[]) => string;
    addMarkerCenter: (markerCenter: boolean) => "" | "\n    var center = map.getCenter(); // Get center map\n    var markerX = L.marker([center.lat, center.lng]).addTo(map);\n    markerX.bindPopup('This Center').openPopup();\n";
    fitBounds: (locations: MarkerProps[]) => string;
};
