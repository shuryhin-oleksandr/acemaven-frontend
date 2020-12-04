import React, {useRef, useState} from 'react'
import {Controller, useForm} from "react-hook-form";
import {
    CancelRequestButton,
    ChangeRequestButtonsWrapper, ConfirmRequestButton,
    FormChangeRequestTitle,
    FormChangeRequestWrapper
} from "./change-request-agent-styles";
import FormField from "../../_commonComponents/Input/FormField";
import LocationContainer from "../accept_booking_popup/LocationContainer";
import AcceptPopupDates from "../accept_booking_popup/AcceptPopupDates";
import DayPickerInput from "react-day-picker/DayPickerInput";
// @ts-ignore
import {formatDate, parseDate} from 'react-day-picker/build/addons/MomentLocaleUtils'
import moment from "moment";
import {InfoRowLabel} from "../../../Pages/Requests/Booking_agent/booking_card/booking-card-style";
import {CalendarWrapper} from "../../_commonComponents/calendar/calendar-styles";

const ChangeRequestForm:React.FC = () => {
    let direction = 'export'

    const {register, handleSubmit, errors, setValue, control} = useForm()
    const onSubmit = (values: any) => {
        console.log(values)
    }

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


    return (
        <FormChangeRequestWrapper onSubmit={handleSubmit(onSubmit)}>
            <FormChangeRequestTitle>Make additional changes in the operation</FormChangeRequestTitle>
            <div style={{display: 'flex', width: '100%', justifyContent: 'space-between', borderBottom: '1px solid #7C7C89', paddingBottom: '25px', marginBottom: '25px'}}>
                <FormField inputRef={register({required: 'Field is required'})}
                           error={errors?.vessel}
                           name='vessel'
                           maxW='290px'
                           color_label='#115B86'
                           label='VESSEL'
                           placeholder='Vessel'
                           font_weight='Helvetica Bold'
                />
                <FormField inputRef={register({required: 'Field is required'})}
                           error={errors?.voyage}
                           name='voyage'
                           maxW='290px'
                           color_label='#115B86'
                           label='TRIP'
                           placeholder='Trip'
                           font_weight='Helvetica Bold'
                />
                <FormField inputRef={register({required: 'Field is required'})}
                           error={errors?.booking_number}
                           name='booking_number'
                           maxW='290px'
                           color_label='#115B86'
                           label='BOOKING NUMBER'
                           placeholder='Booking number'
                           font_weight='Helvetica Bold'
                />
            </div>
            <div style={{display: 'flex', flexDirection: 'column', width: '100%', justifyContent: 'space-between', borderBottom: '1px solid #7C7C89', paddingBottom: '25px', marginBottom: '25px'}}>
            <LocationContainer errors={errors}
                               register={register}
                               shipping_mode='FCL'
                               direction='import'
                               color_label='#115B86'
                               font_weight='Helvetica Bold'
                               label_uppercase={true}
            />
            <AcceptPopupDates control={control}
                              errors={{from: errors.from, to: errors.to, departure_time: errors.departure_time, arrival_time: errors.arrival_time}}
                              setValue={setValue}
                              required_dates={true}
                              label1={'Estimated Time of Departure'}
                              label2={'Estimated Time of Arrival'}
                              time_name_first={'estimated_time.departure_time'}
                              time_name_second={'estimated_time.arrival_time'}
                              date_name_first={'estimated_time.from'}
                              date_name_second={'estimated_time.to'}
                              //before={moment(exact_operation_info?.date_from, 'DD/MM/YYYY').toDate()}
                              //after={moment(after_estimated_date, 'DD/MM/YYYY').toDate()}
                              justify_content='flex-start'
                              max_width='650px'

            />
            {direction === 'export'
            && <AcceptPopupDates control={control}
                                 errors={{from: errors.from, to: errors.to, departure_time: errors.departure_time, arrival_time: errors.arrival_time}}
                                 setValue={setValue}
                                 required_dates={true}
                                 label1={'Documents Cut Off Date'}
                                 label2={'Cargo Cut Off Date'}
                                 time_name_first={'documents_cut_off.cut_off_time'}
                                 time_name_second={'cargo_cut_off.cut_off_time'}
                                 date_name_first={'documents_cut_off.from'}
                                 date_name_second={'cargo_cut_off.to'}
                                 //start_shipment_date={exact_operation_info?.date_from}
                                 before={new Date()}
                                 //after={moment(exact_operation_info?.date_from, 'DD/MM/YYYY').toDate()}
                                 justify_content='flex-start'
                                 max_width='650px'

            />
            }
            </div>
            <div style={{display: 'flex', width: '100%', justifyContent: 'space-between', borderBottom: '1px solid #7C7C89', paddingBottom: '25px', marginBottom: '25px'}}>
                <FormField inputRef={register({required: 'Field is required'})}
                           error={errors?.container_free_time}
                           name='container_free_time'
                           maxW='290px'
                           color_label='#115B86'
                           label='CONTAINER FREE TIME'
                           placeholder='0 days'
                           font_weight='Helvetica Bold'
                />
            </div>
            <div style={{ width: '100%', borderBottom: '1px solid #7C7C89', paddingBottom: '25px', marginBottom: '25px'}}>
                <InfoRowLabel style={{marginRight: '10px'}}>PAYMENT DUE BY</InfoRowLabel>
                <CalendarWrapper max_width='150px' margin_top='0px' input_height='40px' margin_right='0px' style={{display: 'flex'}}>
                <Controller control={control}
                            name='payment_due_by'
                            rules={{required: true}}
                            defaultValue={moment('22/12/2020', 'DD/MM/YYYY').toDate()}
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
                </CalendarWrapper>
            </div>
            <ChangeRequestButtonsWrapper>
                <ConfirmRequestButton type='submit'>CONFIRM</ConfirmRequestButton>
                <CancelRequestButton type='button'>CANCEL</CancelRequestButton>
            </ChangeRequestButtonsWrapper>
        </FormChangeRequestWrapper>
    )
}

export default ChangeRequestForm