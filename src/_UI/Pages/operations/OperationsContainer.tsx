import React, { useEffect, useState } from "react";
//react-redux
import { useDispatch, useSelector } from "react-redux";
//BLL
import { AppStateType } from "../../../_BLL/store";
import { getAgentsOperationsThunk } from "../../../_BLL/thunks/operations/agent/OperationsAgentThunk";
import { getAgentsOperationsListSelector,getClientOperationsListSelector } from "../../../_BLL/selectors/operations/agentOperationsSelector";
//components
import Layout from "../../components/BaseLayout/Layout";
import AgentOperationsListContainer from "./agent/AgentOperationsListContainer";
import ClientOperationsListContainer from "./client/ClientOperationsListContainer";
import { getClientOperationsThunk } from "../../../_BLL/thunks/operations/client/OperationsClientThunk";
import ModalWindow from "../../components/_commonComponents/ModalWindow/ModalWindow";
import AgentChangeRequestPopup from "../../components/PopUps/change_request_agent_popup/AgentChangeRequestPopup";

const OperationsContainer: React.FC = () => {
  //data from store
  let company_type = useSelector(
    (state: AppStateType) =>
      state.profile.authUserInfo?.companies &&
      state.profile.authUserInfo?.companies[0]
  );
  let agent_operations_list = useSelector(getAgentsOperationsListSelector);
  let client_operations_list = useSelector(getClientOperationsListSelector);

  const dispatch = useDispatch();
  useEffect(() => {
    company_type?.type === "agent"
      ? dispatch(getAgentsOperationsThunk(mode, true, "", "", ""))
      : dispatch(getClientOperationsThunk(mode, true, "", "", ""));
  }, []);

  const [isSearchMode, setSearchMode] = useState(false);
  const [mode, setMode] = useState("sea"); //shipping_type
  const [searchValue, setSearchValue] = useState("");
  const [search_column, setSearchColumn] = useState("");
  const [my_operations, setMyOperations] = useState("mine");

  //const [isChangeRequestPopup, setChangeRequestPopup] = useState(true)

  return (
    <Layout>
      {/*<ModalWindow isOpen={isChangeRequestPopup}>*/}
      {/*  <AgentChangeRequestPopup setChangeRequestPopup={setChangeRequestPopup}*/}
      {/*  />*/}
      {/*</ModalWindow>*/}
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
        />
      )}
    </Layout>
  );
};

export default OperationsContainer;
