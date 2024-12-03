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
const react_native_webview_1 = require("react-native-webview");
const MyHTML_1 = require("./MyHTML");
const defaultFunction = () => { };
function MapView({ debug = false, markerCenter = false, markers = [], region = {
    latitude: -6.174929921156404,
    longitude: 106.8271114327312,
}, zoom = 15, fitBound = false, showMarkerClicked = false, showAttribution = true, mapOnClick = defaultFunction, mapOnMove = defaultFunction, mapOnMoveEnd = defaultFunction, }) {
    const { width, height } = (0, react_native_1.useWindowDimensions)();
    const [regionX, setRegionX] = (0, react_1.useState)(region);
    const [markersX, setMarkersX] = (0, react_1.useState)(markers);
    const webviewRef = (0, react_1.useRef)(null);
    // Mengupdate marker dan region secara bertahap
    (0, react_1.useEffect)(() => {
        if (JSON.stringify(markers) !== JSON.stringify(markersX)) {
            setMarkersX(markers);
        }
        if (region.latitude !== (regionX === null || regionX === void 0 ? void 0 : regionX.latitude) || region.longitude !== (regionX === null || regionX === void 0 ? void 0 : regionX.longitude)) {
            setRegionX(region);
        }
        if (debug) {
            console.log("render MapView", new Date());
            console.log("MapView markers before update: ", markersX);
            console.log("MapView markers after update: ", markers);
            console.log("MapView region before update: ", regionX);
            console.log("MapView region after update: ", region);
        }
    }, [markers, region]);
    // Menghandle pesan yang diterima dari WebView
    const handleOnMessage = (event) => {
        const data = JSON.parse(event.nativeEvent.data);
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
    };
    // HTML SOURCE dari MyHTML
    const html = (0, MyHTML_1.MyHTML)({
        region: regionX,
        markers: markersX,
        markerCenter,
        zoom,
        fitBound,
        showMarkerClicked,
        showAttribution
    });
    const stylesX = react_native_1.StyleSheet.create({
        webView: {
            flex: 1,
            width,
            height,
        },
    });
    return (react_1.default.createElement(react_native_webview_1.WebView, { ref: webviewRef, source: { html }, style: stylesX.webView, javaScriptEnabled: true, onMessage: handleOnMessage }));
}
const styles = react_native_1.StyleSheet.create({
// Definisi style lainnya jika diperlukan
});
