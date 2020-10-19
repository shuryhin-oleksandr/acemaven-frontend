import React from "react";
import {
  CardButton,
  CardInner,
  CardTitle,
  SurchargeCardWrapper,
} from "./form-styles";
import { VoidFunctionType } from "../../../../../_BLL/types/commonTypes";
import {ShippingModeEnum} from "../../../../../_BLL/types/rates&surcharges/newSurchargesTypes";

type PropsType = {
  setNewSurchargePopUpVisible: VoidFunctionType;
  shippingValue: any
};

const NoSurchargeCard: React.FC<PropsType> = ({
  setNewSurchargePopUpVisible,
    shippingValue
}) => {


  return (
    <SurchargeCardWrapper length={shippingValue !== ShippingModeEnum.FCL || ShippingModeEnum.ULD  ? '-250px' : '30px'}>
      <CardInner>
        <CardTitle>
          There are no surcharges. <br />
          The rate won’t be posted until a matching surcharge agreement is
          created
        </CardTitle>
        <CardButton type='button' onClick={() => setNewSurchargePopUpVisible(true)}>
          Register new surcharges
        </CardButton>
      </CardInner>
    </SurchargeCardWrapper>
  );
};

export default NoSurchargeCard;
