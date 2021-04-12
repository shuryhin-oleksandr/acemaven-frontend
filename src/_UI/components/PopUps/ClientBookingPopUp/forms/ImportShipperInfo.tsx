import React, { useEffect, useState } from "react";
import {
  HeadingFormText,
  HeadingFormWrapper,
  InputGroupName,
  BackButton,
} from "../client-popup-styles";
import {
  InputsWrapper,
  InputColWrapper,
  Notification,
  ErrorMes,
} from "./shipper-styles";
import BaseButton from "../../../base/BaseButton";
import FormField from "../../../_commonComponents/Input/FormField";
import { Controller } from "react-hook-form";
import SurchargeRateSelect from "../../../_commonComponents/select/SurchargeRateSelect";
import { useDispatch, useSelector } from "react-redux";
import { getPartnersThunk } from "../../../../../_BLL/thunks/search_client_thunks/searchClientThunks";
import { AppStateType } from "../../../../../_BLL/store";
import { bookingActions } from "../../../../../_BLL/reducers/booking/bookingReducer";
import {useTranslation} from "react-i18next";

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

  useEffect(() => {
    return () => {
      dispatch(bookingActions.setServerBookingError(null));
    };
  }, []);

  let partners = useSelector((state: AppStateType) => state.search.partners);
  let server_booking_error = useSelector(
    (state: AppStateType) => state.booking.booking_server_error
  );

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
  const {t} = useTranslation();
  return (
    <>
      <HeadingFormWrapper>
        <HeadingFormText>
          {t("Booking process/Please fill overseas shipper company info")}:
        </HeadingFormText>
        <div>
          <BackButton onClick={() => setFormStep(formStep - 1)} type="button">
            {t("Booking process/BACK")}
          </BackButton>
          <BaseButton type="submit">{t("Dashboard/BOOK")}</BaseButton>
        </div>
      </HeadingFormWrapper>
      <InputGroupName>{t("Booking process/OVERSEAS SHIPPER")}</InputGroupName>
      {partners.length > 0 && (
        <InputsWrapper>
          <InputColWrapper>
            <Controller
              name="existing_shipper"
              control={control}
              defaultValue="-1"
              as={
                <SurchargeRateSelect
                  label={t("Partners table/Partners")}
                  options={[
                    { title: "Specify new", id: -1 },
                    ...partnersOptions,
                  ]}
                  callback={setPartnerChoice}
                />
              }
            />
            <Notification>
              {t("Bookings/You can choose partner or specify a new one.")}
            </Notification>
          </InputColWrapper>
        </InputsWrapper>
      )}

      <InputsWrapper>
        <InputColWrapper>
          <FormField
            label={t("Register/Company Name")}
            inputRef={register({
              required: "Field is required",
            })}
            placeholder={t("Register/Company Name")}
            name="name"
            error={errors.name}
            disabled={disabled}
          />
          <FormField
            label={t("Register/City")}
            inputRef={register({
              required: "Field is required",
            })}
            placeholder={t("Register/City")}
            name="city"
            error={errors.city}
            disabled={disabled}
          />
          <FormField
            label={t("Register/Contact Name")}
            inputRef={register({
              required: "Field is required",
            })}
            placeholder={t("Register/Contact Name")}
            name="contact_name"
            error={errors.contact_name}
            disabled={disabled}
          />
        </InputColWrapper>
        <InputColWrapper>
          <FormField
            label={t("Register/Phone Number") + ' 1'}
            inputRef={register({
              required: "Field is required",
            })}
            placeholder={t("Register/Phone Number")}
            name="phone"
            error={errors.phone}
            disabled={disabled}
          />
          <FormField
            label={t("Register/Phone Number") + ' 2'}
            inputRef={register}
            placeholder={t("Register/Phone Number")}
            name="phone_additional"
            disabled={disabled}
          />
          <FormField
            label={t("Register/Email")}
            inputRef={register({
              required: "Field is required",
              pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            })}
            placeholder={t("Register/Email")}
            name="email"
            error={errors.email}
            disabled={disabled}
          />
        </InputColWrapper>
      </InputsWrapper>
      {server_booking_error && <ErrorMes>{server_booking_error}</ErrorMes>}
    </>
  );
};

export default ImportShipperInfo;
