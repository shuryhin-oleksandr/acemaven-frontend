import React from "react";
import {
  AcceptButton,
  ActionsButtons,
  BookingInfo,
  BookingStatus,
  CalendarIcon,
  CardContent,
  CardWrapper,
  ContentHeader,
  GeneralBookingContent,
  GeneralShipType,
  InfoRow,
  InfoRowLabel,
  InfoRowValue,
  RejectButton,
  ValuesShipmentWrapper,
} from "../../Requests/Booking_agent/booking_card/booking-card-style";
import { IconButton } from "@material-ui/core";
import close_icon from "../../../assets/icons/close-icon.svg";
import {
  BookingTitle,
  NumberOfBooking,
  OperationNumber,
  SectionTitle,
  SectionWrapper,
} from "./operation-card-style";
import sea_icon from "../../../assets/icons/rates&services/ship-surcharge.svg";
import air_icon from "../../../assets/icons/rates&services/plane-surcharge.svg";
import calendar_icon from "../../../assets/icons/date_1.svg";
import DocsAndNotesBlock from "./blocks/DocsAndNotesBlock";
import ShipmentPartsBlock from "./blocks/ShipmentPartsBlock";
import CargoBlock from "./blocks/CargoBlock";
import ShipmentTrackingBlock from "./blocks/ShipmentTrackingBlock";

const OperationCard: React.FC = () => {
  return (
    <CardWrapper>
      <CardContent>
        <IconButton
          style={{ position: "absolute", top: "10px", right: "30px" }}
          // onClick={() => history.push("/requests/booking")}
        >
          <img src={close_icon} alt="" style={{ width: "15px" }} />
        </IconButton>
        <ContentHeader>
          <BookingInfo>
            <OperationNumber>0095VSL40</OperationNumber>
            <BookingTitle>
              Booking
              <NumberOfBooking>No ACY9087512</NumberOfBooking>
            </BookingTitle>
            <BookingStatus>
              <span style={{ color: "#1ab8e5", marginRight: "5px" }}>
                STATUS
              </span>
              05/11 21:00 BOOKING IS CONFIRMED LA LA LA LA
            </BookingStatus>
          </BookingInfo>
          <ActionsButtons>
            <AcceptButton>TAKE OVER</AcceptButton>
            <RejectButton>CANCEL OPERATION</RejectButton>
          </ActionsButtons>
        </ContentHeader>
        <SectionWrapper>
          <SectionTitle>GENERAL INFO</SectionTitle>
          <GeneralBookingContent>
            <GeneralShipType>
              <img src={"sea" === "sea" ? sea_icon : air_icon} alt="" />
            </GeneralShipType>
            <InfoRow margin_right="27px">
              <InfoRowLabel>ROUTE</InfoRowLabel>
              <InfoRowValue font_size="36px">
                RSZ
                <br /> BCN
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
                  <InfoRowValue>Loose Cargo</InfoRowValue>
                </InfoRow>
                <InfoRow>
                  <InfoRowLabel>CARRIER</InfoRowLabel>
                  <InfoRowValue>GreatTransfer Co.</InfoRowValue>
                </InfoRow>
              </div>
              <div
                style={{
                  width: "15%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <InfoRow>
                  <InfoRowLabel>VESSEL</InfoRowLabel>
                  <InfoRowValue>Ronald Richards</InfoRowValue>
                </InfoRow>
                <InfoRow>
                  <InfoRowLabel>TRIP</InfoRowLabel>
                  <InfoRowValue>109MG0</InfoRowValue>
                </InfoRow>
              </div>
              <div
                style={{
                  width: "15%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <InfoRow>
                  <InfoRowLabel>DATES</InfoRowLabel>
                  <InfoRowValue>ETD: 05/11</InfoRowValue>
                  <InfoRowValue>ETA:25/11</InfoRowValue>
                </InfoRow>
              </div>
              <div
                style={{
                  width: "25%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
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
