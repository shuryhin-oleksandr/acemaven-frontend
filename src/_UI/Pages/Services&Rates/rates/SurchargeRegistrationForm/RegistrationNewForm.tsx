import React, { useState } from "react";
import {FormTitle, LineWrap, Outer, UnderTitle} from "./form-styles";
import OptionsDeliveryButtons from "src/_UI/components/_commonComponents/optionsButtons/OptionsDeliveryButtons";
import ByShipForm from "./ByShipForm";

const RegistrationNewForm:React.FC = () => {
    const [mode, setMode] = useState('ship')


    return (
        <Outer>
            <FormTitle>New Surcharge</FormTitle>
            <OptionsDeliveryButtons mode={mode} setMode={setMode}/>
            {
                mode === 'ship'
                ? <ByShipForm />
                : <div>q</div>
            }
            <LineWrap />
            <UnderTitle>Please, complete the parameters of the surcharge for the value fields to appear</UnderTitle>
        </Outer>
    )
}

export default RegistrationNewForm