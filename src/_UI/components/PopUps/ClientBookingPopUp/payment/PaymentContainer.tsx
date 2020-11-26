import React from "react";
import PendingPayment from "./PendingPayment";
import ActivePayment from "./ActivePayment";
import { VoidFunctionType } from "src/_BLL/types/commonTypes";
import {IAuthUserInfo} from "../../../../../_BLL/types/authTypes";

type PropsType = {
  setBookingPopupVisible: (value: boolean) => void;
  setWidgetsVisible?: (value: boolean) => void;
  newSearch?: any;
  close_totals?: VoidFunctionType,
  current_user: IAuthUserInfo | null,
  new_total_paid: boolean
};


const PaymentContainer: React.FC<PropsType> = ({
  setBookingPopupVisible,
  setWidgetsVisible,
  newSearch,
    ...props
}) => {
  return !props.new_total_paid /*&& props.current_user?.roles?.includes('client')*/ ? (
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
