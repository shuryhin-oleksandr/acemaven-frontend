import React, {useRef, useState} from 'react'
import { CalendarWrapper} from "../../../../components/_commonComponents/calendar/calendar-styles";
import {Controller} from "react-hook-form";
import DayPickerInput from "react-day-picker/DayPickerInput";

import {HelperText} from "../../../../components/_commonComponents/Input/input-styles";
// @ts-ignore
import {formatDate, parseDate} from 'react-day-picker/build/addons/MomentLocaleUtils'

type PropsType = {
    control: any,
    error?: any,
    setValue: any
}

const QuoteAgentExpirationDate:React.FC<PropsType> = ({control, error, setValue}) => {
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
        setValue('to', to)
    }

    return (
        <CalendarWrapper /*error={error}*/ max_width='300px'
                         input_height='40px' margin_right='0px' margin_bottom='10px'>
            <Controller
                name='to'
                control={control}
                /*rules={{
                    required: props.required_dates
                }}*/
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
                        onDayChange={day => console.log(day)}
                        ref={toInput}
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