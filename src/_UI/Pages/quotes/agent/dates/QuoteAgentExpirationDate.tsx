import React, {useRef, useState} from 'react'
//react-hook-form
import {Controller} from "react-hook-form";
//react-day-picker
import DayPickerInput from "react-day-picker/DayPickerInput";
//moment js
import moment from "moment";
// @ts-ignore
import {formatDate, parseDate} from 'react-day-picker/build/addons/MomentLocaleUtils'
//styles
import {CalendarWrapper} from "../../../../components/_commonComponents/calendar/calendar-styles";
import {HelperText} from "../../../../components/_commonComponents/Input/input-styles";
import {useTranslation} from "react-i18next";


type PropsType = {
    control: any,
    error?: any,
    setValue: any,
    date_to: string
}

const QuoteAgentExpirationDate: React.FC<PropsType> = ({control, error, setValue, date_to}) => {
    const toInput = useRef<DayPickerInput>(null)

    const [selectedDay, setSelectedDay] = useState<any>({
        from: '',
        to: ''
    })

    const handleDayChange = (to: string) => {
        setSelectedDay({
            ...selectedDay,
            to
        })
        setValue('date_to', to)
    }

    let a = moment(date_to, 'DD/MM/YYYY').add(1, 'days').calendar();
    let disabled_before = moment(a).toDate()
    const {t} = useTranslation();
    return (
        <CalendarWrapper max_width='300px' margin_top='0px'
                         input_height='40px' margin_right='0px' margin_bottom='25px'>
            <Controller
                name='date_to'
                control={control}
                rules={{
                    required: `${t("Error message/Field is required")}`
                }}
                defaultValue=""
                as={
                    <DayPickerInput
                        inputProps={{
                            readOnly: 'readonly'
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
                        error={!!error}
                        dayPickerProps={{
                            disabledDays: [{
                                before: moment(disabled_before, 'DD/MM/YYYY').toDate()
                            }],
                        }}
                    />
                }
            />
            {error && (
                <HelperText>{t("Error message/Field is required")}</HelperText>
            )}
        </CalendarWrapper>
    )
}

export default QuoteAgentExpirationDate