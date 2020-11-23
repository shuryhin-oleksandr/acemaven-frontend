import React from 'react'
//type
import {ShipperType} from "../../../../../../_BLL/types/bookingTypes";
//styles
import {GeneralTitle} from "../../../../quotes/agent/table/agent-quotes-styles";
import {
    GeneralBookingContent,
    InfoRow,
    InfoRowLabel,
    InfoRowValue, ShipmentInfo,
    ValuesShipmentWrapper
} from "../booking-card-style";


type PropsType = {
    shipper: ShipperType | null,
    client: string,
    client_contact: string,
}

const ShipmentInfoBlock:React.FC<PropsType> = ({shipper, client, client_contact}) => {
    return (
        <ShipmentInfo>
            <GeneralTitle>SHIPMENT INFO</GeneralTitle>
            <GeneralBookingContent>
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
