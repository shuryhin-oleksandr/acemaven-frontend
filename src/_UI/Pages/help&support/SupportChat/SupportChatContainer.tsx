import React, { useEffect } from "react";
//components
import Layout from "../../../components/BaseLayout/Layout";

import { useDispatch } from "react-redux";
import SupportChatPage from "./SupportChatPage";
import { withRouter } from "react-router-dom";
import { getExactTicketThunk } from "../../../../_BLL/thunks/support_thunk/supportThunk";
import { supportActions } from "../../../../_BLL/reducers/support_reducer/supportReducer";

const SupportChatContainer = ({ ...props }) => {
  let dispatch = useDispatch();
  const chatId = props.match.params.id;
  useEffect(() => {
    dispatch(getExactTicketThunk(chatId));
    return () => removeExactTicket();
  }, []);

  const removeExactTicket = () => {
    dispatch(supportActions.setExactTicket(null));
  };
  return (
    <Layout>
      <SupportChatPage />
    </Layout>
  );
};

export default withRouter(SupportChatContainer);
