import React, {ReactElement} from "react";
//moment js
import moment from "moment";
//react-google-maps
import {
    withGoogleMap,
    GoogleMap,
    Polyline
} from "react-google-maps";
//helpers
import {polylineIcons} from "../../../../_BLL/helpers/tracker/GetIconsForPolylineGoogleMap";
import {manualPolyline} from "../../../../_BLL/helpers/tracker/manualPolyline";



interface Interface {
    isMarkerShown?: boolean;
    loadingElement?: ReactElement;
    containerElement: ReactElement;
    mapElement: ReactElement;
    events: any
}

const MapComponent: React.FC<Interface> = (props) => {

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
            defaultCenter={{lat: -3.731862, lng: -38.526669}}
        >
            {props.events && props.events.length > 0 && props.events.map((ev: any, index: number) => <div key={index}>
                    <Polyline
                        path={[
                            {lat: ev?.origin?.latitude, lng: ev?.origin?.longitude},
                            //...ev?.locations,
                            {lat: ev?.destination?.latitude, lng: ev?.destination?.longitude}
                        ]}
                        options={{
                            geodesic: true,
                            strokeColor: 'rgba(255,255,255,0.09)',
                            strokeOpacity: 1.0,
                            strokeWeight: 2,
                            icons: ev?.locations
                                ? polylineIcons({
                                    start: {lat: ev?.origin?.latitude, lng: ev?.origin?.longitude},
                                    end: {lat: ev?.destination?.latitude, lng: ev?.destination?.longitude},
                                    now: {
                                        lat: ev?.locations[ev?.locations?.length - 1]?.lat,
                                        lng: ev?.locations[ev?.locations?.length - 1]?.lng
                                    },
                                    typeTransportation: ev?.shipping_type,
                                    processType: ev?.direction
                                })
                                : manualPolyline(ev?.shipping_type, ev?.direction,
                                    ev?.actual_date_of_departure ? ev?.actual_date_of_departure : ev?.date_of_departure,
                                    ev?.actual_date_of_arrival ? ev?.actual_date_of_arrival : ev?.date_of_arrival,
                                    moment(new Date()).format('DD/MM/YYYY')
                                )
                        }}
                    >
                    </Polyline>

            </div>)}

        </GoogleMap>
    )
}

export default withGoogleMap(MapComponent);
