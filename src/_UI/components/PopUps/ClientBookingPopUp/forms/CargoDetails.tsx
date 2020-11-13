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

type PropsType = {
  setFormStep: VoidFunctionType;
  formStep: number;
  shippingValue: number;
};

const arr = [
  { id: 1, type: "2 x 40HC" },
  { id: 2, type: "2 x 40HC" },
  { id: 3, type: "1 Pallets x 2w/m" },
];
const CargoDetails: React.FC<PropsType> = ({
  setFormStep,
  formStep,
  shippingValue,
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
  } = useForm({
    defaultValues: {
      cargo_groups: cargo_groups,
    },
  });

  const { fields } = useFieldArray({
    control,
    name: "cargo_groups",
  });

  console.log("cargo_groups", cargo_groups);

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
    console.log("values part 1", values);
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
        {fields?.map((item, idx) => (
          <RowWrapper key={item.id}>
            <div style={{ width: 205 }}>
              <ContainerInfo>
                <Controller
                  name={`cargo_groups[${idx}].volume`}
                  control={control}
                  as={<span>{item.volume} </span>}
                />
                x
                <Controller
                  name={`cargo_groups[${idx}].container_type`}
                  control={control}
                  as={
                    <span> {findContainer(Number(item.container_type))}</span>
                  }
                />
                {/*{`${findContainer(Number(item.container_type))} x ${*/}
                {/*  item.volume*/}
                {/*}`}*/}
              </ContainerInfo>
            </div>
            {item.dangerous !== false && (
              <Controller
                name={`cargo_groups[${idx}].dangerous`}
                control={control}
                as={<span />}
              />
            )}
            {!!item.frozen && (
              <Controller
                name={`cargo_groups[${idx}].frozen`}
                control={control}
                as={<span />}
              />
            )}
            <div style={{ flex: 1 }}>
              <Controller
                name={`cargo_groups[${idx}].description`}
                control={control}
                as={<Field placeholder="Add desription..." />}
                rules={{ required: "Field is required" }}
                defaultValue=""
              />
            </div>
          </RowWrapper>
        ))}
      </InputsWrapper>

      {/*{direction==="export" && shipping_type==="sea" &&}*/}
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
                  // error={errors?.carrier?.message}
                  placeholder="Release type"
                />
              }
            />
          </DocumentationCol>
          <DocumentationCol>
            <FormField
              label="No. of Documents"
              inputRef={register}
              placeholder="No. of Documents"
              name="number_of_docs"
              getValues={getValues}
              defaultValue={1}
            />
          </DocumentationCol>
        </DocumentationRow>
      </DocumentationSection>
    </form>
  );
};

export default CargoDetails;
