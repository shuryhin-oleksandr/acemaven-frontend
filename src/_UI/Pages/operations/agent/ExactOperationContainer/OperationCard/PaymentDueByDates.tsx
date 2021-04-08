import React, {useEffect, useRef, useState} from 'react'
//react-hook-form
import {Controller, useForm} from "react-hook-form";
//react-day-picker
import DayPickerInput from "react-day-picker/DayPickerInput";
//react-redux
import {useDispatch} from "react-redux";
//BLL
import {
    editOperationPaymentDueByAgentThunk
} from "../../../../../../_BLL/thunks/operations/agent/OperationsAgentThunk";
//moment js
import moment from "moment";
// @ts-ignore
import {formatDate, parseDate} from 'react-day-picker/build/addons/MomentLocaleUtils'
//styles
import {
    EditButtonsWrapper,
    FormOperationButton,
    InfoRowLabel,
    InfoRowValue
} from "../../../../Requests/Booking_agent/booking_card/booking-card-style";
//icons
import save_icon from "../../../../../assets/icons/profile/add.svg";


import {CalendarWrapper} from "../../../../../components/_commonComponents/calendar/calendar-styles";
import {useTranslation} from "react-i18next";


type PropsType = {
    payment_due_by: string | null,
    operation_id: number
}

const PaymentDueByDates: React.FC<PropsType> = ({payment_due_by, operation_id}) => {


    const dispatch = useDispatch()

    const {control, setValue, handleSubmit} = useForm()
    const onSubmit = (values: any) => {
        dispatch(editOperationPaymentDueByAgentThunk({payment_due_by: moment(values.payment_due_by).format('DD/MM/YYYY')}, operation_id as number))
    }

    const [selectedDay, setSelectedDay] = useState<any>({
        from: '',
        to: ''
    })
    const toInput = useRef<DayPickerInput>(null)

    const handleDayChange = (to: string) => {
        setSelectedDay({
            ...selectedDay,
            to
        })
        setValue('payment_due_by', to)
    }

    useEffect(() => {
        if (payment_due_by) {
            setValue('payment_due_by', moment(payment_due_by, 'DD/MM/YYYY').toDate())
            setSelectedDay({
                to: moment(payment_due_by, 'DD/MM/YYYY').toDate()
            })
        }
    }, [payment_due_by])

    const {t} = useTranslation();
    return (
        <form style={{display: "flex", alignItems: 'baseline', width: '100%'}} onSubmit={handleSubmit(onSubmit)}>
            <InfoRowLabel style={{marginRight: '10px'}}>{t("Operations/PAYMENT DUE BY")}:</InfoRowLabel>
            <>
                {payment_due_by
                    ? <InfoRowValue>{payment_due_by}</InfoRowValue>
                    : <CalendarWrapper max_width_wrapper='180px' max_width='180px' margin_top='0px' input_height='40px' margin_right='0px'
                                       style={{display: 'flex'}}>
                        <Controller control={control}
                                    name='payment_due_by'
                                    rules={{required: true}}
                                    defaultValue=''
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
                                            dayPickerProps={{
                                                disabledDays: [{before: new Date()}],
                                            }}
                                        />
                                    }
                        />
                        <EditButtonsWrapper top='65px' right='18px'>
                            <FormOperationButton type='submit' style={{padding: '5px'}}>
                                <img src={save_icon} alt=""/>
                            </FormOperationButton>
                        </EditButtonsWrapper>
                    </CalendarWrapper>
                }
            </>
        </form>
    )
}

export default PaymentDueByDates