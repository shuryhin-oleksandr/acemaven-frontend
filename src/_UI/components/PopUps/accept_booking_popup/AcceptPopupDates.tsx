import React, { useRef, useState} from 'react'
import Calendar from "../../../../_UI/components/_commonComponents/calendar/Calendar";
import DayPickerInput from "react-day-picker/DayPickerInput";
import {TimePicker} from "./accept-popup-styles";
import styled from "styled-components";
import {Controller} from "react-hook-form";
import moment from "moment";


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
    start_shipment_date?: string
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

    const cut_off_dates = moment(props.start_shipment_date, 'DD/MM/YYYY').subtract(7, 'days').calendar();
    const final_cut_off = moment(cut_off_dates).toDate()


    return (
        <AcceptDatesFilter >
            <Wrapper justify_content='flex-start'>
                <Calendar
                    label={props.label1}
                    name={props.date_name_first}
                    value={selectedDay.from}
                    handleDayChange={handleFromChange}
                    selectedDay={selectedDay}
                    onDayClick={fromDayClick}
                    control={control}
                    error={!!errors.from}
                    disabledDates={[]}
                    textColor={props.textColor}
                    textFont={props.textFont}
                    textTransform={props.textTransform}
                    //disabled={!reservedDates}
                    display_label={props.display_label}
                    max_width='230px'
                    margin_bottom={props.margin_bottom}
                    margin_right='5px'
                    input_height={props.input_height}
                    required_dates={required_dates}
                />
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
            <Calendar
                label={props.label2}
                name={props.date_name_second}
                value={selectedDay.to}
                handleDayChange={handleToChange}
                selectedDay={selectedDay}
                ref={toInput}
                control={control}
                error={!!errors.to}
                disabledDates={[]}
                textColor={props.textColor}
                textFont={props.textFont}
                textTransform={props.textTransform}
                //disabled={!reservedDates}
                display_label={props.display_label}
                max_width='230px'
                margin_bottom={props.margin_bottom}
                margin_right='5px'
                input_height={props.input_height}
                required_dates={required_dates}
            />
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