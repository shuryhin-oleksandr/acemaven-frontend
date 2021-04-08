import React from 'react'
//types
import {ShipmentDetailsType} from "../../../../../../../../_BLL/types/operations/operationsTypes";
//styles
import {BookingTitle, NumberOfBooking} from "../../operation-card-style";
import {useTranslation} from "react-i18next";


type PropsType = {
    shipment: ShipmentDetailsType | undefined,

}

const BookingNumberWithCarrierBlockContainer: React.FC<PropsType> = ({shipment}) => {
  const {t} = useTranslation();
    return (
        <div style={{display: "flex"}}>
            <BookingTitle>{t("Bookings/BOOKING WITH CARRIER")}</BookingTitle>
            <NumberOfBooking>{t("Bookings/NO")} {shipment?.booking_number_with_carrier}</NumberOfBooking>
        </div>
    )
}

export default BookingNumberWithCarrierBlockContainer