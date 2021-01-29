import React, {useEffect, useState} from "react";
//moment js
import moment from "moment";
//react-router-dom
import {useHistory, useParams, withRouter} from "react-router-dom";
//react-redux
import {useDispatch, useSelector} from "react-redux";
//BLL
import {AppStateType} from "../../../../../_BLL/store";
import {
    cancelOperationByAgentThunk, completeOperationByAgentThunk,
    getAgentExactOperationThunk, takeOverThunk
} from "../../../../../_BLL/thunks/operations/agent/OperationsAgentThunk";
import {
    getCancellationConfirmationSelector, getChangeRequestConfirmationSelector,
    getExactOperationSelector,
    getIsFetchingOperationSelector, getTakedOverSelector,
    getExactClientOperationSelector, getEditOperationSuccessSelector, getManualTrackingDataSelector
} from "../../../../../_BLL/selectors/operations/agentOperationsSelector";
import {agentOperationsActions} from "../../../../../_BLL/reducers/operations/agent/agentOperationsReducer";
import {getClientExactOperationThunk} from "../../../../../_BLL/thunks/operations/client/OperationsClientThunk";
//types
import {AppCompaniesTypes} from "../../../../../_BLL/types/commonTypes";
import {AppOperationBookingStatusesType} from "../../../../../_BLL/types/operations/operationsTypes";
//helpers
import {actualDepartureHelper} from "../../../../../_BLL/helpers/tracker/actualDepartureHelper";
//components
import Layout from "../../../../components/BaseLayout/Layout";
import OperationCard from "./OperationCard/OperationCard";
import AcceptPopup from "../../../../components/PopUps/accept_booking_popup/AcceptPopup";
import SpinnerForAuthorizedPages from "../../../../components/_commonComponents/spinner/SpinnerForAuthorizedPages";
import ModalWindow from "../../../../components/_commonComponents/ModalWindow/ModalWindow";
import ClientOperationChangeRequestPopUp
    from "../../../../components/PopUps/ClientOperationChangeRequestPopUp/ClientOperationChangeRequestPopUp";
import CompleteOperationPopup from "../../../../components/PopUps/complete_operation_by_agent/CompleteOperationPopup";
import CancelOperationByAgentPopup
    from "../../../../components/PopUps/cancel_operation_by_agent_popup/CancelOperationByAgentPopup";
import AgentChangeRequestPopup from "../../../../components/PopUps/change_request_agent_popup/AgentChangeRequestPopup";
import CancelOperationByClientPopup
    from "../../../../components/PopUps/CancelOperationByClientPopup/CancelOperationByClientPopup";
import TakeOverOperationPopup from "../../../../components/PopUps/take_over_operation_popup/TakeOverOperationPopup";
import EditOperationShipmentInfoByAgentPopup
    from "../../../../components/PopUps/edit_operation_shipment_info_by_agent/EditOperationShipmentInfoByAgentPopup";
import ClientReviewPopup from "../../../../components/PopUps/client_review_popup/ClientReviewPopup";




