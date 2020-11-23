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
    InfoRowLabel, InfoRowValue, ValuesShipmentWrapper, CalendarIcon
} from "./booking-card-style";
import sea_icon from '../../../../../_UI/assets/icons/rates&services/ship-surcharge.svg'
import air_icon from '../../../../assets/icons/rates&services/plane-surcharge.svg'
import {GeneralTitle} from "../../../quotes/agent/table/agent-quotes-styles";
import HiddenInfoPart from "./blocks/HiddenInfoPart";
import ShipmentInfoBlock from "./blocks/ShipmentInfoBlock";
import {BookingInfoType} from "../../../../../_BLL/types/bookingTypes";
import moment from 'moment';
import {useSelector} from "react-redux";
import {AppStateType} from "../../../../../_BLL/store";
import {IconButton} from "@material-ui/core";
import close_icon from '../../../../assets/icons/close-icon.svg'
import calendar_icon from "../../../../assets/icons/date_1.svg";


type PropsType = {
    setAssignAgent: (value: boolean) => void,
    setRejectPopupOpen: (value:boolean) => void,
    openAcceptPopup: (value: boolean) => void,
    exact_booking_info: BookingInfoType | null,
    history: any
}

const BookingCard:React.FC<PropsType> = ({setAssignAgent, setRejectPopupOpen, openAcceptPopup, exact_booking_info, history}) => {

    let current_user = useSelector((state: AppStateType) => state.profile.authUserInfo)
    let current_role = current_user?.roles?.includes(('master'))
    let local_time = moment(new Date()).format(' DD/MM  h:mm a');

    return (
        <CardWrapper>
            <CardContent>
                <IconButton style={{position: 'absolute', top: '10px', right: '30px'}} onClick={() => history.push('/requests/booking')}>
                    <img src={close_icon} alt="" style={{width: '15px'}}/>
                </IconButton>
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
                        { !exact_booking_info?.is_assigned && current_role && <AssignButton onClick={() => setAssignAgent(true)}>ASSIGN</AssignButton>}
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
                            <div style={{display: 'flex'}}>
                                <CalendarIcon style={{width: '87px', height: '96px'}}>
                                    <img src={calendar_icon} alt=""/>
                                </CalendarIcon>
                                <InfoRow margin_right='50px' margin_bottom='0px'>
                            <span style={{width: '100px', fontSize:'24px', color:'black',
                                fontFamily:'Helvetica Light', marginTop: '15px', marginBottom: '13px'}}>
                                {exact_booking_info?.week_range?.week_from === exact_booking_info?.week_range?.week_to
                                    ? `WEEK ${exact_booking_info?.week_range?.week_from}`
                                    : `WEEK ${exact_booking_info?.week_range?.week_from && exact_booking_info?.week_range?.week_from - exact_booking_info?.week_range?.week_to && exact_booking_info?.week_range?.week_to}`
                                }
                            </span>
                                    <InfoRowValue>{exact_booking_info?.date_from} - {exact_booking_info?.date_to}</InfoRowValue>
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