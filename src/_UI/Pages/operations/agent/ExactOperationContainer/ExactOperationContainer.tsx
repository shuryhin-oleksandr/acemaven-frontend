import React, {useEffect, useState} from "react";
//moment js
import moment from "moment";
//react-router-dom
import {useHistory, withRouter } from "react-router-dom";
//react-redux
import {useDispatch, useSelector} from "react-redux";
//BLL
import {AppStateType} from "../../../../../_BLL/store";
import {getAgentExactOperationThunk} from "../../../../../_BLL/thunks/operations/agent/OperationsAgentThunk";
import {
    getExactOperationSelector,
    getIsFetchingOperationSelector
} from "../../../../../_BLL/selectors/operations/agentOperationsSelector";
//components
import Layout from "../../../../components/BaseLayout/Layout";
import OperationCard from "./OperationCard/OperationCard";
import AcceptPopup from "../../../../components/PopUps/accept_booking_popup/AcceptPopup";
import SpinnerForAuthorizedPages from "../../../../components/_commonComponents/spinner/SpinnerForAuthorizedPages";
import ModalWindow from "../../../../components/_commonComponents/ModalWindow/ModalWindow";
import ClientOperationChangeRequestPopUp
    from "../../../../components/PopUps/ClientOperationChangeRequestPopUp/ClientOperationChangeRequestPopUp";



const ExactOperationContainer = ({...props}) => {

    //local state
    let operation_id = props.match.params.id;
    let local_time = moment(new Date()).format(' DD/MM  h:mm a');
    let first_name = useSelector((state: AppStateType) => state.profile.authUserInfo?.first_name)
    let last_name = useSelector((state: AppStateType) => state.profile.authUserInfo?.last_name)
    let my_name = (first_name && first_name) + ' ' + (last_name && last_name)
    const [isAcceptPopup, openAcceptPopup] = useState(false)
    const [clientChangRequestPopupVisible, setClientChangRequestPopupVisible] = useState(false);

    //data from store
    let operation_info = useSelector(getExactOperationSelector)
    let isFetching = useSelector(getIsFetchingOperationSelector)
    let company_type = useSelector(
        (state: AppStateType) =>
            state.profile.authUserInfo?.companies &&
            state.profile.authUserInfo?.companies[0]
    );

    //hooks
    const history = useHistory()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAgentExactOperationThunk(operation_id))
    }, [])

  return (
    <Layout>
        <ModalWindow isOpen={isAcceptPopup}>
            <AcceptPopup openAcceptPopup={openAcceptPopup}
                         exact_operation_info={operation_info}
            />
        </ModalWindow>
        <ModalWindow isOpen={clientChangRequestPopupVisible}>
            <ClientOperationChangeRequestPopUp setIsOpen={setClientChangRequestPopupVisible} operation_info={operation_info}/>
        </ModalWindow>
        {isFetching || !operation_info
            ? <SpinnerForAuthorizedPages />
            : <OperationCard  operation_info={operation_info}
                              history={history}
                              local_time={local_time}
                              openAcceptPopup={openAcceptPopup}
                              my_name={String(my_name)}
                              company_type={company_type}
                              setClientChangRequestPopupVisible={setClientChangRequestPopupVisible}
            />
        }
    </Layout>
  );
};

export default withRouter(ExactOperationContainer);
