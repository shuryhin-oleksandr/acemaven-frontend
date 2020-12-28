import React, { ReactElement } from "react";
import {
  withGoogleMap,
  GoogleMap,
  Polyline
} from "react-google-maps";
import { polylineIcons } from "../../../../_BLL/helpers/tracker/GetIconsForPolylineGoogleMap";


interface Interface {
  isMarkerShown?: boolean;
  loadingElement?: ReactElement;
  containerElement: ReactElement;
  mapElement: ReactElement;
  events: any
}

const MapComponent: React.FC<Interface> = (props) => {
    console.log(props.events)
    return (
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
            defaultZoom={3}
            defaultCenter={{ lat: -3.731862, lng: -38.526669}}
        >
            {props.events && props.events.length > 0 && props.events.map((ev: any, index: number) => <div key={index}>
                <Polyline
                    path = {[
                        {lat: Number(ev?.origin?.latitude), lng: Number(ev?.origin?.longitude)},
                         //...ev?.locations,
                        {lat: Number(ev?.destination?.latitude), lng: Number(ev?.destination?.longitude)}
                    ]}
                    options={{
                        geodesic: true,
                        strokeColor: 'rgba(255,255,255,0.09)',
                        strokeOpacity: 1.0,
                        strokeWeight: 2,
                        icons: polylineIcons({
                            start: {lat: Number(ev?.origin?.latitude), lng: Number(ev?.origin?.longitude)},
                            end: {lat: Number(ev?.destination?.latitude), lng: Number(ev?.destination?.longitude)},
                            now: {lat: Number(ev?.locations[ev?.locations.length - 1]?.lat), lng: Number(ev?.locations[ev?.locations.length - 1]?.lng)},
                            typeTransportation: ev?.shipping_type,
                            processType: ev?.direction
                        })
                    }}
                />
            </div>)}

        </GoogleMap>
    )
}

export default withGoogleMap(MapComponent);
