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
    cancelOperationByAgentThunk,
    getAgentExactOperationThunk, takeOverThunk
} from "../../../../../_BLL/thunks/operations/agent/OperationsAgentThunk";
import {
    getCancellationConfirmationSelector, getChangeRequestConfirmationSelector,
    getExactOperationSelector,
    getIsFetchingOperationSelector, getTakedOverSelector
} from "../../../../../_BLL/selectors/operations/agentOperationsSelector";
import {agentOperationsActions} from "../../../../../_BLL/reducers/operations/agent/agentOperationsReducer";
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
import TakeOverOperationPopup from "../../../../components/PopUps/take_over_operation_popup/TakeOverOperationPopup";




const ExactOperationContainer = ({...props}) => {

    //local state
    let operation_id = props.match.params.id;
    let local_time = moment(new Date()).format(' DD/MM  h:mm a');

    const [isAcceptPopup, openAcceptPopup] = useState(false)
    const [clientChangRequestPopupVisible, setClientChangRequestPopupVisible] = useState(false);
    const [isCompleteOperation, setCompleteOperationPopup] = useState(false)
    const [isCancelByAgent, setIsCancelByAgent] = useState(false)
    const [isChangeRequestPopup, setChangeRequestPopup] = useState(false)
    const [isTakeOverPopup, setTakeOver] = useState(false)


    //data from store
    let operation_info = useSelector(getExactOperationSelector)
    let isFetching = useSelector(getIsFetchingOperationSelector)
    let company_type = useSelector((state: AppStateType) => state.profile.authUserInfo?.companies);
    let cancellation_success = useSelector(getCancellationConfirmationSelector)
    let first_name = useSelector((state: AppStateType) => state.profile.authUserInfo?.first_name)
    let last_name = useSelector((state: AppStateType) => state.profile.authUserInfo?.last_name)
    let my_name = (first_name && first_name) + ' ' + (last_name && last_name)
    let my_id = useSelector((state: AppStateType) => state.profile.authUserInfo?.id)
    let change_request_reaction = useSelector(getChangeRequestConfirmationSelector)
    let taked_over = useSelector(getTakedOverSelector)

    //handlers
    const closeHandler = () => {
        dispatch(agentOperationsActions.setAgentExactOperationInfo(null))
        history.push("/operations")
    }
    const unmountHandler = () => {
        dispatch(agentOperationsActions.setAgentExactOperationInfo(null))
    }
    const takeOverAsyncHandler = () => {
        dispatch(takeOverThunk(Number(my_id), Number(operation_info?.id)))
    }

    //hooks
    const history = useHistory()
    const dispatch = useDispatch()
    let query = useParams()
    // @ts-ignore
    let id = query.id


    useEffect(() => {
        dispatch(getAgentExactOperationThunk(operation_id))
        return () => {
            unmountHandler()
        }
    }, [])

    let cancelOperationByAgentHandler = (data: {reason: string, comment: string}) => {
        dispatch(cancelOperationByAgentThunk(id, data, history))
    }

    useEffect(() => {
        if(cancellation_success) {
            setIsCancelByAgent(false)
        }
    }, [cancellation_success])

    useEffect(() => {
        if(operation_info?.has_change_request) {
            setChangeRequestPopup(true)
        }
    }, [operation_info?.has_change_request])

    useEffect(() => {
        if(change_request_reaction) {
            setChangeRequestPopup(false)
            dispatch(agentOperationsActions.setChangeRequestConfirmation(''))
        }
    }, [change_request_reaction])
    useEffect(() => {
        if(taked_over) {
            setTakeOver(false)
            dispatch(agentOperationsActions.setTakedOver(''))
        }
    }, [])


  return (
    <Layout>
        <ModalWindow isOpen={isAcceptPopup}>
            <AcceptPopup openAcceptPopup={openAcceptPopup}
                         exact_operation_info={operation_info}
            />
        </ModalWindow>
        <ModalWindow isOpen={isCompleteOperation }>
            <CompleteOperationPopup setCompleteOperationPopup={setCompleteOperationPopup}/>
        </ModalWindow>
        <ModalWindow isOpen={isCancelByAgent}>
            <CancelOperationByAgentPopup setIsCancelByAgent={setIsCancelByAgent}
                                         cancelOperationByAgentHandler={cancelOperationByAgentHandler}
            />
        </ModalWindow>
        {operation_info &&  <ModalWindow isOpen={clientChangRequestPopupVisible}>
            <ClientOperationChangeRequestPopUp setIsOpen={setClientChangRequestPopupVisible} operation_info={operation_info}/>
        </ModalWindow>}
        <ModalWindow isOpen={isChangeRequestPopup}>
          <AgentChangeRequestPopup setChangeRequestPopup={setChangeRequestPopup}
                                   operation_info={operation_info ? operation_info : null}
          />
        </ModalWindow>
        <ModalWindow isOpen={isTakeOverPopup}>
            <TakeOverOperationPopup setTakeOver={setTakeOver}
                                    takeOverAsyncHandler={takeOverAsyncHandler}
            />
        </ModalWindow>

        {isFetching || !operation_info
            ? <SpinnerForAuthorizedPages />
            : <OperationCard  operation_info={operation_info}
                              closeHandler={closeHandler}
                              local_time={local_time}
                              openAcceptPopup={openAcceptPopup}
                              my_name={String(my_name)}
                              company_type={company_type && company_type[0]}
                              setClientChangRequestPopupVisible={setClientChangRequestPopupVisible}
                              setIsCancelByAgent={setIsCancelByAgent}
                              setTakeOver={setTakeOver}
            />
        }
    </Layout>
  );
};

export default withRouter(ExactOperationContainer);
