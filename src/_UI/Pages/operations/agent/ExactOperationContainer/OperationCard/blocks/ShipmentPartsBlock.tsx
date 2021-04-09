import React, { useState } from "react";
//material ui
import { IconButton } from "@material-ui/core";
//types
import { ShipperType } from "../../../../../../../_BLL/types/bookingTypes";
//styles
import {
  SectionTitle,
  SectionWrapper,
  ShipmentPartsRow,
} from "../operation-card-style";
import {
  InfoRow,
  InfoRowLabel,
  InfoRowValue,
} from "../../../../../Requests/Booking_agent/booking_card/booking-card-style";
//icons
import down_arrow from "../../../../../../assets/icons/rates&services/show_arrow.svg";
import up_arrow from "../../../../../../assets/icons/rates&services/hide_arrow.svg";
import { useSelector } from "react-redux";
import { AppStateType } from "../../../../../../../_BLL/store";
import { AppCompaniesTypes } from "../../../../../../../_BLL/types/commonTypes";

type PropsType = {
  shipper_info: ShipperType | null;
  client_info: { company: string; contact_person: string };
  agent_info: { company: string | null; contact_person: string | null };
  direction?: string;
};

const ShipmentPartsBlock: React.FC<PropsType> = ({
  shipper_info,
  client_info,
  agent_info,
  direction,
}) => {
  const [isHidden, setHidden] = useState(false);
  let company_type = useSelector(
    (state: AppStateType) =>
      state.profile.authUserInfo?.companies &&
      state.profile.authUserInfo?.companies[0].type
  );
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
          {company_type === AppCompaniesTypes.CLIENT ? (
            !!agent_info.company &&
            !!agent_info.contact_person && (
              <ShipmentPartsRow style={{ borderBottom: "none" }}>
                <div
                  style={{
                    display: "flex",
                    width: "100%",
                    // justifyContent: "space-between",
                  }}
                >
                  <div
                    style={{
                      width: "20%",
                      borderBottom: "1px solid #dcdcdc",
                    }}
                  >
                    <InfoRow>
                      <InfoRowLabel>AGENT</InfoRowLabel>
                      <InfoRowValue>{agent_info.company}</InfoRowValue>
                    </InfoRow>
                  </div>
                  <div
                    style={{
                      width: "20%",
                      borderBottom: "1px solid #dcdcdc",
                    }}
                  >
                    <InfoRow>
                      <InfoRowLabel>CONTACT PERSON</InfoRowLabel>
                      <InfoRowValue>{agent_info.contact_person}</InfoRowValue>
                    </InfoRow>
                  </div>
                </div>
              </ShipmentPartsRow>
            )
          ) : (
            <ShipmentPartsRow style={{ borderBottom: "none" }}>
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  // justifyContent: "space-between",
                }}
              >
                <div
                  style={{
                    width: "20%",
                    borderBottom: "1px solid #dcdcdc",
                  }}
                >
                  <InfoRow>
                    <InfoRowLabel>CLIENT</InfoRowLabel>
                    <InfoRowValue>{client_info.company}</InfoRowValue>
                  </InfoRow>
                </div>
                <div
                  style={{
                    width: "20%",
                    borderBottom: "1px solid #dcdcdc",
                  }}
                >
                  <InfoRow>
                    <InfoRowLabel>CONTACT PERSON</InfoRowLabel>
                    <InfoRowValue>{client_info.contact_person}</InfoRowValue>
                  </InfoRow>
                </div>
              </div>
            </ShipmentPartsRow>
          )}

          {company_type === AppCompaniesTypes.AGENT && direction === "import" && (
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
                <InfoRow>
                  <InfoRowLabel>ADDRESS</InfoRowLabel>
                  <InfoRowValue>{shipper_info?.city}</InfoRowValue>
                </InfoRow>
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
                {shipper_info?.phone_additional && (
                  <InfoRow>
                    <InfoRowLabel>PHONE NUMBER 2</InfoRowLabel>
                    <InfoRowValue>
                      {shipper_info?.phone_additional}
                    </InfoRowValue>
                  </InfoRow>
                )}
              </div>
            </ShipmentPartsRow>
          )}
          {company_type === AppCompaniesTypes.CLIENT && (
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
              </div>
            </ShipmentPartsRow>
          )}
        </div>
      )}
    </SectionWrapper>
  );
};

export default ShipmentPartsBlock;
