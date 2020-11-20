import React from 'react'
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
import {ShipperType} from "../../../../../../_BLL/types/bookingTypes";

type PropsType = {
    shipper: ShipperType | null,
    client: string,
    client_contact: string,
    date_from: string,
    date_to: string,
    week_range: {week_from: number, week_to: number} | null
}

const ShipmentInfoBlock:React.FC<PropsType> = ({shipper, client, client_contact, date_from, date_to, week_range}) => {
    return (
        <ShipmentInfo>
            <GeneralTitle>SHIPMENT INFO</GeneralTitle>
            <GeneralBookingContent>
                <CalendarIcon margin_top='-10px'><img src={calendar_icon} alt=""/></CalendarIcon>
                <InfoRow margin_right='50px' margin_bottom='0px'>
                            <span style={{width: '100px', fontSize:'24px', color:'black',
                                fontFamily:'Helvetica Light', marginTop: '15px', marginBottom: '13px'}}>
                                {week_range?.week_from === week_range?.week_to
                                    ? `WEEK ${week_range?.week_from}`
                                    : `WEEK ${week_range?.week_from && week_range?.week_from - week_range?.week_to && week_range?.week_to}`
                                }
                            </span>
                    <InfoRowValue>{date_from} - {date_to}</InfoRowValue>
                </InfoRow>
                <ValuesShipmentWrapper >
                    <div style={{width: '25%', display: 'flex', flexDirection: 'column'}}>
                        <InfoRow >
                            <InfoRowLabel>CLIENT</InfoRowLabel>
                            <InfoRowValue>{client}</InfoRowValue>
                        </InfoRow>
                        <InfoRow>
                            <InfoRowLabel>CONTACT PERSON</InfoRowLabel>
                            <InfoRowValue>D{client_contact}</InfoRowValue>
                        </InfoRow>
                    </div>
                    <div style={{width: '25%', display: 'flex', flexDirection: 'column'}}>
                        <InfoRow>
                            <InfoRowLabel>SHIPPER NAME</InfoRowLabel>
                            <InfoRowValue>
                                {shipper?.name}
                            </InfoRowValue>
                        </InfoRow>
                        {shipper?.address_line_first && shipper?.address_line_second
                        ? <InfoRow>
                            <InfoRowLabel>ADDRESS</InfoRowLabel>
                            <InfoRowValue>
                                {shipper?.address_line_first && shipper?.address_line_first + shipper?.address_line_second && shipper?.address_line_second}
                            </InfoRowValue>
                        </InfoRow>
                            : <InfoRow>
                                <InfoRowLabel>CITY</InfoRowLabel>
                                <InfoRowValue>
                                    {shipper?.city}
                                </InfoRowValue>
                            </InfoRow>
                        }
                        <InfoRow>
                            <InfoRowLabel>CONTACT PERSON</InfoRowLabel>
                            <InfoRowValue>
                                {shipper?.contact_name}
                            </InfoRowValue>
                        </InfoRow>
                    </div>
                    <div style={{width: '25%', display: 'flex', flexDirection: 'column',}}>
                        <InfoRow>
                            <InfoRowLabel>PHONE NUMBER 1</InfoRowLabel>
                            <InfoRowValue>
                                {shipper?.phone}
                            </InfoRowValue>
                        </InfoRow>
                        {shipper?.phone_additional && <InfoRow>
                            <InfoRowLabel>PHONE NUMBER 2</InfoRowLabel>
                            <InfoRowValue>{shipper?.phone_additional}</InfoRowValue>
                        </InfoRow>}
                        <InfoRow>
                            <InfoRowLabel>EMAIL</InfoRowLabel>
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
