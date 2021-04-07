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
import {useTranslation} from "react-i18next";

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

  const {t} = useTranslation();
  return (
    <NoSearchContainer>
      <NoSearchInner>
        {confirmationMode ? (
          <>
            <NoSearchText>{t("Bookings/post_quote_question?")}</NoSearchText>
            {error && <ErrorMes>{error}</ErrorMes>}
          </>
        ) : (
          <NoSearchText>
            {t("Bookings/your_search_?")}
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
                {t("Email notifications/OK")}

              </NewSearchButton>
            ) : (
              <>
                <QuoteButton onClick={() => handleSubmit(onSubmit)()}>
                  {t("Email notifications/YES")}
                </QuoteButton>
                <NewSearchButton
                  onClick={() => {
                    setConfirmationMode(false);
                  }}
                >
                  {t("Email notifications/NO")}
                </NewSearchButton>
              </>
            )
          ) : (
            <>
              <QuoteButton onClick={() => setConfirmationMode(true)}>
                {t("Dashboard/POST AS QUOTE")}
              </QuoteButton>
              <NewSearchButton
                onClick={() => {
                  newSearch();
                }}
              >
                {t("Dashboard/NEW SEARCH")}
              </NewSearchButton>
            </>
          )}
        </ButtonsWrapper>
      </NoSearchInner>
    </NoSearchContainer>
  );
};

export default NoSearchResultCard;
