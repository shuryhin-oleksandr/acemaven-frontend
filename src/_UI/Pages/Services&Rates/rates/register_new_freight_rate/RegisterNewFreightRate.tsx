import React, { useEffect } from "react";
//react-router-dom
import { useHistory } from "react-router-dom";
//react-redux
import { useDispatch } from "react-redux";
//BLL
import { registerNewFreightRateThunk } from "../../../../../_BLL/thunks/rates&surcharge/rateThunks";
//types
import {
  CurrentShippingType,
  ShippingModeType,
} from "../../../../../_BLL/types/rates&surcharges/newSurchargesTypes";
import {
  CarrierType,
  ContainerType,
  PortType, SurchargeInfoType,
} from "../../../../../_BLL/types/rates&surcharges/surchargesTypes";
import {RateForSurchargeType, RateInfoType} from "../../../../../_BLL/types/rates&surcharges/ratesTypes";
//components
import CancelButton from "../../../../components/_commonComponents/buttons/navFormButtons/CancelButton";
import OptionsDeliveryButtons from "../../../../components/_commonComponents/optionsButtons/delivery/OptionsDeliveryButtons";
import FreightRateForm from "./FreightRateForm";
import Rates from "./tables/Rates";
import SurchargesToRate from "./tables/SurchargesToRate";
import {ErrorServerMessage} from "../../../SignInPage";
//styles
import {
  ActionsWrapper,
  FormTitle,
  HeaderWrapper,
  RegisterButton,
  UnderTitle,
} from "./form-styles";
import { Outer } from "../../surcharge/register_new_surcharge/form-styles";



type PropsType = {
  handleSubmit: any;
  control: any;
  register: any;
  errors: any;
  getValues: any;
  setValue: (name: string, value: string | number) => void;
  closeRateRegistration: () => void;
  setMode: (mode: CurrentShippingType) => void;
  mode: CurrentShippingType;
  carrierOptions: CarrierType[] | null;
  shippingModeOptions: ShippingModeType[];
  shippingValue: number;
  setShippingValue: (shippingModeId: number) => void;
  origin_ports: Array<PortType> | null;
  destination_ports: any;
  onOriginChangeHandler: (value: any) => void;
  onDestinationChangeHandler: (value: any) => void;
  closePortsHandlerOrigin: any;
  closePortsHandlerDestination: any;
  usageFees: ContainerType[];
  setNewSurchargePopUpVisible: (value: boolean) => void;
  existing_surcharge: any
  surcharge: SurchargeInfoType | null
  rate_data_for_surcharge: RateForSurchargeType | null
  registration_success: string
  rate_info: RateInfoType | null,
  watchResultArr: number[],
  origin_port_value: PortType | null,
  destination_port_value: PortType | null
  //booked_dates: Array<{from: Date, to: Date}>
  adding_rate_error: any
  rate_transit_error: any
};

