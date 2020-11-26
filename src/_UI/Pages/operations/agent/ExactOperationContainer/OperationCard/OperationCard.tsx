import React from "react";
//material ui
import { IconButton } from "@material-ui/core";
//components
import DocsAndNotesBlock from "./blocks/DocsAndNotesBlock";
import ShipmentPartsBlock from "./blocks/ShipmentPartsBlock";
import CargoBlock from "./blocks/CargoBlock";
import ShipmentTrackingBlock from "./blocks/ShipmentTrackingBlock";
//styles
import {
  AcceptButton,
  ActionsButtons,
  BookingInfo,
  BookingStatus,
  CalendarIcon,
  CardContent,
  CardWrapper,
  ConfirmButton,
  ContentHeader,
  GeneralBookingContent,
  GeneralShipType,
  InfoRow,
  InfoRowLabel,
  InfoRowValue,
  RejectButton,
  ValuesShipmentWrapper,
} from "../../../../Requests/Booking_agent/booking_card/booking-card-style";
import {
  BookingTitle,
  NumberOfBooking,
  OperationNumber,
  SectionTitle,
  SectionWrapper,
} from "./operation-card-style";
import { GeneralTitle } from "../../../../quotes/agent/table/agent-quotes-styles";
import { DocumentsContent } from "../../../../Requests/Booking_agent/booking_card/blocks/hidden-part-styles";
//icons
import close_icon from "../../../../../assets/icons/close-icon.svg";
import sea_icon from "../../../../../assets/icons/rates&services/ship-surcharge.svg";
import air_icon from "../../../../../assets/icons/rates&services/plane-surcharge.svg";
import calendar_icon from "../../../../../assets/icons/date_1.svg";
import down_arrow from "../../../../../assets/icons/rates&services/show_arrow.svg";
import up_arrow from "../../../../../assets/icons/rates&services/hide_arrow.svg";
import {OperationType} from "../../../../../../_BLL/types/operations/operationsTypes";


type PropsType = {
  operation_info: OperationType,
  history: any,
  local_time: string,
  openAcceptPopup: (value: boolean) => void,
  my_name: string
}

