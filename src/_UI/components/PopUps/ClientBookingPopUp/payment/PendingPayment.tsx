import React from "react";
import { Title, Container, Message } from "./payment-styles";
import BaseButton from "../../../base/BaseButton";
import {VoidFunctionType} from "../../../../../_BLL/types/commonTypes";
import {useTranslation} from "react-i18next";

type PropsType = {
  setBookingPopupVisible: (value: boolean) => void;
  setWidgetsVisible?: (value: boolean) => void;
  newSearch?: any;
  close_totals?: VoidFunctionType
};

const PendingPayment: React.FC<PropsType> = ({
  setWidgetsVisible,
  setBookingPopupVisible,
  newSearch,
    ...props
}) => {
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
        <BaseButton
          onClick={() => {
            setBookingPopupVisible(false);
            setWidgetsVisible && setWidgetsVisible(true);
            newSearch && newSearch();
            props.close_totals && props.close_totals()
          }}
          type="button"
        >
          {t("Complete Profile/COMPLETE ACCOUNT")}
        </BaseButton>
      </div>
      <Message>
        {t("Booking process/Your_Booking")}
      </Message>
    </Container>
  );
};

export default PendingPayment;
