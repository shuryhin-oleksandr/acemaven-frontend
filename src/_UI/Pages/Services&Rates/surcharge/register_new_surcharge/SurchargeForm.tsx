import React from 'react'
import {FormContent, FormWrap, GroupWrap, Port, PortsList} from "./form-styles";
import { Controller } from 'react-hook-form';
import {Scrollbars} from "react-custom-scrollbars";
import SurchargeRateSelect from "../../../../components/_commonComponents/select/SurchargeRateSelect";
import FormField from "../../../../components/_commonComponents/Input/FormField";
import {CarrierType, PortType} from "../../../../../_BLL/types/rates&surcharges/surchargesTypes";
import SurchargesDates from "./SurchargeDates";
import {directions} from "../../../../../_BLL/helpers/surcharge_helpers_methods&arrays";
import {ShippingModeType} from "../../../../../_BLL/types/rates&surcharges/newSurchargesTypes";
import {HelperText} from "../../../../components/_commonComponents/Input/input-styles";
import {useTranslation} from "react-i18next";


type PropsType = {
    control: any
    register: any
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
    location_id: number,
    invalidDate?: string
}

const SurchargeForm: React.FC<PropsType> = (
    {control, register, setValue, errors, carrierOptions, shippingModeOptions, setShippingValue, ports,location_id,
        locationChangeHandler, getDisabledSurchargesDates,required_dates,  watchResultArr, watchResultArrForDates, invalidDate
    }
    ) => {
    const {t} = useTranslation();
    return (
        <FormWrap>
            <FormContent>
                <GroupWrap>
                    <Controller
                        name="carrier"
                        control={control}
                        defaultValue=""
                        rules={{
                            required: `${t("Error message/Field is required")}`,
                        }}
                        as={
                            <SurchargeRateSelect label={t("Quote bid screen/Carrier")}
                                                 options={carrierOptions}
                                                 error={errors?.carrier?.message}
                                                 placeholder={t("Quote bid screen/Carrier")}
                                                 width="80%"
                            />
                        }
                    />
                    <Controller
                        name="direction"
                        control={control}
                        defaultValue=""
                        rules={{
                            required: `${t("Error message/Field is required")}`,
                        }}
                        as={
                            <SurchargeRateSelect label={t("Surcharges/Direction")}
                                                 options={directions}
                                                 error={errors?.direction?.message}
                                                 placeholder={t("Surcharges/Direction")}
                                                 width="80%"
                            />
                        }
                    />
                    <Controller
                        name="shipping_mode"
                        control={control}
                        defaultValue=""
                        rules={{
                            required: `${t("Error message/Field is required")}`,
                        }}
                        as={
                            <SurchargeRateSelect
                                label={t("Dashboard/Shipping Mode")}
                                options={shippingModeOptions}
                                callback={setShippingValue}
                                error={errors?.shipping_mode?.message}
                                placeholder={t("Dashboard/Shipping Mode")}
                                width="80%"
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
                            required: `${t("Error message/Field is required")}`,
                        })}
                        name="location"
                        placeholder={t("Dashboard/Local port")}
                        label={t("Operations/Location")}
                        error={errors?.location}
                        onChange={locationChangeHandler}
                        disabled={watchResultArr.length !== 3}
                        width="80%"
                    />
                    {ports && ports?.length > 0 && (
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
                                {ports?.map((p: PortType) => (
                                    <Port onClick={() => getDisabledSurchargesDates(p.display_name, p.id)} key={p?.id}>
                                        {p?.display_name}
                                    </Port>
                                ))}
                            </PortsList>
                        </Scrollbars>
                    )}
                    </div>
                <SurchargesDates
                    errors={{ from: errors.from, to: errors.to }}
                    control={control}
                    setValue={setValue}
                    required_dates={required_dates}
                    watchResultArrForDates={watchResultArrForDates}
                    disabled={location_id === 0}
                    width="80%"
                    label_margin_bottom="0"
                    margin_bottom="15px"
                />
                    {invalidDate && <HelperText messagePaddingTop='0'>{invalidDate}</HelperText>}
                </GroupWrap>
            </FormContent>
        </FormWrap>
    )
};

export default SurchargeForm