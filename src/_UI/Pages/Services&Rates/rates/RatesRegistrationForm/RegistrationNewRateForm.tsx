import React, { useState } from "react";
import {
  ActionsWrapper,
  FormTitle,
  HeaderWrapper,
  Outer,
  RegisterButton,
  UnderTitle,
} from "./form-styles";
import OptionsDeliveryButtons from "src/_UI/components/_commonComponents/optionsButtons/delivery/OptionsDeliveryButtons";

import ByPlaneForm from "./ByPlaneRateForm";
import CancelButton from "src/_UI/components/_commonComponents/buttons/navFormButtons/CancelButton";
import { VoidFunctionType } from "../../../../../_BLL/types/commonTypes";
import ByShipForm from "./ByShipRateForm";

type PropsType = {
  setNewRateMode: VoidFunctionType;
};

const RegistrationNewRateForm: React.FC<PropsType> = ({ setNewRateMode }) => {
  const [mode, setMode] = useState("sea");
  const [shippingValue, setShippingValue] = useState("");
  console.log(shippingValue);

  return (
    <Outer>
      <HeaderWrapper>
        <FormTitle>Freight rates</FormTitle>
        <ActionsWrapper>
          <RegisterButton type="submit">SAVE</RegisterButton>
          <CancelButton text="CANCEL" setIsOpen={setNewRateMode} />
        </ActionsWrapper>
      </HeaderWrapper>
      <OptionsDeliveryButtons directory='import'
                              mode={mode}
                              setMode={setMode}
                              searchColumn=''
                              searchValue=''
      />
      {mode === "ship" ? (
        <ByShipForm setShippingValue={setShippingValue} />
      ) : (
        <ByPlaneForm />
      )}
      {!shippingValue ? (
        <UnderTitle>
          Please, complete the parameters of the surcharge for the value fields
          to appear
        </UnderTitle>
      ) : null}

      {/*<Loose_CargoForm />*/}
    </Outer>
  );
};

export default RegistrationNewRateForm;
