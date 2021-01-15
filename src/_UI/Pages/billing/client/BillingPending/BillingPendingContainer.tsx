import React, { useEffect, useState } from "react";
import Layout from "../../../../components/BaseLayout/Layout";
import BillingPendingPage from "./BillingPendingPage";
import { useDispatch, useSelector } from "react-redux";
import { getClientBillingOperationsThunk } from "../../../../../_BLL/thunks/billing/agent/ClientBillingThunks";
import { AppStateType } from "../../../../../_BLL/store";

const BillingPendingContainer: React.FC = () => {
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(getClientBillingOperationsThunk("", "pending", "", ""));
  }, []);

  const billing_list = useSelector(
    (state: AppStateType) => state.client_billing.client_billing_operations_list
  );

  return (
    <Layout>
      <BillingPendingPage billing_list={billing_list} />
    </Layout>
  );
};

export default BillingPendingContainer;
