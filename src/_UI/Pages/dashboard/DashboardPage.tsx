import React, { useState } from "react";
import {
  DashWrapper,
  InnerWrapper,
  WidgetsContainer,
  WidgetButton,
} from "./dashboard-styles";
import SearchWidget from "./SearchWidget/SearchWidget";
import BaseWidget from "./BaseWidget/BaseWidget";

const DashboardPage: React.FC = () => {
  const [widgetsVisible, setWidgetsVisible] = useState(true);
  return (
    <DashWrapper>
      <InnerWrapper>
        <div>
          {widgetsVisible && (
            <WidgetsContainer>
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
            </WidgetsContainer>
          )}
        </div>
        <div>
          <WidgetButton onClick={() => setWidgetsVisible(!widgetsVisible)}>
            {widgetsVisible ? "Hide widgets" : "Show widgets"}
          </WidgetButton>
        </div>
      </InnerWrapper>
    </DashWrapper>
  );
};

export default DashboardPage;
