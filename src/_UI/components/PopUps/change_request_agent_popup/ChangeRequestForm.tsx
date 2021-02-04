import React from 'react'
import { useForm} from "react-hook-form";
import {
    ChangeRequestButtonsWrapper, ConfirmRequestButton,
    FormChangeRequestTitle,
    FormChangeRequestWrapper
} from "./change-request-agent-styles";
import FormField from "../../_commonComponents/Input/FormField";
import LocationContainer from "../accept_booking_popup/LocationContainer";
import AcceptPopupDates from "../accept_booking_popup/AcceptPopupDates";
// @ts-ignore
import moment from "moment";
import {OperationType} from "../../../../_BLL/types/operations/operationsTypes";
import {ShippingModeEnum, ShippingTypesEnum} from "../../../../_BLL/types/rates&surcharges/newSurchargesTypes";
import {confirmChangeRequestThunk} from "../../../../_BLL/thunks/operations/agent/OperationsAgentThunk";
import {useDispatch} from "react-redux";
import { useHistory } from 'react-router-dom';

type PropsType = {
    operation_info: OperationType | null
}

const ChangeRequestForm:React.FC<PropsType> = ({operation_info}) => {

    const history = useHistory()

    let direction = operation_info?.freight_rate.origin.is_local ? 'export' : 'import'
    let after_estimated = moment(operation_info?.date_to, 'DD/MM/YYYY').add(7, 'days').calendar();
    let after_estimated_date = moment(after_estimated).toDate()

    let shipment = operation_info?.shipment_details && operation_info?.shipment_details[0]
    //estimated time
    let arrival_date = shipment?.date_of_arrival.slice(0.10)
    let arrival_time = shipment?.date_of_arrival.slice(11)
    let departure_date = shipment?.date_of_departure.slice(0, 10)
    let departure_time = shipment?.date_of_departure.slice(11)

    //cargo cut off + documents cut off
    let documents_cut_off_date = shipment?.document_cut_off_date?.slice(0, 10)
    let documents_cut_off_time = shipment?.document_cut_off_date?.slice(11)
    let cargo_cut_off_date = shipment?.cargo_cut_off_date?.slice(0, 10)
    let cargo_cut_off_time = shipment?.cargo_cut_off_date?.slice(11)


    const dispatch = useDispatch()
    const {register, handleSubmit, errors, setValue, control} = useForm()
    const onSubmit = (values: any) => {
        let date_of_departure = moment(values.estimated_time?.from).format('DD/MM/YYYY') + ' ' + values.estimated_time?.departure_time
        let date_of_arrival = moment(values.estimated_time?.to).format('DD/MM/YYYY') + ' ' + values.estimated_time?.arrival_time
        let document_cut_off_date = (values.documents_cut_off?.from && values.documents_cut_off?.cut_off_time)
            ? moment(values.documents_cut_off?.from).format('DD/MM/YYYY') + ' ' + values.documents_cut_off?.cut_off_time
            : null
        let cargo_cut_off_date = (values.cargo_cut_off?.to && values.cargo_cut_off?.cut_off_time)
                ? moment(values.cargo_cut_off?.to).format('DD/MM/YYYY') + ' ' + values.cargo_cut_off?.cut_off_time
                : null

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



        let changed_fields = {};

        shipment && Object.keys(shipment).forEach(k => Object.keys(final_data).forEach(k2 => {
            if (k === k2) {
                if (shipment && (shipment[k] != final_data[k2])) {
                    return changed_fields[k2] = final_data[k2]
                }
            } else {
                return k
            }
        }))

        //confirm change req
        dispatch(confirmChangeRequestThunk(Number(operation_info?.id), changed_fields, Number(shipment?.id), history))

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
                                   max_width='290px'
                                   color_label='#115B86'
                                   label='VESSEL'
                                   placeholder='Placeholder'
                                   font_weight='Helvetica Bold'
                                   defaultValue={shipment?.vessel}
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
                />
            </div>
            {(operation_info?.freight_rate.shipping_mode.id === ShippingModeEnum.LCL) &&
            <div style={{display: 'flex',  width: '100%', maxWidth: '603px', justifyContent: 'space-between', borderBottom: '1px solid #7C7C89', paddingBottom: '25px', marginBottom: '25px'}}>
                <FormField inputRef={register({required: 'Field is required'})}
                           error={errors?.booking_number_with_carrier}
                           name='booking_number_with_carrier'
                           max_width='290px'
                           color_label='#115B86'
                           label='BOOKING NUMBER WITH CARRIER'
                           placeholder='Placeholder'
                           font_weight='Helvetica Bold'
                           defaultValue={shipment?.booking_number_with_carrier}
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
                              color_label={true}

            />
            {direction === 'export'
            && <AcceptPopupDates control={control}
                                 errors={{from: errors.from, to: errors.to, departure_time: errors.departure_time, arrival_time: errors.arrival_time}}
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
                                 color_label={true}

            />
            }
            </div>
            {(operation_info?.freight_rate.shipping_mode.id === ShippingModeEnum.FCL) &&
            <div style={{display: 'flex', width: '100%', justifyContent: 'space-between', borderBottom: '1px solid #7C7C89', paddingBottom: '25px', marginBottom: '25px'}}>
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
            <ChangeRequestButtonsWrapper>
                <ConfirmRequestButton type='submit'>CONFIRM</ConfirmRequestButton>
            </ChangeRequestButtonsWrapper>
        </FormChangeRequestWrapper>
    )
}

export default ChangeRequestForm