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
import {OperationType, ShipmentDetailsType} from "../../../../_BLL/types/operations/operationsTypes";
import {ShippingModeEnum, ShippingTypesEnum} from "../../../../_BLL/types/rates&surcharges/newSurchargesTypes";
import {VoidFunctionType} from "../../../../_BLL/types/commonTypes";
import {
    cancelChangeRequestThunk,
    confirmChangeRequestThunk,
    editOperationByAgentThunk
} from "../../../../_BLL/thunks/operations/agent/OperationsAgentThunk";
import {useDispatch} from "react-redux";

type PropsType = {
    operation_info: OperationType | null
}

const ChangeRequestForm:React.FC<PropsType> = ({operation_info}) => {
    let direction = operation_info?.freight_rate.origin.is_local ? 'export' : 'import'
    let after_estimated = moment(operation_info?.date_to, 'DD/MM/YYYY').add(7, 'days').calendar();
    let after_estimated_date = moment(after_estimated).toDate()

    let shipment = operation_info?.shipment_details && operation_info?.shipment_details[0]
    //estimated time
    let arrival_date = moment(shipment?.date_of_arrival.slice(6)).format('DD/MM/YYYY')
    let arrival_time = shipment?.date_of_arrival.slice(0,5)
    let departure_date = moment(shipment?.date_of_departure.slice(6)).format('DD/MM/YYYY')
    let departure_time = shipment?.date_of_departure.slice(0,5)

    //cargo cut off + documents cut off
    let documents_cut_off_date = moment(shipment?.document_cut_off_date?.slice(6)).format('DD/MM/YYYY')
    let documents_cut_off_time = shipment?.document_cut_off_date?.slice(0,5)
    let cargo_cut_off_date = moment(shipment?.cargo_cut_off_date?.slice(6)).format('DD/MM/YYYY')
    let cargo_cut_off_time = shipment?.cargo_cut_off_date?.slice(0,5)


    const dispatch = useDispatch()
    const {register, handleSubmit, errors, setValue, control} = useForm()
    const onSubmit = (values: any) => {
        let date_of_departure = moment(values.estimated_time?.from).format('DD/MM/YYYY') + ' ' + values.estimated_time?.departure_time
        let date_of_arrival = moment(values.estimated_time?.to).format('DD/MM/YYYY') + ' ' + values.estimated_time?.arrival_time
        let document_cut_off_date = moment(values.documents_cut_off?.from).format('DD/MM/YYYY') + ' ' + values.documents_cut_off?.cut_off_time
        let cargo_cut_off_date = moment(values.cargo_cut_off?.to).format('DD/MM/YYYY') + ' ' + values.cargo_cut_off?.cut_off_time

        let final_data = {...values,
            date_of_departure: date_of_departure,
            date_of_arrival: date_of_arrival,
            document_cut_off_date: document_cut_off_date,
            cargo_cut_off_date: cargo_cut_off_date
        }
        delete final_data.estimated_time
        delete final_data.documents_cut_off
        delete final_data.cargo_cut_off_date
        delete final_data.payment_due_by


        let final_data_without_cargo_cut_off = {
            ...values,
            date_of_departure: date_of_departure,
            date_of_arrival: date_of_arrival,
        }
        delete final_data_without_cargo_cut_off.estimated_time
        delete final_data_without_cargo_cut_off.payment_due_by

        if(document_cut_off_date && values.documents_cut_off?.cut_off_time) {
            dispatch(confirmChangeRequestThunk(Number(operation_info?.id), final_data, Number(shipment?.id)))
        } else if(document_cut_off_date && !values.documents_cut_off?.cut_off_time){
            dispatch(confirmChangeRequestThunk(Number(operation_info?.id), final_data_without_cargo_cut_off, Number(shipment?.id)))
        }

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
                {operation_info?.shipping_type === ShippingTypesEnum.SEA
                    ? <>
                        <FormField inputRef={register({required: 'Field is required'})}
                                   error={errors?.vessel}
                                   name='vessel'
                                   maxW='290px'
                                   color_label='#115B86'
                                   label='VESSEL'
                                   placeholder='Placeholder'
                                   font_weight='Helvetica Bold'
                                   defaultValue={shipment?.vessel}
                        />
                        <FormField inputRef={register({required: 'Field is required'})}
                                   error={errors?.voyage}
                                   name='voyage'
                                   maxW='290px'
                                   color_label='#115B86'
                                   label='TRIP'
                                   placeholder='Placeholder'
                                   font_weight='Helvetica Bold'
                                   defaultValue={shipment?.voyage}
                        />
                    </>
                    : <>
                        <FormField inputRef={register({required: 'Field is required'})}
                                   error={errors?.mawb}
                                   name='mawb'
                                   maxW='290px'
                                   color_label='#115B86'
                                   label='MAWB'
                                   placeholder='Placeholder'
                                   font_weight='Helvetica Bold'
                                   defaultValue={shipment?.mawb}
                        />
                        <FormField inputRef={register({required: 'Field is required'})}
                                   error={errors?.flight_number}
                                   name='flight_number'
                                   maxW='290px'
                                   color_label='#115B86'
                                   label='FLIGHT NUMBER'
                                   placeholder='Placeholder'
                                   font_weight='Helvetica Bold'
                                   defaultValue={shipment?.flight_number}
                        />
                    </>
                }
                <FormField inputRef={register({required: 'Field is required'})}
                           error={errors?.booking_number}
                           name='booking_number'
                           maxW='290px'
                           color_label='#115B86'
                           label='BOOKING NUMBER'
                           placeholder='Placeholder'
                           font_weight='Helvetica Bold'
                           defaultValue={shipment?.booking_number}
                />
            </div>
            {(operation_info?.freight_rate.shipping_mode.id === ShippingModeEnum.LCL) &&
            <div style={{display: 'flex',  width: '100%', maxWidth: '603px', justifyContent: 'space-between', borderBottom: '1px solid #7C7C89', paddingBottom: '25px', marginBottom: '25px'}}>
                <FormField inputRef={register({required: 'Field is required'})}
                           error={errors?.booking_number_with_carrier}
                           name='booking_number_with_carrier'
                           maxW='290px'
                           color_label='#115B86'
                           label='BOOKING NUMBER WITH CARRIER'
                           placeholder='Placeholder'
                           font_weight='Helvetica Bold'
                           defaultValue={shipment?.booking_number_with_carrier}
                />
                <FormField inputRef={register({required: 'Field is required'})}
                           error={errors?.container_number}
                           name='container_number'
                           maxW='290px'
                           color_label='#115B86'
                           label='CONTAINER NUMBER'
                           placeholder='Placeholder'
                           font_weight='Helvetica Bold'
                           defaultValue={shipment?.container_number}
                />
            </div>
            }

            <div style={{display: 'flex', flexDirection: 'column', width: '100%', justifyContent: 'space-between', borderBottom: '1px solid #7C7C89', paddingBottom: '25px', marginBottom: '25px'}}>
            <LocationContainer errors={errors}
                               register={register}
                               shipping_mode={String(operation_info?.freight_rate.shipping_mode.title)}
                               direction={direction}
                               color_label='#115B86'
                               font_weight='Helvetica Bold'
                               label_uppercase={true}
                               shipment_details={shipment ? shipment : null}
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
                              before={moment(operation_info?.date_from, 'DD/MM/YYYY').toDate()}
                              after={moment(after_estimated_date, 'DD/MM/YYYY').toDate()}
                              justify_content='flex-start'
                              max_width='655px'
                              arrival_date={arrival_date}
                              departure_date={departure_date}
                              first_time={departure_time}
                              second_time={arrival_time}

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
                                 start_shipment_date={shipment?.document_cut_off_date}
                                 before={new Date()}
                                 after={moment(operation_info?.date_from, 'DD/MM/YYYY').toDate()}
                                 justify_content='flex-start'
                                 max_width='655px'
                                 departure_date={documents_cut_off_date}
                                 first_time={documents_cut_off_time}
                                 arrival_date={cargo_cut_off_date}
                                 second_time={cargo_cut_off_time}

            />
            }
            </div>
            {(operation_info?.freight_rate.shipping_mode.id === ShippingModeEnum.FCL) &&
            <div style={{display: 'flex', width: '100%', justifyContent: 'space-between', borderBottom: '1px solid #7C7C89', paddingBottom: '25px', marginBottom: '25px'}}>
                <FormField inputRef={register({required: 'Field is required'})}
                           error={errors?.container_free_time}
                           name='container_free_time'
                           maxW='290px'
                           color_label='#115B86'
                           label='CONTAINER FREE TIME'
                           placeholder='0 days'
                           font_weight='Helvetica Bold'
                           defaultValue={shipment?.container_free_time ? shipment?.container_free_time : ''}
                />
            </div>
            }

           {/* <div style={{ width: '100%', borderBottom: '1px solid #7C7C89', paddingBottom: '25px', marginBottom: '25px'}}>
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
            </div>*/}
            <ChangeRequestButtonsWrapper>
                <ConfirmRequestButton type='submit'>CONFIRM</ConfirmRequestButton>
                {/*<CancelRequestButton type='button' onClick={() => dispatch(cancelChangeRequestThunk(Number(operation_info?.id)))}>CANCEL</CancelRequestButton>*/}
            </ChangeRequestButtonsWrapper>
        </FormChangeRequestWrapper>
    )
}

export default ChangeRequestForm