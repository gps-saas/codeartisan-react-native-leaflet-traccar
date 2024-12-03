export interface MarkerProps {
    latitude: number;
    longitude: number;
    title?: string;
    description?: string;
    iconUrl?: string;
}
export interface RegionProps {
    latitude: number;
    longitude: number;
}
export interface MapViewProps {
    debug?: boolean;
    markerCenter?: boolean;
    markers?: MarkerProps[];
    region?: RegionProps;
    zoom?: number;
    fitBound?: boolean;
    showMarkerClicked?: boolean;
    showAttribution?: boolean;
    mapOnClick?: (data: any) => void;
    mapOnMove?: (data: any) => void;
    mapOnMoveEnd?: (data: any) => void;
}
export interface MyHTMLProps {
    debug?: boolean;
    region: RegionProps;
    markers: MarkerProps[];
    markerCenter: boolean;
    zoom: number;
    fitBound: boolean;
    showMarkerClicked?: boolean;
    showAttribution?: boolean;
    mapOptions?: Record<string, any>;
}
