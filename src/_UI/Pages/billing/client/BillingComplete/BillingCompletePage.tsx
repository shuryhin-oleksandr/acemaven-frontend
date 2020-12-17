import React from "react";
import {
  Content,
  Heading,
  Wrapper,
} from "../BillingPending/billing-pending-styles";
import BillingCard from "../BillingCard/BillingCard";

const BillingCompletePage: React.FC = () => {
  return (
    <Wrapper>
      <Content>
        <Heading>Complete</Heading>
        <BillingCard />
        <BillingCard />
        <BillingCard />
        <BillingCard />
        <BillingCard />
      </Content>
    </Wrapper>
  );
};

export default BillingCompletePage;
