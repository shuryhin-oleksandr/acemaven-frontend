import React, {useEffect, useRef, useState} from 'react'
import TableCell from "@material-ui/core/TableCell";
import Calendar from "../../../../../components/_commonComponents/calendar/Calendar";
import DayPickerInput from "react-day-picker/DayPickerInput";
import moment from "moment";


type PropsType = {
    setValue: (name: string, value: string) => void
    getValues: any
    control: any
    errors: any
    classes: any
    reservedDates?: Array<{from: Date, to: Date} | {before: Date}>
    id: any
    getSurchargeToRateHandle: (id: number, from: string, to: string) => void
    currentDates?: {from: string, to: string}
    setFormMode?: (value: boolean) => void
    required_dates: boolean,
    disabled?: boolean
}

const DatesCells: React.FC<PropsType> = ({setValue, currentDates, control, errors, classes, reservedDates,
                                             id, getSurchargeToRateHandle, setFormMode, required_dates, disabled}) => {

    const [selectedDay, setSelectedDay] = useState<any>({
        from:  '',
        to:  ''
    })

    useEffect(() => {

        currentDates &&
        setSelectedDay({
            from: moment(currentDates?.from, 'DD/MM/YYYY').toDate(),
            to: moment(currentDates?.to, 'DD/MM/YYYY').toDate()
        })

        setValue(`rates.${id}.to`, currentDates?.to || '')
        setValue(`rates.${id}.from`, currentDates?.from || '')

    }, [currentDates])

    const handleFromChange = (from: string, id: number) => {
        setSelectedDay({
            ...selectedDay,
            from
        })

        setValue(`rates.${id}.from`,  moment(from).format('DD/MM/YYYY'))
    }

    const handleToChange = (to: string, id: number) => {
        setSelectedDay({
            ...selectedDay,
            to
        })
        setValue(`rates.${id}.to`, moment(to).format('DD/MM/YYYY'))

        //запрос за существующими сюрчарджами для этого контейнера
        getSurchargeToRateHandle(0, selectedDay.from, to)
    }

    const toInput = useRef<DayPickerInput>(null)

    const fromDayClick = () => {
        toInput?.current?.getInput().focus()
    }

    return (
        <>
            <TableCell className={classes.innerCell} onClick={() => setFormMode && setFormMode(true)}>
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
                    //disabled={!sessionStorage.getItem('destination_id')}
                    display_label='none'
                    max_width='107px'
                    margin_bottom='0'
                    required_dates={required_dates}
                />
            </TableCell>
            <TableCell className={classes.innerCell} onClick={() => setFormMode && setFormMode(true)}>
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
                    //disabled={!sessionStorage.getItem('destination_id')}
                    display_label='none'
                    max_width='107px'
                    margin_bottom='0'
                    required_dates={required_dates}
                />
            </TableCell>
        </>
    )
};

export default DatesCells
