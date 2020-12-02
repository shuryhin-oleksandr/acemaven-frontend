import React from "react";
//material ui
import { IconButton } from "@material-ui/core";
//types
import {OperationType} from "../../../../../../_BLL/types/operations/operationsTypes";
//components
import DocsAndNotesBlock from "./blocks/DocsAndNotesBlock";
import ShipmentPartsBlock from "./blocks/ShipmentPartsBlock";
import CargoBlock from "./blocks/CargoBlock";
import ShipmentTrackingBlock from "./blocks/ShipmentTrackingBlock";
import PaymentDueByDates from "./PaymentDueByDates";
import ChargesBlock from "./blocks/ChargesBlock";
import GeneralBlockContainer from "./blocks/general_info/GeneralBlockContainer";
import ConfirmedDatesContainerBlock from "./blocks/cofirmed_dates/ConfirmedDatesContainerBlock";
//styles
import {
  AcceptButton,
  ActionsButtons,
  BookingInfo,
  BookingStatus,
  CardContent,
  CardWrapper,
  ConfirmButton,
  ContentHeader,
  RejectButton,
} from "../../../../Requests/Booking_agent/booking_card/booking-card-style";
import {
  BookingTitle, NumberOfBooking,
  OperationNumber,
  SectionTitle,
  SectionWrapper,
} from "./operation-card-style";
//icons
import close_icon from "../../../../../assets/icons/close-icon.svg";



type PropsType = {
  operation_info: OperationType,
  history: any,
  local_time: string,
  openAcceptPopup: (value: boolean) => void,
  my_name: string
}

const OperationCard:React.FC<PropsType> = ({operation_info, history, local_time, openAcceptPopup, my_name}) => {

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
            {shipment?.booking_number &&
              <div style={{display: 'flex'}}>
                <BookingTitle>BOOKING</BookingTitle>
                <NumberOfBooking>No {shipment?.booking_number}</NumberOfBooking>
              </div>
            }
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
                ? <ConfirmButton onClick={() => openAcceptPopup(true)}>CONFIRM BOOKING</ConfirmButton>
                : <AcceptButton>TAKE OVER</AcceptButton>
              )
            }
            <RejectButton>CANCEL OPERATION</RejectButton>
          </ActionsButtons>
        </ContentHeader>
        <GeneralBlockContainer operation_info={operation_info}
                               shipment={shipment ? shipment : null}
        />
        <ConfirmedDatesContainerBlock shipment={shipment ? shipment : null}
                                      operation_info={operation_info}
        />
        {operation_info?.status === "Booking Confirmed"
          && <ShipmentTrackingBlock/>
        }
        <SectionWrapper>
          <SectionTitle>CHARGES</SectionTitle>
          <PaymentDueByDates payment_due_by={operation_info?.payment_due_by}
                              operation_id={operation_info.id}
          />
          <ChargesBlock operation_charges={operation_info?.charges ? operation_info?.charges : null}/>
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
                    status={operation_info?.status}
                    shipment_id={shipment?.id as number}
        />
      </CardContent>
    </CardWrapper>
  );
};

export default OperationCard;
