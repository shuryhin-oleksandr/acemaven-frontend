import React from 'react'
import {BookingTitle, NumberOfBooking} from "../../operation-card-style";
import {ShipmentDetailsType} from "../../../../../../../../_BLL/types/operations/operationsTypes";



type PropsType = {
    shipment: ShipmentDetailsType | undefined
}

const BookingNumberBlockContainer: React.FC<PropsType> = ({shipment}) => {

    return (
        <div style={{display: "flex"}}>
            <BookingTitle>BOOKING</BookingTitle>
            <NumberOfBooking>No {shipment?.booking_number}</NumberOfBooking>
        </div>
    )
}

export default BookingNumberBlockContainer