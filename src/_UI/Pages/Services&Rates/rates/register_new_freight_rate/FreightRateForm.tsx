import React from 'react'
import {FormWrap, GroupWrap} from "./form-styles";
import {Controller} from "react-hook-form";
import SurchargeRateSelect from "../../../../components/_commonComponents/select/SurchargeRateSelect";
import FormField from "../../../../components/_commonComponents/Input/FormField";
import {Port, PortsList} from "../../surcharge/register_new_surcharge/form-styles";
import {PortType} from "../../../../../_BLL/types/rates&surcharges/ratesTypes";
import {CarrierType} from "../../../../../_BLL/types/rates&surcharges/surchargesTypes";
import {ShippingModeType} from "../../../../../_BLL/types/rates&surcharges/newSurchargesTypes";

type PropsType = {
    control: any
    errors: any
    register: any
    getValues: any,
    carrierOptions:  CarrierType[] | null
    shippingModeOptions:  ShippingModeType[]
    shippingValue: number
    setShippingValue: (shippingModeId: number) => void
    origin_ports: Array<PortType> | null
    destination_ports: Array<PortType> | null
    onOriginChangeHandler: (value: any) => void
    onDestinationChangeHandler: (value: any) => void
    closePortsHandler: any
    getBookedRatesDates: (portName: string, portId: number) => void
}

const FreightRateForm:React.FC<PropsType> = ({control, errors, register, getValues, carrierOptions, shippingModeOptions,
                                             shippingValue, setShippingValue, origin_ports, destination_ports, onOriginChangeHandler,
                                             onDestinationChangeHandler, closePortsHandler, getBookedRatesDates}) => {
    return (
        <FormWrap>
            <div style={{ display: "flex", width: "100%", borderBottom: '1px solid #115B86', paddingBottom: '35px' }}>
                <GroupWrap>
                    <Controller
                        name="carrier"
                        control={control}
                        defaultValue=""
                        rules={{
                            required: true,
                        }}
                        as={<SurchargeRateSelect label="Carrier" options={carrierOptions} />}
                    />
                    <Controller
                        name="shipping_mode"
                        control={control}
                        defaultValue=""
                        as={
                            <SurchargeRateSelect
                                label="Shipping Mode"
                                options={shippingModeOptions}
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
                            inputRef={register({
                                required: "Field is required",
                            })}
                            name="origin"
                            placeholder="Local port"
                            label="Origin"
                            error={errors?.origin?.message}
                            getValues={getValues}
                            onChange={onOriginChangeHandler}
                            // onBlur={blurHandler}
                        />
                        {origin_ports && origin_ports?.length > 0 && (
                            <PortsList>
                                {origin_ports?.map((p: PortType) => (
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
                            inputRef={register({
                                required: "Field is required",
                            })}
                            name="destination"
                            placeholder="Local port"
                            label="Destination"
                            error={errors?.destination?.message}
                            getValues={getValues}
                            onChange={onDestinationChangeHandler}
                            //onBlur={blurHandler}
                        />
                        {destination_ports && destination_ports?.length > 0 && (
                            <PortsList>
                                {destination_ports?.map((p: PortType) => (
                                    <Port
                                        onClick={() => getBookedRatesDates(p.display_name, p.id)}
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
                        inputRef={register({
                            required: "Field is required",
                        })}
                        name="transit_time"
                        error={errors?.transit_time?.message}
                        getValues={getValues}
                    />
                </GroupWrap>
            </div>
        </FormWrap>
    )
}

export default FreightRateForm