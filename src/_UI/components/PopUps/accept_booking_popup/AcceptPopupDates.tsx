import React, {useEffect, useRef, useState} from 'react'
//react-text-mask (for input type='text' that looking like type='time')
import MaskedInput from "react-text-mask";
//react-day-picker
import DayPickerInput from "react-day-picker/DayPickerInput";
// @ts-ignore
import {formatDate, parseDate} from 'react-day-picker/build/addons/MomentLocaleUtils'
//moment js
import moment from "moment";
//react-hook-form
import {Controller} from "react-hook-form";
//styles
import {AcceptDatesFilter, Wrapper} from "./accept-popup-styles";
import {CalendarWrapper} from "../../_commonComponents/calendar/calendar-styles";
import {HelperText} from "../../_commonComponents/Input/input-styles";
import {useTranslation} from "react-i18next";



type PropsType = {
    control: any
    setValue: (name: string, value: any) => void
    errors: {from: any, to: any, departure_time: any, arrival_time: any}
    textColor?: string
    textFont?: string
    textTransform?: string
    flex_direction?: string
    display_label?: string
    max_width?: string
    margin_bottom?: string
    input_height?: string
    rate_start_date?: string
    setFormMode?: (value: boolean) => void
    required_dates: boolean,
    label1: string,
    label2: string,
    time_name_first: string,
    time_name_second: string,
    date_name_first: string,
    date_name_second: string,
    start_shipment_date?: string,
    operation_dates?: {from: string, to: string},
    before?: any,
    after?: any,
    wrapper_width?: string,
    justify_content?: string,
    arrival_date?: string,
    departure_date?: string,
    first_time?: any,
    second_time?: any,
    register?: any,
    disabled_condition1?: boolean,
    disabled_condition2?: boolean,
    required_time: boolean,
    color_label?: boolean
}


