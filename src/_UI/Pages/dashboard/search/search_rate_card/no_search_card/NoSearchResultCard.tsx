import React from "react";
import {
  ButtonsWrapper,
  NewSearchButton,
  NoSearchContainer,
  NoSearchInner,
  NoSearchText,
  QuoteButton,
} from "./no-search-result-styles";

type PropsType = {
  newSearch: any;
  handleSubmit:any;
  onSubmit:any;
};

const NoSearchResultCard: React.FC<PropsType> = ({ newSearch,handleSubmit,onSubmit }) => {
  return (
    <NoSearchContainer>
      <NoSearchInner>
        <NoSearchText>
          Your search did not return any results; you can post it online as a
          quote for freight forwarders to submit their rates or adjust your
          filters and search again. Your privacy is protected, the agents won’t
          know who posted the quote until you book the offer
        </NoSearchText>
        <ButtonsWrapper>
          <QuoteButton onClick={()=>handleSubmit(onSubmit)()}>POST AS A QUOTE</QuoteButton>
          <NewSearchButton
            onClick={() => {
              newSearch();
            }}
          >
            NEW SEARCH
          </NewSearchButton>
        </ButtonsWrapper>
      </NoSearchInner>
    </NoSearchContainer>
  );
};

export default NoSearchResultCard;
