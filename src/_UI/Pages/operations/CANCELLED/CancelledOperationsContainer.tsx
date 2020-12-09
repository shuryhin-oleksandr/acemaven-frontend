import React, {useEffect, useState} from 'react'
import Layout from "../../../components/BaseLayout/Layout";
import AgentOperationsListContainer from "../agent/AgentOperationsListContainer";
import ClientOperationsListContainer from "../client/ClientOperationsListContainer";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../../../_BLL/store";
import {
    getAgentsOperationsListSelector
} from "../../../../_BLL/selectors/operations/agentOperationsSelector";
import {getAgentsOperationsThunk} from "../../../../_BLL/thunks/operations/agent/OperationsAgentThunk";
import {getClientOperationsThunk} from "../../../../_BLL/thunks/operations/client/OperationsClientThunk";

import {agentOperationsActions} from "../../../../_BLL/reducers/operations/agent/agentOperationsReducer";
import {clientOperationsActions} from "../../../../_BLL/reducers/operations/client/clientOperationsReducer";




const CancelledOperationsContainer = () => {
    const [isSearchMode, setSearchMode] = useState(false);
    const [mode, setMode] = useState("sea"); //shipping_type
    const [searchValue, setSearchValue] = useState("");
    const [search_column, setSearchColumn] = useState("");
    const [my_operations, setMyOperations] = useState("mine");


    //data from store
    let company_type = useSelector(
        (state: AppStateType) =>
            state.profile.authUserInfo?.companies &&
            state.profile.authUserInfo?.companies[0]
    );
    let operations_list = useSelector(getAgentsOperationsListSelector);
    let operation_status = 'canceled'


    //hooks
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(agentOperationsActions.setAgentOperationsList([]))
        dispatch(clientOperationsActions.setClientOperationsList([]))
        if(operation_status) {
            company_type?.type === "agent"
                ? dispatch(getAgentsOperationsThunk(mode, true, "", "", "", operation_status))
                : dispatch(getClientOperationsThunk(mode, true, "", "", "", operation_status));
        }
    }, [operation_status]);


    return (
        <Layout>
            {company_type?.type === "agent" ? (
                <AgentOperationsListContainer
                    setSearchMode={setSearchMode}
                    isSearchMode={isSearchMode}
                    mode={mode}
                    setMode={setMode}
                    searchValue={searchValue}
                    setSearchValue={setSearchValue}
                    search_column={search_column}
                    setSearchColumn={setSearchColumn}
                    my_operations={my_operations}
                    setMyOperations={setMyOperations}
                    operations_list={operations_list}
                    operation_status={operation_status}
                />
            ) : (
                <ClientOperationsListContainer
                    setSearchMode={setSearchMode}
                    isSearchMode={isSearchMode}
                    mode={mode}
                    setMode={setMode}
                    searchValue={searchValue}
                    setSearchValue={setSearchValue}
                    search_column={search_column}
                    setSearchColumn={setSearchColumn}
                    my_operations={my_operations}
                    setMyOperations={setMyOperations}
                    operations_list={operations_list}
                    operation_status={operation_status}
                />
            )}
        </Layout>
    )
}


export default CancelledOperationsContainer