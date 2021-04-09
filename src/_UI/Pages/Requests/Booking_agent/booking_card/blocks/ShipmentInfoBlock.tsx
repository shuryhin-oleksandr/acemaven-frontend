import React from 'react'
//type
import {BookingInfoType, ShipperType} from "../../../../../../_BLL/types/bookingTypes";
//styles
import {GeneralTitle} from "../../../../quotes/agent/table/agent-quotes-styles";
import {
    CalendarIcon,
    GeneralBookingContent,
    InfoRow,
    InfoRowLabel,
    InfoRowValue, ShipmentInfo,
    ValuesShipmentWrapper
} from "../booking-card-style";
import calendar_icon from "../../../../../assets/icons/date_1.svg";
import {useTranslation} from "react-i18next";


type PropsType = {
    shipper: ShipperType | null,
    client: string,
    client_contact: string,
    exact_booking_info: BookingInfoType
}

const ShipmentInfoBlock:React.FC<PropsType> = ({shipper, client, client_contact, exact_booking_info}) => {
    const {t} = useTranslation();
    return (
        <ShipmentInfo>
            <GeneralTitle>{t("Bookings/SHIPMENT INFO")}</GeneralTitle>
            <GeneralBookingContent>
                <ValuesShipmentWrapper >
                    <div style={{display: 'flex'}}>
                        <CalendarIcon >
                            <img src={calendar_icon} alt=""/>
                        </CalendarIcon>
                        <InfoRow margin_right='50px' margin_bottom='0px'>
                            <span style={{
                                width: '100px', fontSize: '24px', color: 'black',
                                fontFamily: 'Helvetica Light', marginTop: '15px', marginBottom: '13px'
                            }}>
                                {exact_booking_info?.week_range?.week_from === exact_booking_info?.week_range?.week_to
                                    ? `${t("Bookings/WEEK")} ${exact_booking_info?.week_range?.week_from}`
                                    : `${t("Bookings/WEEK")} ${exact_booking_info?.week_range?.week_from && exact_booking_info?.week_range?.week_from - exact_booking_info?.week_range?.week_to && exact_booking_info?.week_range?.week_to}`
                                }
                            </span>
                            <InfoRowValue>{exact_booking_info?.date_from} - {exact_booking_info?.date_to}</InfoRowValue>
                        </InfoRow>
                    </div>
                    <div style={{marginRight:80, display: 'flex', flexDirection: 'column'}}>
                        <InfoRow >
                            <InfoRowLabel>{t("Bookings/CLIENT")}</InfoRowLabel>
                            <InfoRowValue>{client}</InfoRowValue>
                        </InfoRow>
                        <InfoRow>
                            <InfoRowLabel>{t("Bookings/CONTACT PERSON")}</InfoRowLabel>
                            <InfoRowValue>{client_contact}</InfoRowValue>
                        </InfoRow>
                    </div>
                    <div style={{marginRight:80, display: 'flex', flexDirection: 'column'}}>
                        <InfoRow>
                            <InfoRowLabel>{t("Bookings/SHIPPER NAME")}</InfoRowLabel>
                            <InfoRowValue>
                                {shipper?.name}
                            </InfoRowValue>
                        </InfoRow>
                        <InfoRow>
                            <InfoRowLabel>{t("Quote bid screen/CARRIER")}</InfoRowLabel>
                            <InfoRowValue>
                                {exact_booking_info?.freight_rate.carrier.title}
                            </InfoRowValue>
                        </InfoRow>
                        {shipper?.address_line_first && shipper?.address_line_second
                        ? <InfoRow>
                            <InfoRowLabel>{t("Bookings/ADDRESS")}</InfoRowLabel>
                            <InfoRowValue>
                                {shipper?.address_line_first && shipper?.address_line_first + shipper?.address_line_second && shipper?.address_line_second}
                            </InfoRowValue>
                        </InfoRow>
                            : <InfoRow>
                                <InfoRowLabel style={{textTransform: "uppercase"}}>{t("Register/City")}</InfoRowLabel>
                                <InfoRowValue>
                                    {shipper?.city}
                                </InfoRowValue>
                            </InfoRow>
                        }
                        <InfoRow>
                            <InfoRowLabel>{t("Bookings/CONTACT PERSON")}</InfoRowLabel>
                            <InfoRowValue>
                                {shipper?.contact_name}
                            </InfoRowValue>
                        </InfoRow>
                    </div>
                    <div style={{marginRight:80, display: 'flex', flexDirection: 'column',}}>
                        <InfoRow>
                            <InfoRowLabel>{t("Bookings/PHONE NUMBER")} 1</InfoRowLabel>
                            <InfoRowValue>
                                {shipper?.phone}
                            </InfoRowValue>
                        </InfoRow>
                        {shipper?.phone_additional && <InfoRow>
                            <InfoRowLabel>{t("Bookings/PHONE NUMBER")} 2</InfoRowLabel>
                            <InfoRowValue>{shipper?.phone_additional}</InfoRowValue>
                        </InfoRow>}
                        <InfoRow>
                            <InfoRowLabel>{t("Bookings/EMAIL")}</InfoRowLabel>
                            <InfoRowValue>
                                {shipper?.email}
                            </InfoRowValue>
                        </InfoRow>
                    </div>
                </ValuesShipmentWrapper>
            </GeneralBookingContent>
        </ShipmentInfo>
    )
}

export default ShipmentInfoBlock
