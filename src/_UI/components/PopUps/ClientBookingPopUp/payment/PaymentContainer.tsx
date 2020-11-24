import React, { useEffect, useState } from "react";
import PendingPayment from "./PendingPayment";
import ActivePayment from "./ActivePayment";

type PropsType = {
  setBookingPopupVisible: (value: boolean) => void;
  setWidgetsVisible?: (value: boolean) => void;
  newSearch?: any;
};

const role = "agent";
const PaymentContainer: React.FC<PropsType> = ({
  setBookingPopupVisible,
  setWidgetsVisible,
  newSearch,
}) => {
  return role === "agent" ? (
    <PendingPayment
      setBookingPopupVisible={setBookingPopupVisible}
      setWidgetsVisible={setWidgetsVisible}
      newSearch={newSearch}
    />
  ) : (
    <ActivePayment />
  );
};

export default PaymentContainer;