const AcceptPopupDates: React.FC<PropsType> = ({control, setValue, errors, register, required_dates, ...props}) => {

    const [selectedDay, setSelectedDay] = useState<any>({
        from:  '',
        to:  ''
    })


    const handleFromChange = (from: string) => {
        props.setFormMode && props.setFormMode(true)
        setSelectedDay({
            ...selectedDay,
            from
        })
        setValue(props.date_name_first, from)
    }

    const handleToChange = (to: string) => {
        props.setFormMode && props.setFormMode(true)
        setSelectedDay({
            ...selectedDay,
            to
        })
        setValue(props.date_name_second, to)
    }

    const toInput = useRef<DayPickerInput>(null)


    useEffect(() => {
        if(props.departure_date && props.arrival_date) {
            setSelectedDay({
                from: moment(props.departure_date, 'DD/MM/YYYY').toDate(),
                to: moment(props.arrival_date, 'DD/MM/YYYY').toDate()
            })
            setValue(props.date_name_first, moment(props.departure_date, 'DD/MM/YYYY').toDate())
            setValue(props.date_name_second, moment(props.arrival_date, 'DD/MM/YYYY').toDate())
        }
        if(props.departure_date) {
            setSelectedDay({
                from: moment(props.departure_date, 'DD/MM/YYYY').toDate()
            })
            setValue(props.date_name_first, moment(props.departure_date, 'DD/MM/YYYY').toDate())
        }
        if(props.first_time && props.second_time) {
            setValue(props.time_name_first, props.first_time)
            setValue(props.time_name_second, props.second_time)
        }
    }, [props.departure_date,props.arrival_date, props.second_time, props.first_time])


    const {t} = useTranslation();
    // @ts-ignore
    return (
        <AcceptDatesFilter flex_direction={props.flex_direction} >
            <Wrapper justify_content={props.justify_content} wrapper_width={props.wrapper_width} >
                <CalendarWrapper max_width={'240px'}
                                 max_width_wrapper={'340px'}
                                 input_height='40px' margin_right='10px' margin_bottom='5px' >
                    <span style={{fontFamily: !props.color_label ? 'Helvetica Reg' : 'Helvetica Bold',
                                fontSize: '14px',
                                color: !props.color_label ? 'black' : '#115b86',
                                textTransform: !props.color_label ? 'none' : 'uppercase'
                    }}>
                        {props.label1}
                    </span>
                    <div style={{width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end'}}>
                    <>
                        <Controller
                            name={props.date_name_first}
                            control={control}
                            rules={{
                                required: required_dates
                            }}
                            defaultValue=""
                            as={
                                <DayPickerInput
                                    inputProps={{
                                        readOnly: true,
                                        disabled: props.disabled_condition1
                                    }}
                                    format='DD/MM/YYYY'
                                    placeholder='DD/MM/YYYY'
                                    formatDate={formatDate}
                                    parseDate={parseDate}
                                    hideOnDayClick={false}
                                    value={selectedDay.from}
                                    // @ts-ignore
                                    onDayChange={handleFromChange}
                                    ref={toInput}
                                    dayPickerProps={{
                                        disabledDays: [{before: props.before} ,{after: props.after}],
                                    }}
                                />
                            }
                        />
                        {!!errors.from && (
                            <HelperText>{t("Error message/Field is required")}</HelperText>
                        )}
                    </>
                        <Controller name={props.time_name_first}
                                    control={control}
                                    rules={{
                                        required: props.required_time
                                    }}
                                    defaultValue=''
                                    as={
                                        <MaskedInput
                                            mask={[/[0-2]/, /[0-9]/, ':', /[0-5]/, /[0-9]/]}
                                            className="form-control"
                                            placeholder="--:--"
                                            guide={false}
                                            id="my-input-id"
                                            disabled={props.disabled_condition2}
                                        />
                                    }
                        />
                    </div>
                </CalendarWrapper>
            </Wrapper>
            <Wrapper justify_content={props.justify_content} wrapper_width={props.wrapper_width}>
                <CalendarWrapper max_width={'240px'}
                                 max_width_wrapper={'340px'}
                                 input_height='40px' margin_right='10px' margin_bottom='5px'>
                    <span style={{fontFamily: !props.color_label ? 'Helvetica Reg' : 'Helvetica Bold',
                        fontSize: '14px',
                        color: !props.color_label ? 'black' : '#115b86',
                        textTransform: !props.color_label ? 'none' : 'uppercase'
                    }}>
                        {props.label2}
                    </span>
                    <div style={{width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end'}}>
                        <>
                            <Controller
                                name={props.date_name_second}
                                control={control}
                                rules={{
                                    required: required_dates
                                }}
                                defaultValue=""
                                as={
                                    <DayPickerInput
                                        inputProps={{
                                            readOnly:'readonly',
                                            disabled: props.disabled_condition2
                                        }}
                                        format='DD/MM/YYYY'
                                        placeholder='DD/MM/YYYY'
                                        formatDate={formatDate}
                                        parseDate={parseDate}
                                        hideOnDayClick={false}
                                        value={selectedDay.to}
                                        // @ts-ignore
                                        onDayChange={handleToChange}
                                        ref={toInput}
                                        dayPickerProps={{
                                            disabledDays: [{before: props.before}, {after: props.after}],
                                        }}
                                    />
                                }
                            />
                            {!!errors.to && (
                                <HelperText>{t("Error message/Field is required")}</HelperText>
                            )}
                        </>
                        <Controller control={control}
                                    rules={{
                                        required: props.required_time
                                    }}
                                    name={props.time_name_second}
                                    defaultValue=''
                                    as={
                                        <MaskedInput
                                            mask={[/[0-2]/, /[0-9]/, ':', /[0-5]/, /[0-9]/]}
                                            className="form-control"
                                            placeholder="--:--"
                                            guide={false}
                                            id="my-input-id"
                                            disabled={props.disabled_condition2}
                                        />
                                    }
                        />
                    </div>
                </CalendarWrapper>
                </Wrapper>
        </AcceptDatesFilter>
    )
};


export default AcceptPopupDates


