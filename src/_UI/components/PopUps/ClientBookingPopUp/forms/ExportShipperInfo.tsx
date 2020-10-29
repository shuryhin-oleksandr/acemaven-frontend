import {
  HeadingFormText,
  HeadingFormWrapper,
  InputGroupName,
  BackButton,
  DocumentationSection,
} from "../client-popup-styles";

import {
  InputsWrapper,
  InputColWrapper,
  IsShipperWrapper,
} from "./shipper-styles";
import SearchCheckbox from "../../../_commonComponents/customCheckbox/searchCheckbox";

import React, { useState } from "react";
import BaseButton from "../../../base/BaseButton";
import { VoidFunctionType } from "../../../../../_BLL/types/commonTypes";
import FormField from "../../../_commonComponents/Input/FormField";
import { CompanyInfoType } from "../../../../../_BLL/types/profileSettingsType";
import { IAuthUserInfo } from "../../../../../_BLL/types/authTypes";

type PropsType = {
  control: any;
  setFormStep: VoidFunctionType;
  formStep: number;
  getValues: any;
  register: any;
  companyInfo: CompanyInfoType | null;
  watch?: any;
  currentUser: IAuthUserInfo | null;
};
const ExportShipperInfo: React.FC<PropsType> = ({
  control,
  setFormStep,
  formStep,
  register,
  getValues,
  companyInfo,
  watch,
  currentUser,
}) => {
  const [isCheck, setIsCheck] = useState(true);
  const watchIs_shipper = watch("is_shipper");
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
        <SearchCheckbox
          isCheck={isCheck}
          setIsCheck={setIsCheck}
          inputref={register}
          name="is_shipper"
        />
      </IsShipperWrapper>
      <InputGroupName>Shipper</InputGroupName>
      {watchIs_shipper ? (
        <>
          <InputsWrapper>
            <InputColWrapper>
              <FormField
                label="Company Name"
                inputRef={register}
                placeholder="Company Name"
                name="company_name"
                getValues={getValues}
                defaultValue={companyInfo?.name}
                key={"key1"}
              />
              <FormField
                label="Address"
                inputRef={register}
                placeholder="Address"
                name="address_line_first"
                getValues={getValues}
                defaultValue={companyInfo?.address_line_first}
                key={"key2"}
              />
              <div style={{ marginTop: -15 }}>
                <FormField
                  inputRef={register}
                  placeholder="Address"
                  name="address_line_second"
                  getValues={getValues}
                  defaultValue={companyInfo?.address_line_second}
                  key={"key3"}
                />
              </div>
              <FormField
                label="State"
                inputRef={register}
                placeholder="State"
                name="state"
                getValues={getValues}
                defaultValue={companyInfo?.state}
                key={"key4"}
              />
              <FormField
                label="City"
                inputRef={register}
                placeholder="City"
                name="city"
                getValues={getValues}
                defaultValue={companyInfo?.city}
                key={"key5"}
              />
              <FormField
                label="Zip Code"
                inputRef={register}
                placeholder="Zip Code"
                name="zip_code"
                getValues={getValues}
                defaultValue={companyInfo?.zip_code}
                key={"key6"}
              />
            </InputColWrapper>
            <InputColWrapper>
              <FormField
                label="Contact name"
                inputRef={register}
                placeholder="Contact name"
                name="contact_name"
                getValues={getValues}
                defaultValue={currentUser?.first_name}
                key={"key7"}
              />
              <FormField
                label="Phone number"
                inputRef={register}
                placeholder="Phone number"
                name="phone"
                getValues={getValues}
                defaultValue={currentUser?.phone}
                key={"key8"}
              />
              <FormField
                label="Email"
                inputRef={register}
                placeholder="Email"
                name="email"
                getValues={getValues}
                defaultValue={currentUser?.email}
                key={"key9"}
              />
            </InputColWrapper>
          </InputsWrapper>
        </>
      ) : (
        <>
          <InputsWrapper>
            <InputColWrapper>
              <FormField
                label="Company Name"
                inputRef={register}
                placeholder="Company Name"
                name="company_name"
                getValues={getValues}
                key={"key10"}
              />
              <FormField
                label="Address"
                inputRef={register}
                placeholder="Address"
                name="address"
                getValues={getValues}
                key={"key11"}
              />
              <div style={{ marginTop: -15 }}>
                <FormField
                  inputRef={register}
                  placeholder="Address"
                  name="address"
                  getValues={getValues}
                  key={"key12"}
                />
              </div>
              <FormField
                label="State"
                inputRef={register}
                placeholder="State"
                name="state"
                getValues={getValues}
                key={"key13"}
              />
              <FormField
                label="City"
                inputRef={register}
                placeholder="City"
                name="city"
                getValues={getValues}
                key={"key14"}
              />
              <FormField
                label="Zip Code"
                inputRef={register}
                placeholder="Zip Code"
                name="zip_code"
                getValues={getValues}
                key={"key15"}
              />
            </InputColWrapper>
            <InputColWrapper>
              <FormField
                label="Contact name"
                inputRef={register}
                placeholder="Contact name"
                name="contact_name"
                getValues={getValues}
                key={"key16"}
              />
              <FormField
                label="Phone number"
                inputRef={register}
                placeholder="Phone number"
                name="phone_number"
                getValues={getValues}
                key={"key17"}
              />
              <FormField
                label="Email"
                inputRef={register}
                placeholder="Email"
                name="email"
                getValues={getValues}
                key={"key18"}
              />
            </InputColWrapper>
          </InputsWrapper>
        </>
      )}
    </>
  );
};

export default ExportShipperInfo;
