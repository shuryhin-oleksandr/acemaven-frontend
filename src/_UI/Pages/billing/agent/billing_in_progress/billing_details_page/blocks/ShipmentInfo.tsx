import React from 'react'
import {
    SectionTitle, SectionWrapper,
    ShipmentPartsRow
} from "../../../../../operations/agent/ExactOperationContainer/OperationCard/operation-card-style";
import {
    InfoRow,
    InfoRowLabel,
    InfoRowValue
} from "../../../../../Requests/Booking_agent/booking_card/booking-card-style";

type PropsType = {

}

const ShipmentInfo:React.FC<PropsType> = ({}) => {
    return (
        <SectionWrapper style={{marginBottom: '33px'}}>
            <SectionTitle>SHIPMENT INFO</SectionTitle>
            <ShipmentPartsRow style={{marginBottom: 0, borderBottom: "none"}}>
                <InfoRow>
                    <InfoRowLabel>CLIENT</InfoRowLabel>
                    <InfoRowValue>COCA COLA</InfoRowValue>
                </InfoRow>
                <InfoRow>
                    <InfoRowLabel>ROUTE</InfoRowLabel>
                    <InfoRowValue>SSZ-BRL</InfoRowValue>
                </InfoRow>
                <InfoRow>
                    <InfoRowLabel>SHIPPING MODE</InfoRowLabel>
                    <InfoRowValue>FCL</InfoRowValue>
                </InfoRow>
                <InfoRow>
                    <InfoRowLabel>SHIP</InfoRowLabel>
                    <InfoRowValue>VICTORIA 2020</InfoRowValue>
                </InfoRow>
                <InfoRow>
                    <InfoRowLabel>CARRIER</InfoRowLabel>
                    <InfoRowValue>GreatTransfer Co.</InfoRowValue>
                </InfoRow>
            </ShipmentPartsRow>
        </SectionWrapper>
    )
}
export default ShipmentInfo