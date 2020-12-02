import React, { ReactElement } from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  Polyline
} from "react-google-maps";
import { polylineIcons } from "../../../../_BLL/helpers/GetIconsForPolylineGoogleMap";

// import {back-button} from "../../../assets/icons";

interface Interface {
  isMarkerShown?: boolean;
  loadingElement?: ReactElement;
  containerElement: ReactElement;
  mapElement: ReactElement;
}

const MapComponent: React.FC<Interface> = (props) => (
  <GoogleMap
    options={{
      disableDefaultUI: true,
      minZoom: 3,
      restriction: {
        strictBounds: true,
        latLngBounds: {
          north: 85,
          south: -85,
          east: 180,
          west: -180,
        },
      },
    }}
    defaultZoom={8}
    defaultCenter={{ lat: -34.397, lng: 150.644 }}
  >
    {props.isMarkerShown && (
      <Marker position={{ lat: -34.397, lng: 150.644 }} />
    )}
    <Polyline
      path = {[{lat: -34.397, lng: 150.644}, {lat: 23.910225, lng: 90.041885}, {lat: 53.910225, lng: 27.041885}]}
      options={{
        geodesic: true,
        strokeColor: 'rgba(255,255,255,0.09)',
        strokeOpacity: 1.0,
        strokeWeight: 2,
        icons: polylineIcons({
          start: {lat: -34.397, lng: 150.644},
          end: {lat: 23.910225, lng: 90.041885},
          now: {lat: 53.910225, lng: 27.041885},
          typeTransportation: "See",
          processType: "Import"
        })
      }}
    />
  </GoogleMap>
);

export default withGoogleMap(MapComponent);
