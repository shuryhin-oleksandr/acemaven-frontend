import React, { useState, useEffect } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import {
  getCarriers,
  getShippingTypes,
} from "../../../../../_BLL/reducers/surcharge&rates/rateThunks";
import { AppStateType } from "../../../../../_BLL/store";
import { useForm } from "react-hook-form";

type PropsType = {
  setNewRateMode: VoidFunctionType;
};

const RegistrationNewRateForm: React.FC<PropsType> = ({ setNewRateMode }) => {
  const [mode, setMode] = useState("sea");
  const [shippingValue, setShippingValue] = useState("");
  const dispatch = useDispatch();

  const shipping_types = useSelector(
    (state: AppStateType) => state.rate.shipping_type
  );

  const sea_carriers = useSelector(
    (state: AppStateType) => state.rate.sea_carriers
  );
  const air_carriers = useSelector(
    (state: AppStateType) => state.rate.air_carriers
  );

  useEffect(() => {
    dispatch(getShippingTypes());
    dispatch(getCarriers());
  }, [dispatch]);

  const {
    register,
    control,
    errors,
    handleSubmit,
    getValues,
    setValue,
  } = useForm({
    reValidateMode: "onBlur",
  });
  return (
    <Outer>
      <HeaderWrapper>
        <FormTitle>Freight rates</FormTitle>
        <ActionsWrapper>
          <RegisterButton type="submit">SAVE</RegisterButton>
          <CancelButton text="CANCEL" setIsOpen={setNewRateMode} />
        </ActionsWrapper>
      </HeaderWrapper>
      <div style={{ marginBottom: "20px", width: "150px" }}>
        <OptionsDeliveryButtons
          directory="import"
          mode={mode}
          setMode={setMode}
          searchColumn=""
          searchValue=""
        />
      </div>
      {mode === "sea" ? (
        <ByShipForm
          shipping_modes={shipping_types && shipping_types[1]?.shipping_modes}
          setShippingValue={setShippingValue}
          control={control}
          register={register}
          errors={errors}
          getValues={getValues}
          sea_carriers={sea_carriers}
        />
      ) : (
        <ByPlaneForm
          shipping_modes={shipping_types && shipping_types[0]?.shipping_modes}
          setShippingValue={setShippingValue}
          control={control}
          register={register}
          errors={errors}
          getValues={getValues}
          air_carriers={air_carriers}
        />
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
