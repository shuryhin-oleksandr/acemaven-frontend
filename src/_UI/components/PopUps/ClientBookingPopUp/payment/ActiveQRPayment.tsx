import React from "react";
import { Title, Container, Message } from "./payment-styles";
import BaseButton from "../../../base/BaseButton";
import { VoidFunctionType } from "../../../../../_BLL/types/commonTypes";

type PropsType = {
  setBookingPopupVisible: (value: boolean) => void;
  setWidgetsVisible?: (value: boolean) => void;
  newSearch?: any;
  close_totals?: VoidFunctionType;
};

const ActiveQRPayment: React.FC<PropsType> = ({
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
            props.close_totals && props.close_totals();
          }}
          type="button"
        >
          FINISH
        </BaseButton>
      </div>
      <Message>
        Your booking request for your shipment Aceid has been sent successfully
        to Freight Forwarder’s Company name (or to the agent if this info is not
        disclosed yet) and will appear in the Operations section. Once
        confirmed, you will receive a notification by email.
      </Message>
    </Container>
  );
};

export default ActiveQRPayment;
