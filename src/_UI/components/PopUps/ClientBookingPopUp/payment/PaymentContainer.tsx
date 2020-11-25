import React from "react";
import PendingPayment from "./PendingPayment";
import ActivePayment from "./ActivePayment";
import { VoidFunctionType } from "src/_BLL/types/commonTypes";

type PropsType = {
  setBookingPopupVisible: (value: boolean) => void;
  setWidgetsVisible?: (value: boolean) => void;
  newSearch?: any;
  close_totals?: VoidFunctionType
};

const role = "agent";
const PaymentContainer: React.FC<PropsType> = ({
  setBookingPopupVisible,
  setWidgetsVisible,
  newSearch,
    ...props
}) => {
  return role === "agent" ? (
    <PendingPayment
      setBookingPopupVisible={setBookingPopupVisible}
      setWidgetsVisible={setWidgetsVisible}
      newSearch={newSearch}
      close_totals={props.close_totals}
    />
  ) : (
    <ActivePayment />
  );
};

export default PaymentContainer;
