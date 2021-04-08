import React from "react";
import { Content, Heading, Wrapper } from "./billing-pending-styles";
import BillingCard from "../BillingCard/BillingCard";
import { BillingOperationType } from "../../../../../_BLL/types/billing/billingTypes";
import NoQuotesCard from "../../../quotes/NoQuotesCard";
import {useTranslation} from "react-i18next";

type PropsType = {
  billing_list: BillingOperationType[];
  cancelBooking: (showPopup: boolean, id: number) => void;
  processPayment?: (showPopup: boolean, id: number) => void;
};

const BillingPendingPage: React.FC<PropsType> = ({
  billing_list,
  cancelBooking,
  processPayment,
}) => {
  const {t} = useTranslation();
  return (
    <Wrapper>
      <Content>
        <Heading>{t("Dashboard/PENDING OF BOOKING FEE PAYMENT")}</Heading>
        {billing_list.length > 0 ? (
          billing_list.map((i) => (
            <BillingCard
              billing={i}
              key={i.id}
              cancelBooking={cancelBooking}
              processPayment={processPayment}
            />
          ))
        ) : (
          <NoQuotesCard
            text={t("Dashboard/There are no operations pending of booking fee payment.")}
          />
        )}
      </Content>
    </Wrapper>
  );
};

export default BillingPendingPage;
