import React, {useEffect, useRef, useState} from 'react'
import TableCell from "@material-ui/core/TableCell";
import Calendar from "../../../../../components/_commonComponents/calendar/Calendar";
import DayPickerInput from "react-day-picker/DayPickerInput";
import moment from "moment";
import {useDispatch} from "react-redux";
import {rateActions} from "../../../../../../_BLL/reducers/surcharge&rates/rateReducer";


type PropsType = {
    setValue: (name: string, value: string) => void
    getValues: any
    control: any
    errors: any
    classes: any
    reservedDates?: Array<{from: Date, to: Date} | {before: Date}>
    id: any
    getSurchargeToRateHandle?: any/*(id: number, from: string, to: string) => void*/
    currentDates?: {from: string, to: string}
    setFormMode?: (value: boolean) => void
    required_dates: boolean,
    disabled?: boolean,
    invalidDate?: string,
    setInvalidDate?: (value: string) => void
    getSurchargeForNewRate?: any,
    margin_top?: string
}

const DatesCells: React.FC<PropsType> = ({setValue, currentDates, control, errors, classes, reservedDates,getSurchargeForNewRate,
                                             id, getSurchargeToRateHandle, setFormMode, required_dates, disabled, setInvalidDate, ...props}) => {

    const [selectedDay, setSelectedDay] = useState<any>({
        from:  '',
        to:  ''
    })

    const dispatch = useDispatch()


    useEffect(() => {
        if(currentDates) {
            setSelectedDay({
                from: moment(currentDates?.from, 'DD/MM/YYYY').toDate(),
                to: moment(currentDates?.to, 'DD/MM/YYYY').toDate()
            })
            setValue(`rates.${id}.to`, currentDates.to )
            setValue(`rates.${id}.from`, currentDates.from )
        }
    }, [])



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
        getSurchargeForNewRate && getSurchargeForNewRate(selectedDay.from, to)
        dispatch(rateActions.setExactRateId(id))
    }

    const toInput = useRef<DayPickerInput>(null)

    const fromDayClick = () => {
        toInput?.current?.getInput().focus()
    }

    useEffect(() => {
        setInvalidDate && setInvalidDate('')
        if(selectedDay.to && selectedDay.from && selectedDay.to >= selectedDay.from) {
            getSurchargeToRateHandle(0, selectedDay.from, selectedDay.to)
        } else if (selectedDay.to && selectedDay.from && selectedDay.to < selectedDay.from) {
            setInvalidDate && setInvalidDate('Invalid dates')
        }
    }, [selectedDay.to, selectedDay.from])

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
                        margin_top={props.margin_top}
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
                        margin_top={props.margin_top}
                    />
                </TableCell>
        </>
    )
};

export default DatesCells
