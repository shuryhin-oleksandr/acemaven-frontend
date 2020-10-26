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
import { useDispatch } from "react-redux";
import { bookingActions } from "../../../../../_BLL/reducers/bookingReducer";

type PropsType = {
  control: any;
  setFormStep: VoidFunctionType;
  formStep: number;
  getValues: any;
};

const arr = [
  { id: 1, type: "2 x 40HC" },
  { id: 2, type: "2 x 40HC" },
  { id: 3, type: "1 Pallets x 2w/m " },
];
const CargoDetails: React.FC<PropsType> = ({
  control,
  setFormStep,
  formStep,
  getValues,
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
        {arr.map((item, idx) => (
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
    </>
  );
};

export default CargoDetails;
