import React from "react";
import StatusTable from "../Tables/StatusTable";
import DetailedTable from "../Tables/DetailedTable";
import {SectionTitle, SectionWrapper } from "../../operation-card-style";
import {MapWrapper} from "../../../../../../dashboard/dashboard-styles";
import SmallMapComponent from "./SmallMapComponent";
import {TrackingBackendType, TrackingEventType} from "../../../../../../../../_BLL/types/operations/operationsTypes";
import {ShippingTypesEnum} from "../../../../../../../../_BLL/types/rates&surcharges/newSurchargesTypes";
import {CoordinatesType} from "../../../../../../../../_BLL/types/rates&surcharges/ratesTypes";

type PropsType = {
    air_tracking_events: TrackingBackendType[],
    shipping_type: string,
    direction: string,
    origin_coordinates: CoordinatesType | null
    destination_coordinates: CoordinatesType | null
}

const ShipmentTrackingBlock: React.FC<PropsType> = ({air_tracking_events, shipping_type, direction, origin_coordinates, destination_coordinates}) => {

    console.log("air_tracking_events",air_tracking_events);
    let events_coordinates = air_tracking_events?.map(te => ({lat: te.data.events[0].ecefLatitude, lng: te.data.events[0].ecefLongitude}))
    const lastItem = events_coordinates[events_coordinates.length - 1]



    return (
        <SectionWrapper>
            <SectionTitle>SHIPMENT TRACKING</SectionTitle>
            <SmallMapComponent
                isMarkerShown
                loadingElement={<div style={{ height: `172px` }} />}
                containerElement={<MapWrapper />}
                mapElement={<div style={{ height: `172px` }} />}
                direction={direction}
                shipping_type={shipping_type}
                origin_coordinates={origin_coordinates ? origin_coordinates : null}
                destination_coordinates={destination_coordinates ? destination_coordinates : null}
                last_event_coordinates={lastItem}
            />
            <StatusTable air_tracking_events={air_tracking_events}/>
            {shipping_type === ShippingTypesEnum.SEA && <DetailedTable />}
        </SectionWrapper>
    );
};

export default ShipmentTrackingBlock;


