import React, { useEffect, useState } from "react";
import PendingPayment from "./PendingPayment";
import ActivePayment from "./ActivePayment";

type PropsType = {};

const role = "agent";
const PaymentContainer: React.FC<PropsType> = () => {
  return role !== "agent" ? <PendingPayment /> : <ActivePayment />;
};

export default PaymentContainer;
