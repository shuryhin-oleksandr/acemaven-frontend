import React, { useState } from "react";
import {
  SectionTitle,
  SectionWrapper,
  ShipmentPartsRow,
} from "../operation-card-style";
import { IconButton } from "@material-ui/core";
import down_arrow from "../../../../../../assets/icons/rates&services/show_arrow.svg";
import up_arrow from "../../../../../../assets/icons/rates&services/hide_arrow.svg";
import {
  InfoRow,
  InfoRowLabel,
  InfoRowValue,
} from "../../../../../Requests/Booking_agent/booking_card/booking-card-style";

const ShipmentPartsBlock: React.FC = () => {
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

      <SectionTitle>SHIPMENT PARTS</SectionTitle>
      {!isHidden && (
        <div>
          <ShipmentPartsRow>
            <div
              style={{
                width: "20%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <InfoRow>
                <InfoRowLabel>CLIENT</InfoRowLabel>
                <InfoRowValue>CocaCola. Inc</InfoRowValue>
              </InfoRow>
              <InfoRow>
                <InfoRowLabel>Contact person</InfoRowLabel>
                <InfoRowValue>Ronald Richards</InfoRowValue>
              </InfoRow>
            </div>
            <div
              style={{
                width: "20%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <InfoRow>
                <InfoRowLabel>ADDRESS</InfoRowLabel>
                <InfoRowValue>CocaCola. Inc</InfoRowValue>
              </InfoRow>
              <InfoRow>
                <InfoRowLabel>EMAIL</InfoRowLabel>
                <InfoRowValue>Ronald Richards</InfoRowValue>
              </InfoRow>
            </div>
            <div
              style={{
                width: "20%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <InfoRow>
                <InfoRowLabel>PHONE NUMBER 1</InfoRowLabel>
                <InfoRowValue>CocaCola. Inc</InfoRowValue>
              </InfoRow>
              <InfoRow>
                <InfoRowLabel>PHONE NUMBER 2</InfoRowLabel>
                <InfoRowValue>Ronald Richards</InfoRowValue>
              </InfoRow>
            </div>
          </ShipmentPartsRow>
          <ShipmentPartsRow style={{ marginBottom: 0, borderBottom: "none" }}>
            <div
              style={{
                width: "20%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <InfoRow>
                <InfoRowLabel>SHIPPER</InfoRowLabel>
                <InfoRowValue>CocaCola. Inc</InfoRowValue>
              </InfoRow>
              <InfoRow>
                <InfoRowLabel>Contact person</InfoRowLabel>
                <InfoRowValue>Ronald Richards</InfoRowValue>
              </InfoRow>
            </div>
            <div
              style={{
                width: "20%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <InfoRow>
                <InfoRowLabel>ADDRESS</InfoRowLabel>
                <InfoRowValue>CocaCola. Inc</InfoRowValue>
              </InfoRow>
              <InfoRow>
                <InfoRowLabel>EMAIL</InfoRowLabel>
                <InfoRowValue>Ronald Richards</InfoRowValue>
              </InfoRow>
            </div>
            <div
              style={{
                width: "20%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <InfoRow>
                <InfoRowLabel>PHONE NUMBER 1</InfoRowLabel>
                <InfoRowValue>CocaCola. Inc</InfoRowValue>
              </InfoRow>
              <InfoRow>
                <InfoRowLabel>PHONE NUMBER 2</InfoRowLabel>
                <InfoRowValue>Ronald Richards</InfoRowValue>
              </InfoRow>
            </div>
          </ShipmentPartsRow>
        </div>
      )}
    </SectionWrapper>
  );
};

export default ShipmentPartsBlock;
