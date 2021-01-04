import React from "react";
import {
  HeadingFormText,
  HeadingFormWrapper,
  InputGroupName,
  BackButton,
} from "../client-popup-styles";
import { InputsWrapper, InputColWrapper } from "./shipper-styles";
import BaseButton from "../../../base/BaseButton";
import FormField from "../../../_commonComponents/Input/FormField";

type PropsType = {
  control: any;
  setFormStep: (value: number) => void;
  formStep: number;
  getValues: any;
  register: any;
  errors: any;
};
const ImportShipperInfo: React.FC<PropsType> = ({
  control,
  setFormStep,
  formStep,
  register,
  errors,
}) => {
  return (
    <>
      <HeadingFormWrapper>
        <HeadingFormText>
          Please fill overseas shipper company info:
        </HeadingFormText>
        <div>
          <BackButton onClick={() => setFormStep(formStep - 1)} type="button">
            Back
          </BackButton>
          <BaseButton type="submit">Next</BaseButton>
        </div>
      </HeadingFormWrapper>
      <InputGroupName>Overseas shipper</InputGroupName>
      <InputsWrapper>
        <InputColWrapper>
          <FormField
            label="Company Name"
            inputRef={register({
              required: "Field is required",
            })}
            placeholder="Company Name"
            name="name"
            error={errors.name}
          />
          <FormField
            label="City"
            inputRef={register({
              required: "Field is required",
            })}
            placeholder="City"
            name="city"
            error={errors.city}
          />
          <FormField
            label="Contact name"
            inputRef={register({
              required: "Field is required",
            })}
            placeholder="Contact name"
            name="contact_name"
            error={errors.contact_name}
          />
        </InputColWrapper>
        <InputColWrapper>
          <FormField
            label="Phone number 1"
            inputRef={register({
              required: "Field is required",
            })}
            placeholder="Phone number"
            name="phone"
            error={errors.phone}
          />
          <FormField
            label="Phone number 2"
            inputRef={register}
            placeholder="Phone number"
            name="phone_additional"
          />
          <FormField
            label="Email"
            inputRef={register({
              required: "Field is required",
              pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            })}
            placeholder="Email"
            name="email"
            error={errors.email}
          />
        </InputColWrapper>
      </InputsWrapper>
    </>
  );
};

export default ImportShipperInfo;
