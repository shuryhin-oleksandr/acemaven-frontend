import React, { useEffect, useState } from "react";
import Layout from "../../../../components/BaseLayout/Layout";
import BillingPendingPage from "./BillingPendingPage";
import { useDispatch, useSelector } from "react-redux";
import { getClientBillingOperationsThunk } from "../../../../../_BLL/thunks/billing/agent/ClientBillingThunks";
import { AppStateType } from "../../../../../_BLL/store";
import ModalWindow from "../../../../components/_commonComponents/ModalWindow/ModalWindow";
import CancelPendingBilling from "../../../../components/PopUps/CancelPendingBillingPopup/CancelPendingBillingPopup";
import { clientBillingActions } from "../../../../../_BLL/reducers/billing/client/ClientBillingReducer";
import SpinnerForAuthorizedPages from "../../../../components/_commonComponents/spinner/SpinnerForAuthorizedPages";

const BillingPendingContainer: React.FC = () => {
  let dispatch = useDispatch();

  const [isCancelByClient, setIsCancelByClient] = useState(false);
  const [bookingId, setBookingId] = useState(0);

  useEffect(() => {
    dispatch(getClientBillingOperationsThunk("", "pending", "", ""));
    return () => {
      dispatch(clientBillingActions.setClientBillingList([]));
    };
  }, []);

  const billing_list = useSelector(
    (state: AppStateType) => state.client_billing.client_billing_operations_list
  );

  const cancelBooking = (showPopup: boolean, id: number) => {
    setBookingId(id);
    setIsCancelByClient(showPopup);
  };
  const isFetching = useSelector(
    (state: AppStateType) => state.client_billing.isFetching
  );

  return (
    <Layout>
      <ModalWindow isOpen={isCancelByClient}>
        <CancelPendingBilling
          setIsCancelByClient={setIsCancelByClient}
          id={bookingId}
        />
      </ModalWindow>
      {isFetching ? (
        <SpinnerForAuthorizedPages />
      ) : (
        <BillingPendingPage
          billing_list={billing_list}
          cancelBooking={cancelBooking}
        />
      )}
    </Layout>
  );
};

export default BillingPendingContainer;
