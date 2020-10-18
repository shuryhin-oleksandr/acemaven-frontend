import React from "react";
import {
  CardButton,
  CardInner,
  CardTitle,
  SurchargeCardWrapper,
} from "./form-styles";
import { VoidFunctionType } from "../../../../../_BLL/types/commonTypes";

type PropsType = {
  setNewSurchargePopUpVisible: VoidFunctionType;
};

const NoSurchargeCard: React.FC<PropsType> = ({
  setNewSurchargePopUpVisible,
}) => {
  return (
    <SurchargeCardWrapper>
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
