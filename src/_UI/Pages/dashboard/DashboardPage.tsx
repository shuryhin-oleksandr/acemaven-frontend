import React from "react";
import { DashWrapper, InnerWrapper } from "./dashboard-styles";
import SearchWidget from "./SearchWidget/SearchWidget";
import BaseWidget from "./BaseWidget/BaseWidget";

const DashboardPage: React.FC = () => {
  return (
    <DashWrapper>
      <InnerWrapper>
        <div style={{ width: "60%", marginRight: 70 }}>
          <SearchWidget />
        </div>
        <div style={{ flex: 1 }}>
          <BaseWidget heading="pending of Booking Fee payment">
            children
          </BaseWidget>
          <BaseWidget heading="latest quotes receive">
            children
          </BaseWidget>
          <BaseWidget heading="latest racking Status update">
            children
          </BaseWidget>
        </div>
      </InnerWrapper>
    </DashWrapper>
  );
};

export default DashboardPage;
