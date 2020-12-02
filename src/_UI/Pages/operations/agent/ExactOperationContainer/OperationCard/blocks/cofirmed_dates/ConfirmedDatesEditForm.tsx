import React from 'react'
import AcceptPopupDates from "../../../../../../../components/PopUps/accept_booking_popup/AcceptPopupDates";
import moment from "moment";
import {OperationType} from "../../../../../../../../_BLL/types/operations/operationsTypes";


type PropsType = {
    control: any,
    errors: any,
    setValue: any,
    exact_operation_info: OperationType,

}

const ConfirmedDatesEditForm:React.FC<PropsType> = ({control, errors, setValue, exact_operation_info}) => {

    const direction = exact_operation_info.freight_rate.origin.is_local ? 'export' : 'import'
    let after_estimated = moment(exact_operation_info.date_to, 'DD/MM/YYYY').add(7, 'days').calendar();
    let after_estimated_date = moment(after_estimated).toDate()


    let shipment = exact_operation_info?.shipment_details && exact_operation_info?.shipment_details[0]

    let arrival_date = moment(shipment?.date_of_arrival.slice(6)).format('DD/MM/YYYY')
    let arrival_time = shipment?.date_of_arrival.slice(0,5)
    let departure_date = moment(shipment?.date_of_departure.slice(6)).format('DD/MM/YYYY')
    let departure_time = shipment?.date_of_departure.slice(0,5)


    return(
        <div style={{display: 'flex', width: '100%'}}>
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
                              before={moment(exact_operation_info?.date_from, 'DD/MM/YYYY').toDate()}
                              after={moment(after_estimated_date, 'DD/MM/YYYY').toDate()}
                              flex_direction='column'
                              wrapper_width='100%'
                              justify_content='flex-start'
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
                                 start_shipment_date={exact_operation_info?.date_from}
                                 before={new Date()}
                                 after={moment(exact_operation_info?.date_from, 'DD/MM/YYYY').toDate()}
                                 flex_direction='column'
                                 wrapper_width='100%'
                                 justify_content='flex-start'
            />
            }
        </div>
        )
}

export default ConfirmedDatesEditForm