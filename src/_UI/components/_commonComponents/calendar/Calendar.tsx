import React, {forwardRef, MutableRefObject} from 'react'
import DayPickerInput from "react-day-picker/DayPickerInput";
import MomentLocaleUtils from 'react-day-picker/moment';
import {CalendarLabel, CalendarWrapper} from "./calendar-styles";
import {PeriodType} from "../../../../_BLL/types/rates&surcharges/surchargesTypes";
import {DateType, VoidFunctionType} from "../../../../_BLL/types/commonTypes";
import 'react-day-picker/lib/style.css';
import { Controller } from 'react-hook-form'

// @ts-ignore
import {formatDate, parseDate} from 'react-day-picker/build/addons/MomentLocaleUtils'
import moment from "moment";


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
    disabled?: boolean
    error: boolean
    disabledDates: Array<string> | null
}

const Calendar = forwardRef<DayPickerInput, PropsType>(
    ({name, label, value, handleDayChange, selectedDay, onDayClick = () => {}, disabled=false, control, error, disabledDates},
     ref) => {


    const { from, to } = selectedDay
    const modifiers = {start: selectedDay.form, end: selectedDay.to};

    return (

        <CalendarWrapper error={error}>
            <CalendarLabel>{label}</CalendarLabel>
            <Controller
                name={name}
                control={control}
                rules={{
                    required: true
                }}
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
                        ref={ref}
                        dayPickerProps={{
                            selectedDays: [from, {from, to}],
                            modifiers,
                            numberOfMonths: 1,
                            localeUtils: MomentLocaleUtils,
                            onDayClick: onDayClick,
                            disabledDays: disabledDates?.map(d => new Date(d))
                        }}
                    />
                }
            />
        </CalendarWrapper>
    )
})

export default Calendar