"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyHTML = void 0;
const react_1 = require("react");
const MyCSS_1 = require("./MyCSS");
const MyScripts_1 = require("./MyScripts");
const MyHTML = ({ debug, region, markers, markerCenter, zoom, fitBound, showMarkerClicked, showAttribution, mapOptions = {}, }) => {
    const [markersScript, setMarkerScript] = (0, react_1.useState)("");
    const [addMarkerCenterScript, setAddMarkerCenterScript] = (0, react_1.useState)("");
    const [fitBoundsScript, setFitBoundsScript] = (0, react_1.useState)("");
    (0, react_1.useEffect)(() => {
        if (debug) {
            console.log("render leaflet map");
        }
        createScript();
    }, [markers, region, markerCenter]);
    const createScript = () => {
        const markersScript = markers.length > 0 ? MyScripts_1.MyScripts.generateMarkers(markers) : "";
        setMarkerScript(markersScript);
        const addMarkerCenterScript = markers.length > 0 ? MyScripts_1.MyScripts.addMarkerCenter(markerCenter || false) : "";
        setAddMarkerCenterScript(addMarkerCenterScript);
        const fitBoundsScript = markers.length > 0 ? MyScripts_1.MyScripts.fitBounds(markers) : "";
        setFitBoundsScript(fitBoundsScript);
    };
    // Convert `mapOptions` to a valid JavaScript object string
    const mapOptionsString = JSON.stringify(Object.assign({ attributionControl: showAttribution, zoomControl: false }, mapOptions));
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Leaflet Map</title>
      <link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" />
      <style>
        ${MyCSS_1.MyCSS}
      </style>
    </head>
    <body>
      <div id="map"></div>
      <script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
      <script>
        var map = L.map('map', ${mapOptionsString}).setView([${region.latitude}, ${region.longitude}], ${zoom});
        ${markersScript}
        ${fitBoundsScript}
        ${addMarkerCenterScript}

        // Add Layer OpenStreetMap
        const tileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
          attribution: '© OSM | @<a target="_blank" href="https://github.com/gps-saas/codeartisan-react-native-leaflet-traccar">CodeArtisan</a>'
        }).addTo(map);

        // Add event listeners
        map.on('moveend', function () {
          const center = map.getCenter();
          window.ReactNativeWebView.postMessage(JSON.stringify({ event_name: "mapMoveEnd", center }));
        });
      </script>
    </body>
    </html>
  `;
};
exports.MyHTML = MyHTML;
