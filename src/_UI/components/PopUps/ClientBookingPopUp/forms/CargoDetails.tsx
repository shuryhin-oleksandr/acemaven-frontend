import React from "react";
//react hook form
import { Controller, useForm } from "react-hook-form";
//react-redux
import { useDispatch, useSelector } from "react-redux";
//BLL
import { AppStateType } from "../../../../../_BLL/store";
import { bookingActions } from "../../../../../_BLL/reducers/booking/bookingReducer";
import SurchargeRateSelect from "../../../_commonComponents/select/SurchargeRateSelect";
import {
  getShippingTypesSelector,
} from "../../../../../_BLL/selectors/rates&surcharge/surchargeSelectors";
//types
import {
  ShippingModeEnum,
  ShippingTypesEnum,
} from "../../../../../_BLL/types/rates&surcharges/newSurchargesTypes";
import { SearchResultType } from "../../../../../_BLL/types/search/search_types";
//components
import BaseButton from "../../../base/BaseButton";
import FormField from "../../../_commonComponents/Input/FormField";
//styles
import {
  ColName,
  ContainerInfo,
  DocumentationSection,
  FlexWrapper,
  HeadingFormText,
  HeadingFormWrapper,
  InputGroupName,
  InputsWrapper,
  RowWrapper,
  DocumentationRow,
  DocumentationCol,
} from "../client-popup-styles";
import { Field } from "../../../_commonComponents/Input/input-styles";
import {getCargoGroupsListSelector} from "../../../../../_BLL/selectors/search/searchClientSelector";
import {useTranslation} from "react-i18next";


type PropsType = {
  setFormStep: (value: number) => void;
  formStep: number;
  shippingValue: number;
  currentFreightRate: SearchResultType;
  quotes_mode?: boolean
};


const CargoDetails: React.FC<PropsType> = ({
  setFormStep,
  formStep,
  shippingValue,
  currentFreightRate,
  quotes_mode
}) => {
  const dispatch = useDispatch();
  let release_type_choices = useSelector(
    (state: AppStateType) => state.booking.release_type_choices
  );
  let fcl_cargo_groups = useSelector(
    (state: AppStateType) => state.booking.current_booking_cargo_groups
  );

  const other_cargo_groups = useSelector(getCargoGroupsListSelector);

  const cargo_groups = !quotes_mode
      ? (shippingValue === ShippingModeEnum.FCL) ? fcl_cargo_groups : other_cargo_groups
      : fcl_cargo_groups

  const { register, handleSubmit, errors, control} = useForm();

  const shippingTypes = useSelector(getShippingTypesSelector);

  const shippingModeOptions =
    currentFreightRate.freight_rate.shipping_type === 'air'
      ? shippingTypes[0]?.shipping_modes
      : shippingTypes[1]?.shipping_modes;


  let container_types = shippingModeOptions?.find((s) => s.id === shippingValue)
    ?.container_types;
  let packaging_types = shippingModeOptions?.find((s) => s.id === shippingValue)
    ?.packaging_types;

  const findContainer = (id: number) => {
    const container = container_types?.find((c) => c.id === id);
    return container?.code;
  };
  const findPackagingType = (id: number) => {
    const type = packaging_types?.find((c) => c.id === id);
    return type?.description;
  };

  const onSubmit = (values: any) => {
    const newArr = cargo_groups?.map((c) => {
      return { ...c, description: values.cargo_descriptions[Number(c.id)] };
    });

    const firstStepObj = {
      cargo_groups: newArr,
      release_type: values.release_type,
      number_of_documents: Number(values.number_of_documents),
    };
    const obj = {
      cargo_groups: newArr,
    };

    dispatch(
      bookingActions.set_description_step(
        values.number_of_documents ? firstStepObj : obj
      )
    );
    setFormStep(formStep + 1);
  };
  const {t} = useTranslation();
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <HeadingFormWrapper>
        <HeadingFormText>
          {t("Booking process/Please, fill basic information about the shipment")}
        </HeadingFormText>
        <BaseButton type="submit">{t("Register/NEXT")}</BaseButton>
      </HeadingFormWrapper>
      <InputGroupName>{t("Booking process/CARGO DETAILS")}</InputGroupName>
      <FlexWrapper>
        <div style={{ width: 205 }}>
          <ColName>{t("Operations/CARGO")}</ColName>
        </div>
        <div style={{ flex: 1 }}>
          <ColName>{t("Booking process/CARGO DESCRIPTION")}</ColName>
        </div>
      </FlexWrapper>
      <InputsWrapper>
        {cargo_groups.map(item => (
          <RowWrapper key={item.id}>
            <div style={{ width: 205 }}>
              <ContainerInfo>
                {item.container_type
                  ? `${item.volume} x ${findContainer(
                      Number(item.container_type)
                    )}`
                  : `${item.volume} ${findPackagingType(
                      Number(item.packaging_type)
                    )} x  ${item.total_wm}w/m`}
              </ContainerInfo>
            </div>
            <div style={{ flex: 1 }}>
              <Controller
                name={`cargo_descriptions.${item.id}`}
                control={control}
                as={<Field placeholder={t("Confirm Operation/Add description...")} />}
                rules={{ required: `${t("Error message/Field is required")}` }}
                defaultValue=""
              />
            </div>
          </RowWrapper>
        ))}
      </InputsWrapper>

      {currentFreightRate.freight_rate.shipping_type ===
        ShippingTypesEnum.SEA &&
        currentFreightRate.freight_rate.origin.is_local && (
          <DocumentationSection>
            <InputGroupName>{t("Bookings/Documentation")}</InputGroupName>
            <DocumentationRow>
              <DocumentationCol>
                <Controller
                  name="release_type"
                  control={control}
                  defaultValue=""
                  // rules={{
                  //   required: `${t("Error message/Field is required")}`,
                  // }}
                  as={
                    <SurchargeRateSelect
                      label={t("Bookings/Release type")}
                      options={release_type_choices}
                      error={errors?.release_type?.message}
                      placeholder={t("Bookings/Release type")}
                    />
                  }
                />
              </DocumentationCol>
              <DocumentationCol>
                <FormField
                  label={t("Operations/No. of Documents")}
                  // inputRef={register({
                  //   required: `${t("Error message/Field is required")}`,
                  // })}
                  placeholder={t("Operations/No. of Documents")}
                  name="number_of_documents"
                  defaultValue={1}
                  error={errors?.number_of_documents}
                />
              </DocumentationCol>
            </DocumentationRow>
          </DocumentationSection>
        )}
    </form>
  );
};

export default CargoDetails;
