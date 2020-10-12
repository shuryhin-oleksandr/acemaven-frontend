import React, {MutableRefObject, useRef, useState} from 'react'
import { SurchargesDatesFilter } from "./form-styles";
import Calendar from "../../../../components/_commonComponents/calendar/Calendar";
import DayPickerInput from "react-day-picker/DayPickerInput";
import {useSelector} from "react-redux";
import {getBookedDates} from "../../../../../_BLL/thunks/surchargeSelectors";


type PropsType = {
    control: any
    setValue: (name: string, value: any) => void
    errors: {from: any, to: any}
}



const SurchargesDates: React.FC<PropsType> = ({control, setValue, errors}) => {

    const bookedDates = useSelector(getBookedDates)

    const [selectedDay, setSelectedDay] = useState<any>({
        from:  '',
        to:  ''
    })

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
                disabledDates={bookedDates}
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
                disabledDates={bookedDates}
            />
        </SurchargesDatesFilter>
    )
};


export default SurchargesDates