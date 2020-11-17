import React, { useRef, useState} from 'react'
import Calendar from "../../../../_UI/components/_commonComponents/calendar/Calendar";
import DayPickerInput from "react-day-picker/DayPickerInput";
import {TimePicker} from "./accept-popup-styles";
import styled from "styled-components";
import {Controller} from "react-hook-form";


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
    required_dates: boolean
}

const AcceptPopupDates: React.FC<PropsType> = ({control, setValue, errors, required_dates, ...props}) => {

    //const reservedDates = useSelector(getBookedDates)

    const [selectedDay, setSelectedDay] = useState<any>({
        from:  '',
        to:  ''
    })



   /* useEffect(() => {
        if(surcharge) {
            setSelectedDay({from: moment(surcharge.start_date, 'DD/MM/YYYY').toDate(),
                to: moment(surcharge.expiration_date, 'DD/MM/YYYY').toDate()})
            setValue('from', surcharge.start_date)
            setValue('to', surcharge.expiration_date)
            console.log(new Date(surcharge.start_date))
        }
        if(props.rate_start_date) {
            debugger
            setSelectedDay({from: moment(props.rate_start_date, 'DD/MM/YYYY').toDate()})
            setValue('from', props.rate_start_date)
        }
    }, [surcharge, props.rate_start_date])*/

    const handleFromChange = (from: string) => {
        props.setFormMode && props.setFormMode(true)
        setSelectedDay({
            ...selectedDay,
            from
        })
        setValue('from', from)
    }

    const handleToChange = (to: string) => {
        props.setFormMode && props.setFormMode(true)
        setSelectedDay({
            ...selectedDay,
            to
        })
        setValue('to', to)
    }

    const toInput = useRef<DayPickerInput>(null)

    const fromDayClick = () => {
        toInput?.current?.getInput().focus()
    }


    return (
        <AcceptDatesFilter >
            <Wrapper justify_content='flex-start'>
                <Calendar
                    label='Estimated Time of Departure'
                    name='from'
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
                    max_width='235px'
                    margin_bottom={props.margin_bottom}
                    margin_right='5px'
                    input_height={props.input_height}
                    required_dates={required_dates}
                />
                <Controller control={control}
                            rules={{
                                required: true
                            }}
                            name='departure_time'
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
                label='Estimated Time of Arrival'
                name='to'
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
                max_width='235px'
                margin_bottom={props.margin_bottom}
                margin_right='5px'
                input_height={props.input_height}
                required_dates={required_dates}
            />
                <Controller control={control}
                            rules={{
                                required: true
                            }}
                            name='arrival_time'
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