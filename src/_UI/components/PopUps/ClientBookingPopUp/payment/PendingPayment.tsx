import React, { useEffect, useState } from "react";
import { Title, Container, Message } from "./payment-styles";
import { bookingActions } from "../../../../../_BLL/reducers/bookingReducer";
import BaseButton from "../../../base/BaseButton";

type PropsType = {
  setBookingPopupVisible: (value: boolean) => void;
  setWidgetsVisible: (value: boolean) => void;
};

const PendingPayment: React.FC<PropsType> = ({
  setWidgetsVisible,
  setBookingPopupVisible,
}) => {
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
        <Title>PAYMENT</Title>
        <BaseButton
          onClick={() => {
            setBookingPopupVisible(false);
            setWidgetsVisible(true);
          }}
          type="button"
        >
          FINISH
        </BaseButton>
      </div>
      <Message>
        Your booking request is still pending of payment, the person in charge
        for processing payments in your company will be notified to process it
        so it can be sent to the agent.
      </Message>
    </Container>
  );
};

export default PendingPayment;
