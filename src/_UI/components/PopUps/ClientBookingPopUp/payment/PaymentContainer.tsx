import React, { useEffect, useState } from "react";
import PendingPayment from "./PendingPayment";
import ActivePayment from "./ActivePayment";

type PropsType = {
  setBookingPopupVisible: (value: boolean) => void;
  setWidgetsVisible: (value: boolean) => void;
};

const role = "agent";
const PaymentContainer: React.FC<PropsType> = ({
  setBookingPopupVisible,
  setWidgetsVisible,
}) => {
  return role === "agent" ? (
    <PendingPayment
      setBookingPopupVisible={setBookingPopupVisible}
      setWidgetsVisible={setWidgetsVisible}
    />
  ) : (
    <ActivePayment />
  );
};

export default PaymentContainer;
