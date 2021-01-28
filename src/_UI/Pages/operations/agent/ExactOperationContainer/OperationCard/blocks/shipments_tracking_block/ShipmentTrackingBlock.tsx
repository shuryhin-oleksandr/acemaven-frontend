import React from "react";
//components
import StatusTable from "../Tables/StatusTable";
import DetailedTable from "../Tables/DetailedTable";
import SmallMapComponent from "./SmallMapComponent";
import ManualTracking from "../Tables/ManualTracking";
//types
import { TrackingBackendType } from "../../../../../../../../_BLL/types/operations/operationsTypes";
import { ShippingTypesEnum } from "../../../../../../../../_BLL/types/rates&surcharges/newSurchargesTypes";
import { CoordinatesType } from "../../../../../../../../_BLL/types/rates&surcharges/ratesTypes";
import { userCompaniesType } from "../../../../../../../../_BLL/types/authTypes";
//styles
import { SectionTitle, SectionWrapper } from "../../operation-card-style";
import { MapWrapper } from "../../../../../../dashboard/dashboard-styles";
import styled from "styled-components";
import IconLocation from "../../../../../../../assets/icons/location_blue.svg";

type PropsType = {
  tracking: TrackingBackendType[];
  shipping_type: string;
  direction: string;
  origin_coordinates: CoordinatesType | null;
  destination_coordinates: CoordinatesType | null;
  company_type: userCompaniesType | undefined;
  shipping_mode_id: number;
  automatic_tracking?: boolean;
  booking_id: number;
  departure: string | undefined,
    arrival: string | undefined
};

const ShipmentTrackingBlock: React.FC<PropsType> = ({
  tracking,
  shipping_type,
  direction,
  origin_coordinates,
  destination_coordinates,
  company_type,
  shipping_mode_id,
  automatic_tracking,
  booking_id,
    ...props
}) => {
  let events_coordinates =
    shipping_type === "air"
      ? tracking?.map((te) => ({
          lat: te.data?.events[0].ecefLatitude,
          lng: te.data?.events[0].ecefLongitude,
        }))
      : tracking?.map((te) =>
          te.data?.data && te.data.data.length > 0
            ? te.data.data.locations.map((l: any) => ({
                lat: l.lat,
                lng: l.lng,
              }))
            : []
        )[0];

  const lastItem =
    events_coordinates &&
    events_coordinates.length > 0 &&
    events_coordinates[events_coordinates.length - 1];


  const hasOriginCoordinates =
    origin_coordinates?.hasOwnProperty("latitude") &&
    origin_coordinates?.hasOwnProperty("longitude");

  const hasDestinationCoordinates =
    destination_coordinates?.hasOwnProperty("latitude") &&
    destination_coordinates?.hasOwnProperty("longitude");

  return (
    <SectionWrapper>
      <SectionTitle>SHIPMENT TRACKING</SectionTitle>
      {hasOriginCoordinates && hasDestinationCoordinates ? (
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
          departure={props.departure ? props.departure :  undefined}
          arrival={props.arrival ? props.arrival : undefined}
        />
      ) : (
        <Notification>
          <img src={IconLocation} alt="" style={{ marginRight: "7px" }} />
          Map is not available.
        </Notification>
      )}

      {automatic_tracking ? (
        shipping_type === ShippingTypesEnum.AIR ? (
          <StatusTable tracking={tracking} shipping_type={shipping_type} />
        ) : (
          <DetailedTable tracking={tracking} />
        )
      ) : (
        <ManualTracking
          company_type={company_type}
          shipping_mode_id={shipping_mode_id}
          direction={direction}
          booking_id={booking_id}
          tracking={tracking}
        />
      )}
    </SectionWrapper>
  );
};

export default ShipmentTrackingBlock;

const Notification = styled.div`
  background: #3b3b41;
  opacity: 0.9;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  padding: 8px 10px;
  font-family: "Helvetica Neue", sans-serif;
  font-size: 16px;
  letter-spacing: 0.209px;
  color: #00c5ff;
  align-self: flex-start;
  margin-top: 10px;
`;
