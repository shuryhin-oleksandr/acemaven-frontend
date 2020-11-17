import {
  HeadingFormText,
  HeadingFormWrapper,
  InputGroupName,
  BackButton,
} from "../client-popup-styles";
import { InputsWrapper, InputColWrapper } from "./shipper-styles";

import React from "react";
import BaseButton from "../../../base/BaseButton";
import { VoidFunctionType } from "../../../../../_BLL/types/commonTypes";
import FormField from "../../../_commonComponents/Input/FormField";

type PropsType = {
  control: any;
  setFormStep: VoidFunctionType;
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
  getValues,
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
            getValues={getValues}
            error={errors.name}
          />
          <FormField
            label="City"
            inputRef={register({
              required: "Field is required",
            })}
            placeholder="City"
            name="city"
            getValues={getValues}
            error={errors.city}
          />
          <FormField
            label="Contact name"
            inputRef={register({
              required: "Field is required",
            })}
            placeholder="Contact name"
            name="contact_name"
            getValues={getValues}
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
            getValues={getValues}
            error={errors.phone}
          />
          <FormField
            label="Phone number 2"
            inputRef={register}
            placeholder="Phone number"
            name="phone_additional"
            getValues={getValues}
          />
          <FormField
            label="Email"
            inputRef={register({
              required: "Field is required",
            })}
            placeholder="Email"
            name="email"
            getValues={getValues}
            error={errors.email}
          />
        </InputColWrapper>
      </InputsWrapper>
    </>
  );
};

export default ImportShipperInfo;
