import React, {forwardRef, MutableRefObject} from 'react'
import DayPickerInput from "react-day-picker/DayPickerInput";
import MomentLocaleUtils from 'react-day-picker/moment';
import {CalendarLabel, CalendarWrapper} from "./calendar-styles";
import {PeriodType} from "../../../../_BLL/types/rates&surcharges/surchargesTypes";
import {VoidFunctionType} from "../../../../_BLL/types/commonTypes";
import 'react-day-picker/lib/style.css';
import { Controller } from 'react-hook-form'

// @ts-ignore
import {formatDate, parseDate} from 'react-day-picker/build/addons/MomentLocaleUtils'


type PropsType = {
    label: string
    name: string
    period?: PeriodType
    value: any
    handleDayChange: (value: any) => void
    selectedDay: any
    onDayClick?: VoidFunctionType
    ref: MutableRefObject<DayPickerInput>
    control: any
    disabled?: any
    error: boolean
    disabledDates: any
    textColor?: string
    textFont?: string
    textTransform?: string
    display_label?: string
    max_width?: string
    margin_bottom?: string
    onBlur?: any
    input_height?: string

}

const Calendar = forwardRef<DayPickerInput, PropsType>(
    ({name, label, value, handleDayChange, selectedDay, onDayClick = () => {}, disabled, control, error, disabledDates, ...props},
     ref) => {

    const { from, to } = selectedDay
    const modifiers = {start: selectedDay.from, end: selectedDay.to};

    return (
        <CalendarWrapper margin_bottom={props.margin_bottom} error={error} max_width={props.max_width} input_height={props.input_height}>
            <CalendarLabel display_label={props.display_label} textTransform={props.textTransform} textColor={props.textColor} textFont={props.textFont}>
                {label}
            </CalendarLabel>
            <Controller
                name={name}
                control={control}
                /*rules={{
                    required: true
                }}*/
                defaultValue=""
                as={
                    <DayPickerInput
                        inputProps={{
                            readOnly:'readonly',
                            disabled: disabled,
                        }}
                        format='DD/MM/YYYY'
                        placeholder='DD/MM/YYYY'
                        formatDate={formatDate}
                        parseDate={parseDate}
                        hideOnDayClick={false}
                        value={value}
                        onDayChange={handleDayChange}
                        //onBlur={props.onBlur}
                        ref={ref}
                        dayPickerProps={{
                            selectedDays: [from, {from, to}],
                            modifiers,
                            numberOfMonths: 1,
                            localeUtils: MomentLocaleUtils,
                            onDayClick: onDayClick,
                            disabledDays: disabledDates,
                        }}
                    />
                }
            />
        </CalendarWrapper>
    )
})

export default Calendar