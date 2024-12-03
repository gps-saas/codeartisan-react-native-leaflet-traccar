import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { WebView } from "react-native-webview";
import { MapViewProps, MarkerProps, RegionProps } from "./MyTypes";
import { MyHTML } from "./MyHTML";

const defaultFunction = () => {};

export default function MapView({
  debug = false,
  markerCenter = false,
  markers = [],
  region = {
    latitude: -6.174929921156404,
    longitude: 106.8271114327312,
  },
  zoom = 15,
  fitBound = false,
  showMarkerClicked = false,
  showAttribution = true,
  mapOnMoveEnd = defaultFunction,
}: MapViewProps) {
  const { width, height } = useWindowDimensions();
  const [regionX, setRegionX] = useState<RegionProps>(region);
  const [markersX, setMarkersX] = useState<MarkerProps[]>(markers);

  useEffect(() => {
    if (JSON.stringify(markers) !== JSON.stringify(markersX)) {
      setMarkersX(markers);
    }
    if (
      region.latitude !== regionX?.latitude ||
      region.longitude !== regionX?.longitude
    ) {
      setRegionX(region);
    }
  }, [markers, region]);

  const html = MyHTML({
    region: regionX,
    markers: markersX,
    markerCenter,
    zoom,
    fitBound,
    showMarkerClicked,
    showAttribution,
  });

  return (
    <WebView
      source={{ html }}
      style={{ width, height }}
      javaScriptEnabled={true}
      onMessage={(event) => {
        const data = JSON.parse(event.nativeEvent.data);
        if (
          data.event_name === "mapMoveEnd" &&
          mapOnMoveEnd !== defaultFunction
        ) {
          mapOnMoveEnd(data);
        }
      }}
    />
  );
}
