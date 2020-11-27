import React, {useRef, useState} from 'react'
import {InfoRowLabel} from "../../../../Requests/Booking_agent/booking_card/booking-card-style";
import {Controller} from "react-hook-form";
import DayPickerInput from "react-day-picker/DayPickerInput";
import {HelperText} from "../../../../../components/_commonComponents/Input/input-styles";
import {CalendarWrapper} from "../../../../../components/_commonComponents/calendar/calendar-styles";
// @ts-ignore
import {formatDate, parseDate} from 'react-day-picker/build/addons/MomentLocaleUtils'
import moment from "moment";

type PropsType = {

}

const PaymentDueByDates:React.FC<PropsType> = ({}) => {
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
    }

    /*let a = moment(before_date, 'DD/MM/YYYY').add(14, 'days').calendar();
    let two_weeks_after = moment(a).toDate()*/

    return (
        <div style={{ display: "flex", alignItems: 'baseline' }}>
            <InfoRowLabel style={{marginRight: '10px'}}>PAYMENT DUE BY:</InfoRowLabel>
            <CalendarWrapper max_width='150px' margin_top='0px'
                             input_height='40px' margin_right='0px' >


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
                                disabledDays: [{before: new Date()}],
                            }}
                        />
                {/*{error && (
                    <HelperText>Field is required</HelperText>
                )}*/}
            </CalendarWrapper>
        </div>
    )
}

export default PaymentDueByDates