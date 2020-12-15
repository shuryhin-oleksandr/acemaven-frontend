import React from "react";
//material ui
import {IconButton} from "@material-ui/core";
//types
import {AppOperationBookingStatusesType, OperationType} from "../../../../../../_BLL/types/operations/operationsTypes";
import {userCompaniesType} from "../../../../../../_BLL/types/authTypes";
import {AppCompaniesTypes, VoidFunctionType} from "../../../../../../_BLL/types/commonTypes";
//components
import DocsAndNotesBlock from "./blocks/DocsAndNotesBlock";
import ShipmentPartsBlock from "./blocks/ShipmentPartsBlock";
import CargoBlock from "./blocks/CargoBlock";
import ShipmentTrackingBlock from "./blocks/ShipmentTrackingBlock";
import PaymentDueByDates from "./PaymentDueByDates";
import ChargesBlock from "./blocks/ChargesBlock";
import GeneralBlockContainer from "./blocks/general_info/GeneralBlockContainer";
import ConfirmedDatesContainerBlock from "./blocks/cofirmed_dates/ConfirmedDatesContainerBlock";
import PaymentDueByForClient from "./PaymentDueByForClient";
import BookingNumberBlockContainer from "./blocks/booking_number/BookingNumberBlockContainer";
import BaseTooltip from "../../../../../components/_commonComponents/baseTooltip/BaseTooltip";
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
    OperationNumber,
    SectionTitle,
    SectionWrapper,
} from "./operation-card-style";
//icons
import close_icon from "../../../../../assets/icons/close-icon.svg";
import BookingNumberWithCarrierBlockContainer from "./blocks/booking_number/BookingNumberWithCarrierBlockContainer";

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
    closeHandler: VoidFunctionType,
    setTakeOver: (value: boolean) => void,
    setChangeRequestPopup: (value: boolean) => void,
    setEdit: (value: boolean) => void
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
                        {shipment?.booking_number_with_carrier &&
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
                    <ActionsButtons>
                        {operation_info?.has_change_request && company_type?.type === AppCompaniesTypes.AGENT && (my_name === props.agent_contact_name) &&
                        <AcceptButton style={{width: '206px'}} onClick={() => props.setChangeRequestPopup(true)}>
                            CONFIRM CHANGES
                        </AcceptButton>
                        }
                        {operation_info?.status === AppOperationBookingStatusesType.CONFIRMED && (my_name === props.agent_contact_name) &&
                        <AcceptButton style={{width: '146px'}} onClick={() => props.setEdit(true)}>
                            UPDATE
                        </AcceptButton>
                        }

                        {company_type?.type === AppCompaniesTypes.AGENT
                            ? (operation_info?.agent_contact_person === my_name
                                ? ( operation_info?.status !== AppOperationBookingStatusesType.CANCELLED_BY_AGENT &&
                                    <ConfirmButton onClick={() => openAcceptPopup(true)}>
                                        CONFIRM BOOKING
                                    </ConfirmButton>
                                )
                                : ( operation_info?.status !== AppOperationBookingStatusesType.CANCELLED_BY_AGENT &&
                                    <AcceptButton onClick={() => setTakeOver(true)}>
                                        TAKE OVER
                                    </AcceptButton>
                                ))
                            : (company_type?.type === AppCompaniesTypes.CLIENT
                                && my_name === props.client_contact_name
                                && operation_info?.status !== AppOperationBookingStatusesType.CANCELED_BY_CLIENT
                                &&
                                !operation_info.can_be_patched && operation_info.has_change_request
                                    ?
                                <BaseTooltip
                                    title={"You already have change request."}
                                >
                                    <span>
                                        <ConfirmButton disabled={true}
                                                       onClick={() => setClientChangRequestPopupVisible(true)}
                                        >
                                            REQUEST CHANGE
                                        </ConfirmButton>
                                    </span>
                                </BaseTooltip>
                                    :
                                <ConfirmButton onClick={() => setClientChangRequestPopupVisible(true)}>
                                    REQUEST CHANGE
                                </ConfirmButton>
                            )
                        }
                        {company_type?.type === AppCompaniesTypes.AGENT
                            ? (operation_info?.status === AppOperationBookingStatusesType.CONFIRMED && (my_name === props.agent_contact_name)
                                &&
                                <RejectButton onClick={() => setIsCancelByAgent(true)}>CANCEL OPERATION</RejectButton>
                            )
                            : (my_name === props.client_contact_name && operation_info?.status !== AppOperationBookingStatusesType.CANCELED_BY_CLIENT
                                &&
                                <RejectButton onClick={() => setIsCancelByClient(true)}>
                                    CANCEL OPERATION
                                </RejectButton>
                            )
                        }
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
                    {company_type?.type === AppCompaniesTypes.AGENT
                        ? (my_name === operation_info?.agent_contact_person && operation_info?.status === AppOperationBookingStatusesType.CONFIRMED
                            && <PaymentDueByDates payment_due_by={operation_info?.payment_due_by}
                                                  operation_id={operation_info.id}

                            />)
                        : (operation_info?.payment_due_by && operation_info?.status === AppOperationBookingStatusesType.CONFIRMED &&
                            <PaymentDueByForClient payment_due_by={String(operation_info?.payment_due_by)}
                                                   agent_bank_account={operation_info?.agent_bank_account}
                                                   agent_name={operation_info?.agent_contact_person}
                            />
                        )
                    }
                    <ChargesBlock operation_charges={operation_info?.charges ? operation_info?.charges : null}
                                  number_of_docs={operation_info?.number_of_documents}
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
