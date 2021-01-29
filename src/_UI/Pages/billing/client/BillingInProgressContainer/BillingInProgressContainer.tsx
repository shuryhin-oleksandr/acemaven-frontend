import React, { useEffect } from "react";
//react-redux
import { useDispatch, useSelector } from "react-redux";
//BLL
import { AppStateType } from "../../../../../_BLL/store";
import { getClientBillingOperationsThunk } from "../../../../../_BLL/thunks/billing/agent/ClientBillingThunks";
import { clientBillingActions } from "../../../../../_BLL/reducers/billing/client/ClientBillingReducer";
//components
import Layout from "../../../../components/BaseLayout/Layout";
import BillingInProgressPage from "./BillingInProgressPage";
import SpinnerForAuthorizedPages from "../../../../components/_commonComponents/spinner/SpinnerForAuthorizedPages";



const BillingInProgressContainer: React.FC = () => {
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(getClientBillingOperationsThunk("", "active", "", ""));
    return () => {
      dispatch(clientBillingActions.setClientBillingList([]));
    };
  }, []);
  const billing_list = useSelector(
    (state: AppStateType) => state.client_billing.client_billing_operations_list
  );

  const isFetching = useSelector(
    (state: AppStateType) => state.client_billing.isFetching
  );

  return (
    <Layout>
      {isFetching ? (
        <SpinnerForAuthorizedPages />
      ) : (
        <BillingInProgressPage billing_list={billing_list} />
      )}
    </Layout>
  );
};

export default BillingInProgressContainer;
