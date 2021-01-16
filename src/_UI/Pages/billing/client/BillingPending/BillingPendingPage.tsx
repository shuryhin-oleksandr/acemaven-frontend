import React from "react";
import { Content, Heading, Wrapper } from "./billing-pending-styles";
import BillingCard from "../BillingCard/BillingCard";
import { BillingOperationType } from "../../../../../_BLL/types/billing/billingTypes";

type PropsType = {
  billing_list: BillingOperationType[];
  cancelBooking: (showPopup: boolean, id: number) => void;
};

const BillingPendingPage: React.FC<PropsType> = ({ billing_list,cancelBooking }) => {
  return (
    <Wrapper>
      <Content>
        <Heading>Pending of booking fee payment</Heading>
        {billing_list.map((i) => (
          <BillingCard billing={i} key={i.id} cancelBooking={cancelBooking} />
        ))}
      </Content>
    </Wrapper>
  );
};

export default BillingPendingPage;
