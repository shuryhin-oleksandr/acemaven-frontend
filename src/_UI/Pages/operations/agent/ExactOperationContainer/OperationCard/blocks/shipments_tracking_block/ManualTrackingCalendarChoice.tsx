import React, { useRef, useState} from 'react'
import DayPickerInput from "react-day-picker/DayPickerInput";

import styled from "styled-components";
import {Controller} from "react-hook-form";
// @ts-ignore
import {formatDate, parseDate} from 'react-day-picker/build/addons/MomentLocaleUtils'

import { CalendarWrapper } from 'src/_UI/components/_commonComponents/calendar/calendar-styles';
import {TimePicker} from "../../../../../../../components/PopUps/accept_booking_popup/accept-popup-styles";
import {HelperText} from "../../../../../../../components/_commonComponents/Input/input-styles";



type PropsType = {
    control: any
    setValue: (name: string, value: any) => void
    errors: {from: any, departure_time: any}
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
    time_name_first: string,
    date_name_first: string,
    start_shipment_date?: string,
    operation_dates?: {from: string, to: string},
    before?: any,
    after?: any,
    wrapper_width?: string,
    justify_content?: string,
    arrival_date?: string,
    first_time?: string,
    register?: any,
}

const ManualTrackingCalendarChoice: React.FC<PropsType> = ({control, errors, register, required_dates, ...props}) => {

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
        props.setValue(props.date_name_first, from)
    }


    const toInput = useRef<DayPickerInput>(null)


   /* useEffect(() => {
        if(props.departure_date && props.arrival_date) {
            setSelectedDay({
                from: moment(props.departure_date, 'DD/MM/YYYY').toDate(),
                to: moment(props.arrival_date, 'DD/MM/YYYY').toDate()
            })
            setValue(props.date_name_first, moment(props.departure_date, 'DD/MM/YYYY').toDate())
        }
        if(props.first_time && props.second_time) {
            setValue(props.time_name_first, props.first_time)
        }
    }, [props.departure_date,props.arrival_date, props.first_time])*/


    return (
        <AcceptDatesFilter flex_direction={props.flex_direction} max_width={props.max_width}>
            <Wrapper justify_content={props.justify_content} wrapper_width={'100%'} >
                <CalendarWrapper max_width={!props.first_time ? '225px' : '235px'}
                                 input_height='40px' margin_right='10px' margin_bottom='-12px' picker_right={'200px'}>
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
                                    disabledDays: [{before: new Date()}, {after: props.after}],
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
                                            font_size={'14px'}
                                />
                            }
                />
            </Wrapper>
        </AcceptDatesFilter>
    )
};


export default ManualTrackingCalendarChoice


const AcceptDatesFilter = styled.div<{flex_direction?: string, max_width?: string}>`
  display: flex;
  flex-direction: ${({flex_direction}) => flex_direction ? flex_direction : 'row'};
  width: 100%;
  max-width: ${({max_width}) => max_width ? max_width : '100%'};
  justify-content: space-between;
  margin-bottom: 10px;
`
const Wrapper = styled.div<{justify_content?: string, wrapper_width?: string}>`
  width: ${({wrapper_width}) => wrapper_width ? wrapper_width : '49%'};
  display: flex;
  align-items: center;
  justify-content: ${({justify_content}) => justify_content ? justify_content : 'flex-end'};
`