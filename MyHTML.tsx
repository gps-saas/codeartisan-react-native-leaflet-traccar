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
  
      const addMarkerCenterScript = markers.length > 0 ? MyScripts.addMarkerCenter(markerCenter) : "";
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
        <div id="footer"></div>
        <script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
        <script>
          var map;
          var clickMarker;
          var data = null;
  
          // Initialize the Leaflet map with dynamic options
          map = L.map('map', ${mapOptionsString}).setView([${region.latitude}, ${region.longitude}], ${zoom});
  
          ${markersScript}
          ${fitBoundsScript}
          ${addMarkerCenterScript}
  
          // Add Layer OpenStreetMap
          const tileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '© OSM | @<a target="_blank" href="https://netizen-teknologi.github.io/react-native-maps-leaflet/">Netizen Teknologi</a>'
          }).addTo(map);
  
          // Add event listeners
          map.on('move', mapOnMove);
          map.on('click', mapOnClick);
          map.on('mousemove', mapOnMouseMove);
          map.on('moveend', mapOnMoveEnd);
  
          function mapOnClick(e) {
            var lat = e.latlng.lat;
            var lng = e.latlng.lng;
            data = {
              event_name: 'mapOnClick',
              latitude: lat,
              longitude: lng
            };
  
            // Remove previous clicked marker
            if (clickMarker) {
              map.removeLayer(clickMarker);
            }
  
            // Add clicked marker if enabled
            if (${showMarkerClicked}) {
              clickMarker = L.marker([lat, lng]).addTo(map).bindPopup('(' + lat.toFixed(6) + ', ' + lng.toFixed(6) + ')').openPopup();
            }
  
            window.ReactNativeWebView.postMessage(JSON.stringify(data));
          }
  
          function mapOnMove() {
            var center = map.getCenter();
            var zoom_level = map.getZoom();
            var bounds = map.getBounds();
            var south_west = bounds.getSouthWest();
            var north_east = bounds.getNorthEast();
  
            center = { latitude: center.lat, longitude: center.lng };
  
            data = {
              event_name: 'mapOnMove',
              center,
              zoom_level,
              bounds,
              south_west,
              north_east,
            };
  
            window.ReactNativeWebView.postMessage(JSON.stringify(data));
          }
  
          function mapOnMoveEnd() {
            var center = map.getCenter();
            var zoom_level = map.getZoom();
            var bounds = map.getBounds();
            var south_west = bounds.getSouthWest();
            var north_east = bounds.getNorthEast();
  
            center = { latitude: center.lat, longitude: center.lng };
  
            data = {
              event_name: 'mapOnMoveEnd',
              center,
              zoom_level,
              bounds,
              south_west,
              north_east,
            };
  
            window.ReactNativeWebView.postMessage(JSON.stringify(data));
          }
        </script>
      </body>
      </html>
    `;
  };
  