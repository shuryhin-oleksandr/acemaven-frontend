import React from "react";
import PendingPayment from "./PendingPayment";
import { VoidFunctionType } from "src/_BLL/types/commonTypes";
import { IAuthUserInfo } from "../../../../../_BLL/types/authTypes";
import ActiveQRPayment from "./ActiveQRPayment";
import { TransactionType } from "../../../../../_BLL/types/bookingTypes";
import WithoutServiceFeePayment from "./WithoutServiceFeePayment";

type PropsType = {
  setBookingPopupVisible: (value: boolean) => void;
  setWidgetsVisible?: (value: boolean) => void;
  newSearch?: any;
  close_totals?: VoidFunctionType;
  current_user: IAuthUserInfo | null;
  new_total_paid: boolean;
  quotes_mode?: boolean;
  transactions: TransactionType[];
  service_fee?: any;
};

const PaymentContainer: React.FC<PropsType> = ({
  setBookingPopupVisible,
  setWidgetsVisible,
  newSearch,
  transactions,
  service_fee,
  ...props
}) => {
  if (!service_fee) {
    return (
      <WithoutServiceFeePayment
        setBookingPopupVisible={setBookingPopupVisible}
        setWidgetsVisible={setWidgetsVisible}
        newSearch={newSearch}
        close_totals={props.close_totals}
      />
    );
  }

  return !props.new_total_paid &&
    props.current_user?.roles?.includes("client") ? (
    <PendingPayment
      setBookingPopupVisible={setBookingPopupVisible}
      setWidgetsVisible={setWidgetsVisible}
      newSearch={newSearch}
      close_totals={props.close_totals}
    />
  ) : (
    <ActiveQRPayment
      setBookingPopupVisible={setBookingPopupVisible}
      setWidgetsVisible={setWidgetsVisible}
      newSearch={newSearch}
      close_totals={props.close_totals}
      quotes_mode={props.quotes_mode}
      transactions={transactions}
    />
  );
};

export default PaymentContainer;