const OperationCard:React.FC<PropsType> = ({operation_info, history, local_time, openAcceptPopup, my_name}) => {
  return (
    <CardWrapper>
      <CardContent>
        <IconButton
          style={{ position: "absolute", top: "10px", right: "30px" }}
          onClick={() => history.push("/operations")}
        >
          <img src={close_icon} alt="" style={{ width: "15px" }} />
        </IconButton>
        <ContentHeader>
          <BookingInfo>
            <OperationNumber>{operation_info?.aceid}</OperationNumber>
            <BookingStatus>
              <span style={{ color: "#1ab8e5", marginRight: "5px" }}>
                STATUS
              </span>
              {local_time}{' '}{operation_info?.status}
            </BookingStatus>
          </BookingInfo>
          <ActionsButtons>
            {operation_info?.status === "Booking Request in Progress" &&
              (operation_info?.agent_contact_person === my_name
                ? <ConfirmButton onClick={() => openAcceptPopup(true)}>CONFIRM OPERATION</ConfirmButton>
                : <AcceptButton>TAKE OVER</AcceptButton>
              )
            }
            <RejectButton>CANCEL OPERATION</RejectButton>
          </ActionsButtons>
        </ContentHeader>
        <SectionWrapper>
          <SectionTitle>GENERAL INFO</SectionTitle>
          <GeneralBookingContent>
            <GeneralShipType>
              <img src={operation_info?.shipping_type === "sea" ? sea_icon : air_icon} alt="" />
            </GeneralShipType>
            <InfoRow margin_right="27px">
              <InfoRowLabel>ROUTE</InfoRowLabel>
              <InfoRowValue font_size="36px">
                {operation_info?.freight_rate.origin.code}
                <br /> {operation_info?.freight_rate.destination.code}
              </InfoRowValue>
            </InfoRow>
            <ValuesShipmentWrapper>
              <div
                style={{
                  width: "15%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <InfoRow>
                  <InfoRowLabel>SHIPPING MODE</InfoRowLabel>
                  <InfoRowValue>{operation_info?.freight_rate.shipping_mode.title}</InfoRowValue>
                </InfoRow>
                <InfoRow>
                  <InfoRowLabel>CARRIER</InfoRowLabel>
                  <InfoRowValue>
                    {operation_info?.freight_rate.carrier.title}
                  </InfoRowValue>
                </InfoRow>
              </div>
              {operation_info?.status === "Booking Request Confirmed" &&
                  <>
                    <div style={{width: "15%", display: "flex", flexDirection: "column"}}>
                      <InfoRow>
                        <InfoRowLabel>VESSEL</InfoRowLabel>
                        <InfoRowValue>Ronald Richards</InfoRowValue>
                      </InfoRow>
                      <InfoRow>
                        <InfoRowLabel>TRIP</InfoRowLabel>
                        <InfoRowValue>109MG0</InfoRowValue>
                      </InfoRow>
                    </div>
                    <div style={{width: "15%", display: "flex", flexDirection: "column"}}>
                      <InfoRow>
                        <InfoRowLabel>DATES</InfoRowLabel>
                        <InfoRowValue>ETD: 05/11</InfoRowValue>
                        <InfoRowValue>ETA:25/11</InfoRowValue>
                      </InfoRow>
                    </div>
                    <div style={{width: "25%", display: "flex", flexDirection: "column"}}>
                      <InfoRow>
                        <InfoRowLabel>Empty Pickup Location</InfoRowLabel>
                        <InfoRowValue>
                          terminal: B, airport: Great Airport, 3891 Ranchview Dr.
                          Richardson, California
                        </InfoRowValue>
                      </InfoRow>
                      <InfoRow>
                        <InfoRowLabel>Cargo Drop Off Location </InfoRowLabel>
                        <InfoRowValue>
                          terminal: B, airport: Great Airport, 3891 Ranchview Dr.
                          Richardson, California
                        </InfoRowValue>
                      </InfoRow>
                    </div>
                  </>
              }
            </ValuesShipmentWrapper>
          </GeneralBookingContent>
        </SectionWrapper>
        <SectionWrapper>
          <SectionTitle>DATES</SectionTitle>
          <GeneralBookingContent>
            <div style={{ display: "flex" }}>
              <CalendarIcon style={{ width: "87px", height: "96px" }}>
                <img src={calendar_icon} alt="" />
              </CalendarIcon>
              <InfoRow margin_right="50px" margin_bottom="0px">
                <InfoRowLabel>Shipment Date</InfoRowLabel>
                <span
                  style={{
                    width: "100px",
                    fontSize: "24px",
                    color: "black",
                    fontFamily: "Helvetica Light",
                    marginTop: "15px",
                    marginBottom: "13px",
                  }}
                >
                  WEEK 42
                </span>
                <InfoRowValue>01/11 - 07/11</InfoRowValue>
              </InfoRow>
            </div>
            <div
              style={{
                width: "20%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <InfoRow>
                <InfoRowLabel>Estimated Time of Departure</InfoRowLabel>
                <InfoRowValue>17 APR 2020, 12:00</InfoRowValue>
              </InfoRow>
              <InfoRow>
                <InfoRowLabel>Estimated Time of Arrival</InfoRowLabel>
                <InfoRowValue>17 APR 2020, 12:00</InfoRowValue>
              </InfoRow>
            </div>
            <div
              style={{
                width: "20%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <InfoRow>
                <InfoRowLabel>Cargo Cut Off </InfoRowLabel>
                <InfoRowValue>17 APR 2020, 12:00</InfoRowValue>
              </InfoRow>
              <InfoRow>
                <InfoRowLabel>Documents Cut Off </InfoRowLabel>
                <InfoRowValue>17 APR 2020, 12:00</InfoRowValue>
              </InfoRow>
            </div>
            <div
              style={{
                width: "20%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <InfoRow>
                <InfoRowLabel>Actual Time of Departure</InfoRowLabel>
                <InfoRowValue>17 APR 2020, 12:00</InfoRowValue>
              </InfoRow>
              <InfoRow>
                <InfoRowLabel>Actual Time of Arrival</InfoRowLabel>
                <InfoRowValue>17 APR 2020, 12:00</InfoRowValue>
              </InfoRow>
            </div>
          </GeneralBookingContent>
        </SectionWrapper>
        <ShipmentTrackingBlock />
        <SectionWrapper>
          <SectionTitle>CHARGES</SectionTitle>
          <div style={{ display: "flex" }}>
            <InfoRowLabel>Payment Due by:</InfoRowLabel>
            <span style={{ marginLeft: "5px" }}>22/07/2020</span>
          </div>
        </SectionWrapper>

        <DocsAndNotesBlock />
        <ShipmentPartsBlock />
        <CargoBlock />
      </CardContent>
    </CardWrapper>
  );
};

export default OperationCard;
