import React, { useRef, useState} from 'react'
import DayPickerInput from "react-day-picker/DayPickerInput";
import {TimePicker} from "./accept-popup-styles";
import styled from "styled-components";
import {Controller} from "react-hook-form";
// @ts-ignore
import {formatDate, parseDate} from 'react-day-picker/build/addons/MomentLocaleUtils'
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
    after?: any
}

const AcceptPopupDates: React.FC<PropsType> = ({control, setValue, errors, required_dates, ...props}) => {

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

    const fromDayClick = () => {
        toInput?.current?.getInput().focus()
    }



    return (
        <AcceptDatesFilter >
            <Wrapper justify_content='flex-start'>
                <CalendarWrapper max_width='225px'
                                 input_height='40px' margin_right='10px' margin_bottom='5px'>
                    <span style={{fontFamily: 'Helvetica Reg', fontSize: '14px', color: 'black'}}>
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
                                    readOnly:'readonly'
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
                <Controller control={control}
                            rules={{
                                required: true
                            }}
                            name={props.time_name_first}
                            defaultValue=''
                            as={
                                <TimePicker type="time"
                                            step='300'
                                            error={!!errors?.departure_time}
                                />
                            }
                    />
            </Wrapper>
            <Wrapper>
                <CalendarWrapper max_width='225px'
                                 input_height='40px' margin_right='10px' margin_bottom='5px'>
                     <span style={{fontFamily: 'Helvetica Reg', fontSize: '14px', color: 'black'}}>
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
                                    readOnly:'readonly'
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
                                />
                            }
                />
                </Wrapper>
        </AcceptDatesFilter>
    )
};


export default AcceptPopupDates


const AcceptDatesFilter = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  margin-bottom: 10px;
`
const Wrapper = styled.div<{justify_content?: string}>`
  width: 49%;
  display: flex;
  align-items: center;
  justify-content: ${({justify_content}) => justify_content ? justify_content : 'flex-end'};
`