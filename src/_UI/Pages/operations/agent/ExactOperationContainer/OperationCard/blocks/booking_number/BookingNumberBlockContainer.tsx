import React from 'react'
import {BookingTitle, NumberOfBooking} from "../../operation-card-style";
import {ShipmentDetailsType} from "../../../../../../../../_BLL/types/operations/operationsTypes";
import {useTranslation} from "react-i18next";



type PropsType = {
    shipment: ShipmentDetailsType | undefined
}

const BookingNumberBlockContainer: React.FC<PropsType> = ({shipment}) => {
  const {t} = useTranslation();
    return (
        <div style={{display: "flex"}}>
            <BookingTitle>{t("Bookings/Booking")}</BookingTitle>
            <NumberOfBooking>{t("Quote bid screen/NO")} {shipment?.booking_number}</NumberOfBooking>
        </div>
    )
}

export default BookingNumberBlockContainer