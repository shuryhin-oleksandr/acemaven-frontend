import React, { useEffect, useRef, useState} from 'react'
import {useHistory} from 'react-router-dom'
import { SurchargesDatesFilter } from "./form-styles";
import Calendar from "../../../../components/_commonComponents/calendar/Calendar";
import DayPickerInput from "react-day-picker/DayPickerInput";
import { useSelector} from "react-redux";
import {
    getBookedDates,
    getLocationId,
    getSurcharge
} from "../../../../../_BLL/selectors/rates&surcharge/surchargeSelectors";
import moment from "moment";


type PropsType = {
    control: any
    setValue: (name: string, value: any) => void
    errors: {from: any, to: any}
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
    watchResultArrForDates?: number[],
    disabled?: boolean
}

const SurchargesDates: React.FC<PropsType> = ({control, setValue, errors, required_dates, watchResultArrForDates, disabled, ...props}) => {

    const reservedDates = useSelector(getBookedDates)

    const [selectedDay, setSelectedDay] = useState<any>({
        from:  '',
        to:  ''
    })

    let surcharge = useSelector(getSurcharge)
    const history = useHistory()
    let location_id = useSelector(getLocationId)

    useEffect(() => {
        if(surcharge && history.location.pathname === `/services/surcharge/${surcharge.id}`) {
            setSelectedDay({from: moment(surcharge.start_date, 'DD/MM/YYYY').toDate(),
                to: moment(surcharge.expiration_date, 'DD/MM/YYYY').toDate()})
            setValue('from', surcharge.start_date)
            setValue('to', surcharge.expiration_date)
            console.log(new Date(surcharge.start_date))
        }
        if(props.rate_start_date) {
            setSelectedDay({from: moment(props.rate_start_date, 'DD/MM/YYYY').toDate()})
            setValue('from', props.rate_start_date)
        }
    }, [surcharge, props.rate_start_date])

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

    //RESET range in calendar if we changed shipping type
    useEffect(() => {
        if(location_id === 0) {
            setSelectedDay({from : '', to: ''})
        }
    }, [location_id])


    return (
        <SurchargesDatesFilter flex_direction={props.flex_direction}>
            <Calendar
                label='Start Date'
                name='from'
                value={selectedDay.from}
                handleDayChange={handleFromChange}
                selectedDay={selectedDay}
                onDayClick={fromDayClick}
                control={control}
                error={!!errors.from}
                disabledDates={reservedDates}
                textColor={props.textColor}
                textFont={props.textFont}
                textTransform={props.textTransform}
                disabled={disabled}
                display_label={props.display_label}
                max_width={props.max_width}
                margin_bottom={props.margin_bottom}
                input_height={props.input_height}
                required_dates={required_dates}
                watchResultArrForDates={watchResultArrForDates}
            />
            <Calendar
                label='Expiration Date'
                name='to'
                value={selectedDay.to}
                handleDayChange={handleToChange}
                selectedDay={selectedDay}
                ref={toInput}
                control={control}
                error={!!errors.to}
                disabledDates={reservedDates}
                textColor={props.textColor}
                textFont={props.textFont}
                textTransform={props.textTransform}
                //disabled={!reservedDates}
                disabled={disabled}
                display_label={props.display_label}
                max_width={props.max_width}
                margin_bottom={props.margin_bottom}
                input_height={props.input_height}
                required_dates={required_dates}
                watchResultArrForDates={watchResultArrForDates}
            />
        </SurchargesDatesFilter>
    )
};


export default SurchargesDates