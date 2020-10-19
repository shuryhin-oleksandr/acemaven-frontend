import React, { useEffect, useState } from "react";
import { withRouter } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getRateInfoThunk } from "../../../../../../_BLL/thunks/rates&surcharge/rateThunks";
import {
  RateContainer,
  Wrap,
  RateTitle,
  ButtonsWrap,
  PauseImg,
  ShippingMode,
  InfoWrap,
  RouteName,
  Content,
  FieldOuter,
  FieldsWrap,
  Label,
} from "./exact-rate-styles";
import pause from "../../../../../assets/icons/rates&services/pause.svg";
import { SaveButton } from "../../../surcharge/surcharges_page/surcharge/surcharge-style";
import { Controller, useForm } from "react-hook-form";
import ship from "../../../../../assets/icons/rates&services/ship-surcharge.svg";
import plane from "../../../../../assets/icons/rates&services/plane-surcharge.svg";
import { AppStateType } from "../../../../../../_BLL/store";

const Rate = ({ ...props }) => {
  const [formMode, setFormMode] = useState(false);
  const dispatch = useDispatch();
  let id = props.match.params.id;
  useEffect(() => {
    dispatch(getRateInfoThunk(id));
  }, []);

  const { handleSubmit, errors, setValue, control } = useForm<any>({
    reValidateMode: "onBlur",
  });

  const rate = useSelector((state: AppStateType) => state.rate.rate_info);
  console.log("rate", rate);
  return (
    <RateContainer>
      <Wrap>
        <RateTitle>Freight Rate</RateTitle>
        <ButtonsWrap>
          {formMode && <SaveButton type="submit">SAVE CHANGES</SaveButton>}
          <PauseImg src={pause} alt="pause" />
        </ButtonsWrap>
      </Wrap>
      {rate && (
        <InfoWrap>
          <ShippingMode>
            <img src={"sea" === "sea" ? ship : plane} alt="picture" />
          </ShippingMode>
          <FieldsWrap>
            <FieldOuter>
              <Label>Route</Label>
              <RouteName>{rate?.origin.code}</RouteName>
              <RouteName>{rate?.destination.code}</RouteName>
            </FieldOuter>
          </FieldsWrap>
          <FieldsWrap>
            <FieldOuter>
              <Label>Carrier</Label>
              <Controller
                name="carrier"
                control={control}
                defaultValue={rate?.carrier.id}
                as={<Content>{rate?.carrier.title}</Content>}
              />
            </FieldOuter>
            <FieldOuter>
              <Label>Shipping mode</Label>
              <Controller
                name="shipping_mode"
                control={control}
                defaultValue={rate?.shipping_mode.id}
                as={<Content>{rate?.shipping_mode.title}</Content>}
              />
            </FieldOuter>
          </FieldsWrap>
          <FieldsWrap>
            <FieldOuter>
              <Label>Status</Label>
              <Controller
                name="carrier"
                control={control}
                defaultValue={rate?.is_active}
                as={
                  <Content>{rate?.is_active ? "ACTIVE" : "INACTIVE"}</Content>
                }
              />
            </FieldOuter>
            <FieldOuter>
              <Label>Transit time</Label>
              <Controller
                name="shipping_mode"
                control={control}
                defaultValue={rate?.transit_time}
                as={<Content>{`${rate?.transit_time} days`}</Content>}
              />
            </FieldOuter>
          </FieldsWrap>
        </InfoWrap>
      )}
    </RateContainer>
  );
};

export default withRouter(Rate);
