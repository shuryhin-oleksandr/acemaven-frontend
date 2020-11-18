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
    before_date: string
}

const QuoteAgentExpirationDate:React.FC<PropsType> = ({control, error, setValue, before_date}) => {
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

    return (
        <CalendarWrapper max_width='300px'
                         input_height='40px' margin_right='0px' margin_bottom='10px'>
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
                            disabledDays: [{before: moment(before_date, 'DD/MM/YYYY').toDate()}],
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