import React from 'react'
//types
import {ShipmentDetailsType} from "../../../../../../../../_BLL/types/operations/operationsTypes";
//styles
import {BookingTitle, NumberOfBooking} from "../../operation-card-style";


type PropsType = {
    shipment: ShipmentDetailsType | undefined,

}

const BookingNumberWithCarrierBlockContainer: React.FC<PropsType> = ({shipment}) => {
    return (
        <div style={{display: "flex"}}>
            <BookingTitle>BOOKING WITH CARRIER</BookingTitle>
            <NumberOfBooking>No {shipment?.booking_number_with_carrier}</NumberOfBooking>
        </div>
    )
}

export default BookingNumberWithCarrierBlockContainer