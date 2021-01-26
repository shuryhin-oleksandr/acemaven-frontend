import React, {useEffect, useRef, useState} from 'react'
//react-day-picker
import DayPickerInput from "react-day-picker/DayPickerInput";
// @ts-ignore
import {formatDate, parseDate} from 'react-day-picker/build/addons/MomentLocaleUtils'
//moment js
import moment from "moment";
//react-hook-form
import {Controller} from "react-hook-form";
//styles
import {AcceptDatesFilter, TimePicker, Wrapper} from "./accept-popup-styles";
import {CalendarWrapper} from "../../_commonComponents/calendar/calendar-styles";
import {HelperText} from "../../_commonComponents/Input/input-styles";



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
    first_time?: string,
    second_time?: string,
    register?: any,
    disabled_condition1?: boolean,
    disabled_condition2?: boolean,
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


    return (
        <AcceptDatesFilter flex_direction={props.flex_direction} max_width={props.max_width}>
            <Wrapper justify_content={props.justify_content} wrapper_width={props.wrapper_width} >
                <CalendarWrapper max_width={!props.first_time ? '225px' : '235px'}
                                 input_height='40px' margin_right='10px' margin_bottom='5px' >
                    <span style={{fontFamily: !props.first_time ? 'Helvetica Reg' : 'Helvetica Bold',
                                fontSize: '14px',
                                color: !props.first_time ? 'black' : '#115b86',
                                textTransform: !props.first_time ? 'none' : 'uppercase'
                    }}>
                        {props.label1}
                    </span>
                    <Controller
                        name={props.date_name_first}
                        control={control}
                        rules={{
                            required: 'Field is required'
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
                        <HelperText>Field is required</HelperText>
                    )}
                </CalendarWrapper>
                    <Controller name={props.time_name_first}
                                control={control}
                                rules={{required: true}}
                                defaultValue=''
                                as={
                                    <TimePicker type="time"
                                                step='300'
                                                error={!!errors?.departure_time}
                                                disabled={props.disabled_condition1}
                                    />
                                }
                    />
            </Wrapper>

            <Wrapper justify_content={props.justify_content} wrapper_width={props.wrapper_width}>
                <CalendarWrapper max_width={!props.second_time ? '225px' : '235px'}
                                 input_height='40px' margin_right='10px' margin_bottom='5px'>
                     <span style={{fontFamily: !props.second_time ? 'Helvetica Reg' : 'Helvetica Bold',
                         fontSize: '14px',
                         color: !props.second_time ? 'black' : '#115b86',
                         textTransform: !props.second_time ? 'none' : 'uppercase'
                     }}>
                        {props.label2}
                    </span>
                    <Controller
                        name={props.date_name_second}
                        control={control}
                        rules={{
                            required: 'Field is required'
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
                        <HelperText>Field is required</HelperText>
                    )}
                </CalendarWrapper>
                <Controller control={control}
                            rules={{
                                required: true
                            }}
                            name={props.time_name_second}
                            defaultValue=''
                            as={
                                <TimePicker type="time"
                                            step='300'
                                            error={!!errors?.arrival_time}
                                            disabled={props.disabled_condition2}
                                />
                            }
                />
                </Wrapper>
        </AcceptDatesFilter>
    )
};


export default AcceptPopupDates


