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

import React, { useEffect, useState } from "react";
import BaseButton from "../../../base/BaseButton";
import { VoidFunctionType } from "../../../../../_BLL/types/commonTypes";
import FormField from "../../../_commonComponents/Input/FormField";
import { CompanyInfoType } from "../../../../../_BLL/types/profileSettingsType";
import { IAuthUserInfo } from "../../../../../_BLL/types/authTypes";
import { useDispatch } from "react-redux";
import { bookingActions } from "../../../../../_BLL/reducers/bookingReducer";

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
  errors: any;
};
const ExportShipperInfo: React.FC<PropsType> = ({
  control,
  setFormStep,
  formStep,
  register,
  getValues,
  companyInfo,
  currentUser,
  setValue,
  errors,
}) => {
  const dispatch = useDispatch();
  const [isCheck, setIsCheck] = useState(true);

  useEffect(() => {
    if (isCheck) {
      setValue("name", companyInfo?.name);
      setValue("address_line_first", companyInfo?.address_line_first);
      setValue("address_line_second", companyInfo?.address_line_second);
      setValue("state", companyInfo?.state);
      setValue("city", companyInfo?.city);
      setValue("zip_code", companyInfo?.zip_code);
      setValue("contact_name", currentUser?.first_name);
      setValue("phone", currentUser?.phone);
      setValue("email", currentUser?.email);
    } else {
      setValue("name", "");
      setValue("address_line_first", "");
      setValue("address_line_second", "");
      setValue("state", "");
      setValue("city", "");
      setValue("zip_code", "");
      setValue("contact_name", "");
      setValue("phone", "");
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
            type="submit"
            // onClick={() => {
            //   dispatch(bookingActions.changeBookingStep("fee-table"));
            // }}
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
            inputRef={register({
              required: "Field is required",
            })}
            placeholder="Company Name"
            name="name"
            getValues={getValues}
            error={errors.name}
          />
          <FormField
            label="Address"
            inputRef={register({
              required: "Field is required",
            })}
            placeholder="Address"
            name="address_line_first"
            getValues={getValues}
            error={errors.address_line_first}
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
            inputRef={register({
              required: "Field is required",
            })}
            placeholder="State"
            name="state"
            getValues={getValues}
            error={errors.state}
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
            label="Zip Code"
            inputRef={register({
              required: "Field is required",
            })}
            placeholder="Zip Code"
            name="zip_code"
            getValues={getValues}
            error={errors.zip_code}
          />
        </InputColWrapper>
        <InputColWrapper>
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
          <FormField
            label="Phone number"
            inputRef={register({
              required: "Field is required",
            })}
            placeholder="Phone number"
            name="phone"
            getValues={getValues}
            error={errors.phone}
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

export default ExportShipperInfo;
