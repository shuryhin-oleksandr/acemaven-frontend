import React, { ReactElement } from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";

interface Interface {
  isMarkerShown?: boolean;
  googleMapURL: string;
  loadingElement?: ReactElement;
  containerElement: ReactElement;
  mapElement: ReactElement;
}

const MapComponent: React.FC<Interface> = (props) => (
  <GoogleMap
    options={{
      disableDefaultUI: true,
    }}
    defaultZoom={8}
    defaultCenter={{ lat: -34.397, lng: 150.644 }}
  >
    {props.isMarkerShown && (
      <Marker position={{ lat: -34.397, lng: 150.644 }} />
    )}
  </GoogleMap>
);

export default withScriptjs(withGoogleMap(MapComponent));
