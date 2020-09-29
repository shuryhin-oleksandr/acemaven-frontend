import React, { useState } from "react";
import {ActionsWrapper, FormTitle, HeaderWrapper, Outer, RegisterButton, UnderTitle} from "./form-styles";
import OptionsDeliveryButtons from "src/_UI/components/_commonComponents/optionsButtons/OptionsDeliveryButtons";

import ByPlaneForm from "./ByPlaneForm";
import CancelButton from "src/_UI/components/_commonComponents/buttons/navFormButtons/CancelButton";
import {VoidFunctionType} from "../../../../../_BLL/types/commonTypes";
import ByShipForm from "../../rates/SurchargeRegistrationForm/ByShipForm";
import ULD_CargoForm from "./ULD_cargo/ULD_CargoForm";

type PropsType = {
    setNewSurchargeMode: VoidFunctionType
}

const RegistrationNewForm:React.FC<PropsType> = ({setNewSurchargeMode}) => {
    const [mode, setMode] = useState('ship')
    const [shippingValue, setShippingValue] = useState('')
    console.log(shippingValue)

    return (
        <Outer>
            <HeaderWrapper>
                <FormTitle>New Surcharge</FormTitle>
                <ActionsWrapper>
                    <RegisterButton type='submit'>REGISTER</RegisterButton>
                    <CancelButton text='CANCEL' setIsOpen={setNewSurchargeMode}/>
                </ActionsWrapper>
            </HeaderWrapper>
            <OptionsDeliveryButtons mode={mode} setMode={setMode}/>
            {
                mode === 'ship'
                ? <ByShipForm setShippingValue={setShippingValue}/>
                : <ByPlaneForm />
            }
            {!shippingValue
            ? <UnderTitle>Please, complete the parameters of the surcharge for the value fields to appear</UnderTitle>
                : <ULD_CargoForm />
            }

            {/*<Loose_CargoForm />*/}


        </Outer>
    )
}

export default RegistrationNewForm