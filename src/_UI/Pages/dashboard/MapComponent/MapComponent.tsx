import React, { ReactElement } from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  Polyline
} from "react-google-maps";

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
    {/*<Polyline*/}
    {/*  path = {[{ lat: -34.397, lng: 150.644 },{ lat: 53.910225, lng: 27.041885 }]}*/}
    {/*  options={{*/}
    {/*    geodesic: true,*/}
    {/*    strokeColor: 'rgba(255,255,255,0.09)',*/}
    {/*    strokeOpacity: 1.0,*/}
    {/*    strokeWeight: 2,*/}
    {/*    icons: [*/}
    {/*      {*/}
    {/*        icon: {*/}
    {/*          path: "M 0,-1.2 0,1.2",*/}
    {/*          strokeOpacity: 1,*/}
    {/*          strokeWeight: 9,*/}
    {/*          strokeColor: "rgba(90,90,90,0.1)",*/}
    {/*          scale: 5,*/}
    {/*        },*/}
    {/*        offset: "0",*/}
    {/*        repeat: "30px",*/}
    {/*      },*/}
    {/*      {*/}
    {/*        icon: {*/}
    {/*          path: "M 0,-1 0,1",*/}
    {/*          strokeOpacity: 1,*/}
    {/*          strokeColor: "white",*/}
    {/*          scale: 3,*/}
    {/*        },*/}
    {/*        offset: "0",*/}
    {/*        repeat: "30px",*/}
    {/*      },*/}
    {/*      {*/}
    {/*        icon: {*/}
    {/*          path: "M9 -1C9 4.52285 4.52285 9 -1 9C-6.52285 9 -11 4.52285 -11 -1C-11 -6.52285 -6.52285 -11 -1 -11C4.52285 -11 9 -6.52285 9 -1Z",*/}
    {/*          strokeColor: "#FFFFFF",*/}
    {/*        },*/}
    {/*        fixedRotation:true,*/}
    {/*        offset: "100%",*/}
    {/*      },*/}
    {/*      {*/}
    {/*        icon: {*/}
    {/*          path: "M8 -1C8 3.97056 3.97056 8 -1 8C-5.97056 8 -10 3.97056 -10 -1C-10 -5.97056 -5.97056 -10 -1 -10C3.97056 -10 8 -5.97056 8 -1Z",*/}
    {/*          strokeColor: "#115B86",*/}
    {/*          strokeOpacity: 1,*/}
    {/*          fillColor: "#115B86",*/}
    {/*          fillOpacity: 1,*/}
    {/*        },*/}
    {/*        fixedRotation:true,*/}
    {/*        offset: "100%",*/}
    {/*      },*/}
    {/*      {*/}
    {/*        icon: {*/}
    {/*          path: "M-1.43011 -6L-1.64515 -4.54839H-2.93548H-3.2043V-4.27957V-3.52688H-4.27957V-1.16129L-1 -2.25L2.27957 -1.16129V-3.52688H1.2043V-4.27957V-4.54839H0.935483H-0.35485L-0.569892 -6H-1H-1.43011ZM0.666666 -4.01075V-3.52688H-1H-2.66667V-4.01075H-1H0.666666ZM-6 0.397848L-1 -1.61828L4 0.397848L2.75 4C1.88978 4 -1 4 -1 4C-1 4 -3.88978 4 -4.75 4L-6 0.397848Z",*/}
    {/*          strokeColor: "#115B86",*/}
    {/*          strokeOpacity: 1,*/}
    {/*          strokeWeight: 1,*/}
    {/*          fillColor: "white",*/}
    {/*          fillOpacity: 1,*/}
    {/*        },*/}
    {/*        fixedRotation:true,*/}
    {/*        offset: "100%",*/}
    {/*      },*/}
    {/*      // {*/}
    {/*      //   icon: {*/}
    {/*      //     path: "M-5.22684 -0.639508L-6 0.133652L-3.29394 1.29339L-2.13365 4L-1.36049 3.22684L-1.74707 1.29339L0.0644404 -0.518121L2.03835 3.69434L2.7705 2.96219L2.11982 -2.57296L3.66614 -4.11982C3.77059 -4.2207 3.8539 -4.34137 3.91122 -4.47479C3.96853 -4.60821 3.9987 -4.75171 3.99996 -4.89692C4.00122 -5.04212 3.97355 -5.18613 3.91856 -5.32052C3.86358 -5.45492 3.78238 -5.57702 3.6797 -5.6797C3.57702 -5.78238 3.45492 -5.86358 3.32052 -5.91856C3.18612 -5.97355 3.04212 -6.00122 2.89692 -5.99996C2.75171 -5.9987 2.60821 -5.96853 2.47479 -5.91122C2.34137 -5.8539 2.2207 -5.77059 2.11982 -5.66614L0.532492 -4.07881L-5.00266 -4.73004L-5.69434 -4.0378L-1.51469 -2.03109L-3.29339 -0.252381L-5.22684 -0.639508V-0.639508Z",*/}
    {/*      //     strokeColor: "#115B86",*/}
    {/*      //     strokeOpacity: 1,*/}
    {/*      //     strokeWeight: 1,*/}
    {/*      //     fillColor: "white",*/}
    {/*      //     fillOpacity: 1,*/}
    {/*      //   },*/}
    {/*      //   fixedRotation:true,*/}
    {/*      //   offset: "100%",*/}
    {/*      // },*/}
    {/*    ]*/}
    {/*  }}*/}
    {/*/>*/}
  </GoogleMap>
);

export default withGoogleMap(MapComponent);
