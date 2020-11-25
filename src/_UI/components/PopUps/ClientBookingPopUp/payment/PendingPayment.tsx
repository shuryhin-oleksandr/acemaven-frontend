import React from "react";
import { Title, Container, Message } from "./payment-styles";
import BaseButton from "../../../base/BaseButton";
import {VoidFunctionType} from "../../../../../_BLL/types/commonTypes";

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
            setWidgetsVisible && setWidgetsVisible(true);
            newSearch && newSearch();
            props.close_totals && props.close_totals()
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
