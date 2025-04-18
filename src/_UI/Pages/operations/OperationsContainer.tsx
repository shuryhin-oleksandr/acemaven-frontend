import React, {useEffect, useState} from "react";
//react-redux
import {useDispatch, useSelector} from "react-redux";
//BLL
import {AppStateType} from "../../../_BLL/store";
import {getAgentsOperationsThunk} from "../../../_BLL/thunks/operations/agent/OperationsAgentThunk";
import {
    getAgentOperationsIsFetching,
    getAgentsOperationsListSelector,
    getClientOperationsIsFetching,
    getClientOperationsListSelector
} from "../../../_BLL/selectors/operations/agentOperationsSelector";
import {getClientOperationsThunk} from "../../../_BLL/thunks/operations/client/OperationsClientThunk";
import {agentOperationsActions} from "../../../_BLL/reducers/operations/agent/agentOperationsReducer";
import {clientOperationsActions} from "../../../_BLL/reducers/operations/client/clientOperationsReducer";
//components
import Layout from "../../components/BaseLayout/Layout";
import AgentOperationsListContainer from "./agent/AgentOperationsListContainer";
import ClientOperationsListContainer from "./client/ClientOperationsListContainer";
import SpinnerForAuthorizedPages from "../../components/_commonComponents/spinner/SpinnerForAuthorizedPages";



const OperationsContainer: React.FC = () => {
    //local state
    const [isSearchMode, setSearchMode] = useState(false);
    const [mode, setMode] = useState("sea"); //shipping_type
    const [searchValue, setSearchValue] = useState("");
    const [search_column, setSearchColumn] = useState("");
    const [my_operations, setMyOperations] = useState("mine");
    const [isSmallBar, setSmallBar] = useState(false)


    //data from store
    let company_type = useSelector(
        (state: AppStateType) =>
            state.profile.authUserInfo?.companies &&
            state.profile.authUserInfo?.companies[0]
    );
    let agent_operations_list = useSelector(getAgentsOperationsListSelector);
    let client_operations_list = useSelector(getClientOperationsListSelector);
    let isFetchingAgent = useSelector(getAgentOperationsIsFetching)
    let isFetchingClient = useSelector(getClientOperationsIsFetching)
    let operation_status = 'active'

    //hooks
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(agentOperationsActions.setAgentOperationsList([]))
        dispatch(clientOperationsActions.setClientOperationsList([]))
        if (company_type) {
            company_type?.type === "agent"
                ? dispatch(getAgentsOperationsThunk(mode, true, "", "", "", operation_status))
                : dispatch(getClientOperationsThunk(mode, true, "", "", "", operation_status));
        }
    }, [company_type]);


    return (
        <Layout>
            {(isFetchingAgent || isFetchingClient)
                ? <SpinnerForAuthorizedPages/>
                : <>
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
                            operation_status={operation_status}
                            operations_list={client_operations_list}
                        />
                    )}
                </>
            }

        </Layout>
    );
};

export default OperationsContainer;
