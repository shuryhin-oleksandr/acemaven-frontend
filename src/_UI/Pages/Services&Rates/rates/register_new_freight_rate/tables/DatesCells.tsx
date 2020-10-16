import React, {useRef, useState} from 'react'
import TableCell from "@material-ui/core/TableCell";
import Calendar from "../../../../../components/_commonComponents/calendar/Calendar";
import DayPickerInput from "react-day-picker/DayPickerInput";
import moment from "moment";
import {useDispatch} from "react-redux";
import {getSurchargeForExactRateThunk} from "../../../../../../_BLL/thunks/rates&surcharge/rateThunks";

type PropsType = {
    setValue: (name: string, value: string) => void
    getValues: any
    control: any
    errors: any
    classes: any
    reservedDates: Array<{from: Date, to: Date} | {before: Date}>
    id: number
    getSurchargeToRateHandle?: any
}

const DatesCells: React.FC<PropsType> = ({setValue, getValues, control, errors, classes, reservedDates, id, getSurchargeToRateHandle}) => {

    const [selectedDay, setSelectedDay] = useState<any>({
        from:  '',
        to:  ''
    })

    const handleFromChange = (from: string, id: number) => {
        debugger
        setSelectedDay({
            ...selectedDay,
            from
        })

        setValue(`rates.${id}.from`,  moment(from).format('DD/MM/YYYY'))
    }

    const handleToChange = (to: string, id: number) => {
        debugger
        setSelectedDay({
            ...selectedDay,
            to
        })
        setValue(`rates.${id}.to`, moment(to).format('DD/MM/YYYY'))

        //запрос за существующими сюрчарджами для этого контейнера
        getSurchargeToRateHandle(id, selectedDay.from, to)
    }

    const toInput = useRef<DayPickerInput>(null)

    const fromDayClick = () => {
        toInput?.current?.getInput().focus()
    }


    return (
        <>
            <TableCell className={classes.innerCell} align="center">
                <Calendar
                    label='Start Date'
                    name={`rates.${id}.from`}
                    value={selectedDay.from}
                    handleDayChange={(from: string) => {
                        handleFromChange(from, id)
                    }}
                    selectedDay={selectedDay}
                    onDayClick={fromDayClick}
                    control={control}
                    error={!!errors.from}
                    disabledDates={reservedDates}
                    disabled={!reservedDates}
                    display_label='none'
                    max_width='107px'
                    margin_bottom='0'
                />
            </TableCell>
            <TableCell className={classes.innerCell} align="center">
                <Calendar
                    label='Expiration Date'
                    name={`rates.${id}.to`}
                    value={selectedDay.to}
                    handleDayChange={(to: string) => {
                        handleToChange(to, id)
                    }}
                    selectedDay={selectedDay}
                    ref={toInput}
                    control={control}
                    error={!!errors.to}
                    disabledDates={reservedDates}
                    disabled={!reservedDates}
                    display_label='none'
                    max_width='107px'
                    margin_bottom='0'

                />
            </TableCell>
        </>
    )
};

export default DatesCells
