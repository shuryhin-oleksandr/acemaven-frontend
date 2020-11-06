import React from 'react'
import {FormContent, FormWrap, GroupWrap, Port, PortsList} from "./form-styles";
import { Controller } from 'react-hook-form'
import SurchargeRateSelect from "../../../../components/_commonComponents/select/SurchargeRateSelect";
import FormField from "../../../../components/_commonComponents/Input/FormField";
import {CarrierType, PortType} from "../../../../../_BLL/types/rates&surcharges/surchargesTypes";
import SurchargesDates from "./SurchargeDates";
import {directions} from "../../../../../_BLL/helpers/surcharge_helpers_methods&arrays";
import {ShippingModeType} from "../../../../../_BLL/types/rates&surcharges/newSurchargesTypes";


type PropsType = {
    control: any
    register: any
    getValues: any
    setValue: (name: string, value: string | number) => void
    errors: any
    carrierOptions: CarrierType[] | null
    shippingModeOptions: ShippingModeType[]
    setShippingValue: (shippingModeId: number) => void
    ports: any
    locationChangeHandler: (currentTarget: HTMLInputElement) => void
    getDisabledSurchargesDates: (portName: string, portId: number) => void
    required_dates: boolean,
    adding_success: boolean,
    watchResultArr: number[],
    watchResultArrForDates: number[],
    location_id: number
}

const SurchargeForm: React.FC<PropsType> = (
    {control, register, getValues, setValue, errors, carrierOptions, shippingModeOptions, setShippingValue, ports,location_id,
        locationChangeHandler, getDisabledSurchargesDates,required_dates, adding_success, watchResultArr, watchResultArrForDates
    }
    ) => {

    return (
        <FormWrap>
            <FormContent>
                <GroupWrap>
                    <Controller
                        name="carrier"
                        control={control}
                        defaultValue=""
                        rules={{
                            required: 'Field is required',
                        }}
                        as={
                            <SurchargeRateSelect label="Carrier"
                                                 options={carrierOptions}
                                                 error={errors?.carrier?.message}
                                                 placeholder='Carrier'
                            />
                        }
                    />
                    <Controller
                        name="direction"
                        control={control}
                        defaultValue=""
                        rules={{
                            required: 'Field is required',
                        }}
                        as={
                            <SurchargeRateSelect label="Direction"
                                                 options={directions}
                                                 error={errors?.direction?.message}
                                                 placeholder='Direction'
                            />
                        }
                    />
                    <Controller
                        name="shipping_mode"
                        control={control}
                        defaultValue=""
                        rules={{
                            required: 'Field is required',
                        }}
                        as={
                            <SurchargeRateSelect
                                label="Shipping Mode"
                                options={shippingModeOptions}
                                callback={setShippingValue}
                                error={errors?.shipping_mode?.message}
                                placeholder='Shipping Mode'
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
                        name="location"
                        placeholder="Local port"
                        label="Location"
                        error={errors?.location}
                        getValues={getValues}
                        onChange={locationChangeHandler}
                        disabled={watchResultArr.length !== 3}
                    />
                    {ports && ports?.length > 0 && (
                        <PortsList>
                            {ports?.map((p: PortType) => (
                                <Port onClick={() => getDisabledSurchargesDates(p.display_name, p.id)} key={p?.id}>
                                    {p?.display_name}
                                </Port>
                            ))}
                        </PortsList>
                    )}
                    </div>
                <SurchargesDates
                    errors={{ from: errors.from, to: errors.to }}
                    control={control}
                    setValue={setValue}
                    required_dates={required_dates}
                    watchResultArrForDates={watchResultArrForDates}
                    disabled={location_id === 0}
                />
                </GroupWrap>
            </FormContent>
        </FormWrap>
    )
};

export default SurchargeForm