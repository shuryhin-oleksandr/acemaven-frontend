import React, { useEffect, useState } from "react";
import {
  HeadingFormText,
  HeadingFormWrapper,
  InputGroupName,
  BackButton,
} from "../client-popup-styles";
import { InputsWrapper, InputColWrapper, Notification } from "./shipper-styles";
import BaseButton from "../../../base/BaseButton";
import FormField from "../../../_commonComponents/Input/FormField";
import { Controller } from "react-hook-form";
import SurchargeRateSelect from "../../../_commonComponents/select/SurchargeRateSelect";
import { useDispatch, useSelector } from "react-redux";
import { getPartnersThunk } from "../../../../../_BLL/thunks/search_client_thunks/searchClientThunks";
import { AppStateType } from "../../../../../_BLL/store";

type PropsType = {
  control: any;
  setFormStep: (value: number) => void;
  formStep: number;
  getValues: any;
  register: any;
  errors: any;
  setValue: any;
};
const ImportShipperInfo: React.FC<PropsType> = ({
  control,
  setFormStep,
  formStep,
  register,
  errors,
  setValue,
}) => {
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPartnersThunk());
  }, []);

  let partners = useSelector((state: AppStateType) => state.search.partners);

  const [partnerChoice, setPartnerChoice] = useState(-1);
  const disabled = partnerChoice !== -1;

  const partnersOptions = partners.map((i) => {
    return { title: i.contact_name, id: i.id };
  });

  useEffect(() => {
    if (partnerChoice !== -1) {
      const shipper = partners.find((s) => s.id === partnerChoice);
      setValue("name", shipper?.name);
      setValue("city", shipper?.city);
      setValue("contact_name", shipper?.contact_name);
      setValue("phone", shipper?.phone);
      setValue("phone_additional", shipper?.phone_additional);
      setValue("email", shipper?.email);
    } else {
      setValue("name", "");
      setValue("city", "");
      setValue("contact_name", "");
      setValue("phone", "");
      setValue("phone_additional", "");
      setValue("email", "");
    }
  }, [partnerChoice]);

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
      {partners.length > 0 && (
        <InputsWrapper>
          <InputColWrapper>
            <Controller
              name="existing_shipper"
              control={control}
              defaultValue="-1"
              as={
                <SurchargeRateSelect
                  label="Partners"
                  options={[
                    { title: "Specify new", id: -1 },
                    ...partnersOptions,
                  ]}
                  callback={setPartnerChoice}
                />
              }
            />
            <Notification>
              You can choose partner or specify a new one.
            </Notification>
          </InputColWrapper>
        </InputsWrapper>
      )}

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
            disabled={disabled}
          />
          <FormField
            label="City"
            inputRef={register({
              required: "Field is required",
            })}
            placeholder="City"
            name="city"
            error={errors.city}
            disabled={disabled}
          />
          <FormField
            label="Contact name"
            inputRef={register({
              required: "Field is required",
            })}
            placeholder="Contact name"
            name="contact_name"
            error={errors.contact_name}
            disabled={disabled}
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
            disabled={disabled}
          />
          <FormField
            label="Phone number 2"
            inputRef={register}
            placeholder="Phone number"
            name="phone_additional"
            disabled={disabled}
          />
          <FormField
            label="Email"
            inputRef={register({
              required: "Field is required",
              pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            })}
            placeholder="Email"
            name="email"
            error={errors.email}
            disabled={disabled}
          />
        </InputColWrapper>
      </InputsWrapper>
    </>
  );
};

export default ImportShipperInfo;
