import React from "react";
import { Controller, useForm } from "react-hook-form";
import { FormWrap, GroupWrap } from "./form-styles";
import FormSelect from "../../../../components/_commonComponents/select/FormSelect";
import FormField from "../../../../components/_commonComponents/Input/FormField";

const ByPlaneRateForm = () => {
  const { register, control, errors, handleSubmit, getValues } = useForm();
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
    <FormWrap onSubmit={handleSubmit(onSubmit)}>
      <GroupWrap>
        <Controller
          name="carrier"
          control={control}
          defaultValue=""
          as={<FormSelect label="Carrier" options={carriers} />}
        />
        <Controller
          name="shipping_mode"
          control={control}
          defaultValue=""
          as={<FormSelect label="Shipping Mode" options={shippingModes} />}
        />
      </GroupWrap>
      <GroupWrap>
        <Controller
          name="origin"
          control={control}
          defaultValue=""
          as={<FormSelect label="Origin" options={carriers} />}
        />
        <Controller
          name="destination"
          control={control}
          defaultValue=""
          as={<FormSelect label="Destination" options={carriers} />}
        />

        <FormField
          label="Transit time"
          placeholder="days"
          inputRef={register({
            required: "Field is required",
          })}
          name="transit_time"
          error={errors?.transit_time?.message}
          getValues={getValues}
        />
      </GroupWrap>
    </FormWrap>
  );
};

export default ByPlaneRateForm;
