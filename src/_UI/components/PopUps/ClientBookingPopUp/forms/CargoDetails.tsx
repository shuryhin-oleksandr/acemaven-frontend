import {
  ColName,
  ContainerInfo,
  FlexWrapper,
  HeadingFormText,
  HeadingFormWrapper,
  InputGroupName,
  InputsWrapper,
  RowWrapper,
} from "../client-popup-styles";
import { Controller } from "react-hook-form";
import { Field } from "../../../_commonComponents/Input/input-styles";
import React from "react";
import BaseButton from "../../../base/BaseButton";
import { VoidFunctionType } from "../../../../../_BLL/types/commonTypes";

type PropsType = {
  control: any;
  setFormStep: VoidFunctionType;
  formStep: number;
};

const arr = ["2 x 40HC", "2 x 40HC", "1 Pallets x 2w/m "];
const CargoDetails: React.FC<PropsType> = ({
  control,
  setFormStep,
  formStep,
}) => {
  return (
    <>
      <HeadingFormWrapper>
        <HeadingFormText>
          Please, fill basic information about the shipment{" "}
        </HeadingFormText>
        <BaseButton onClick={() => setFormStep(formStep + 1)} type="button">
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
        {arr.map((item, idx) => (
          <RowWrapper key={idx}>
            <div style={{ width: 205 }}>
              <ContainerInfo>{item}</ContainerInfo>
            </div>
            <div style={{ flex: 1 }}>
              <Controller
                name={`description${idx}`}
                control={control}
                as={<Field placeholder="Add desription..." />}
                rules={{ required: "Field is required" }}
              />
            </div>
          </RowWrapper>
        ))}
      </InputsWrapper>
    </>
  );
};

export default CargoDetails;
