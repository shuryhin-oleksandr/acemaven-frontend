import React, {useEffect, useRef, useState} from 'react'
import {
    EditButtonsWrapper,
    FormOperationButton,
    InfoRowLabel,
    InfoRowValue
} from "../../../../Requests/Booking_agent/booking_card/booking-card-style";
import {Controller, useForm} from "react-hook-form";
import DayPickerInput from "react-day-picker/DayPickerInput";
import {HelperText} from "../../../../../components/_commonComponents/Input/input-styles";
import {CalendarWrapper} from "../../../../../components/_commonComponents/calendar/calendar-styles";
// @ts-ignore
import {formatDate, parseDate} from 'react-day-picker/build/addons/MomentLocaleUtils'
import moment from "moment";
import edit_icon from "../../../../../assets/icons/profile/editCard.svg";
import {IconButton} from "@material-ui/core";
import close_icon from "../../../../../assets/icons/profile/closeForm.svg";
import save_icon from "../../../../../assets/icons/profile/add.svg";
import {useDispatch, useSelector} from "react-redux";
import {
    editOperationPaymentDueByAgentThunk
} from "../../../../../../_BLL/thunks/operations/agent/OperationsAgentThunk";
import {getEditOperationSuccessSelector} from "../../../../../../_BLL/selectors/operations/agentOperationsSelector";
import {agentOperationsActions} from "../../../../../../_BLL/reducers/operations/agent/agentOperationsReducer";


type PropsType = {
    payment_due_by: string | null,
    operation_id: number
}

const PaymentDueByDates:React.FC<PropsType> = ({payment_due_by, operation_id}) => {


    const dispatch = useDispatch()

    const {control, setValue, errors, handleSubmit, reset} = useForm()
    const onSubmit = (values: any) => {
        dispatch(editOperationPaymentDueByAgentThunk({payment_due_by: moment(values.payment_due_by).format('DD/MM/YYYY')}, operation_id as number))
    }

    let edit_success = useSelector(getEditOperationSuccessSelector)

    const [isEdit, setIsEdit] = useState(false)
    const [selectedDay, setSelectedDay] = useState<any>({
        from:  '',
        to:  ''
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
        if(payment_due_by) {
            setValue('payment_due_by', moment(payment_due_by, 'DD/MM/YYYY').toDate())
            setSelectedDay({
                to: moment(payment_due_by, 'DD/MM/YYYY').toDate()
            })
        }
    }, [payment_due_by])

    useEffect(() => {
        if(edit_success) {
            setIsEdit(false)
            dispatch(agentOperationsActions.setEditSuccess(''))
        }
    }, [edit_success])


    let resetInput = () => {
        setValue('payment_due_by', '')
        setSelectedDay({
          to : ''
        })
    }


    return (
        <form style={{ display: "flex", alignItems: 'baseline' }} onSubmit={handleSubmit(onSubmit)}>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <InfoRowLabel style={{marginRight: '10px'}}>PAYMENT DUE BY:</InfoRowLabel>
                <>
                    {payment_due_by && (!isEdit
                            ? <IconButton onClick={() => setIsEdit(true)} style={{position: 'absolute', right: '0px', top: '65px'}}>
                                <img src={edit_icon} alt=""/>
                            </IconButton>
                            : <EditButtonsWrapper top='65px' right='0px'>
                                <FormOperationButton type='button' onClick={() => setIsEdit(false)} style={{padding: '5px'}}>
                                    <img src={close_icon} alt=""/>
                                </FormOperationButton>
                                <FormOperationButton type='submit' style={{padding: '5px'}}>
                                    <img src={save_icon} alt="" />
                                </FormOperationButton>
                            </EditButtonsWrapper>
                    )
                    }
                </>
            </div>
            <>
                {payment_due_by
                    ? (!isEdit
                           ? <InfoRowValue>{payment_due_by}</InfoRowValue>
                           : <CalendarWrapper max_width='150px' margin_top='0px' input_height='40px' margin_right='0px' style={{display: 'flex'}}>
                                <Controller control={control}
                                            name='payment_due_by'
                                            rules={{required: true}}
                                            defaultValue={moment(payment_due_by, 'DD/MM/YYYY').toDate()}
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
                                {/*{error && (
                    <HelperText>Field is required</HelperText>
                )}*/}
                            </CalendarWrapper>
                        )
                    : <CalendarWrapper max_width='150px' margin_top='0px' input_height='40px' margin_right='0px' style={{display: 'flex'}}>
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
                           {/* <FormOperationButton type='button' onClick={resetInput} style={{padding: '5px'}}>
                                <img src={close_icon} alt=""/>
                            </FormOperationButton>*/}
                            <FormOperationButton type='submit' style={{padding: '5px'}}>
                                <img src={save_icon} alt="" />
                            </FormOperationButton>
                        </EditButtonsWrapper>
                        {/*{error && (
                    <HelperText>Field is required</HelperText>
                )}*/}
                    </CalendarWrapper>
                }
            </>
        </form>
    )
}

export default PaymentDueByDates