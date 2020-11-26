import React from "react";
import PendingPayment from "./PendingPayment";
import ActivePayment from "./ActivePayment";
import { VoidFunctionType } from "src/_BLL/types/commonTypes";
import ActiveQRPayment from "./ActiveQRPayment";

type PropsType = {
  setBookingPopupVisible: (value: boolean) => void;
  setWidgetsVisible?: (value: boolean) => void;
  newSearch?: any;
  close_totals?: VoidFunctionType;
};

const role = "client";
const PaymentContainer: React.FC<PropsType> = ({
  setBookingPopupVisible,
  setWidgetsVisible,
  newSearch,
  ...props
}) => {
  return role === "client" ? (
    <PendingPayment
      setBookingPopupVisible={setBookingPopupVisible}
      setWidgetsVisible={setWidgetsVisible}
      newSearch={newSearch}
      close_totals={props.close_totals}
    />
  ) : (
    // <ActivePayment/>
    <ActiveQRPayment
      setBookingPopupVisible={setBookingPopupVisible}
      setWidgetsVisible={setWidgetsVisible}
      newSearch={newSearch}
      close_totals={props.close_totals}
    />
  );
};

export default PaymentContainer;
