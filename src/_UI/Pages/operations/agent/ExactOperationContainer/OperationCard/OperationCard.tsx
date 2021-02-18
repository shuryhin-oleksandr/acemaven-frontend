import React from "react";
//material ui
import {IconButton} from "@material-ui/core";
//types
import {AppOperationBookingStatusesType, OperationType} from "../../../../../../_BLL/types/operations/operationsTypes";
import {userCompaniesType} from "../../../../../../_BLL/types/authTypes";
import {AppCompaniesTypes} from "../../../../../../_BLL/types/commonTypes";
//components
import DocsAndNotesBlock from "./blocks/DocsAndNotesBlock";
import ShipmentPartsBlock from "./blocks/ShipmentPartsBlock";
import CargoBlock from "./blocks/CargoBlock";
import ShipmentTrackingBlock from "./blocks/shipments_tracking_block/ShipmentTrackingBlock";
import PaymentDueByDates from "./PaymentDueByDates";
import ChargesBlock from "./blocks/ChargesBlock";
import GeneralBlockContainer from "./blocks/general_info/GeneralBlockContainer";
import ConfirmedDatesContainerBlock from "./blocks/cofirmed_dates/ConfirmedDatesContainerBlock";
import PaymentDueByForClient from "./PaymentDueByForClient";
import BookingNumberBlockContainer from "./blocks/booking_number/BookingNumberBlockContainer";
import BookingNumberWithCarrierBlockContainer from "./blocks/booking_number/BookingNumberWithCarrierBlockContainer";
import ActionsButtonsBlock from "./blocks/actions/ActionsButtonsBlock";
//styles
import {

    BookingInfo,
    BookingStatus,
    CardContent,
    CardWrapper, ConfirmButton,
    ContentHeader,
} from "../../../../Requests/Booking_agent/booking_card/booking-card-style";
import {
    OperationNumber,
    SectionTitle,
    SectionWrapper,
} from "./operation-card-style";
//icons
import close_icon from "../../../../../assets/icons/close-icon.svg";



type PropsType = {
    operation_info: OperationType,
    local_time: string,
    openAcceptPopup: (value: boolean) => void,
    my_name: string,
    agent_contact_name: string,
    client_contact_name: string,
    company_type: userCompaniesType | undefined,
    setClientChangRequestPopupVisible: (value: boolean) => void,
    setIsCancelByAgent: (value: boolean) => void,
    setIsCancelByClient: (value: boolean) => void;
    setCompleteOperationPopup: (value: boolean) => void,
    closeHandler: any,
    setTakeOver: (value: boolean) => void,
    setChangeRequestPopup: (value: boolean) => void,
    setEdit: (value: boolean) => void
    setReviewPopup: (value: boolean) => void
    ATD: boolean | undefined
}

