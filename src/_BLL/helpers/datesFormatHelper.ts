import moment from "moment";

export const datesFormatHelper = (values: any) => {

    //estimated departure & arrival
    let date_of_departure = moment(values.estimated_time?.from).format('DD/MM/YYYY') + ' ' + values.estimated_time?.departure_time
    let date_of_arrival = moment(values.estimated_time?.to).format('DD/MM/YYYY') + ' ' + values.estimated_time?.arrival_time

    //docs & cargo cut off
    let document_cut_off_date = (values.documents_cut_off?.cut_off_time && values.documents_cut_off?.from)
        ? moment(values.documents_cut_off?.from).format('DD/MM/YYYY') + ' ' + values.documents_cut_off?.cut_off_time
        : null
    let cargo_cut_off_date = values.cargo_cut_off?.cut_off_time
        ? moment(values.cargo_cut_off?.to).format('DD/MM/YYYY') + ' ' + values.cargo_cut_off?.cut_off_time
        : null

    //ACD && ATA
    let actual_time_of_departure = (values.actual_time_departure?.from && values.actual_time_departure?.departure_time)
        ? moment(values.actual_time_departure?.from).format('DD/MM/YYYY') + ' ' + values.actual_time_departure?.departure_time
        : null
    let actual_time_of_arrival = (values.actual_time_arrival?.to && values.actual_time_arrival?.arrival_time)
        ? moment(values.actual_time_arrival?.to).format('DD/MM/YYYY') + ' ' + values.actual_time_arrival?.arrival_time
        : null

    return {date_of_departure, date_of_arrival, document_cut_off_date, cargo_cut_off_date, actual_time_of_departure, actual_time_of_arrival}
}