import React, { useEffect, useState } from "react";
import {
  ButtonsWrapper,
  ErrorMes,
  NewSearchButton,
  NoSearchContainer,
  NoSearchInner,
  NoSearchText,
  QuoteButton,
} from "./no-search-result-styles";
import { useDispatch, useSelector } from "react-redux";
import { AppStateType } from "../../../../../../_BLL/store";
import { quotesClientActions } from "../../../../../../_BLL/reducers/quotes/quotesClientReducer";

type PropsType = {
  newSearch: any;
  handleSubmit: any;
  onSubmit: any;
};

const NoSearchResultCard: React.FC<PropsType> = ({
  newSearch,
  handleSubmit,
  onSubmit,
}) => {
  const [confirmationMode, setConfirmationMode] = useState(false);
  let error = useSelector(
    (state: AppStateType) => state.client_quotes.response_error
  );
  let dispatch = useDispatch();
  useEffect(() => {
    return () => {
      setConfirmationMode(false);
      dispatch(quotesClientActions.setResponseError(null));
    };
  }, []);
  return (
    <NoSearchContainer>
      <NoSearchInner>
        {confirmationMode ? (
          <>
            <NoSearchText>Are you sure you want to post a quote?</NoSearchText>
            {error && <ErrorMes>{error}</ErrorMes>}
          </>
        ) : (
          <NoSearchText>
            Your search did not return any results; you can post it online as a
            quote for freight forwarders to submit their rates or adjust your
            filters and search again. Your privacy is protected, the agents
            won’t know who posted the quote until you book the offer
          </NoSearchText>
        )}

        <ButtonsWrapper>
          {confirmationMode ? (
            error ? (
              <NewSearchButton
                onClick={() => {
                  setConfirmationMode(false);
                }}
              >
                Ok
              </NewSearchButton>
            ) : (
              <>
                <QuoteButton onClick={() => handleSubmit(onSubmit)()}>
                  Yes
                </QuoteButton>
                <NewSearchButton
                  onClick={() => {
                    setConfirmationMode(false);
                  }}
                >
                  No
                </NewSearchButton>
              </>
            )
          ) : (
            <>
              <QuoteButton onClick={() => setConfirmationMode(true)}>
                POST AS A QUOTE
              </QuoteButton>
              <NewSearchButton
                onClick={() => {
                  newSearch();
                }}
              >
                NEW SEARCH
              </NewSearchButton>
            </>
          )}
        </ButtonsWrapper>
      </NoSearchInner>
    </NoSearchContainer>
  );
};

export default NoSearchResultCard;
