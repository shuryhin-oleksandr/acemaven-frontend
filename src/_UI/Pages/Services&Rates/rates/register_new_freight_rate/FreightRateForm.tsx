import React from 'react'
//react-hook-form
import {Controller} from "react-hook-form";
//react-custom-scrollbars
import {Scrollbars} from "react-custom-scrollbars";
//types
import {PortType, RateInfoType} from "../../../../../_BLL/types/rates&surcharges/ratesTypes";
import {CarrierType} from "../../../../../_BLL/types/rates&surcharges/surchargesTypes";
import {ShippingModeType} from "../../../../../_BLL/types/rates&surcharges/newSurchargesTypes";
//components
import SurchargeRateSelect from "../../../../components/_commonComponents/select/SurchargeRateSelect";
import FormField from "../../../../components/_commonComponents/Input/FormField";
//styles
import {FormWrap, GroupWrap} from "./form-styles";
import {HelperText} from "../../../../components/_commonComponents/Input/input-styles";
import {Port, PortsList} from "../../surcharge/register_new_surcharge/form-styles";
import {useTranslation} from "react-i18next";


type PropsType = {
    control: any
    errors: any
    register: any
    setValue: (name: string, value: string | number) => void
    carrierOptions: CarrierType[] | null
    shippingModeOptions: ShippingModeType[]
    shippingValue: number
    setShippingValue: (shippingModeId: number) => void
    origin_ports: Array<PortType> | null
    destination_ports: Array<PortType> | null
    onOriginChangeHandler: (value: any) => void
    onDestinationChangeHandler: (value: any) => void,
    getBookedRatesDates: any,
    closePortsHandler: any;
    rate_info: RateInfoType | null,
    watchResultArr: number[],
    rate_transit_error: any
}

const FreightRateForm: React.FC<PropsType> = ({
                                                  control, errors, register, carrierOptions, shippingModeOptions, getBookedRatesDates,
                                                  setShippingValue, origin_ports, destination_ports, onOriginChangeHandler, rate_transit_error,
                                                  onDestinationChangeHandler, closePortsHandler, watchResultArr
                                              }) => {
  const {t} = useTranslation();
    return (
        <FormWrap>
            <div style={{display: "flex", width: "100%", borderBottom: '1px solid #115B86', paddingBottom: '35px'}}>
                <GroupWrap>
                    <Controller
                        name="carrier"
                        control={control}
                        defaultValue=""
                        rules={{
                            required: 'Field is required'
                        }}
                        as={
                            <SurchargeRateSelect label={t("Quote bid screen/Carrier")}
                                                 options={carrierOptions}
                                                 error={errors?.carrier?.message}
                                                 placeholder={t("Quote bid screen/Carrier")}
                            />}
                    />
                    <Controller
                        name="shipping_mode"
                        control={control}
                        defaultValue=""
                        rules={{
                            required: 'Field is required'
                        }}
                        as={
                            <SurchargeRateSelect
                                label={t("Dashboard/Shipping Mode")}
                                options={shippingModeOptions}
                                callback={setShippingValue}
                                error={errors?.shipping_mode?.message}
                                placeholder={t("Dashboard/Shipping Mode")}
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
                            inputRef={register({
                                required: "Field is required",
                            })}
                            name="origin"
                            placeholder={t("Dashboard/Local port")}
                            label={t("Dashboard/Origin")}
                            error={errors?.origin}
                            onChange={onOriginChangeHandler}
                        />
                        {origin_ports && origin_ports?.length > 0 && (
                            <Scrollbars
                                style={{
                                    position: "absolute",
                                    zIndex: 10,
                                    borderRadius: 5,
                                    border: "1px solid rgba(0,0,0,0.5)",
                                    top: 64
                                }}
                                autoHeight={true}
                                autoHeightMax={110}
                            >
                                <PortsList>
                                    {origin_ports?.map((p: PortType) => (
                                        <Port
                                            onClick={() => closePortsHandler(p, 'origin')}
                                            key={p?.id}
                                        >
                                            {p?.display_name}
                                        </Port>
                                    ))}
                                </PortsList>
                            </Scrollbars>
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
                            inputRef={register({
                                required: "Field is required",
                            })}
                            name="destination"
                            placeholder={t("Dashboard/Local port")}
                            label={t("Dashboard/Destination")}
                            error={errors?.destination}
                            onChange={onDestinationChangeHandler}
                            disabled={watchResultArr.length < 3}
                        />
                        {destination_ports && destination_ports?.length > 0 && (
                            <Scrollbars
                                style={{
                                    position: "absolute",
                                    zIndex: 10,
                                    borderRadius: 5,
                                    border: "1px solid rgba(0,0,0,0.5)",
                                    top: 64
                                }}
                                autoHeight={true}
                                autoHeightMax={110}
                            >
                                <PortsList>
                                    {destination_ports?.map((p: PortType) => (
                                        <Port
                                            onClick={() => getBookedRatesDates(p)}
                                            key={p?.id}
                                        >
                                            {p?.display_name}
                                        </Port>
                                    ))}
                                </PortsList>
                            </Scrollbars>
                        )}
                    </div>

                    <FormField
                        type='number'
                        label={t("Dashboard/Transit Time")}
                        placeholder={t("Billing/days")}
                        inputRef={register({
                            required: "Field is required",
                        })}
                        name="transit_time"
                        error={errors?.transit_time}
                        disabled={watchResultArr.length < 3}
                    />
                    {rate_transit_error && rate_transit_error.length > 0 &&
                    <HelperText style={{paddingTop: 0}}>
                        Value is not valid
                    </HelperText>}

                </GroupWrap>
            </div>
        </FormWrap>
    )
}

export default FreightRateForm