import React from "react";
import { Controller, useForm } from "react-hook-form";
import { FormWrap, GroupWrap } from "./form-styles";
import FormSelect from "../../../../components/_commonComponents/select/FormSelect";
import FormField from "../../../../components/_commonComponents/Input/FormField";
import { VoidFunctionType } from "../../../../../_BLL/types/commonTypes";
import {
  CarrierType,
  ShippingModeType,
} from "../../../../../_BLL/types/rates&surcharges/ratesTypes";
import SurchargeRateSelect from "../../../../components/_commonComponents/select/SurchargeRateSelect";

type PropsType = {
  setShippingValue: VoidFunctionType;
  shipping_modes: ShippingModeType[] | null;
  control?: any;
  register?: any;
  errors?: any;
  getValues?: any;
  setValue?: any;
  air_carriers: CarrierType[] | null;
};

const ByPlaneRateForm: React.FC<PropsType> = ({
  setShippingValue,
  shipping_modes,
  air_carriers,
  ...props
}) => {
  const onSubmit = (values: any) => {
    console.log(values);
  };

  let carriers = [
    { name: "1", value: "1" },
    { nam: "2", value: "2" },
  ];

  let shippingModes = [
    { name: "ULD Cargo", value: "ULD" },
    { name: "Loose Cargo", value: "Loose Cargo" },
  ];

  return (
    <FormWrap>
      <GroupWrap>
        <Controller
          name="carrier"
          control={props.control}
          defaultValue=""
          rules={{
            required: true,
          }}
          as={<SurchargeRateSelect label="Carrier" options={air_carriers} />}
        />
        <Controller
          name="shipping_mode"
          control={props.control}
          defaultValue=""
          as={
            <SurchargeRateSelect
              label="Shipping Mode"
              options={shipping_modes}
              callback={setShippingValue}
            />
          }
        />
      </GroupWrap>
      <GroupWrap>
        <Controller
          name="origin"
          control={props.control}
          defaultValue=""
          as={<FormSelect label="Origin" options={carriers} />}
        />
        <Controller
          name="destination"
          control={props.control}
          defaultValue=""
          as={<FormSelect label="Destination" options={carriers} />}
        />

        <FormField
          label="Transit time"
          placeholder="days"
          inputRef={props.register({
            required: "Field is required",
          })}
          name="transit_time"
          error={props.errors?.transit_time?.message}
          getValues={props.getValues}
        />
      </GroupWrap>
    </FormWrap>
  );
};

export default ByPlaneRateForm;
