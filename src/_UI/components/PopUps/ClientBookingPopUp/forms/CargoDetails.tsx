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
import { Field } from "../../../_commonComponents/Input/input-styles";
import React, { useEffect } from "react";
import BaseButton from "../../../base/BaseButton";
import { VoidFunctionType } from "../../../../../_BLL/types/commonTypes";
import { useDispatch } from "react-redux";
import { bookingActions } from "../../../../../_BLL/reducers/bookingReducer";
import { InputColWrapper } from "./shipper-styles";
import SurchargeRateSelect from "../../../_commonComponents/select/SurchargeRateSelect";
import { GroupWrap } from "../../../../Pages/Services&Rates/rates/register_new_freight_rate/form-styles";
import FormField from "../../../_commonComponents/Input/FormField";

type PropsType = {
  control: any;
  setFormStep: VoidFunctionType;
  formStep: number;
  getValues: any;
  register: any;
  setValue?: any;
};

const arr = [
  { id: 1, type: "2 x 40HC" },
  { id: 2, type: "2 x 40HC" },
  { id: 3, type: "1 Pallets x 2w/m" },
];
const CargoDetails: React.FC<PropsType> = ({
  control,
  setFormStep,
  formStep,
  getValues,
  register,
}) => {
  const dispatch = useDispatch();

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
        {arr.map((item) => (
          <RowWrapper key={item.id}>
            <div style={{ width: 205 }}>
              <ContainerInfo>{item.type}</ContainerInfo>
            </div>
            <div style={{ flex: 1 }}>
              <Controller
                name={`${item.id}`}
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
                  options={[
                    { title: "type 1", id: 1 },
                    { title: "type 2", id: 2 },
                  ]}
                  // error={errors?.carrier?.message}
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
