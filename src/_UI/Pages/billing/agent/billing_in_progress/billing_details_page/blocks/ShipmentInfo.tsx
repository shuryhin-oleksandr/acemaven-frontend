import React from 'react'
//types
import {BillingOperationType} from "../../../../../../../_BLL/types/billing/billingTypes";
import {ShippingTypesEnum} from "../../../../../../../_BLL/types/rates&surcharges/newSurchargesTypes";
//styles
import {
    SectionTitle, SectionWrapper,
    ShipmentPartsRow
} from "../../../../../operations/agent/ExactOperationContainer/OperationCard/operation-card-style";
import {
    InfoRow,
    InfoRowLabel,
    InfoRowValue
} from "../../../../../Requests/Booking_agent/booking_card/booking-card-style";
import {useTranslation} from "react-i18next";


type PropsType = {
    billing_details: BillingOperationType | null,
}

const ShipmentInfo: React.FC<PropsType> = ({billing_details}) => {
    const {t} = useTranslation();
    return (
        <SectionWrapper style={{marginBottom: '33px'}}>
            <SectionTitle>{t("Bookings/SHIPMENT INFO")}</SectionTitle>
            <ShipmentPartsRow style={{marginBottom: 0, borderBottom: "none"}}>
                <InfoRow margin_right="35px">
                    <InfoRowLabel>{t("Bookings/CLIENT")}</InfoRowLabel>
                    <InfoRowValue>{billing_details?.client}</InfoRowValue>
                </InfoRow>
                <InfoRow margin_right="35px">
                    <InfoRowLabel>{t("Bookings/ROUTE")}</InfoRowLabel>
                    <InfoRowValue>{billing_details?.origin.code} - {billing_details?.destination.code}</InfoRowValue>
                </InfoRow>
                <InfoRow margin_right="35px">
                    <InfoRowLabel>{t("Bookings/SHIPPING MODE")}</InfoRowLabel>
                    <InfoRowValue>{billing_details?.shipping_mode}</InfoRowValue>
                </InfoRow>
                {billing_details?.shipping_type === ShippingTypesEnum.SEA &&
                <InfoRow margin_right="35px">
                    <InfoRowLabel>{t("Billing/SHIP")}</InfoRowLabel>
                    <InfoRowValue>{billing_details?.vessel}</InfoRowValue>
                </InfoRow>
                }
                <InfoRow margin_right="35px">
                    <InfoRowLabel>{t("Quote bid screen/CARRIER")}</InfoRowLabel>
                    <InfoRowValue>{billing_details?.carrier}</InfoRowValue>
                </InfoRow>
            </ShipmentPartsRow>
        </SectionWrapper>
    )
}
export default ShipmentInfo