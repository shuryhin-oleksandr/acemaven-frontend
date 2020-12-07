import React, { useEffect, useState } from "react";
//react-redux
import { useDispatch, useSelector } from "react-redux";
//BLL
import { AppStateType } from "../../../_BLL/store";
import { getAgentsOperationsThunk } from "../../../_BLL/thunks/operations/agent/OperationsAgentThunk";
import {
  getAgentsOperationsListSelector,
  getCancellationConfirmationSelector
} from "../../../_BLL/selectors/operations/agentOperationsSelector";
import {agentOperationsActions} from "../../../_BLL/reducers/operations/agent/agentOperationsReducer";
import { getClientOperationsThunk } from "../../../_BLL/thunks/operations/client/OperationsClientThunk";
//components
import Layout from "../../components/BaseLayout/Layout";
import AgentOperationsListContainer from "./agent/AgentOperationsListContainer";
import ClientOperationsListContainer from "./client/ClientOperationsListContainer";
import ModalWindow from "../../components/_commonComponents/ModalWindow/ModalWindow";
import AgentCancellationBadReviewPopup
  from "../../components/PopUps/agent_bad_review_popup/AgentCancellationBadReviewPopup";


const OperationsContainer: React.FC = () => {
  //local state
  const [isSearchMode, setSearchMode] = useState(false);
  const [mode, setMode] = useState("sea"); //shipping_type
  const [searchValue, setSearchValue] = useState("");
  const [search_column, setSearchColumn] = useState("");
  const [my_operations, setMyOperations] = useState("mine");
  const [isBadReview, setBadReview] = useState(false)


  //data from store
  let company_type = useSelector(
    (state: AppStateType) =>
      state.profile.authUserInfo?.companies &&
      state.profile.authUserInfo?.companies[0]
  );
  let operations_list = useSelector(getAgentsOperationsListSelector);
  let cancellation_success = useSelector(getCancellationConfirmationSelector)

  //hooks
  const dispatch = useDispatch();
  useEffect(() => {
    company_type?.type === "agent"
      ? dispatch(getAgentsOperationsThunk(mode, true, "", "", ""))
      : dispatch(getClientOperationsThunk(mode, true, "", "", ""));
  }, []);

  useEffect(() => {
    if(cancellation_success) {
      setBadReview(true)
    }
  }, [cancellation_success])


  //handlers
  let setBadReviewHandler = () => {
    setBadReview(false)
    dispatch(agentOperationsActions.setCancellationConfirmation(''))
  }


  return (
    <Layout>
      <ModalWindow isOpen={isBadReview}>
        <AgentCancellationBadReviewPopup setBadReviewHandler={setBadReviewHandler}
        />
      </ModalWindow>
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
        />
      )}
    </Layout>
  );
};

export default OperationsContainer;
