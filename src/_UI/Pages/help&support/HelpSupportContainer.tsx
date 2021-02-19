import React, { useState, useEffect } from "react";
//components
import Layout from "../../components/BaseLayout/Layout";
import HelpAndSupportPage from "./HelpAndSupportPage";
import TopicForm from "./form/TopicForm";
import { useDispatch } from "react-redux";
import {
  getCategoryChoicesThunk,
  getTicketsListThunk,
} from "../../../_BLL/thunks/support_thunk/supportThunk";

const HelpSupportContainer: React.FC = () => {
  const [isNewTopic, setNewTopic] = useState(false);

  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTicketsListThunk());
    dispatch(getCategoryChoicesThunk());
  }, []);

  return (
    <Layout>
      <>
        {isNewTopic ? (
          <TopicForm setNewTopic={setNewTopic} />
        ) : (
          <HelpAndSupportPage setNewTopic={setNewTopic} />
        )}
      </>
    </Layout>
  );
};

export default HelpSupportContainer;
