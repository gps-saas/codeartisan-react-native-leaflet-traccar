"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = MapView;
const react_native_1 = require("react-native");
const react_1 = __importStar(require("react"));
const defaultFunction = () => { };
function MapView({ debug = false, markerCenter = false, markers = [], region = { latitude: -6.174929921156404, longitude: 106.8271114327312 }, zoom = 15, fitBound = false, showMarkerClicked = false, mapOnClick = defaultFunction, mapOnMove = defaultFunction, mapOnMoveEnd = defaultFunction }) { const { width, height } = (0, react_native_1.useWindowDimensions)(); const [regionX, setRegionX] = (0, react_1.useState)(region); const [markersX, setMarkersX] = (0, react_1.useState)(markers); const webviewRef = (0, react_1.useRef)(null); (0, react_1.useEffect)(() => { if (JSON.stringify(markers) !== JSON.stringify(markersX))
    setMarkersX(markers); if (region.latitude !== (regionX === null || regionX === void 0 ? void 0 : regionX.latitude) || region.longitude !== (regionX === null || regionX === void 0 ? void 0 : regionX.longitude))
    setRegionX(region); if (debug) {
    console.log("render MapView", new Date());
    console.log("MapView markers before update: ", markersX);
    console.log("MapView markers after update: ", markers);
    console.log("MapView region before update: ", regionX);
    console.log("MapView region after update: ", region);
} window.addEventListener('message', handleOnMessage); return () => window.removeEventListener('message', handleOnMessage); }, [markers, region]); const handleOnMessage = (event) => { if (typeof event.data === 'string') {
    const data = JSON.parse(event.data);
    if (data.event_name === 'mapOnClick' && mapOnClick !== defaultFunction) {
        if (debug) {
            console.log(data.event_name + ": " + JSON.stringify(data));
        }
        mapOnClick(data);
    }
    if (data.event_name === 'mapOnMove' && mapOnMove !== defaultFunction) {
        if (debug) {
            console.log(data.event_name + ": " + JSON.stringify(data));
        }
    }
    if (data.event_name === 'mapOnMoveEnd' && mapOnMoveEnd !== defaultFunction) {
        if (debug) {
            console.log(data.event_name + ": " + JSON.stringify(data));
        }
        mapOnMoveEnd(data);
    }
} }; let title = ''; const markersScript = markersX.length > 0 ? markersX.map((element, i) => { const iconScript = element.iconUrl ? (`L.icon({iconUrl:'${element.iconUrl}',iconSize:[32,32],iconAnchor:[16,32],popupAnchor:[0,-32]})`) : (`L.icon({iconUrl:'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',iconSize:[25,41],iconAnchor:[12,41],popupAnchor:[1,-34]})`); title = (element.title ? `<b>${element.title}</b>` : ''); return (`marker_${i}=L.marker([${element.latitude},${element.longitude}],{icon:${iconScript}}).addTo(map).bindPopup('<div style="text-align: center;">${title}${element.description ? '<br>' + element.description : ''}</div>');`); }).join('\n') : ''; const injectedJavaScript = `var initialMarker;var marker_0;var clickMarker;var data=null;var map;if(${markersX.length > 0}){map=L.map('map').setView([${region.latitude},${region.longitude}],${zoom});moveMarker();}else{map=L.map('map').setView([${region.latitude},${region.longitude}],${zoom});}${markersScript}const tileLayer=L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19,attribution:'© OSM | @<a target="_blank" href="https://netizen-teknologi.github.io/react-native-maps-leaflet/">Netizen Teknologi</a>'}).addTo(map);tileLayer.on('load',()=>{});map.on('move',mapOnMove);map.on('click',mapOnClick);map.on('mousemove',mapOnMouseMove);map.on('moveend',mapOnMoveEnd);function mapOnMouseMove(e){const mouseLat=e.latlng.lat;const mouseLng=e.latlng.lng;let data={event_name:'mapOnMouseMove',latitude:mouseLat,longitude:mouseLng}}function mapOnClick(e){var lat=e.latlng.lat;var lng=e.latlng.lng;data={event_name:'mapOnClick',latitude:lat,longitude:lng};if(clickMarker){map.removeLayer(clickMarker);}if(${showMarkerClicked}){clickMarker=L.marker([lat,lng],{icon:L.icon({iconUrl:'https://cdn-icons-png.flaticon.com/512/3425/3425073.png',iconSize:[50,50],iconAnchor:[25,25],popupAnchor:[0,-25]})}).addTo(map).bindPopup('('+lat.toFixed(6)+', '+lng.toFixed(6)+')').openPopup();}else{clickMarker=null}window.parent.postMessage(JSON.stringify(data),'*');}function mapOnMove(){var center=map.getCenter();var zoom_level=map.getZoom();var bounds=map.getBounds();var south_west=bounds.getSouthWest();var north_east=bounds.getNorthEast();center={latitude:center.lat,longitude:center.lng};data={event_name:'mapOnMove',center,zoom_level,bounds,south_west,north_east};window.parent.postMessage(JSON.stringify(data),'*');}function mapOnMoveEnd(){var center=map.getCenter();var zoom_level=map.getZoom();var bounds=map.getBounds();var south_west=bounds.getSouthWest();var north_east=bounds.getNorthEast();center={latitude:center.lat,longitude:center.lng};data={event_name:'mapOnMoveEnd',center,zoom_level,bounds,south_west,north_east};window.parent.postMessage(JSON.stringify(data),'*');}function moveMarker(){map.flyTo([${region.latitude},${region.latitude}],map.getZoom());}function showCoordinates(){const center=map.getCenter();const lat=center.lat.toFixed(4);const lng=center.lng.toFixed(4);alert('Center: '+lat+' , '+lng);}`; const stylesX = react_native_1.StyleSheet.create({ webView: { flex: 1, width, height } }); return (react_1.default.createElement("iframe", { srcDoc: `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Leaflet Map</title><link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css"/><style>body,html{margin:0;padding:0;height:100%;width:100%;}#map{height:100%;width:100%;}</style></head><body><div id="map"></div><script src="https://unpkg.com/leaflet/dist/leaflet.js"></script><script>${injectedJavaScript}</script></body></html>`, style: stylesX.webView })); }
