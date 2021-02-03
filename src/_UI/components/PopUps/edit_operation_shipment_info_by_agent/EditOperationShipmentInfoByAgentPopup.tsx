import React, {useRef, useState} from 'react'
//react-redux
import {useDispatch} from "react-redux";
//react-hook-form
import {Controller, useForm} from "react-hook-form";
//moment js
// @ts-ignore
import {formatDate, parseDate} from 'react-day-picker/build/addons/MomentLocaleUtils'
import moment from "moment";
//material ui
import {IconButton} from "@material-ui/core";
//BLL
import {
    editOperationByAgentThunk,
    editOperationPaymentDueByAgentThunk
} from "../../../../_BLL/thunks/operations/agent/OperationsAgentThunk";
//helpers
import {datesFormatHelper} from "../../../../_BLL/helpers/datesFormatHelper";
//types
import {ShippingModeEnum, ShippingTypesEnum} from "../../../../_BLL/types/rates&surcharges/newSurchargesTypes";
import {OperationType} from "../../../../_BLL/types/operations/operationsTypes";
//components
import FormField from "../../_commonComponents/Input/FormField";
import LocationContainer from "../accept_booking_popup/LocationContainer";
import AcceptPopupDates from "../accept_booking_popup/AcceptPopupDates";
import DayPickerInput from "react-day-picker/DayPickerInput";
//styles
import {
    ChangeRequestButtonsWrapper,
    ChangeRequestContent,
    ChangeRequestInner,
    ChangeRequestTitle,
    ChangeRequestWrapper,
    ConfirmRequestButton,
    FormChangeRequestWrapper
} from "../change_request_agent_popup/change-request-agent-styles";
import {InfoRowLabel} from "../../../Pages/Requests/Booking_agent/booking_card/booking-card-style";
import {CalendarWrapper} from "../../_commonComponents/calendar/calendar-styles";
//icons
import close_icon from "../../../assets/icons/close-icon.svg";



type PropsType = {
    operation_info: OperationType | null,
    setEdit: (value: boolean) => void
}

