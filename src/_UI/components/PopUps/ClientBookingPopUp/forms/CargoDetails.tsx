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
import { Controller, useForm } from "react-hook-form";
import { Field } from "../../../_commonComponents/Input/input-styles";
import React, { useEffect } from "react";
import BaseButton from "../../../base/BaseButton";
import { VoidFunctionType } from "../../../../../_BLL/types/commonTypes";
import { useDispatch, useSelector } from "react-redux";
import { bookingActions } from "../../../../../_BLL/reducers/bookingReducer";
import { InputColWrapper } from "./shipper-styles";
import SurchargeRateSelect from "../../../_commonComponents/select/SurchargeRateSelect";
import { GroupWrap } from "../../../../Pages/Services&Rates/rates/register_new_freight_rate/form-styles";
import FormField from "../../../_commonComponents/Input/FormField";
import { AppStateType } from "../../../../../_BLL/store";
import {
  getCurrentShippingTypeSelector,
  getShippingTypesSelector,
} from "../../../../../_BLL/selectors/rates&surcharge/surchargeSelectors";
import { ShippingTypesEnum } from "../../../../../_BLL/types/rates&surcharges/newSurchargesTypes";
import { useFieldArray } from "react-hook-form";
import { CargoGroup } from "../../../../../_BLL/types/bookingTypes";
import { SearchResultType } from "../../../../../_BLL/types/search/search_types";

type PropsType = {
  setFormStep: VoidFunctionType;
  formStep: number;
  shippingValue: number;
  currentFreightRate: SearchResultType;
};

const CargoDetails: React.FC<PropsType> = ({
  setFormStep,
  formStep,
  shippingValue,
  currentFreightRate,
}) => {
  const dispatch = useDispatch();
  let release_type_choices = useSelector(
    (state: AppStateType) => state.booking.release_type_choices
  );
  let cargo_groups = useSelector(
    (state: AppStateType) => state.booking.current_booking_cargo_groups
  );
  const {
    register,
    handleSubmit,
    errors,
    control,
    getValues,
    setValue,
  } = useForm();

  const shippingTypes = useSelector(getShippingTypesSelector);
  const mode = useSelector(getCurrentShippingTypeSelector);
  const shippingModeOptions =
    mode === ShippingTypesEnum.AIR
      ? shippingTypes[0]?.shipping_modes
      : shippingTypes[1]?.shipping_modes;

  let container_types = shippingModeOptions?.find((s) => s.id === shippingValue)
    ?.container_types;

  const findContainer = (id: number) => {
    const container = container_types?.find((c) => c.id === id);
    return container?.code;
  };

  const onSubmit = (values: any) => {
    const newArr = cargo_groups?.map((c: any) => {
      return { ...c, description: values.cargo_descriptions[c.id] };
    });

    const firstStepObj = {
      cargo_groups: newArr,
      release_type: values.release_type,
      number_of_documents: Number(values.number_of_documents),
    };

    dispatch(bookingActions.set_description_step(firstStepObj));
    setFormStep(formStep + 1);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <HeadingFormWrapper>
        <HeadingFormText>
          Please, fill basic information about the shipment
        </HeadingFormText>
        <BaseButton type="submit">Next</BaseButton>
      </HeadingFormWrapper>
      <InputGroupName>Cargo details</InputGroupName>
      <FlexWrapper>
        <div style={{ width: 205 }}>
          <ColName>Cargo</ColName>
        </div>
        <div style={{ flex: 1 }}>
          <ColName>Cargo description</ColName>
        </div>
      </FlexWrapper>
      <InputsWrapper>
        {cargo_groups?.map((item, index) => (
          <RowWrapper key={item.id}>
            <div style={{ width: 205 }}>
              <ContainerInfo>
                {`${findContainer(Number(item.container_type))} x ${
                  item.volume
                }`}
              </ContainerInfo>
            </div>
            <div style={{ flex: 1 }}>
              <Controller
                name={`cargo_descriptions.${item.id}`}
                control={control}
                as={<Field placeholder="Add desription..." />}
                rules={{ required: "Field is required" }}
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
            <InputGroupName>Documentation</InputGroupName>
            <DocumentationRow>
              <DocumentationCol>
                <Controller
                  name="release_type"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: "Field is required",
                  }}
                  as={
                    <SurchargeRateSelect
                      label="Release type"
                      options={release_type_choices}
                      error={errors?.release_type?.message}
                      placeholder="Release type"
                    />
                  }
                />
              </DocumentationCol>
              <DocumentationCol>
                <FormField
                  label="No. of Documents"
                  inputRef={register({
                    required: "Field is required",
                  })}
                  placeholder="No. of Documents"
                  name="number_of_documents"
                  getValues={getValues}
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
