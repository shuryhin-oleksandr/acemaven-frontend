import React from "react";
import CancelButton from "../../_commonComponents/buttons/navFormButtons/CancelButton";
import {
  CloseButton,
  PopupContent,
  PopupOuter,
  ActionsWrapper,
  FormTitle,
  HeaderWrapper,
  RegisterButton,
  InfoWrap,
  ShippingMode,
  Content,
  FieldOuter,
  FieldsWrap,
  Label,
} from "./register-surcharge-styles";
import { VoidFunctionType } from "../../../../_BLL/types/commonTypes";
import closeIcon from "../../../../_UI/assets/icons/close-icon.svg";
import ship from "../../../assets/icons/rates&services/ship-surcharge.svg";
import plane from "../../../assets/icons/rates&services/plane-surcharge.svg";
import { Controller, useForm } from "react-hook-form";
import { CarrierType } from "../../../../_BLL/types/rates&surcharges/ratesTypes";
import { ShippingModeType } from "../../../../_BLL/types/rates&surcharges/ratesTypes";

type PropsType = {
  setIsOpen?: VoidFunctionType;
  getValues?: any;
  popUpCarrier?: CarrierType;
  popUpShippingMode?: ShippingModeType | null;
  mode: string;
};

const onSubmit = (values: any) => {
  console.log("VAL", values);
};

const RegisterSurchargePopUp: React.FC<PropsType> = ({
  setIsOpen,
  popUpCarrier,
  popUpShippingMode,
  mode,
}) => {
  const { handleSubmit, errors, setValue, control } = useForm<any>({
    reValidateMode: "onBlur",
  });
  return (
    <PopupOuter>
      <PopupContent onSubmit={handleSubmit(onSubmit)}>
        <CloseButton onClick={() => setIsOpen && setIsOpen(false)}>
          <img src={closeIcon} alt="" />
        </CloseButton>
        <HeaderWrapper>
          <FormTitle>Freight rates</FormTitle>
          <ActionsWrapper>
            <RegisterButton type="submit">SAVE</RegisterButton>
            <CancelButton text="CANCEL" setIsOpen={setIsOpen} />
          </ActionsWrapper>
        </HeaderWrapper>
        <InfoWrap>
          <ShippingMode>
            <img src={mode === "sea" ? ship : plane} alt="picture" />
          </ShippingMode>
          <FieldsWrap>
            <FieldOuter>
              <Label>Carrier</Label>
              <Controller
                name={`carrier`}
                control={control}
                defaultValue={popUpCarrier?.id}
                as={<Content>{popUpCarrier?.title}</Content>}
              />
            </FieldOuter>
            <FieldOuter>
              <Label>Shipping mode</Label>
              <Controller
                name={`shipping_mode`}
                control={control}
                defaultValue={popUpShippingMode?.id}
                as={<Content>{popUpShippingMode?.title}</Content>}
              />
            </FieldOuter>
          </FieldsWrap>
          <FieldsWrap>
            <FieldOuter>
              <Label>Direction</Label>
              <Content c="#115B86">Export</Content>
            </FieldOuter>
            <FieldOuter>
              <Label>Location</Label>
              <Content c="#115B86">Cityofairport</Content>
            </FieldOuter>
          </FieldsWrap>
        </InfoWrap>
      </PopupContent>
    </PopupOuter>
  );
};

export default RegisterSurchargePopUp;
