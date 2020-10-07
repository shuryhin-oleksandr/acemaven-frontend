import React, { useState } from "react";
import {
  DashWrapper,
  InnerWrapper,
  WidgetsContainer,
  WidgetButton,
} from "./dashboard-styles";
import SearchWidget from "./Widgets/SearchWidget/SearchWidget";
import BaseWidget from "./Widgets/BaseWidgetContainer/BaseWidgetContainer";
import makeStyles from "@material-ui/core/styles/makeStyles";
import FeePaymentWidget from "./Widgets/FeePaymentWidget/FeePaymentWidget";
import LatestQuotesWidget from "./Widgets/LatestQoutesWidget/LatestQuotesWidget";
import RackingStatusWidget from "./Widgets/RackingStatusWidget/RackingStatusWidget";

const useStyles = makeStyles({
  table: {
    "& .MuiTableHead-root": {},
  },
  cell: {
    color: "#115B86",
    fontFamily: "Helvetica Bold",
    fontSize: "14px",
    borderBottom: "1px solid #115B86",
    padding: "0",
    paddingBottom: "7px",
  },
  innerCell: {
    fontFamily: "Helvetica Light",
    fontSize: "14px",
    color: "#1B1B25",
    padding: "5px 0",
    border: "none",
    maxWidth: "140px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  boldCell: {
    fontFamily: "Helvetica Bold",
    fontSize: "14px",
    color: "#1B1B25",
    padding: "5px 0",
    border: "none",
  },
});

const DashboardPage: React.FC = () => {
  const [widgetsVisible, setWidgetsVisible] = useState(true);
  const classes = useStyles();

  return (
    <DashWrapper>
      <InnerWrapper>
        <div>
          {widgetsVisible && (
            <WidgetsContainer>
              <div style={{ width: "60%", marginRight: "5%" }}>
                <SearchWidget />
              </div>
              <div style={{ flex: 1 }}>
                <FeePaymentWidget />
                <LatestQuotesWidget />
                <RackingStatusWidget />
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
