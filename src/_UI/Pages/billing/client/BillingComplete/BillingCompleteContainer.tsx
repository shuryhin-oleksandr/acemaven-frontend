import React, { useEffect, useState } from "react";
import Layout from "../../../../components/BaseLayout/Layout";
import BillingCompletePage from "./BillingCompletePage";
import { useDispatch, useSelector } from "react-redux";
import { getClientBillingOperationsThunk } from "../../../../../_BLL/thunks/billing/agent/ClientBillingThunks";
import { AppStateType } from "../../../../../_BLL/store";
import moment from "moment";

const BillingCompleteContainer: React.FC = () => {
  const [mode, setMode] = useState("sea");
  const [dates, setDates] = useState([]);

  let dispatch = useDispatch();

  useEffect(() => {
    let date_from = dates.length ? moment(dates[0]).format("DD/MM/YYYY") : "";
    let date_to = dates.length
      ? moment(dates[1]).add(1, "days").format("DD/MM/YYYY")
      : "";
    dispatch(
      getClientBillingOperationsThunk(mode, "completed", date_from, date_to)
    );
  }, [dates]);

  const billing_list = useSelector(
    (state: AppStateType) => state.client_billing.client_billing_operations_list
  );

  return (
    <Layout>
      <BillingCompletePage
        mode={mode}
        setMode={setMode}
        dates={dates}
        setDates={setDates}
        billing_list={billing_list}
      />
    </Layout>
  );
};

export default BillingCompleteContainer;
