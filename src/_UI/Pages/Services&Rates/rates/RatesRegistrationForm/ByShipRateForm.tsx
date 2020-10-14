import React from "react";

import { Controller, useForm } from "react-hook-form";
import FormSelect from "../../../../components/_commonComponents/select/FormSelect";
import FormField from "../../../../components/_commonComponents/Input/FormField";
import { FormWrap, GroupWrap, Outer, UnderTitle } from "./form-styles";
import { VoidFunctionType } from "../../../../../_BLL/types/commonTypes";
import { ShippingModeType } from "../../../../../_BLL/types/rates&surcharges/ratesTypes";
import SurchargeRateSelect from "../../../../components/_commonComponents/select/SurchargeRateSelect";
import {
  CarrierType,
  CurrencyType,
  PortType,
} from "../../../../../_BLL/types/rates&surcharges/ratesTypes";
import {
  Port,
  PortsList,
} from "../../surcharge/SurchargeRegistrationForm/form-styles";
import { getPorts } from "../../../../../_BLL/reducers/surcharge&rates/rateThunks";
import { surchargeActions } from "../../../../../_BLL/reducers/surcharge&rates/surchargeReducer";
import { useDispatch } from "react-redux";
import { rateActions } from "../../../../../_BLL/reducers/surcharge&rates/rateReducer";
import SeaCargoForm from "../../surcharge/SurchargeRegistrationForm/sea_containerized_cargo/SeaCargoForm";
import SeaTables from "./sea_tables/SeaTables";

type PropsType = {
  setShippingValue: VoidFunctionType;
  shipping_modes: ShippingModeType[] | null;
  control?: any;
  register?: any;
  errors?: any;
  getValues?: any;
  setValue?: any;
  sea_carriers: CarrierType[] | null;
  destination_ports?: any;
  origin_ports?: any;
  shippingValue: number;
  currency_list: CurrencyType[] | null;
};

const ByShipRateForm: React.FC<PropsType> = ({
  shippingValue,
  setShippingValue,
  shipping_modes,
  sea_carriers,
  ...props
}) => {
  const dispatch = useDispatch();

  let onOriginChangeHandler = (value: any) => {
    dispatch(getPorts(value.value, "origin"));
  };
  let onDestinationChangeHandler = (value: any) => {
    dispatch(getPorts(value.value, "destination"));
  };
  let closePortsHandler = (port: PortType, field: string) => {
    props.setValue(field, port.display_name);
    dispatch(rateActions.setDestinationPortsList([]));
    dispatch(rateActions.setOriginPortsList([]));
  };

  let ship_mode = shipping_modes
    ? shipping_modes.find((s) => s.id === Number(shippingValue))
    : null;

  return (
    <FormWrap>
      <div style={{ display: "flex", width: "100%" }}>
        <GroupWrap>
          <Controller
            name="carrier"
            control={props.control}
            defaultValue=""
            rules={{
              required: true,
            }}
            as={<SurchargeRateSelect label="Carrier" options={sea_carriers} />}
          />
          <Controller
            name="shipping_mode"
            control={props.control}
            defaultValue=""
            as={
              <SurchargeRateSelect
                label="Shipping Mode"
                options={shipping_modes}
                callback={setShippingValue}
              />
            }
          />
        </GroupWrap>
        <GroupWrap>
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              position: "relative",
            }}
          >
            <FormField
              inputRef={props.register({
                required: "Field is required",
              })}
              name="origin"
              placeholder="Local port"
              label="Origin"
              error={props.errors?.origin?.message}
              getValues={props.getValues}
              onChange={onOriginChangeHandler}
              // onBlur={blurHandler}
            />
            {props.origin_ports && props.origin_ports?.length > 0 && (
              <PortsList>
                {props.origin_ports?.map((p: PortType) => (
                  <Port
                    onClick={() => closePortsHandler(p, "origin")}
                    key={p?.id}
                  >
                    {p?.display_name}
                  </Port>
                ))}
              </PortsList>
            )}
          </div>

          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              position: "relative",
            }}
          >
            <FormField
              inputRef={props.register({
                required: "Field is required",
              })}
              name="destination"
              placeholder="Local port"
              label="Destination"
              error={props.errors?.destination?.message}
              getValues={props.getValues}
              onChange={onDestinationChangeHandler}
              // onBlur={blurHandler}
            />
            {props.destination_ports && props.destination_ports?.length > 0 && (
              <PortsList>
                {props.destination_ports?.map((p: PortType) => (
                  <Port
                    onClick={() => closePortsHandler(p, "destination")}
                    key={p?.id}
                  >
                    {p?.display_name}
                  </Port>
                ))}
              </PortsList>
            )}
          </div>

          <FormField
            label="Transit time"
            placeholder="days"
            inputRef={props.register({
              required: "Field is required",
            })}
            name="transit_time"
            error={props.errors?.transit_time?.message}
            getValues={props.getValues}
          />
        </GroupWrap>
      </div>
      {!shippingValue ? (
        <UnderTitle>
          Please, complete the parameters of the surcharge for the value fields
          to appear
        </UnderTitle>
      ) : (
        <SeaTables
          control={props.control}
          register={props.register}
          ship_mode={ship_mode}
          currency_list={props.currency_list}
          shipping_value={shippingValue}
        />
      )}
    </FormWrap>
  );
};

export default ByShipRateForm;
