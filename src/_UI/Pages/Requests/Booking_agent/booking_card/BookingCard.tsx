import React from 'react'
import {
    AcceptButton,
    AssignButton,
    BookingInfo,
    BookingNumber,
    BookingStatus,
    CardContent,
    CardWrapper,
    ContentHeader,
    RejectButton,
    ActionsButtons,
    GeneralBookingInfo,
    GeneralBookingContent,
    GeneralShipType,
    InfoRow,
    InfoRowLabel, InfoRowValue, ValuesShipmentWrapper
} from "./booking-card-style";
import sea_icon from '../../../../../_UI/assets/icons/rates&services/ship-surcharge.svg'
import {GeneralTitle} from "../../../quotes/agent/table/agent-quotes-styles";
import HiddenInfoPart from "./blocks/HiddenInfoPart";
import ShipmentInfoBlock from "./blocks/ShipmentInfoBlock";


type PropsType = {
    setAssignAgent: (value: boolean) => void,
    setRejectPopupOpen: (value:boolean) => void
}

const BookingCard:React.FC<PropsType> = ({setAssignAgent, setRejectPopupOpen}) => {

    let current_user_role = 'client'

    return (
        <CardWrapper>
            <CardContent>
                <ContentHeader>
                    <BookingInfo>
                        <BookingNumber>
                            Booking ACY9087512
                        </BookingNumber>
                        <BookingStatus>
                            <span style={{color: '#1ab8e5'}}>STATUS</span> 05/11 21:00 BOOKING IS CONFIRMED LA LA LA
                        </BookingStatus>
                    </BookingInfo>
                    <ActionsButtons>
                        {current_user_role === 'master' && <AssignButton onClick={() => setAssignAgent(true)}>ASSIGN</AssignButton>}
                        <AcceptButton>ACCEPT</AcceptButton>
                        <RejectButton onClick={() => setRejectPopupOpen(true)}>REJECT</RejectButton>
                    </ActionsButtons>
                </ContentHeader>
                <GeneralBookingInfo>
                    <GeneralTitle>GENERAL INFO</GeneralTitle>
                    <GeneralBookingContent>
                        <GeneralShipType><img src={sea_icon} alt=""/></GeneralShipType>
                        <InfoRow margin_right='27px'>
                            <InfoRowLabel>ROUTE</InfoRowLabel>
                            <InfoRowValue font_size='36px'>SSZ <br/> BCN</InfoRowValue>
                        </InfoRow>
                        <ValuesShipmentWrapper>
                            <div style={{width: '25%', display: 'flex', flexDirection: 'column'}}>
                                <InfoRow >
                                    <InfoRowLabel>SHIPPING MODE</InfoRowLabel>
                                    <InfoRowValue>LCL</InfoRowValue>
                                </InfoRow>
                                <InfoRow >
                                    <InfoRowLabel>TRANSIT TIME</InfoRowLabel>
                                    <InfoRowValue>21 Days</InfoRowValue>
                                </InfoRow>
                            </div>
                            <div style={{width: '25%', display: 'flex', flexDirection: 'column'}}>
                                <InfoRow >
                                    <InfoRowLabel>DATES</InfoRowLabel>
                                    <InfoRowValue>
                                        ETD: 05/11 <br/>
                                        ETA: 25/11
                                    </InfoRowValue>
                                </InfoRow>
                                <InfoRow>
                                    <InfoRowLabel>DEADLINES</InfoRowLabel>
                                    <InfoRowValue>
                                        DOC: 04/11 12:00<br/>
                                        GARGA: 04/11 18:00
                                    </InfoRowValue>
                                </InfoRow>
                            </div>
                            <div style={{width: '25%', display: 'flex', flexDirection: 'column'}}>
                                <InfoRow>
                                    <InfoRowLabel>STATUS</InfoRowLabel>
                                    <InfoRowValue>05/11 21:00 <br/> BOOKING REQUEST IN PROGRESS</InfoRowValue>
                                </InfoRow>
                            </div>
                        </ValuesShipmentWrapper>
                    </GeneralBookingContent>
                </GeneralBookingInfo>
                <ShipmentInfoBlock />
                <HiddenInfoPart />
            </CardContent>
        </CardWrapper>
    )
}

export default BookingCard