import React, { useState } from "react";
import { SectionTitle, SectionWrapper } from "../operation-card-style";
import { IconButton } from "@material-ui/core";
import down_arrow from "../../../../assets/icons/rates&services/show_arrow.svg";
import up_arrow from "../../../../assets/icons/rates&services/hide_arrow.svg";
import { InfoRowLabel } from "../../../Requests/Booking_agent/booking_card/booking-card-style";

const CargoBlock: React.FC = () => {
  const [isHidden, setHidden] = useState(false);
  return (
    <SectionWrapper
      style={{
        position: "relative",
      }}
    >
      <IconButton
        style={{
          padding: "0px",
          height: "35px",
          width: "35px",
          position: "absolute",
          right: "20px",
        }}
        onClick={() => (isHidden ? setHidden(false) : setHidden(true))}
      >
        <img
          src={isHidden ? down_arrow : up_arrow}
          alt=""
          style={{ width: "14px" }}
        />
      </IconButton>
      <div>
        <SectionTitle>Cargo</SectionTitle>
        {!isHidden && (
          <div style={{ display: "flex" }}>
            <InfoRowLabel>Container Free time:</InfoRowLabel>
            <span style={{ marginLeft: "5px" }}>5 DAYS</span>
          </div>
        )}
      </div>
    </SectionWrapper>
  );
};

export default CargoBlock;
