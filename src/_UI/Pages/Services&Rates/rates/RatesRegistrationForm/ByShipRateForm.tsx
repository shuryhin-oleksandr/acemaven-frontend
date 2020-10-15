import React from "react";

import { Controller, useForm } from "react-hook-form";
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
} from "../../surcharge/register_new_surcharge/form-styles";
import {checkRatesDatesThunk, getPorts} from "../../../../../_BLL/thunks/rates&surcharge/rateThunks";
import { useDispatch } from "react-redux";
import { rateActions } from "../../../../../_BLL/reducers/surcharge&rates/rateReducer";
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
    field === 'origin' && sessionStorage.setItem('origin_id', JSON.stringify(port.id))
    field === 'destination' && sessionStorage.setItem('port_id_rate', JSON.stringify(port.id))
    dispatch(rateActions.setDestinationPortsList([]));
    dispatch(rateActions.setOriginPortsList([]));
  };

  let ship_mode = shipping_modes
    ? shipping_modes.find((s) => s.id === Number(shippingValue))
    : null;
  console.log(ship_mode)

  let blurHandler = () => {
    debugger
    let carrier = props.getValues('carrier')
    let shipping_mode = props.getValues('shipping_mode')
    let origin = Number(sessionStorage.getItem('origin_id'))
    let destination = Number(sessionStorage.getItem('port_id_rate'))
    dispatch(checkRatesDatesThunk({carrier: carrier, shipping_mode: shipping_mode, origin: origin, destination: destination}))
  }

  return (
    <FormWrap>
      <div style={{ display: "flex", width: "100%", borderBottom: '1px solid #115B86', paddingBottom: '35px' }}>
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
              onBlur={blurHandler}
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
          Please, complete the parameters of the freight rate for the value fields
          to appear
        </UnderTitle>
      ) : (
        <SeaTables
          control={props.control}
          register={props.register}
          ship_mode={ship_mode}
          currency_list={props.currency_list}
          shipping_value={shippingValue}
          errors={props.errors}
          setValue={props.setValue}
        />
      )}
    </FormWrap>
  );
};

export default ByShipRateForm;
