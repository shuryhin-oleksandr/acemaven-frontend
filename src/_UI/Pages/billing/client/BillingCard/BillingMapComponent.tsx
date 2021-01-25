import React, { ReactElement } from "react";
import { GoogleMap, Polyline, withGoogleMap } from "react-google-maps";
import { CoordinatesType } from "../../../../../_BLL/types/rates&surcharges/ratesTypes";
import red_icon_marker from "../../../../assets/icons/operations/red_marker.svg";
import { polylineBillingMapIcons } from "../../../../../_BLL/helpers/tracker/BillingMapHelper";

type PropsType = {
  isMarkerShown?: boolean;
  loadingElement?: ReactElement;
  containerElement: ReactElement;
  mapElement: ReactElement;
  origin_coordinates?: CoordinatesType | null;
  destination_coordinates?: CoordinatesType | null;
};

const BillingMapComponent: React.FC<PropsType> = ({
  isMarkerShown,
  origin_coordinates,
  destination_coordinates,
  ...props
}) => (
  <GoogleMap
    options={{
      disableDefaultUI: true,
      minZoom: 1,
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
    defaultZoom={1}
    defaultCenter={{
      lat: Number(origin_coordinates?.latitude),
      lng: Number(origin_coordinates?.longitude),
    }}
  >
    <Polyline
      path={[
        {
          lat: Number(origin_coordinates?.latitude),
          lng: Number(origin_coordinates?.longitude),
        },
        {
          lat: Number(destination_coordinates?.latitude),
          lng: Number(destination_coordinates?.longitude),
        },
      ]}
      options={{
        geodesic: true,
        strokeColor: "rgba(255,255,255,0.09)",
        strokeOpacity: 1.0,
        strokeWeight: 2,
        icons: polylineBillingMapIcons({
          start: {
            lat: Number(origin_coordinates?.latitude),
            lng: Number(origin_coordinates?.longitude),
          },
          end: {
            lat: Number(destination_coordinates?.latitude),
            lng: Number(destination_coordinates?.longitude),
          },
        }),
      }}
    />
  </GoogleMap>
);

export default withGoogleMap(BillingMapComponent);
