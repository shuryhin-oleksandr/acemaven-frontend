import React, { useState } from "react";
import { SectionTitle, SectionWrapper } from "../operation-card-style";
import { IconButton } from "@material-ui/core";
import down_arrow from "../../../../../../assets/icons/rates&services/show_arrow.svg";
import up_arrow from "../../../../../../assets/icons/rates&services/hide_arrow.svg";
import { InfoRowLabel } from "../../../../../Requests/Booking_agent/booking_card/booking-card-style";
import CargoGroupsTable from "./Tables/CargoGroupsTable";
import {CargoGroupQuoteType} from "../../../../../../../_BLL/types/quotes/quotesTypes";

type PropsType = {
    operation_shipping_type: string,
    operation_cargo_groups: CargoGroupQuoteType[],
    operation_shipping_mode: {id: number, title: string}
}

const CargoBlock: React.FC<PropsType> = ({operation_shipping_type, operation_cargo_groups, operation_shipping_mode}) => {
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
        <SectionTitle>CARGO</SectionTitle>
        {!isHidden && (
            <>
            {operation_shipping_type === 'sea' && <div style={{ display: "flex", marginBottom: '20px' }}>
                    <InfoRowLabel>CONTAINER FREE TIME:</InfoRowLabel>
                    <span style={{ marginLeft: "5px" }}>5 DAYS</span>
                </div>}
                <CargoGroupsTable cargo_groups={operation_cargo_groups}
                                  object_shipping_mode={operation_shipping_mode}
                />
            </>
        )}
      </div>
    </SectionWrapper>
  );
};

export default CargoBlock;
