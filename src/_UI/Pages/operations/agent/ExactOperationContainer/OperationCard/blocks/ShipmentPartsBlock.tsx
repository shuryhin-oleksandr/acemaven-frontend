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
import {ShipperType} from "../../../../../../../_BLL/types/bookingTypes";

type PropsType = {
    shipper_info: ShipperType | null,
    client_info: {company: string, contact_person: string}
}

const ShipmentPartsBlock: React.FC<PropsType> = ({shipper_info, client_info}) => {
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
            {client_info.company !== shipper_info?.name &&
            <ShipmentPartsRow>
                <div
                    style={{
                        display: "flex",
                        width: '58.5%',
                        justifyContent: 'space-between'
                    }}
                >
                    <InfoRow >
                        <InfoRowLabel>CLIENT</InfoRowLabel>
                        <InfoRowValue>{client_info.company}</InfoRowValue>
                    </InfoRow>
                    <InfoRow>
                        <InfoRowLabel>CONTACT PERSON</InfoRowLabel>
                        <InfoRowValue>{client_info.contact_person}</InfoRowValue>
                    </InfoRow>
                </div>
            </ShipmentPartsRow>
            }
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
                <InfoRowValue>{shipper_info?.name}</InfoRowValue>
              </InfoRow>
              <InfoRow>
                <InfoRowLabel>CONTACT PERSON</InfoRowLabel>
                <InfoRowValue>{shipper_info?.contact_name}</InfoRowValue>
              </InfoRow>
            </div>
            <div
              style={{
                width: "20%",
                display: "flex",
                flexDirection: "column",
              }}
            >
                {shipper_info?.address_line_first &&
                <InfoRow>
                    <InfoRowLabel>ADDRESS</InfoRowLabel>
                    <InfoRowValue>{shipper_info?.address_line_first}{','}{shipper_info?.address_line_second}</InfoRowValue>
                </InfoRow>}

              <InfoRow>
                <InfoRowLabel>EMAIL</InfoRowLabel>
                <InfoRowValue>{shipper_info?.email}</InfoRowValue>
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
                <InfoRowValue>{shipper_info?.phone}</InfoRowValue>
              </InfoRow>
                {shipper_info?.phone_additional && <InfoRow>
                    <InfoRowLabel>PHONE NUMBER 2</InfoRowLabel>
                    <InfoRowValue>{shipper_info?.phone_additional}</InfoRowValue>
                </InfoRow>
                }
            </div>
          </ShipmentPartsRow>
        </div>
      )}
    </SectionWrapper>
  );
};

export default ShipmentPartsBlock;
