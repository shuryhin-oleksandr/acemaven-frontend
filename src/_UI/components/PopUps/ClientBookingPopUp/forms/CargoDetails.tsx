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
import { Controller } from "react-hook-form";
import React from "react";
import BaseButton from "../../../base/BaseButton";
import { VoidFunctionType } from "../../../../../_BLL/types/commonTypes";
import { useDispatch, useSelector } from "react-redux";
import { bookingActions } from "../../../../../_BLL/reducers/booking/bookingReducer";
import SurchargeRateSelect from "../../../_commonComponents/select/SurchargeRateSelect";
import FormField from "../../../_commonComponents/Input/FormField";
import { AppStateType } from "../../../../../_BLL/store";
import {
  getCurrentShippingTypeSelector,
  getShippingTypesSelector,
} from "../../../../../_BLL/selectors/rates&surcharge/surchargeSelectors";
import { ShippingTypesEnum } from "../../../../../_BLL/types/rates&surcharges/newSurchargesTypes";

type PropsType = {
  control: any;
  setFormStep: VoidFunctionType;
  formStep: number;
  getValues: any;
  register: any;
  setValue?: any;
  shippingValue: number;
};


const CargoDetails: React.FC<PropsType> = ({
  control,
  setFormStep,
  formStep,
  getValues,
  register,
  shippingValue,
}) => {
  const dispatch = useDispatch();
  let release_type_choices = useSelector(
    (state: AppStateType) => state.booking.release_type_choices
  );
  let cargo_groups = useSelector(
    (state: AppStateType) => state.booking.current_booking_cargo_groups
  );


  const shippingTypes = useSelector(getShippingTypesSelector);
  const mode = useSelector(getCurrentShippingTypeSelector);
  const shippingModeOptions =
    mode === ShippingTypesEnum.AIR
      ? shippingTypes[0]?.shipping_modes
      : shippingTypes[1]?.shipping_modes;

  let container_types = shippingModeOptions?.find((s) => s.id === shippingValue)
    ?.container_types;

  console.log("container_types", container_types);

  const findContainer = (id: number) => {
    const container = container_types?.find((c) => c.id === id);
    console.log("CCC", container);
    return container?.code;
  };

  return (
    <>
      <HeadingFormWrapper>
        <HeadingFormText>
          Please, fill basic information about the shipment
        </HeadingFormText>
        <BaseButton
          onClick={() => {
            const values = getValues();
            console.log("values", values);
            const arr = Object.keys(values).map((v) => ({
              id: v,
              description: values[v],
            }));
            dispatch(bookingActions.setCargoDetails(arr));
            setFormStep(formStep + 1);
          }}
          type="button"
        >
          Next
        </BaseButton>
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
        {cargo_groups?.map((item, idx) => (
          <RowWrapper key={idx}>
            <div style={{ width: 205 }}>
              <ContainerInfo>
                {`${findContainer(Number(item.container_type))} x ${
                  item.volume
                }`}
              </ContainerInfo>
            </div>
            {/*<div style={{ flex: 1 }}>*/}
            {/*  <Controller*/}
            {/*    name={`${item.id}`}*/}
            {/*    control={control}*/}
            {/*    as={<Field placeholder="Add desription..." />}*/}
            {/*    rules={{ required: "Field is required" }}*/}
            {/*    defaultValue=""*/}
            {/*  />*/}
            {/*</div>*/}
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
    </>
  );
};

export default CargoDetails;
