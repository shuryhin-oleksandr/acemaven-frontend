import React from "react";
import { VoidFunctionType } from "../../../../../_BLL/types/commonTypes";
import {
  OptionButton,
  OptionButtonPlane,
  OptionsButtonsWrap,
} from "../../../../Pages/Services&Rates/surcharge/SurchargeRegistrationForm/form-styles";
import shipActive from "../../../../assets/icons/rates&services/Ship.svg";
import ship from "../../../../assets/icons/rates&services/ShipDefault.svg";
import planeActive from "../../../../assets/icons/rates&services/PlanActive.svg";
import plane from "../../../../assets/icons/rates&services/Plan.svg";
import { filterByThunk } from "../../../../../_BLL/reducers/surcharge&rates/surchargeThunks";

type PropsType = {
  setMode?: VoidFunctionType;
  mode: string;
  dispatch?: VoidFunctionType;
  directory: string;
  searchColumn: string;
  searchValue: string;
};

const OptionsDeliveryButtons: React.FC<PropsType> = ({
  setMode,
  mode,
  ...props
}) => {
  let dispatchDeliveryHandler = (type: string) => {
    setMode && setMode(type);
    props.dispatch &&
      props.dispatch(
        filterByThunk(
          props.directory,
          type,
          "",
          props.searchColumn,
          props.searchValue
        )
      );
  };

  return (
    <OptionsButtonsWrap>
      <OptionButton onClick={() => dispatchDeliveryHandler("sea")} mode={mode}>
        <img src={mode === "sea" ? shipActive : ship} alt="" />
      </OptionButton>
      <OptionButtonPlane
        onClick={() => dispatchDeliveryHandler("air")}
        mode={mode}
      >
        <img src={mode === "air" ? planeActive : plane} alt="" />
      </OptionButtonPlane>
    </OptionsButtonsWrap>
  );
};

export default OptionsDeliveryButtons;
