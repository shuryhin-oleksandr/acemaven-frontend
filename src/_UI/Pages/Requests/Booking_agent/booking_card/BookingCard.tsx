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
import air_icon from '../../../../assets/icons/rates&services/plane-surcharge.svg'
import {GeneralTitle} from "../../../quotes/agent/table/agent-quotes-styles";
import HiddenInfoPart from "./blocks/HiddenInfoPart";
import ShipmentInfoBlock from "./blocks/ShipmentInfoBlock";
import {BookingInfoType} from "../../../../../_BLL/types/bookingTypes";
import moment from 'moment';


type PropsType = {
    setAssignAgent: (value: boolean) => void,
    setRejectPopupOpen: (value:boolean) => void,
    openAcceptPopup: (value: boolean) => void,
    exact_booking_info: BookingInfoType | null
}

const BookingCard:React.FC<PropsType> = ({setAssignAgent, setRejectPopupOpen, openAcceptPopup, exact_booking_info}) => {

    let current_user_role = 'client'
    let local_time = moment(new Date()).format(' DD/MM  h:mm a');

    return (
        <CardWrapper>
            <CardContent>
                <ContentHeader>
                    <BookingInfo>
                        <BookingNumber>
                            Booking ????
                        </BookingNumber>
                        <BookingStatus>
                            <span style={{color: '#1ab8e5', marginRight: '5px'}}>STATUS</span> {local_time} {exact_booking_info?.status}
                        </BookingStatus>
                    </BookingInfo>
                    <ActionsButtons>
                        {current_user_role === 'master' && <AssignButton onClick={() => setAssignAgent(true)}>ASSIGN</AssignButton>}
                        <AcceptButton onClick={() => openAcceptPopup(true)}>ACCEPT</AcceptButton>
                        <RejectButton onClick={() => setRejectPopupOpen(true)}>REJECT</RejectButton>
                    </ActionsButtons>
                </ContentHeader>
                <GeneralBookingInfo>
                    <GeneralTitle>GENERAL INFO</GeneralTitle>
                    <GeneralBookingContent>
                        <GeneralShipType><img src={exact_booking_info?.shipping_type === 'sea' ? sea_icon : air_icon} alt=""/></GeneralShipType>
                        <InfoRow margin_right='27px'>
                            <InfoRowLabel>ROUTE</InfoRowLabel>
                            <InfoRowValue font_size='36px'>
                                {exact_booking_info?.freight_rate.origin.code}
                            <br/> {exact_booking_info?.freight_rate.destination.code}
                            </InfoRowValue>
                        </InfoRow>
                        <ValuesShipmentWrapper>
                            <div style={{width: '25%', display: 'flex', flexDirection: 'column'}}>
                                <InfoRow >
                                    <InfoRowLabel>SHIPPING MODE</InfoRowLabel>
                                    <InfoRowValue>{exact_booking_info?.freight_rate.shipping_mode.title}</InfoRowValue>
                                </InfoRow>
                                <InfoRow >
                                    <InfoRowLabel>TRANSIT TIME</InfoRowLabel>
                                    <InfoRowValue>{exact_booking_info?.freight_rate.transit_time
                                        ? `${exact_booking_info?.freight_rate.transit_time} days `
                                        : '0 days'}
                                    </InfoRowValue>
                                </InfoRow>
                            </div>
                            <div style={{width: '25%', display: 'flex', flexDirection: 'column'}}>
                                <InfoRow >
                                    <InfoRowLabel>DATES</InfoRowLabel>
                                    <InfoRowValue>
                                        ETD: {exact_booking_info?.date_from} <br/>
                                        ETA: {exact_booking_info?.date_to}
                                    </InfoRowValue>
                                </InfoRow>
                                <InfoRow>
                                    <InfoRowLabel>???DEADLINES???</InfoRowLabel>
                                    <InfoRowValue>
                                        DOC: 04/11 12:00<br/>
                                        GARGA: 04/11 18:00
                                    </InfoRowValue>
                                </InfoRow>
                            </div>
                            <div style={{width: '25%', display: 'flex', flexDirection: 'column'}}>
                                <InfoRow>
                                    <InfoRowLabel>STATUS</InfoRowLabel>
                                    <InfoRowValue>{local_time}<br/> {exact_booking_info?.status}</InfoRowValue>
                                </InfoRow>
                            </div>
                        </ValuesShipmentWrapper>
                    </GeneralBookingContent>
                </GeneralBookingInfo>
                <ShipmentInfoBlock shipper={exact_booking_info?.shipper ? exact_booking_info?.shipper : null}
                                   client={String(exact_booking_info?.client)}
                                   client_contact={String(exact_booking_info?.client_contact_person)}
                                   date_from={String(exact_booking_info?.date_from)}
                                   date_to={String(exact_booking_info?.date_to)}
                                   week_range={exact_booking_info?.week_range ? exact_booking_info?.week_range : null}
                />
                <HiddenInfoPart cargo_groups={exact_booking_info?.cargo_groups ? exact_booking_info.cargo_groups : []}
                                number_of_documents={Number(exact_booking_info?.number_of_documents)}
                                release_type={exact_booking_info?.release_type}
                                charges_cost={exact_booking_info?.charges ? exact_booking_info?.charges : null}
                />
            </CardContent>
        </CardWrapper>
    )
}

export default BookingCard