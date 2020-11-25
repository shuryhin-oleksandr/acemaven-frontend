import React from "react";
import StatusTable from "./Tables/StatusTable";
import DetailedTable from "./Tables/DetailedTable";
import {SectionTitle, SectionWrapper } from "../operation-card-style";


const ShipmentTrackingBlock: React.FC = () => {
    return (
        <SectionWrapper>
            <SectionTitle>SHIPMENT TRACKING</SectionTitle>
            <StatusTable />
            <DetailedTable />
        </SectionWrapper>
    );
};

export default ShipmentTrackingBlock;


