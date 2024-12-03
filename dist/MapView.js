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
}, zoom = 15, fitBound = false, showMarkerClicked = false, showAttribution = true, mapOnMoveEnd = defaultFunction, }) {
    const { width, height } = (0, react_native_1.useWindowDimensions)();
    const [regionX, setRegionX] = (0, react_1.useState)(region);
    const [markersX, setMarkersX] = (0, react_1.useState)(markers);
    (0, react_1.useEffect)(() => {
        if (JSON.stringify(markers) !== JSON.stringify(markersX)) {
            setMarkersX(markers);
        }
        if (region.latitude !== (regionX === null || regionX === void 0 ? void 0 : regionX.latitude) ||
            region.longitude !== (regionX === null || regionX === void 0 ? void 0 : regionX.longitude)) {
            setRegionX(region);
        }
    }, [markers, region]);
    const html = (0, MyHTML_1.MyHTML)({
        region: regionX,
        markers: markersX,
        markerCenter,
        zoom,
        fitBound,
        showMarkerClicked,
        showAttribution,
    });
    return (react_1.default.createElement(react_native_webview_1.WebView, { source: { html }, style: { width, height }, javaScriptEnabled: true, onMessage: (event) => {
            const data = JSON.parse(event.nativeEvent.data);
            if (data.event_name === "mapMoveEnd" &&
                mapOnMoveEnd !== defaultFunction) {
                mapOnMoveEnd(data);
            }
        } }));
}
