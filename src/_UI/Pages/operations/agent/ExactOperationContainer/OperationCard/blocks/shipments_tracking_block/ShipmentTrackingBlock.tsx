import React from "react";
import StatusTable from "../Tables/StatusTable";
import DetailedTable from "../Tables/DetailedTable";
import {SectionTitle, SectionWrapper } from "../../operation-card-style";
import {MapWrapper} from "../../../../../../dashboard/dashboard-styles";
import SmallMapComponent from "./SmallMapComponent";


const ShipmentTrackingBlock: React.FC = () => {
    return (
        <SectionWrapper>
            <SectionTitle>SHIPMENT TRACKING</SectionTitle>
            <SmallMapComponent
                isMarkerShown
                loadingElement={<div style={{ height: `172px` }} />}
                containerElement={<MapWrapper />}
                mapElement={<div style={{ height: `172px` }} />}
            />
            <StatusTable />
            <DetailedTable />
        </SectionWrapper>
    );
};

export default ShipmentTrackingBlock;


