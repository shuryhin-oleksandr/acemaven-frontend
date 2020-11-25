import React from "react";
import { SectionTitle, SectionWrapper } from "../operation-card-style";
import StatusTable from "./Tables/StatusTable";
import DetailedTable from "./Tables/DetailedTable";

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
