import React from "react";
import {
  Content,
  Heading,
  Wrapper,
} from "../BillingPending/billing-pending-styles";
import BillingCard from "../BillingCard/BillingCard";
import OptionsDeliveryButtons from "../../../../components/_commonComponents/optionsButtons/delivery/OptionsDeliveryButtons";
import { BillingOperationType } from "../../../../../_BLL/types/billing/billingTypes";
import MonthPicker from "../../../../components/month_picker/MonthPicker";
import NoQuotesCard from "../../../quotes/NoQuotesCard";
import {useTranslation} from "react-i18next";

type PropsType = {
  billing_list: BillingOperationType[];
  mode: string;
  setMode: (data: string) => void;
  dates: string[];
  setDates: any;
};

const BillingCompletePage: React.FC<PropsType> = ({
  billing_list,
  mode,
  setMode,
  dates,
  setDates,
}) => {
  const {t} = useTranslation();
  return (
    <Wrapper>
      <Content>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "30px",
          }}
        >
          <Heading without_margin>{t("Billing/Billing Completed")}</Heading>
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              width: "450px",
              justifyContent: "flex-end",
            }}
          >
            <div style={{ marginRight: "15px" }}>
              <MonthPicker
                setDates={setDates}
                dates={dates}
                width="240px"
                placeholder={t("Bookings/Choose month")}
              />
            </div>
            <OptionsDeliveryButtons
              mode={mode}
              setMode={setMode}
              directory=""
              searchColumn=""
              searchValue=""
              thunkName="client_billing"
              dates={dates}
            />
          </div>
        </div>
        {billing_list.length > 0 ? (
          billing_list.map((i) => <BillingCard billing={i} key={i.id} />)
        ) : (
          <NoQuotesCard margin="0" text={t("Dashboard/There are no completed operations.")} />
        )}
      </Content>
    </Wrapper>
  );
};

export default BillingCompletePage;