const EditOperationShipmentInfoByAgentPopup: React.FC<PropsType> = ({operation_info, setEdit}) => {
    let direction = operation_info?.freight_rate.origin.is_local ? 'export' : 'import'
    let after_estimated = moment(operation_info?.date_to, 'DD/MM/YYYY').add(7, 'days').calendar();
    let after_estimated_date = moment(after_estimated).toDate()

    let shipment = operation_info?.shipment_details && operation_info?.shipment_details[0]
    //estimated time
    let arrival_date = shipment?.date_of_arrival.slice(0, 10)
    let arrival_time = shipment?.date_of_arrival.slice(11)
    let departure_date = shipment?.date_of_departure.slice(0, 10)
    let departure_time = shipment?.date_of_departure.slice(11)

    //cargo cut off + documents cut off
    let documents_cut_off_date = shipment?.document_cut_off_date?.slice(0, 10)
    let documents_cut_off_time = shipment?.document_cut_off_date?.slice(11)
    let cargo_cut_off_date = shipment?.cargo_cut_off_date?.slice(0, 10)
    let cargo_cut_off_time = shipment?.cargo_cut_off_date?.slice(11)

    //actual time of departure and arrival
    let actual_date_of_departure = shipment?.actual_date_of_departure && shipment?.actual_date_of_departure?.slice(0, 10)
    let actual_time_of_departure = shipment?.actual_date_of_departure && shipment?.actual_date_of_departure?.slice(11)
    let actual_date_of_arrival = shipment?.actual_date_of_arrival && shipment?.actual_date_of_arrival?.slice(0, 10)
    let actual_time_of_arrival = shipment?.actual_date_of_arrival && shipment?.actual_date_of_arrival?.slice(11)


    const dispatch = useDispatch()
    const {register, handleSubmit, errors, setValue, control} = useForm()

    let changed_fields = {};

    const onSubmit = (values: any) => {

        const {
            date_of_departure,
            date_of_arrival,
            document_cut_off_date,
            cargo_cut_off_date,
            actual_time_of_departure,
            actual_time_of_arrival
        } = datesFormatHelper(values)

        let final_data = {
            ...values,
            date_of_departure: date_of_departure,
            date_of_arrival: date_of_arrival,
            document_cut_off_date: document_cut_off_date ?? null,
            cargo_cut_off_date: cargo_cut_off_date ?? null,
            actual_date_of_departure: actual_time_of_departure ? actual_time_of_departure : null,
            actual_date_of_arrival: actual_time_of_arrival ? actual_time_of_arrival : null
        }
        delete final_data.estimated_time
        delete final_data.documents_cut_off
        delete final_data.cargo_cut_off_date
        delete final_data.actual_time_arrival
        delete final_data.actual_time_departure
        delete final_data.payment_due_by


        let final_data_without_cargo_cut_off = {
            ...values,
            date_of_departure: date_of_departure,
            date_of_arrival: date_of_arrival,
        }
        delete final_data_without_cargo_cut_off.estimated_time
        delete final_data_without_cargo_cut_off.payment_due_by


        shipment && Object.keys(shipment).forEach(k => Object.keys(final_data).forEach(k2 => {
            if (k === k2) {
                if (shipment && (shipment[k] !== final_data[k2])) {
                    return changed_fields[k2] = final_data[k2]
                }
            } else {
                return k
            }
        }))

        //send updated fields
        Object.keys(changed_fields).length > 0 && dispatch(editOperationByAgentThunk(changed_fields, Number(shipment?.id)))

        {
            values.payment_due_by && (moment(values.payment_due_by).format('DD/MM/YYYY') !== operation_info?.payment_due_by)
            &&
            dispatch(editOperationPaymentDueByAgentThunk(
                {payment_due_by: moment(values.payment_due_by).format('DD/MM/YYYY')},
                Number(operation_info?.id))
            )
        }

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

    let today = moment(new Date()).format('DD/MM/YYYY')

    let disabled_condition_1 = !!(actual_date_of_departure && actual_date_of_departure <= today)
    let disable_condition_2 = !!(actual_date_of_arrival && actual_date_of_arrival <= today)

    return (
        <ChangeRequestWrapper>
            <ChangeRequestInner>
                <IconButton style={{position: 'absolute', top: '20px', right: '20px'}} onClick={() => setEdit(false)}>
                    <img src={close_icon} alt=""/>
                </IconButton>
                <ChangeRequestContent>
                    <ChangeRequestTitle>
                        Update information in the Operation
                    </ChangeRequestTitle>
                    <FormChangeRequestWrapper onSubmit={handleSubmit(onSubmit)}>
                        <div style={{
                            display: 'flex',
                            width: '100%',
                            justifyContent: 'space-between',
                            borderBottom: '1px solid #7C7C89',
                            paddingBottom: '25px',
                            marginBottom: '25px'
                        }}>
                            {operation_info?.shipping_type === ShippingTypesEnum.SEA
                                ? <>
                                    <FormField inputRef={register({required: 'Field is required'})}
                                               error={errors?.vessel}
                                               name='vessel'
                                               max_width='290px'
                                               color_label='#115B86'
                                               label='VESSEL'
                                               placeholder='Placeholder'
                                               font_weight='Helvetica Bold'
                                               defaultValue={shipment?.vessel}
                                               disabled={disabled_condition_1}
                                    />
                                    <FormField inputRef={register({required: 'Field is required'})}
                                               error={errors?.voyage}
                                               name='voyage'
                                               max_width='290px'
                                               color_label='#115B86'
                                               label='TRIP'
                                               placeholder='Placeholder'
                                               font_weight='Helvetica Bold'
                                               defaultValue={shipment?.voyage}
                                               disabled={disabled_condition_1}
                                    />
                                </>
                                : <>
                                    <FormField inputRef={register({required: 'Field is required'})}
                                               error={errors?.mawb}
                                               name='mawb'
                                               max_width='290px'
                                               color_label='#115B86'
                                               label='MAWB'
                                               placeholder='Placeholder'
                                               font_weight='Helvetica Bold'
                                               defaultValue={shipment?.mawb}
                                               disabled={disabled_condition_1}
                                    />
                                    <FormField inputRef={register({required: 'Field is required'})}
                                               error={errors?.flight_number}
                                               name='flight_number'
                                               max_width='290px'
                                               color_label='#115B86'
                                               label='FLIGHT NUMBER'
                                               placeholder='Placeholder'
                                               font_weight='Helvetica Bold'
                                               defaultValue={shipment?.flight_number}
                                               disabled={disabled_condition_1}
                                    />
                                </>
                            }
                            <FormField inputRef={register({required: 'Field is required'})}
                                       error={errors?.booking_number}
                                       name='booking_number'
                                       max_width='290px'
                                       color_label='#115B86'
                                       label='BOOKING NUMBER'
                                       placeholder='Placeholder'
                                       font_weight='Helvetica Bold'
                                       defaultValue={shipment?.booking_number}
                                       disabled={disabled_condition_1}
                            />
                        </div>
                        {(operation_info?.freight_rate.shipping_mode.id === ShippingModeEnum.LCL) &&
                        <div style={{
                            display: 'flex',
                            width: '100%',
                            maxWidth: '603px',
                            justifyContent: 'space-between',
                            borderBottom: '1px solid #7C7C89',
                            paddingBottom: '25px',
                            marginBottom: '25px'
                        }}>
                            <FormField inputRef={register({required: 'Field is required'})}
                                       error={errors?.booking_number_with_carrier}
                                       name='booking_number_with_carrier'
                                       max_width='290px'
                                       color_label='#115B86'
                                       label='BOOKING NUMBER WITH CARRIER'
                                       placeholder='Placeholder'
                                       font_weight='Helvetica Bold'
                                       defaultValue={shipment?.booking_number_with_carrier}
                                       disabled={disabled_condition_1}
                            />
                            <FormField inputRef={register({required: 'Field is required'})}
                                       error={errors?.container_number}
                                       name='container_number'
                                       max_width='290px'
                                       color_label='#115B86'
                                       label='CONTAINER NUMBER'
                                       placeholder='Placeholder'
                                       font_weight='Helvetica Bold'
                                       defaultValue={shipment?.container_number}
                                       disabled={disabled_condition_1}
                            />
                        </div>
                        }

                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            width: '100%',
                            justifyContent: 'space-between',
                            borderBottom: '1px solid #7C7C89',
                            paddingBottom: '25px',
                            marginBottom: '25px'
                        }}>
                            <LocationContainer errors={errors}
                                               register={register}
                                               shipping_mode={String(operation_info?.freight_rate.shipping_mode.title)}
                                               direction={direction}
                                               color_label='#115B86'
                                               font_weight='Helvetica Bold'
                                               label_uppercase={true}
                                               shipment_details={shipment ? shipment : null}
                                               documents_cut_off_date={documents_cut_off_date}

                            />
                            <AcceptPopupDates control={control}
                                              errors={{
                                                  from: errors.from,
                                                  to: errors.to,
                                                  departure_time: errors.departure_time,
                                                  arrival_time: errors.arrival_time
                                              }}
                                              setValue={setValue}
                                              required_dates={true}
                                              required_time={true}
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
                                              disabled_condition1={disabled_condition_1}
                                              disabled_condition2={disable_condition_2}
                                              color_label={true}

                            />
                            {direction === 'export'
                            && <AcceptPopupDates control={control}
                                                 errors={{
                                                     from: errors.from,
                                                     to: errors.to,
                                                     departure_time: errors.departure_time,
                                                     arrival_time: errors.arrival_time
                                                 }}
                                                 setValue={setValue}
                                                 required_dates={true}
                                                 required_time={true}
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
                                                 disabled_condition1={disabled_condition_1}
                                                 disabled_condition2={disable_condition_2}
                                                 color_label={true}
                            />
                            }
                            <AcceptPopupDates control={control}
                                              errors={{
                                                  from: errors.from,
                                                  to: errors.to,
                                                  departure_time: errors.departure_time,
                                                  arrival_time: errors.arrival_time
                                              }}
                                              setValue={setValue}
                                              required_dates={false}
                                              required_time={false}
                                              label1={'Actual Time of Departure'}
                                              label2={'Actual Time of Arrival'}
                                              time_name_first={'actual_time_departure.departure_time'}
                                              time_name_second={'actual_time_arrival.arrival_time'}
                                              date_name_first={'actual_time_departure.from'}
                                              date_name_second={'actual_time_arrival.to'}
                                              before={new Date()}
                                              justify_content='flex-start'
                                              max_width='655px'
                                              departure_date={actual_date_of_departure}
                                              arrival_date={actual_date_of_arrival}
                                              first_time={actual_time_of_departure}
                                              second_time={actual_time_of_arrival}
                                              color_label={true}
                            />
                        </div>
                        {(operation_info?.freight_rate.shipping_mode.id === ShippingModeEnum.FCL) &&
                        <div style={{
                            display: 'flex',
                            width: '100%',
                            justifyContent: 'space-between',
                            borderBottom: '1px solid #7C7C89',
                            paddingBottom: '25px',
                            marginBottom: '25px'
                        }}>
                            <FormField inputRef={register({required: 'Field is required'})}
                                       error={errors?.container_free_time}
                                       name='container_free_time'
                                       max_width='290px'
                                       color_label='#115B86'
                                       label='CONTAINER FREE TIME'
                                       placeholder='0 days'
                                       font_weight='Helvetica Bold'
                                       defaultValue={shipment?.container_free_time ? shipment?.container_free_time : ''}
                            />
                        </div>
                        }

                        <div style={{
                            width: '100%',
                            borderBottom: '1px solid #7C7C89',
                            paddingBottom: '25px',
                            marginBottom: '25px'
                        }}>
                            <InfoRowLabel style={{marginRight: '10px'}}>PAYMENT DUE BY</InfoRowLabel>
                            <CalendarWrapper max_width='150px' margin_top='0px' input_height='40px' margin_right='0px'
                                             style={{display: 'flex'}}>
                                <Controller control={control}
                                            name='payment_due_by'
                                    //rules={{required: false}}
                                            defaultValue={operation_info?.payment_due_by ? moment(operation_info?.payment_due_by, 'DD/MM/YYYY').toDate() : ''}
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
                            <ConfirmRequestButton type='submit'>
                                CONFIRM
                            </ConfirmRequestButton>
                        </ChangeRequestButtonsWrapper>
                    </FormChangeRequestWrapper>
                </ChangeRequestContent>
            </ChangeRequestInner>
        </ChangeRequestWrapper>
    )
}

export default EditOperationShipmentInfoByAgentPopup