const RegisterNewFreightRate: React.FC<PropsType> = ({handleSubmit, control, register, errors,
  getValues, setValue, closeRateRegistration, setMode,
  mode, carrierOptions, shippingModeOptions, shippingValue, adding_rate_error, rate_transit_error,
  setShippingValue, origin_ports, destination_ports, onOriginChangeHandler,
  onDestinationChangeHandler, closePortsHandlerOrigin, closePortsHandlerDestination, usageFees, origin_port_value, destination_port_value,
  setNewSurchargePopUpVisible, existing_surcharge, rate_data_for_surcharge, surcharge, registration_success, rate_info, watchResultArr
}) => {

  const history = useHistory()
  const dispatch = useDispatch();
  const onSubmit = (values: any) => {
    let rates_array;
    if (values.rates.length > 1) {
      let full_rates = values.rates.filter((r: any) => r !== null);
      rates_array = full_rates.map((r: any) => (r !== null && r.from
              && {container_type: r.container_type, currency: r.currency, rate: r.rate, start_date: r.from, expiration_date: r.to})
              || (r !== null && !r.from && {container_type: r.container_type, currency: r.currency})
              || (r !== null && !r.from && !r.rate && {container_type: r.container_type, currency: r.currency})
              || (r !== null && r.from && !r.rate && {container_type: r.container_type, currency: r.currency})
      );
      let data = {
        carrier: values.carrier,
        shipping_mode: values.shipping_mode,
        transit_time: Number(values.transit_time),
        origin: Number(origin_port_value?.id),
        destination: Number(destination_port_value?.id),
        rates: rates_array,
      };
      dispatch(registerNewFreightRateThunk(data, history));
    } else {
      let data_without_containers = {
        carrier: values.carrier,
        shipping_mode: values.shipping_mode,
        transit_time: Number(values.transit_time),
        origin: Number(origin_port_value?.id),
        destination: Number(destination_port_value?.id),
        rates: [
          {
            currency: values.rates.currency,
            rate: values.rates.rate,
            start_date: values.rates[0].from,
            expiration_date: values.rates[0].to,
          },
        ],
      };
      dispatch(registerNewFreightRateThunk(data_without_containers, history));
    }
  };

  useEffect(() => {
    if(registration_success) {
      closeRateRegistration()
    }
  }, [registration_success]);

    return (
        <Outer onSubmit={handleSubmit(onSubmit)}>
            <HeaderWrapper>
                <FormTitle>Freight rates</FormTitle>
                <ActionsWrapper>
                    <RegisterButton disabled={!existing_surcharge} type="submit">SAVE</RegisterButton>
                    <CancelButton text="CANCEL" setIsOpen={closeRateRegistration} />
                </ActionsWrapper>
            </HeaderWrapper>
            <div style={{ marginBottom: "20px", width: "150px" }}>
                <OptionsDeliveryButtons
                    directory="import"
                    mode={mode}
                    setMode={setMode}
                    searchColumn=""
                    searchValue=""
                    setShippingValue={setShippingValue}
                />
            </div>
            <FreightRateForm control={control}
                             errors={errors}
                             register={register}
                             getValues={getValues}
                             carrierOptions={carrierOptions}
                             shippingModeOptions={shippingModeOptions}
                             shippingValue={shippingValue}
                             setShippingValue={setShippingValue}
                             origin_ports={origin_ports}
                             destination_ports={destination_ports}
                             onOriginChangeHandler={onOriginChangeHandler}
                             onDestinationChangeHandler={onDestinationChangeHandler}
                             closePortsHandlerOrigin={closePortsHandlerOrigin}
                             closePortsHandlerDestination={closePortsHandlerDestination}
                              rate_info={rate_info}
                             setValue={setValue}
                             watchResultArr={watchResultArr}
                             rate_transit_error={rate_transit_error}
            />
          {
            (adding_rate_error && adding_rate_error.length > 0)
            && <ErrorServerMessage style={{textAlign: 'start'}}>
              Rate has to be equal or grater than zero and includes maximum 15 symbols
            </ErrorServerMessage>
          }
            {watchResultArr.length === 4
                ? <>
                    <Rates control={control}
                           errors={errors}
                           setValue={setValue}
                           usageFees={usageFees}
                           register={register}
                           getValues={getValues}
                           setNewSurchargePopUpVisible={setNewSurchargePopUpVisible}
                           existing_surcharge={existing_surcharge}
                           surcharge={surcharge}
                           rate_data_for_surcharge={rate_data_for_surcharge}
                           required_dates={false}
                           shipping_value={shippingValue}
                    />
                    {existing_surcharge  && <SurchargesToRate existing_surcharge={existing_surcharge}/>}
                    </>
                : <UnderTitle>
                    Please, complete the parameters of the freight rate for the value fields
                    to appear
                </UnderTitle>
            }
        </Outer>
    )
}

export default RegisterNewFreightRate;
