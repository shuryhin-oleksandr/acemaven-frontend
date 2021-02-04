import React, {useRef, useState} from 'react'
import { CalendarWrapper} from "../../../../components/_commonComponents/calendar/calendar-styles";
import {Controller} from "react-hook-form";
import DayPickerInput from "react-day-picker/DayPickerInput";

import {HelperText} from "../../../../components/_commonComponents/Input/input-styles";
// @ts-ignore
import {formatDate, parseDate} from 'react-day-picker/build/addons/MomentLocaleUtils'
import moment from "moment";


type PropsType = {
    control: any,
    error?: any,
    setValue: any,
    date_to: string
}

const QuoteAgentExpirationDate:React.FC<PropsType> = ({control, error, setValue,  date_to}) => {
    const toInput = useRef<DayPickerInput>(null)

    const [selectedDay, setSelectedDay] = useState<any>({
        from:  '',
        to:  ''
    })

    const handleDayChange = (to: string) => {
        setSelectedDay({
            ...selectedDay,
            to
        })
        setValue('date_to', to)
    }

    let a = moment(date_to, 'DD/MM/YYYY').add(14, 'days').calendar();
    let two_weeks_after = moment(a).toDate()

    return (
        <CalendarWrapper max_width='300px' margin_top='0px'
                         input_height='40px' margin_right='0px' margin_bottom='25px'>
            <Controller
                name='date_to'
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
                        onDayChange={handleDayChange}
                        ref={toInput}
                        dayPickerProps={{
                            disabledDays: [{before: new Date(), after: moment(two_weeks_after, 'DD/MM/YYYY').toDate()}],
                        }}
                    />
                }
            />
            {error && (
                <HelperText>Field is required</HelperText>
            )}
        </CalendarWrapper>
    )
}

export default QuoteAgentExpirationDate