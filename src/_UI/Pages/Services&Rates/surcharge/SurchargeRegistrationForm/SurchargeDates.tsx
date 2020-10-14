import React, {MutableRefObject, useEffect, useRef, useState} from 'react'
import { SurchargesDatesFilter } from "./form-styles";
import Calendar from "../../../../components/_commonComponents/calendar/Calendar";
import DayPickerInput from "react-day-picker/DayPickerInput";
import {useSelector} from "react-redux";
import {getBookedDates, getSurcharge} from "../../../../../_BLL/selectors/rates&surcharge/surchargeSelectors";
import moment from "moment";


type PropsType = {
    control: any
    setValue: (name: string, value: any) => void
    errors: {from: any, to: any}
    textColor?: string
    textFont?: string
    textTransform?: string
}

const SurchargesDates: React.FC<PropsType> = ({control, setValue, errors, ...props}) => {

    const reservedDates = useSelector(getBookedDates)
    const bookedDates = reservedDates?.push({before: new Date()})
    console.log('bookes', bookedDates)

    const [selectedDay, setSelectedDay] = useState<any>({
        from:  '',
        to:  ''
    })

    let surcharge = useSelector(getSurcharge)


    useEffect(() => {
        if(surcharge && !sessionStorage.getItem('reg')) {
            setSelectedDay({from: moment(surcharge.start_date, 'DD/MM/YYYY').toDate(),
                to: moment(surcharge.expiration_date, 'DD/MM/YYYY').toDate()})
            setValue('from', surcharge.start_date)
            setValue('to', surcharge.expiration_date)
            console.log(new Date(surcharge.start_date))
        }
    }, [surcharge])

    const handleFromChange = (from: string) => {
        setSelectedDay({
            ...selectedDay,
            from
        })

        setValue('from', from)
    }

   const handleToChange = (to: string) => {
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
        <SurchargesDatesFilter>
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
                disabled={!reservedDates}
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
                disabled={!reservedDates}
            />
        </SurchargesDatesFilter>
    )
};


export default SurchargesDates