import React, {useEffect, useState} from 'react'
//react-redux
import {useDispatch, useSelector} from "react-redux";
//BLL
import {AppStateType} from "../../../../_BLL/store";
import {agentOperationsActions} from "../../../../_BLL/reducers/operations/agent/agentOperationsReducer";
import {clientOperationsActions} from "../../../../_BLL/reducers/operations/client/clientOperationsReducer";
import {getAgentsOperationsThunk} from "../../../../_BLL/thunks/operations/agent/OperationsAgentThunk";
import {getClientOperationsThunk} from "../../../../_BLL/thunks/operations/client/OperationsClientThunk";
import {
    getAgentsOperationsListSelector,
    getClientOperationsListSelector
} from "../../../../_BLL/selectors/operations/agentOperationsSelector";
//components
import Layout from "../../../components/BaseLayout/Layout";
import AgentOperationsListContainer from "../agent/AgentOperationsListContainer";
import ClientOperationsListContainer from "../client/ClientOperationsListContainer";



const  CompletedOperationsContainer:React.FC = () => {

    //local state
    const [isSearchMode, setSearchMode] = useState(false);
    const [mode, setMode] = useState("sea"); //shipping_type
    const [searchValue, setSearchValue] = useState("");
    const [search_column, setSearchColumn] = useState("");
    const [my_operations, setMyOperations] = useState("mine");

    let operation_status = 'completed'

    //data from store
    let company_type = useSelector(
        (state: AppStateType) =>
            state.profile.authUserInfo?.companies &&
            state.profile.authUserInfo?.companies[0]
    );
    let agent_operations_list = useSelector(getAgentsOperationsListSelector);
    let client_operations_list = useSelector(getClientOperationsListSelector);

    //hooks
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(agentOperationsActions.setAgentOperationsList([]))
        dispatch(clientOperationsActions.setClientOperationsList([]))
        if(company_type) {
            company_type?.type === "agent"
                ? dispatch(getAgentsOperationsThunk(mode, true, "", "", "", operation_status))
                : dispatch(getClientOperationsThunk(mode, true, "", "", "", operation_status));
        }
    }, [company_type]);

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
                    operations_list={agent_operations_list}
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
                    operations_list={client_operations_list}
                    operation_status={operation_status}
                />
            )}
        </Layout>
    )
}

export default CompletedOperationsContainer