import React from "react";
import { Content, Heading, Wrapper } from "./billing-pending-styles";
import BillingCard from "../BillingCard/BillingCard";

const BillingPendingPage: React.FC = () => {
  return (
    <Wrapper>
      <Content>
        <Heading>Pending of booking fee payment</Heading>
        <BillingCard />
        <BillingCard />
        <BillingCard />
        <BillingCard />
        <BillingCard />
      </Content>
    </Wrapper>
  );
};

export default BillingPendingPage;
