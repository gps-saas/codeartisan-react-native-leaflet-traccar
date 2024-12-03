import { useEffect, useState } from "react";
import { MyCSS } from "./MyCSS";
import { MarkerProps, MyHTMLProps } from "./MyTypes";
import { MyScripts } from "./MyScripts";

export const MyHTML = ({
  debug,
  region,
  markers,
  markerCenter,
  zoom,
  fitBound,
  showMarkerClicked,
  showAttribution,
  mapOptions = {},
}: MyHTMLProps) => {
  const [markersScript, setMarkerScript] = useState("");
  const [addMarkerCenterScript, setAddMarkerCenterScript] = useState("");
  const [fitBoundsScript, setFitBoundsScript] = useState("");

  useEffect(() => {
    if (debug) {
      console.log("render leaflet map");
    }

    createScript();
  }, [markers, region, markerCenter]);

  const createScript = () => {
    const markersScript = markers.length > 0 ? MyScripts.generateMarkers(markers) : "";
    setMarkerScript(markersScript);

    const addMarkerCenterScript = markers.length > 0 ? MyScripts.addMarkerCenter(markerCenter || false) : "";
    setAddMarkerCenterScript(addMarkerCenterScript);

    const fitBoundsScript = markers.length > 0 ? MyScripts.fitBounds(markers) : "";
    setFitBoundsScript(fitBoundsScript);
  };

  // Convert `mapOptions` to a valid JavaScript object string
  const mapOptionsString = JSON.stringify({
    attributionControl: showAttribution,
    zoomControl: false, // Default to hidden zoom buttons; override via `mapOptions`
    ...mapOptions, // Merge user-defined options
  });

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Leaflet Map</title>
      <link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" />
      <style>
        ${MyCSS}
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
