import React from "react";
//react-redux
import { useDispatch, useSelector } from "react-redux";
//BLL
import { AppStateType } from "../../../../../_BLL/store";
import { quotesClientActions } from "../../../../../_BLL/reducers/quotes/quotesClientReducer";
//types
import { VoidFunctionType } from "../../../../../_BLL/types/commonTypes";
//components
import BaseButton from "../../../base/BaseButton";
//styles
import { Title, Container, Message, QRWrapper } from "./payment-styles";
import { getClientQuotesThunk } from "../../../../../_BLL/thunks/quotes/clientQuotesThunk";
import QRCode from "qrcode.react";
import { TransactionType } from "../../../../../_BLL/types/bookingTypes";
import {useTranslation} from "react-i18next";

type PropsType = {
  setBookingPopupVisible: (value: boolean) => void;
  setWidgetsVisible?: (value: boolean) => void;
  newSearch?: any;
  close_totals?: VoidFunctionType;
  quotes_mode?: boolean;
  transactions?: TransactionType[];
};

const ActiveQRPayment: React.FC<PropsType> = ({
  setWidgetsVisible,
  setBookingPopupVisible,
  newSearch,
  transactions,
  ...props
}) => {
  const dispatch = useDispatch();
  let archive_quote_id = useSelector(
    (state: AppStateType) => state.client_quotes.future_archive_quote_id
  );

  let clickHandler = () => {
    setBookingPopupVisible(false);
    setWidgetsVisible && setWidgetsVisible(true);
    newSearch && newSearch();
    props.quotes_mode &&
      dispatch(quotesClientActions.deleteQuoteFromList(archive_quote_id)) &&
      dispatch(getClientQuotesThunk("sea", "", "", ""));
    props.close_totals && props.close_totals();
  };
  const {t} = useTranslation();
  return (
    <Container>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "15px",
          justifyContent: "space-between",
        }}
      >
        <Title>{t("Booking process/PAYMENT")}</Title>
        <BaseButton onClick={clickHandler} type="button">
          {t("Complete Profile/COMPLETE ACCOUNT")}
        </BaseButton>
      </div>
      <Message>
        {t("Billing/Mesaage_Bil_Allow")}
      </Message>
      <QRWrapper>
        <QRCode
          renderAs="svg"
          value={
            transactions && transactions.length > 0
              ? transactions[0].qr_code
              : ""
          }
        />
      </QRWrapper>
    </Container>
  );
};

export default ActiveQRPayment;
