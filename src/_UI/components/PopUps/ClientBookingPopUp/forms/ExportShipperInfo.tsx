import {
  HeadingFormText,
  HeadingFormWrapper,
  InputGroupName,
  BackButton,
} from "../client-popup-styles";

import {
  InputsWrapper,
  InputColWrapper,
  IsShipperWrapper,
} from "./shipper-styles";
import SearchCheckbox from "../../../_commonComponents/customCheckbox/searchCheckbox";

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
const ExportShipperInfo: React.FC<PropsType> = ({
  control,
  setFormStep,
  formStep,
  register,
  getValues,
}) => {
  return (
    <>
      <HeadingFormWrapper>
        <HeadingFormText>Will your company be the shipper?</HeadingFormText>
        <div>
          <BackButton onClick={() => setFormStep(formStep - 1)} type="button">
            Back
          </BackButton>
          <BaseButton type="submit">Next</BaseButton>
        </div>
      </HeadingFormWrapper>
      <IsShipperWrapper>
        <SearchCheckbox inputRef={register} name="is_shipper" />
      </IsShipperWrapper>
      <InputGroupName>Shipper</InputGroupName>
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
            label="Address"
            inputRef={register}
            placeholder="Address"
            name="address"
            getValues={getValues}
          />
          <div style={{ marginTop: -15 }}>
            <FormField
              inputRef={register}
              placeholder="Address"
              name="address"
              getValues={getValues}
            />
          </div>
          <FormField
            label="State"
            inputRef={register}
            placeholder="State"
            name="state"
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
            label="Zip Code"
            inputRef={register}
            placeholder="Zip Code"
            name="zip_code"
            getValues={getValues}
          />
        </InputColWrapper>
        <InputColWrapper>
          <FormField
            label="Contact name"
            inputRef={register}
            placeholder="Contact name"
            name="contact_name"
            getValues={getValues}
          />
          <FormField
            label="Phone number"
            inputRef={register}
            placeholder="Phone number"
            name="phone_number"
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

export default ExportShipperInfo;
