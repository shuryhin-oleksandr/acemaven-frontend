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

import React, { useEffect, useState } from "react";
import BaseButton from "../../../base/BaseButton";
import { VoidFunctionType } from "../../../../../_BLL/types/commonTypes";
import FormField from "../../../_commonComponents/Input/FormField";
import { CompanyInfoType } from "../../../../../_BLL/types/profileSettingsType";
import { IAuthUserInfo } from "../../../../../_BLL/types/authTypes";
import { useDispatch } from "react-redux";
import { bookingActions } from "../../../../../_BLL/reducers/booking/bookingReducer";

type PropsType = {
  control: any;
  setFormStep: VoidFunctionType;
  formStep: number;
  getValues: any;
  register: any;
  companyInfo: CompanyInfoType | null;
  watch?: any;
  currentUser: IAuthUserInfo | null;
  setValue: any;
};
const ExportShipperInfo: React.FC<PropsType> = ({
  setFormStep,
  formStep,
  register,
  getValues,
  companyInfo,
  currentUser,
  setValue,
}) => {
  const dispatch = useDispatch();
  const [isCheck, setIsCheck] = useState(true);

  useEffect(() => {
    if (isCheck) {
      setValue("company_name", companyInfo?.name);
      setValue("address_line_first", companyInfo?.address_line_first);
      setValue("address_line_second", companyInfo?.address_line_second);
      setValue("state", companyInfo?.state);
      setValue("city", companyInfo?.city);
      setValue("zip_code", companyInfo?.zip_code);
      setValue("contact_name", currentUser?.first_name);
      setValue("phone_number", currentUser?.phone);
      setValue("email", currentUser?.email);
    } else {
      setValue("company_name", "");
      setValue("address_line_first", "");
      setValue("address_line_second", "");
      setValue("state", "");
      setValue("city", "");
      setValue("zip_code", "");
      setValue("contact_name", "");
      setValue("phone_number", "");
      setValue("email", "");
    }
  }, [setValue, isCheck]);
  return (
    <>
      <HeadingFormWrapper>
        <HeadingFormText>Will your company be the shipper?</HeadingFormText>
        <div>
          <BackButton onClick={() => setFormStep(formStep - 1)} type="button">
            Back
          </BackButton>
          <BaseButton
            onClick={() => {
              dispatch(bookingActions.changeBookingStep("fee-table"));
            }}
            type="submit"
          >
            Next
          </BaseButton>
        </div>
      </HeadingFormWrapper>
      <IsShipperWrapper>
        <SearchCheckbox
          isCheck={isCheck}
          setIsCheck={setIsCheck}
          inputref={register}
          name="is_shipper"
          labelText="My company will be the shipper"
        />
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
            name="address_line_first"
            getValues={getValues}
          />
          <div style={{ marginTop: -15 }}>
            <FormField
              inputRef={register}
              placeholder="Address"
              name="address_line_second"
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