const ExactOperationContainer = ({...props}) => {
    //local state
    let operation_id = props.match.params.id;
    let local_time = moment(new Date()).format(" DD/MM  h:mm a");

    const [isSmallBar, setSmallBar] = useState(false)
    const [isAcceptPopup, openAcceptPopup] = useState(false);
    const [clientChangRequestPopupVisible, setClientChangRequestPopupVisible] = useState(false);
    const [isCompleteOperation, setCompleteOperationPopup] = useState(false);
    const [isCancelByAgent, setIsCancelByAgent] = useState(false);
    const [isChangeRequestPopup, setChangeRequestPopup] = useState(false);
    const [isCancelByClient, setIsCancelByClient] = useState(false);
    const [isTakeOverPopup, setTakeOver] = useState(false);
    const [isEditOperationByAgent, setEditOperationByAgent] = useState(false);
    const [isReviewPopup, setReviewPopup] = useState(false);

    //data from store
    let company_type = useSelector((state: AppStateType) => state.profile.authUserInfo?.companies && state.profile.authUserInfo?.companies[0]);
    let agent_operation_info = useSelector(getExactOperationSelector);
    let client_operation_info = useSelector(getExactClientOperationSelector);
    let operation_info = company_type?.type === 'agent' ? agent_operation_info : client_operation_info;
    let isFetching = useSelector(getIsFetchingOperationSelector)
    let cancellation_success = useSelector(getCancellationConfirmationSelector)
    let first_name = useSelector((state: AppStateType) => state.profile.authUserInfo?.first_name)
    let last_name = useSelector((state: AppStateType) => state.profile.authUserInfo?.last_name)
    let my_name = (first_name && first_name) + ' ' + (last_name && last_name)
    let my_id = useSelector((state: AppStateType) => state.profile.authUserInfo?.id)
    let change_request_reaction = useSelector(getChangeRequestConfirmationSelector)
    let taked_over = useSelector(getTakedOverSelector)
    let edit_operation_by_agent_success = useSelector(getEditOperationSuccessSelector)
    let manual_tracking_data = useSelector(getManualTrackingDataSelector)


    let ATD = actualDepartureHelper(operation_info, manual_tracking_data)

//handlers
    const closeHandler = () => {
        if (operation_info?.status === AppOperationBookingStatusesType.CANCELED_BY_CLIENT) {
            history.push("/operations_cancelled")
        }
        if (operation_info?.status === AppOperationBookingStatusesType.CANCELLED_BY_AGENT) {
            history.push("/operations_cancelled")
        }
        if (operation_info?.status === AppOperationBookingStatusesType.CANCELLED_BY_SYSTEM) {
            history.push("/operations_cancelled")
        }
        if (operation_info?.status === AppOperationBookingStatusesType.COMPLETED) {
            history.push("/operations_completed")
        }
        if ((operation_info?.status === AppOperationBookingStatusesType.IN_PROGRESS) || (operation_info?.status === AppOperationBookingStatusesType.CONFIRMED
        ) || (operation_info?.status === AppOperationBookingStatusesType.RECEIVED)) {
            history.push("/operations_active")
        }
    }

    const unmountHandler = () => {
        dispatch(agentOperationsActions.setAgentExactOperationInfo(null))
        dispatch(agentOperationsActions.saveTrackingToStore([]))
    }
    const takeOverAsyncHandler = () => {
        dispatch(takeOverThunk(Number(my_id), Number(operation_info?.id)))
    }
    const completeOperationHandler = () => {
        dispatch(completeOperationByAgentThunk(Number(operation_info?.id), history))
    }

    //hooks
    const history = useHistory();
    const dispatch = useDispatch();
    let query = useParams();
    // @ts-ignore
    let id = query.id;


    useEffect(() => {
        company_type && (company_type?.type === "agent"
            ? dispatch(getAgentExactOperationThunk(operation_id))
            : dispatch(getClientExactOperationThunk(operation_id)));
        return () => {
            unmountHandler();
        };
    }, [company_type]);

    let cancelOperationByAgentHandler = (data: { reason: string, comment: string }) => {
        dispatch(cancelOperationByAgentThunk(id, data, history))
    }

    useEffect(() => {
        if (cancellation_success) {
            setIsCancelByAgent(false)
        }
    }, [cancellation_success])

    useEffect(() => {
        if (operation_info?.has_change_request
            && company_type?.type === AppCompaniesTypes.AGENT
            && agent_operation_info?.agent_contact_person === my_name
            && agent_operation_info?.status !== AppOperationBookingStatusesType.CANCELLED_BY_AGENT
            && agent_operation_info?.status !== AppOperationBookingStatusesType.CANCELED_BY_CLIENT
        ) {
            setChangeRequestPopup(true)
        }
    }, [operation_info?.has_change_request])

    useEffect(() => {
        if (change_request_reaction) {
            setChangeRequestPopup(false)
            dispatch(agentOperationsActions.setChangeRequestConfirmation(''))
        }
    }, [change_request_reaction])
    useEffect(() => {
        if (taked_over) {
            setTakeOver(false)
            dispatch(agentOperationsActions.setTakedOver(''))
        }
    }, [taked_over])
    useEffect(() => {
        if (edit_operation_by_agent_success) {
            setEditOperationByAgent(false)
            dispatch(agentOperationsActions.setEditSuccess(''))
        }
    }, [edit_operation_by_agent_success])

    return (
        <Layout isSmallBar={isSmallBar} setSmallBar={setSmallBar}>
            <ModalWindow isOpen={isAcceptPopup}>
                <AcceptPopup
                    openAcceptPopup={openAcceptPopup}
                    exact_operation_info={operation_info}
                />
            </ModalWindow>
            <ModalWindow isOpen={isCompleteOperation}>
                <CompleteOperationPopup
                    setCompleteOperationPopup={setCompleteOperationPopup}
                    completeOperationHandler={completeOperationHandler}
                />
            </ModalWindow>
            <ModalWindow isOpen={isReviewPopup}>
                <ClientReviewPopup
                    setReviewPopup={setReviewPopup}
                    id={id}
                />
            </ModalWindow>
            <ModalWindow isOpen={isCancelByAgent}>
                <CancelOperationByAgentPopup setIsCancelByAgent={setIsCancelByAgent}
                                             cancelOperationByAgentHandler={cancelOperationByAgentHandler}/>
            </ModalWindow>
            <ModalWindow isOpen={isCancelByClient}>
                <CancelOperationByClientPopup
                    setIsCancelByClient={setIsCancelByClient}
                    id={operation_info?.id}
                />
            </ModalWindow>
            {operation_info && (
                <ModalWindow isOpen={clientChangRequestPopupVisible}>
                    <ClientOperationChangeRequestPopUp
                        setIsOpen={setClientChangRequestPopupVisible}
                        operation_info={operation_info}
                    />
                </ModalWindow>)}
            {!ATD && <ModalWindow isOpen={isChangeRequestPopup}>
                <AgentChangeRequestPopup setChangeRequestPopup={setChangeRequestPopup}
                                         operation_info={operation_info ? operation_info : null}
                />
            </ModalWindow>
            }
            <ModalWindow isOpen={isTakeOverPopup}>
                <TakeOverOperationPopup setTakeOver={setTakeOver}
                                        takeOverAsyncHandler={takeOverAsyncHandler}
                />
            </ModalWindow>
            <ModalWindow isOpen={isEditOperationByAgent}>
                <EditOperationShipmentInfoByAgentPopup operation_info={operation_info ? operation_info : null}
                                                       setEdit={setEditOperationByAgent}
                />
            </ModalWindow>

            {isFetching || !operation_info
                ? <SpinnerForAuthorizedPages/>
                : <OperationCard operation_info={operation_info}
                                 local_time={local_time}
                                 openAcceptPopup={openAcceptPopup}
                                 my_name={String(my_name)}
                                 agent_contact_name={String(operation_info?.agent_contact_person)}
                                 client_contact_name={String(operation_info?.client_contact_person)}
                                 company_type={company_type}
                                 setClientChangRequestPopupVisible={setClientChangRequestPopupVisible}
                                 setIsCancelByAgent={setIsCancelByAgent}
                                 setIsCancelByClient={setIsCancelByClient}
                                 setCompleteOperationPopup={setCompleteOperationPopup}
                                 closeHandler={closeHandler}
                                 setTakeOver={setTakeOver}
                                 setChangeRequestPopup={setChangeRequestPopup}
                                 setEdit={setEditOperationByAgent}
                                 ATD={ATD}
                                 setReviewPopup={setReviewPopup}
                />
            }
        </Layout>
    );
};

export default withRouter(ExactOperationContainer);
