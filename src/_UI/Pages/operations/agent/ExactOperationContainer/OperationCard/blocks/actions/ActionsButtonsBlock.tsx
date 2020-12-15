import React from 'react'
import {AppCompaniesTypes} from "../../../../../../../../_BLL/types/commonTypes";
import {
    AppOperationBookingStatusesType,
    OperationType
} from "../../../../../../../../_BLL/types/operations/operationsTypes";
import {
    AcceptButton,
    ActionsButtons,
    ConfirmButton,
    RejectButton
} from "../../../../../../Requests/Booking_agent/booking_card/booking-card-style";


type PropsType = {
    operation_info: OperationType
    my_name: string,
    company_type: {id: number, type: string} | undefined,
    agent_contact_name: string,
    client_contact_name: string,
    setChangeRequestPopup: (value: boolean) => void,
    setEdit: (value: boolean) => void,
    openAcceptPopup: (value: boolean) => void,
    setTakeOver: (value: boolean) => void,
    setClientChangRequestPopupVisible: (value: boolean) => void,
    setIsCancelByAgent: (value: boolean) => void,
    setIsCancelByClient: (value: boolean) => void,
}

const ActionsButtonsBlock:React.FC<PropsType> = ({operation_info, my_name, company_type, ...props}) => {
    return (
        <ActionsButtons>
            {operation_info?.has_change_request
            && company_type?.type === AppCompaniesTypes.AGENT && (my_name === props.agent_contact_name)
            && operation_info?.status !== AppOperationBookingStatusesType.CANCELLED_BY_AGENT
            && operation_info?.status !== AppOperationBookingStatusesType.CANCELED_BY_CLIENT
            &&
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
                    ? ( operation_info?.status !== AppOperationBookingStatusesType.CANCELLED_BY_AGENT
                        && operation_info?.status !== AppOperationBookingStatusesType.CANCELED_BY_CLIENT
                        && operation_info?.status !== AppOperationBookingStatusesType.CONFIRMED
                        &&
                        <ConfirmButton onClick={() => props.openAcceptPopup(true)}>
                            CONFIRM BOOKING
                        </ConfirmButton>
                    )
                    : ( operation_info?.status !== AppOperationBookingStatusesType.CANCELLED_BY_AGENT &&
                        <AcceptButton onClick={() => props.setTakeOver(true)}>
                            TAKE OVER
                        </AcceptButton>
                    ))
                : (company_type?.type === AppCompaniesTypes.CLIENT
                    && my_name === props.client_contact_name
                    && operation_info?.status !== AppOperationBookingStatusesType.CANCELED_BY_CLIENT
                    && operation_info?.status !== AppOperationBookingStatusesType.CANCELLED_BY_AGENT
                    &&
                    <ConfirmButton onClick={() => props.setClientChangRequestPopupVisible(true)}>
                        REQUEST CHANGE
                    </ConfirmButton>
                )
            }
            {company_type?.type === AppCompaniesTypes.AGENT
                ? (operation_info?.status === AppOperationBookingStatusesType.CONFIRMED && (my_name === props.agent_contact_name)
                    &&
                    <RejectButton onClick={() => props.setIsCancelByAgent(true)}>CANCEL OPERATION</RejectButton>
                )
                : (my_name === props.client_contact_name
                    && operation_info?.status !== AppOperationBookingStatusesType.CANCELED_BY_CLIENT
                    && operation_info?.status !== AppOperationBookingStatusesType.CANCELLED_BY_AGENT
                    &&
                    <RejectButton onClick={() => props.setIsCancelByClient(true)}>
                        CANCEL OPERATION
                    </RejectButton>
                )
            }
        </ActionsButtons>
    )
}

export default ActionsButtonsBlock
