import React from "react";
//components
import TopicCard from "./TopicCard";
//styles
import {
  AddTopicOption,
  AddTopicText,
  SupportContent,
  SupportInner,
  SupportOuter,
  SupportTitle,
} from "./help-support-styles";
import { useSelector } from "react-redux";
import { AppStateType } from "../../../_BLL/store";
import SpinnerForAuthorizedPages from "../../components/_commonComponents/spinner/SpinnerForAuthorizedPages";

type PropsType = {
  setNewTopic: (value: boolean) => void;
};

const HelpAndSupportPage: React.FC<PropsType> = ({ setNewTopic }) => {
  let isFetching = useSelector(
    (state: AppStateType) => state.support_reducer.isFetching
  );

  let tickets_list = useSelector(
    (state: AppStateType) => state.support_reducer.tickets_list
  );

  return isFetching ? (
    <SpinnerForAuthorizedPages />
  ) : (
    <SupportOuter>
      <SupportInner>
        <SupportTitle>Help and Support</SupportTitle>
        <SupportContent>
          <AddTopicOption>
            <AddTopicText onClick={() => setNewTopic(true)}>
              + Add New
            </AddTopicText>
          </AddTopicOption>
          {tickets_list.map((t) => (
            <TopicCard key={t.id} ticket={t} />
          ))}
        </SupportContent>
      </SupportInner>
    </SupportOuter>
  );
};

export default HelpAndSupportPage;
