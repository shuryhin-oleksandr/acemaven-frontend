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
};
const ImportShipperInfo: React.FC<PropsType> = ({
  control,
  setFormStep,
  formStep,
  register,
  getValues,
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
          <BaseButton  type="submit">
            Next
          </BaseButton>
        </div>
      </HeadingFormWrapper>
      <InputGroupName>Overseas shipper</InputGroupName>
      <InputsWrapper>
        <InputColWrapper>
          <FormField
            label="Company Name"
            inputRef={register}
            placeholder="Company Name"
            name="company_name"
            getValues={getValues}
          />
          <FormField
            label="City"
            inputRef={register}
            placeholder="City"
            name="city"
            getValues={getValues}
          />
          <FormField
            label="Contact name"
            inputRef={register}
            placeholder="Contact name"
            name="contact_name"
            getValues={getValues}
          />
        </InputColWrapper>
        <InputColWrapper>
          <FormField
            label="Phone number 1"
            inputRef={register}
            placeholder="Phone number"
            name="phone_number2"
            getValues={getValues}
          />
          <FormField
            label="Phone number 2"
            inputRef={register}
            placeholder="Phone number"
            name="phone_number1"
            getValues={getValues}
          />
          <FormField
            label="Email"
            inputRef={register}
            placeholder="Email"
            name="email"
            getValues={getValues}
          />
        </InputColWrapper>
      </InputsWrapper>
    </>
  );
};

export default ImportShipperInfo;
