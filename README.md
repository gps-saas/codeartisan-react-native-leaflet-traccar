# codeArtisan-react-native-leaflet-traccar

Codeartisan React Native Leaflet Traccar React is an improvement of @netizen-teknologi/react-native-maps-leaflet which brings powerful, interactive maps to your React Native Traccar Custom app using Leaflet. Add custom markers, popups, and tile layers. Perfect for real estate, travel, delivery tracking, and logistics. Compatible with iOS and Android, it provides a seamless and dynamic map experience.

For support:

Whatsapp: +5511934251920 <br />
Email: don@codeartisan.cloud

# CodeArtisan React Native Leaflet Traccar 🌍

<!-- [![npm version](https://img.shields.io/npm/v/@netizen-teknologi/react-native-maps-leaflet)](https://www.npmjs.com/package/@gps-saas/codeartisan-react-native-leaflet-traccar)
[![GitHub stars](https://img.shields.io/github/stars/@netizen-teknologi/react-native-maps-leaflet)](https://github.com/gps-saas/codeartisan-react-native-leaflet-traccar/stargazers)
[![Contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.?style=flat)](https://github.com/gps-saas/codeartisan-react-native-leaflet-traccar/issues)
[![Downloads](https://img.shields.io/npm/dt/@netizen-teknologi/react-native-maps-leaflet.)](https://www.npmjs.com/package/@gps-saas/codeartisan-react-native-leaflet-traccar) -->

**CodeArtisan React Native Leaflet Traccar** is an improvement of @netizen-teknologi/react-native-maps-leaflet which brings the power of the popular [Leaflet](https://leafletjs.com/) JavaScript library to React Native. Whether you're building a delivery app, a location-based service, or a data visualization tool, you can easily add interactive maps with custom markers, tile layers, and more!

## Installation 📦

Start a new expo project

```bash
npx create-expo-app@latest mobile-tracker --template blank
```

Install **CodeArtisan React Native Leaflet Traccar**, simply run the following command:

```bash
npm install @gps-saas/codeartisan-react-native-leaflet-traccar
```

install dependencies

```bash
npx expo install react-native-webview@13.8.6
npx expo install expo-status-bar
```

Sample code to load the map...

```javascript
import { SafeAreaView } from "react-native";
import { MapView } from "@gps-saas/codeartisan-react-native-leaflet-traccar";
import { StatusBar } from "expo-status-bar";

export default function App() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <MapView
        style={{
          width: "100%",
          height: "100%",
        }}
        mapOptions={{
          zoomControl: false,
        }}
        mapOnClick={(data) => {
          console.log("map on click", data);
        }}
        showMarkerClicked
      />
      <StatusBar style="dark" />
    </SafeAreaView>
  );
}
```

As we are using native modules, we need to build and install a development build, so:

```bash
rm -rf node_modules ios android
npx expo prebuild
npx eas build --profile development --platform android
yarn start
```

Create a resources folder and move your icons to that folder and load this icons on your app

```javascript
import bicycle from "./resources/newIcons/bicycle.png";
import boat from "./resources/newIcons/boat.png";
import bus from "./resources/newIcons/bus.png";
import car from "./resources/newIcons/car.png";
import camper from "./resources/newIcons/camper.png";
import crane from "./resources/newIcons/crane.png";
import helicopter from "./resources/newIcons/helicopter.png";
import motorcycle from "./resources/newIcons/motorcycle.png";
import offroad from "./resources/newIcons/offroad.png";
import person from "./resources/newIcons/person.png";
import pickup from "./resources/newIcons/pickup.png";
import plane from "./resources/newIcons/plane.png";
import scooter from "./resources/newIcons/scooter.png";
import ship from "./resources/newIcons/ship.png";
import tractor from "./resources/newIcons/tractor.png";
import train from "./resources/newIcons/train.png";
import tram from "./resources/newIcons/tram.png";
import trolleybus from "./resources/newIcons/trolleybus.png";
import truck from "./resources/newIcons/truck.png";
import van from "./resources/newIcons/van.png";
import default from "./resources/newIcons/default.png";
import animal from "./resources/newIcons/animal.png";
```

Install that apk on your android device and point to your expo server.

## Changelog

1. Add Support for web browser;

## Features 🎯

React Native Maps Leaflet offers a range of features to help developers create powerful mapping applications with ease:

1. **Interactive Maps**: Utilize Leaflet's interactivity to add maps that support panning, zooming, and dragging.
2. **Custom Markers**: Add custom markers to represent locations on the map with your own icons or images.
3. **Popups and Tooltips**: Attach popups or tooltips to your markers to display additional information on user interaction.
4. **Cross-Platform Compatibility**: Fully compatible with both Web, iOS, and Android devices.
5. **Map Event Handlers**: Capture various events like `onClick`, `onMove`, and `onMoveEnd` to implement custom interactions.
6. **Lightweight and Performant**: Designed to be fast and responsive, ensuring a smooth user experience even on lower-end devices.
7. **Add custom params**: As Traccar is a very rich application, in most cases you'll need to customize leaflet.

These features make CodeArtisan React Native Leaflet Traccar a powerful tool for building interactive mapping applications tailored to your specific needs.
