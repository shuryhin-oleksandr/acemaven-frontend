import React from "react";
import StatusTable from "../Tables/StatusTable";
import DetailedTable from "../Tables/DetailedTable";
import { SectionTitle, SectionWrapper } from "../../operation-card-style";
import { MapWrapper } from "../../../../../../dashboard/dashboard-styles";
import SmallMapComponent from "./SmallMapComponent";
import {
  TrackingBackendType,
  TrackingEventType,
} from "../../../../../../../../_BLL/types/operations/operationsTypes";
import { ShippingTypesEnum } from "../../../../../../../../_BLL/types/rates&surcharges/newSurchargesTypes";
import { CoordinatesType } from "../../../../../../../../_BLL/types/rates&surcharges/ratesTypes";
import ManualTracking from "../Tables/ManualTracking";
import { userCompaniesType } from "../../../../../../../../_BLL/types/authTypes";

type PropsType = {
  tracking: TrackingBackendType[];
  shipping_type: string;
  direction: string;
  origin_coordinates: CoordinatesType | null;
  destination_coordinates: CoordinatesType | null;
  company_type: userCompaniesType | undefined;
};

const ShipmentTrackingBlock: React.FC<PropsType> = ({
  tracking,
  shipping_type,
  direction,
  origin_coordinates,
  destination_coordinates,
  company_type,
}) => {
  let events_coordinates =
    shipping_type === "air"
      ? tracking?.map((te) => ({
          lat: te.data.events[0].ecefLatitude,
          lng: te.data.events[0].ecefLongitude,
        }))
      : tracking?.map((te) =>
          te.data.data.locations.map((l: any) => ({ lat: l.lat, lng: l.lng }))
        );

  const lastItem = events_coordinates[events_coordinates.length - 1];

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
        destination_coordinates={
          destination_coordinates ? destination_coordinates : null
        }
        last_event_coordinates={lastItem}
      />
      {tracking.length > 0 ? (
        shipping_type === ShippingTypesEnum.AIR ? (
          <StatusTable tracking={tracking} shipping_type={shipping_type} />
        ) : (
          <DetailedTable tracking={tracking} />
        )
      ) : (
        <ManualTracking company_type={company_type} />
      )}
      {/*{shipping_type === ShippingTypesEnum.AIR && <StatusTable tracking={tracking} shipping_type={shipping_type}/>}*/}
      {/*{shipping_type === ShippingTypesEnum.SEA && <DetailedTable tracking={tracking} />}*/}
    </SectionWrapper>
  );
};

export default ShipmentTrackingBlock;
