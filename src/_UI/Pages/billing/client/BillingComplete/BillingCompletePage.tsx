import React, { useState } from "react";
import {
  Content,
  Heading,
  Wrapper,
} from "../BillingPending/billing-pending-styles";
import BillingCard from "../BillingCard/BillingCard";
import { Row } from "../BillingCard/billing-card-styles";
import OptionsDeliveryButtons from "../../../../components/_commonComponents/optionsButtons/delivery/OptionsDeliveryButtons";
import SurchargeRateSelect from "../../../../components/_commonComponents/select/SurchargeRateSelect";

const BillingCompletePage: React.FC = () => {
  const [mode, setMode] = useState("sea");
  const [isSearchMode, setSearchMode] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [search_column, setSearchColumn] = useState("");
  const [month, setMonth] = useState(0);

  let month_options = [
    { id: 1, title: "april" },
    { id: 2, title: "may" },
    { id: 3, title: "june" },
  ];
  return (
    <Wrapper>
      <Content>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Heading>Complete</Heading>
          <div
            style={{
              display: "flex",
              alignItems:"flex-start",
              width:"350px"
            }}
          >
            <SurchargeRateSelect
              placeholder="Time range"
              hideLabel={true}
              options={month_options}
              callback={setMonth}
              margin_right="16px"
            />
            <OptionsDeliveryButtons
              mode={mode}
              setMode={setMode}
              directory=""
              searchColumn=""
              searchValue=""
              // thunkName="rates"
            />
          </div>
        </div>
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
