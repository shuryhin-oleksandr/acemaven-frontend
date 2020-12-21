import React, { ReactElement } from "react";
import { GoogleMap, Marker, Polyline, withGoogleMap } from "react-google-maps";
import { polylineIcons } from "../../../../../_BLL/helpers/tracker/GetIconsForPolylineGoogleMap";

type PropsType = {
  isMarkerShown?: boolean;
  loadingElement?: ReactElement;
  containerElement: ReactElement;
  mapElement: ReactElement;
};

const BillingMapComponent: React.FC<PropsType> = ({
  isMarkerShown,
  ...props
}) => (
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
    defaultCenter={{ lat: -33.865143, lng: 151.2099 }}
  >
    {isMarkerShown && <Marker position={{ lat: -34.397, lng: 150.644 }} />}
    <Polyline
      path={[
        { lat: -33.865143, lng: 151.2099 },
        { lat: -36.848461, lng: 174.763336 },
      ]}
      options={{
        geodesic: false,
        strokeColor: "rgba(255,255,255,0.09)",
        strokeOpacity: 1.0,
        strokeWeight: 2,
        icons: polylineIcons({
          start: { lat: -34.397, lng: 150.644 },
          end: { lat: 23.910225, lng: 90.041885 },
          now: { lat: 53.910225, lng: 27.041885 },
          typeTransportation: "See",
          processType: "Import",
        }),
      }}
    />
  </GoogleMap>
);

export default withGoogleMap(BillingMapComponent);
