import React from 'react';
import {VoidFunctionType} from "../../../../_BLL/types/commonTypes";
import {
    OptionButton,
    OptionButtonPlane,
    OptionsButtonsWrap
} from "../../../Pages/Services&Rates/rates/SurchargeRegistrationForm/form-styles";
import shipActive from "../../../assets/icons/rates&services/Ship.svg";
import ship from "../../../assets/icons/rates&services/ShipDefault.svg";
import planeActive from "../../../assets/icons/rates&services/PlanActive.svg";
import plane from "../../../assets/icons/rates&services/Plan.svg";

type PropsType = {
    setMode?: VoidFunctionType,
    mode: string
}

const OptionsDeliveryButtons:React.FC<PropsType> = ({setMode, mode}) => {
    return (
        <OptionsButtonsWrap>
            <OptionButton onClick={() => setMode && setMode('ship')} mode={mode}>
                <img src={mode === 'ship' ?  shipActive : ship} alt=""/>
            </OptionButton>
            <OptionButtonPlane onClick={() => setMode && setMode('plane')} mode={mode}>
                <img src={mode === 'plane' ? planeActive : plane} alt=""/>
            </OptionButtonPlane>

        </OptionsButtonsWrap>
    )
}

export default OptionsDeliveryButtons