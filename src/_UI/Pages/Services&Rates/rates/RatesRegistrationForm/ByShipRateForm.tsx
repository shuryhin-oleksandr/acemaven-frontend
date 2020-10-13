import React from "react";

import { Controller, useForm } from "react-hook-form";
import FormSelect from "../../../../components/_commonComponents/select/FormSelect";
import FormField from "../../../../components/_commonComponents/Input/FormField";
import { FormWrap, GroupWrap } from "./form-styles";
import { VoidFunctionType } from "../../../../../_BLL/types/commonTypes";
import { ShippingModeType } from "../../../../../_BLL/types/rates&surcharges/ratesTypes";
import SurchargeRateSelect from "../../../../components/_commonComponents/select/SurchargeRateSelect";
import { CarrierType } from "../../../../../_BLL/types/rates&surcharges/ratesTypes";

type PropsType = {
  setShippingValue: VoidFunctionType;
  shipping_modes: ShippingModeType[] | null;
  control?: any;
  register?: any;
  errors?: any;
  getValues?: any;
  setValue?: any;
  sea_carriers: CarrierType[] | null;
};

const ByShipRateForm: React.FC<PropsType> = ({
  setShippingValue,
  shipping_modes,
  sea_carriers,
  ...props
}) => {
  let carriers = [
    { title: "222", id: "1" },
    { title: "2222", id: "2" },
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
          as={<SurchargeRateSelect label="Carrier" options={sea_carriers} />}
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

export default ByShipRateForm;
