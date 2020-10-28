import React from "react";
import {
  CardButton,
  CardInner,
  CardTitle,
  SurchargeCardWrapper,
} from "./form-styles";
import { VoidFunctionType } from "../../../../../_BLL/types/commonTypes";

import {ContainerType} from "../../../../../_BLL/types/rates&surcharges/surchargesTypes";

type PropsType = {
  setNewSurchargePopUpVisible: VoidFunctionType;
  shippingValue: any,
  usageFees: ContainerType[] | null
};

const NoSurchargeCard: React.FC<PropsType> = ({
  setNewSurchargePopUpVisible,
    usageFees
}) => {


  return (
    <SurchargeCardWrapper usageFees={usageFees} >
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