const OperationCard: React.FC<PropsType> = ({
                                                operation_info,
                                                local_time,
                                                openAcceptPopup,
                                                my_name,
                                                company_type,
                                                setClientChangRequestPopupVisible,
                                                setIsCancelByAgent,
                                                closeHandler,
                                                setIsCancelByClient,
                                                setTakeOver,
                                                setReviewPopup,
                                                ...props
                                            }) => {

    let shipment = operation_info?.shipment_details && operation_info?.shipment_details[0]


    return (
        <CardWrapper>
            <CardContent>
                <IconButton
                    style={{position: "absolute", top: "10px", right: "30px"}}
                    onClick={closeHandler}
                >
                    <img src={close_icon} alt="" style={{width: "15px"}}/>
                </IconButton>
                <ContentHeader>
                    <BookingInfo>
                        <OperationNumber>{operation_info?.aceid}</OperationNumber>
                        <BookingNumberBlockContainer shipment={shipment}
                        />
                        {shipment?.booking_number_with_carrier && company_type?.type === AppCompaniesTypes.AGENT &&
                        <BookingNumberWithCarrierBlockContainer shipment={shipment}/>
                        }
                        <BookingStatus>
              <span style={{color: "#1ab8e5", marginRight: "5px"}}>
                STATUS
              </span>
                            <span
                                style={{
                                    fontFamily: "Helvetica Light",
                                    fontSize: "18px",
                                    textTransform: "lowercase",
                                }}
                            >
                {local_time}
              </span>{" "}
                            <span style={{textTransform: "uppercase"}}>
                {operation_info?.status}
              </span>
                        </BookingStatus>
                    </BookingInfo>
                    {(company_type?.type === AppCompaniesTypes.CLIENT
                        && operation_info?.status === AppOperationBookingStatusesType.COMPLETED && !operation_info.has_review)
                        ?
                        <ConfirmButton onClick={() => setReviewPopup(true)}>
                            LEAVE A REVIEW
                        </ConfirmButton>
                        : operation_info?.status !== AppOperationBookingStatusesType.COMPLETED
                        && operation_info?.status !== AppOperationBookingStatusesType.CANCELED_BY_CLIENT
                        && operation_info?.status !== AppOperationBookingStatusesType.CANCELLED_BY_AGENT
                        && operation_info?.status !== AppOperationBookingStatusesType.CANCELLED_BY_SYSTEM
                        && operation_info?.status !== AppOperationBookingStatusesType.REJECTED
                        &&
                        <ActionsButtonsBlock agent_contact_name={props.agent_contact_name}
                                             client_contact_name={props.client_contact_name}
                                             operation_info={operation_info}
                                             my_name={my_name}
                                             company_type={company_type ? company_type : undefined}
                                             openAcceptPopup={openAcceptPopup}
                                             setTakeOver={setTakeOver}
                                             setIsCancelByAgent={setIsCancelByAgent}
                                             setIsCancelByClient={setIsCancelByClient}
                                             setClientChangRequestPopupVisible={setClientChangRequestPopupVisible}
                                             setEdit={props.setEdit}
                                             setChangeRequestPopup={props.setChangeRequestPopup}
                                             setReviewPopup={setReviewPopup}
                                             ATD={props.ATD}
                                             setCompleteOperationPopup={props.setCompleteOperationPopup}
                        />
                    }
                </ContentHeader>
                <GeneralBlockContainer operation_info={operation_info}
                                       shipment={shipment ? shipment : null}
                                       company_type={company_type}
                />
                <ConfirmedDatesContainerBlock shipment={shipment ? shipment : null}
                                              operation_info={operation_info}

                />
                {(operation_info?.status === AppOperationBookingStatusesType.CONFIRMED ||
                    operation_info?.status === AppOperationBookingStatusesType.CHANGE_REQUEST ||
                    operation_info?.status === AppOperationBookingStatusesType.CONFIRMED_CHANGE_REQUEST ||
                    operation_info?.status === AppOperationBookingStatusesType.AWAITING_PAYMENT ||
                    operation_info?.status === AppOperationBookingStatusesType.SHIPMENT_IN_PROGRESS
                )
                && <ShipmentTrackingBlock tracking={operation_info?.tracking}
                                          shipping_type={operation_info?.shipping_type}
                                          direction={operation_info?.freight_rate.origin.is_local ? 'export' : 'import'}
                                          origin_coordinates={operation_info?.freight_rate.origin.coordinates ? operation_info.freight_rate.origin.coordinates : null}
                                          destination_coordinates={operation_info?.freight_rate.destination.coordinates ? operation_info.freight_rate.destination.coordinates : null}
                                          company_type={company_type}
                                          shipping_mode_id={operation_info?.freight_rate.shipping_mode.id}
                                          automatic_tracking={operation_info.automatic_tracking}
                                          booking_id={operation_info.id}
                                          departure={shipment?.actual_date_of_departure ? shipment?.actual_date_of_departure : shipment?.date_of_departure ? shipment?.date_of_departure : undefined}
                                          arrival={shipment?.actual_date_of_arrival ? shipment?.actual_date_of_arrival : shipment?.date_of_arrival ? shipment?.date_of_arrival : undefined}
                />
                }
                <SectionWrapper>
                    <SectionTitle>CHARGES</SectionTitle>
                    {company_type?.type === AppCompaniesTypes.AGENT
                        ? (my_name === operation_info?.agent_contact_person
                            && (operation_info?.status === AppOperationBookingStatusesType.CONFIRMED ||
                                operation_info?.status === AppOperationBookingStatusesType.CHANGE_REQUEST ||
                                operation_info?.status === AppOperationBookingStatusesType.CONFIRMED_CHANGE_REQUEST ||
                                operation_info?.status === AppOperationBookingStatusesType.SHIPMENT_IN_PROGRESS ||
                                operation_info?.status === AppOperationBookingStatusesType.AWAITING_PAYMENT
                            )
                            && <PaymentDueByDates payment_due_by={operation_info?.payment_due_by}
                                                  operation_id={operation_info.id}

                            />)
                        : (operation_info?.payment_due_by
                            &&
                            (operation_info?.status === AppOperationBookingStatusesType.CONFIRMED ||
                                operation_info?.status === AppOperationBookingStatusesType.CHANGE_REQUEST ||
                                operation_info?.status === AppOperationBookingStatusesType.CONFIRMED_CHANGE_REQUEST ||
                                operation_info?.status === AppOperationBookingStatusesType.SHIPMENT_IN_PROGRESS ||
                                operation_info?.status === AppOperationBookingStatusesType.AWAITING_PAYMENT
                            )
                            &&
                            <PaymentDueByForClient payment_due_by={String(operation_info?.payment_due_by)}
                                                   agent_bank_account={operation_info?.agent_bank_account}
                                                   agent_name={operation_info?.agent_contact_person}
                            />
                        )
                    }
                    <ChargesBlock operation_charges={operation_info?.charges ? operation_info?.charges : null}
                                  number_of_docs={operation_info?.number_of_documents}
                                  charges_today_exchange={operation_info?.charges_today}
                    />
                </SectionWrapper>
                {(operation_info?.shipment_details &&
                    operation_info?.shipment_details.length > 0) ||
                (operation_info?.release_type && (
                    <DocsAndNotesBlock
                        notes={
                            operation_info?.shipment_details
                                ? operation_info?.shipment_details
                                : []
                        }
                        docs={{
                            release_type: operation_info?.release_type,
                            number_of_documents: operation_info?.number_of_documents,
                        }}
                    />
                ))}

                <ShipmentPartsBlock
                    shipper_info={
                        operation_info?.shipper ? operation_info?.shipper : null
                    }
                    client_info={{
                        company: String(operation_info?.client),
                        contact_person: String(operation_info?.client_contact_person),
                    }}
                />
                <CargoBlock
                    operation_shipping_type={String(operation_info?.shipping_type)}
                    operation_cargo_groups={operation_info?.cargo_groups}
                    operation_shipping_mode={operation_info?.freight_rate?.shipping_mode}
                    free_time={shipment?.container_free_time}
                    status={operation_info?.status}
                />
            </CardContent>
        </CardWrapper>
    );
};

export default OperationCard;