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
  BookingTitle, NumberOfBooking,
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
import moment from "moment";


type PropsType = {
  operation_info: OperationType,
  history: any,
  local_time: string,
  openAcceptPopup: (value: boolean) => void,
  my_name: string
}

const OperationCard:React.FC<PropsType> = ({operation_info, history, local_time, openAcceptPopup, my_name}) => {

  //refactoring dates
  let a = moment(operation_info?.date_from, 'DD/MM/YYYY').toDate()
  let date_from = moment(a).format('DD/MM')
  let c = moment(operation_info?.date_to, 'DD/MM/YYYY').toDate()
  let date_to = moment(c).format('DD/MM')

  let shipment = operation_info?.shipment_details && operation_info?.shipment_details[0]

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
            <div style={{display: 'flex'}}>
              <BookingTitle>BOOKING</BookingTitle>
              <NumberOfBooking>No {operation_info?.booking_number}</NumberOfBooking>
            </div>
            <BookingStatus>
              <span style={{ color: "#1ab8e5", marginRight: "5px" }}>
                STATUS
              </span>
              <span style={{fontFamily: 'Helvetica Light', fontSize: '18px', textTransform: 'lowercase'}}>{local_time}</span>
              {' '}
              <span style={{textTransform: 'uppercase'}}>
                {operation_info?.status}
              </span>
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
                  marginRight:'35px',
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
              {operation_info?.status === "Booking Confirmed" &&
                  <>
                    {shipment?.vessel
                        ? <div style={{ display: "flex", flexDirection: "column", marginRight:'26px'}}>
                          <InfoRow>
                            <InfoRowLabel>VESSEL</InfoRowLabel>
                            <InfoRowValue>{shipment?.vessel}</InfoRowValue>
                          </InfoRow>
                          <InfoRow>
                            <InfoRowLabel>VOYAGE</InfoRowLabel>
                            <InfoRowValue>{shipment?.voyage}</InfoRowValue>
                          </InfoRow>
                        </div>
                        : <div style={{display: "flex", flexDirection: "column", marginRight:'26px'}}>
                          <InfoRow>
                            <InfoRowLabel>MAWB</InfoRowLabel>
                            <InfoRowValue>{shipment?.mawb}</InfoRowValue>
                          </InfoRow>
                          <InfoRow>
                            <InfoRowLabel>FLIGHT NUMBER</InfoRowLabel>
                            <InfoRowValue>{shipment?.flight_number}</InfoRowValue>
                          </InfoRow>
                        </div>
                    }
                    <div style={{width: "25%", display: "flex", flexDirection: "column"}}>
                      {shipment?.empty_pick_up_location &&
                      <InfoRow>
                        <InfoRowLabel>Empty Pickup Location</InfoRowLabel>
                        <InfoRowValue>
                          terminal: {shipment?.empty_pick_up_location}, airport: {shipment?.empty_pick_up_location_address}
                        </InfoRowValue>
                      </InfoRow>
                      }
                      {shipment?.cargo_drop_off_location &&
                      <InfoRow>
                        <InfoRowLabel>Cargo Drop Off Location </InfoRowLabel>
                        <InfoRowValue>
                          terminal: {shipment?.cargo_drop_off_location}, airport: {shipment?.cargo_drop_off_location_address}
                        </InfoRowValue>
                      </InfoRow>}

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
                <InfoRowLabel>SHIPMENT DATE</InfoRowLabel>
                <span style={{width: "100px", fontSize: "24px", color: "black", fontFamily: "Helvetica Light", marginBottom: "5px",}}>
                  {(operation_info?.week_range?.week_from !== operation_info?.week_range?.week_to)
                      ? `WEEK ${operation_info?.week_range?.week_from} - ${operation_info?.week_range?.week_to}`
                      : `WEEK ${operation_info?.week_range?.week_from}`
                  }
                </span>
                <InfoRowValue>{date_from} - {date_to}</InfoRowValue>
              </InfoRow>
            </div>
            {operation_info?.status === "Booking Confirmed" &&
            <>
              <div style={{display: "flex", flexDirection: "column", marginRight: '26px'}}>
                <InfoRow>
                  <InfoRowLabel>ESTIMATED TIME OF DEPARTURE</InfoRowLabel>
                  <InfoRowValue>{shipment?.date_of_departure}</InfoRowValue>
                </InfoRow>
                <InfoRow>
                  <InfoRowLabel>ESTIMATED TIME OF ARRIVAL</InfoRowLabel>
                  <InfoRowValue>{shipment?.date_of_arrival}</InfoRowValue>
                </InfoRow>
              </div>
              {shipment?.cargo_cut_off_date &&
              <div style={{display: "flex", flexDirection: "column", marginRight: '26px'}}>
                <InfoRow>
                  <InfoRowLabel>CARGO CUT OFF </InfoRowLabel>
                  <InfoRowValue>{shipment?.cargo_cut_off_date}</InfoRowValue>
                </InfoRow>
                <InfoRow>
                  <InfoRowLabel>DOCUMENTS CUT OFF </InfoRowLabel>
                  <InfoRowValue>{shipment?.document_cut_off_date}</InfoRowValue>
                </InfoRow>
              </div>
              }

              {/*<div style={{width: "20%", display: "flex", flexDirection: "column",}}>
                <InfoRow>
                  <InfoRowLabel>ACTUAL TIME OF DEPARTURE</InfoRowLabel>
                  <InfoRowValue>17 APR 2020, 12:00</InfoRowValue>
                </InfoRow>
                <InfoRow>
                  <InfoRowLabel>ACTUAL TIME OF ARRIVAL</InfoRowLabel>
                  <InfoRowValue>17 APR 2020, 12:00</InfoRowValue>
                </InfoRow>
              </div>*/}
            </>
            }
          </GeneralBookingContent>
        </SectionWrapper>
        {operation_info?.status === "Booking Request Confirmed"
          && <ShipmentTrackingBlock/>
        }
        <SectionWrapper>
          <SectionTitle>CHARGES</SectionTitle>
          <div style={{ display: "flex" }}>
            <InfoRowLabel>PAYMENT DUE BY:</InfoRowLabel>
            <span style={{ marginLeft: "5px" }}>22/07/2020</span>
          </div>
        </SectionWrapper>
           <DocsAndNotesBlock notes={operation_info?.shipment_details ? operation_info?.shipment_details : []}
                              docs={{release_type: operation_info?.release_type, number_of_documents: operation_info?.number_of_documents}}
           />
        <ShipmentPartsBlock shipper_info={operation_info?.shipper ? operation_info?.shipper : null}
                            client_info={{company: operation_info?.client as string, contact_person: operation_info?.client_contact_person as string}}
        />
        <CargoBlock operation_shipping_type={operation_info?.shipping_type as string}
                    operation_cargo_groups={operation_info?.cargo_groups}
                    operation_shipping_mode={operation_info?.freight_rate?.shipping_mode}
                    free_time={shipment?.container_free_time}
        />
      </CardContent>
    </CardWrapper>
  );
};

export default OperationCard;
