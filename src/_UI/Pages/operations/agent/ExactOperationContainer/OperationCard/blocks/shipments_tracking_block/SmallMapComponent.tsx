import React, {ReactElement} from 'react'
//moment js
import moment from "moment";
//react-google-map
import {GoogleMap, Marker, Polyline, withGoogleMap} from "react-google-maps";
//types
import {CoordinatesType} from "../../../../../../../../_BLL/types/rates&surcharges/ratesTypes";
//helpers
import {polylineSmallMapIcons} from "../../../../../../../../_BLL/helpers/tracker/SmallMapHelper";
import {smallManualPolylineIcons} from "../../../../../../../../_BLL/helpers/tracker/smallManualPolyline";
//icon
import marker from '../../../../../../../assets/icons/operations/marker.svg'
import red_icon_marker from '../../../../../../../assets/icons/operations/red_marker.svg'



type PropsType = {
    isMarkerShown?: boolean;
    loadingElement?: ReactElement;
    containerElement: ReactElement;
    mapElement: ReactElement;
    direction: string,
    shipping_type: string,
    origin_coordinates: CoordinatesType | null,
    destination_coordinates: CoordinatesType | null,
    last_event_coordinates: {lat: number, lng: number},
    departure: string | undefined,
    arrival: string | undefined
}


const SmallMapComponent:React.FC<PropsType> = ({isMarkerShown, ...props}) => (

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
        defaultCenter={{ lat: Number(props.origin_coordinates?.latitude), lng: Number(props.origin_coordinates?.longitude)}}
    >
        {isMarkerShown && props.origin_coordinates && (
            <Marker position={{ lat: props.origin_coordinates?.latitude, lng: props.origin_coordinates?.longitude }}
                    defaultIcon={marker}
            />
        )}
        <Polyline
            path = {[
                {lat: Number(props.origin_coordinates?.latitude), lng: Number(props.origin_coordinates?.longitude)},
                {lat: Number(props.destination_coordinates?.latitude), lng: Number(props.destination_coordinates?.longitude)}
                ]}
            options={{
                geodesic: false,
                strokeColor: 'rgba(255,255,255,0.09)',
                strokeOpacity: 1.0,
                strokeWeight: 1,
                icons: props.last_event_coordinates
                    ? polylineSmallMapIcons({
                    start: {lat: Number(props.origin_coordinates?.latitude), lng: Number(props.origin_coordinates?.longitude)},
                    end: {lat: Number(props.destination_coordinates?.latitude), lng: Number(props.destination_coordinates?.longitude)},
                    now: {lat: Number(props.last_event_coordinates?.lat), lng: Number(props.last_event_coordinates?.lng)},
                    processType: props.direction,
                    red_icon_marker: red_icon_marker
                })
                    : smallManualPolylineIcons(
                        props.direction,
                        props.departure ? props.departure : '',
                        props.arrival ? props.arrival : '',
                        moment(new Date()).format('DD/MM/YYYY')
                    )
            }}
        />
    </GoogleMap>
)

export default withGoogleMap(SmallMapComponent)