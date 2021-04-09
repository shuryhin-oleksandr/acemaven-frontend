import React from 'react'
//moment js
import moment from 'moment';
//react-redux
import {useSelector} from "react-redux";
//material ui
import {IconButton} from "@material-ui/core";
//BLL
import {AppStateType} from "../../../../../_BLL/store";
//types
import {BookingInfoType} from "../../../../../_BLL/types/bookingTypes";
import {VoidFunctionType} from "../../../../../_BLL/types/commonTypes";
//components
import HiddenInfoPart from "./blocks/HiddenInfoPart";
import ShipmentInfoBlock from "./blocks/ShipmentInfoBlock";
import SpinnerForAuthorizedPages from "../../../../components/_commonComponents/spinner/SpinnerForAuthorizedPages";
//styles
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
    InfoRowLabel, InfoRowValue, ValuesShipmentWrapper, RouteName,
} from "./booking-card-style";
import {GeneralTitle} from "../../../quotes/agent/table/agent-quotes-styles";
//icons
import sea_icon from '../../../../../_UI/assets/icons/big-ship-icon-for-general.svg'
import air_icon from '../../../../assets/icons/big-plane-icon-for-general.svg'
import close_icon from '../../../../assets/icons/close-icon.svg'
import {useTranslation} from "react-i18next";



type PropsType = {
    setAssignAgent: (value: boolean) => void,
    setRejectPopupOpen: (value: boolean) => void,
    acceptBookingOnMe: VoidFunctionType,
    exact_booking_info: BookingInfoType | null,
    history: any,
    isFetching: boolean
}

const BookingCard: React.FC<PropsType> = ({setAssignAgent, setRejectPopupOpen, acceptBookingOnMe, exact_booking_info, history, isFetching}) => {

    let current_user = useSelector((state: AppStateType) => state.profile.authUserInfo)
    let current_role = current_user?.roles?.includes(('master'))
    let local_time = moment(new Date()).format(' DD/MM  h:mm a');
    const {t} = useTranslation();
      return (
        <>
            {isFetching || !exact_booking_info
                ? <SpinnerForAuthorizedPages/>
                : <CardWrapper>
                    <CardContent>
                        <IconButton style={{position: 'absolute', top: '10px', right: '30px'}}
                                    onClick={() => history.push('/requests/booking')}>
                            <img src={close_icon} alt="" style={{width: '15px'}}/>
                        </IconButton>
                        <ContentHeader>
                            <BookingInfo>
                                <BookingNumber>
                                    {t("Bookings/Booking")} {exact_booking_info?.aceid}
                                </BookingNumber>
                                <BookingStatus>
                                <span style={{
                                    color: '#1ab8e5',
                                    marginRight: '5px'
                                }}>{t("Bookings/STATUS")}</span>
                                    <span style={{
                                        fontSize: '18px',
                                        textTransform: 'lowercase'
                                    }}>
                                      {local_time}
                                  </span>
                                    {' '}
                                    <span style={{textTransform: 'uppercase'}}>
                                    {t(`Statuses/${exact_booking_info?.status}`)}
                                  </span>
                                </BookingStatus>
                            </BookingInfo>
                            <ActionsButtons>
                                {!exact_booking_info?.is_assigned && current_role &&
                                <AssignButton onClick={() => setAssignAgent(true)}>{t("Bookings/ASSIGN")}</AssignButton>}
                                <AcceptButton onClick={acceptBookingOnMe}>{t("Bookings/ACCEPT")}</AcceptButton>
                                <RejectButton onClick={() => setRejectPopupOpen(true)}>{t("Bookings/REJECT")}</RejectButton>
                            </ActionsButtons>
                        </ContentHeader>
                        <GeneralBookingInfo>
                            <GeneralTitle>{t("Bookings/GENERAL INFO")}</GeneralTitle>
                            <GeneralBookingContent>
                                <GeneralShipType margin_top={"3px"}><img
                                    src={exact_booking_info?.shipping_type === 'sea' ? sea_icon : air_icon}
                                    alt=""/></GeneralShipType>
                                <InfoRow margin_right='28px'>
                                    <InfoRowLabel>{t("Bookings/ROUTE")}</InfoRowLabel>
                                    <InfoRowValue style={{fontFamily:"Helvetica Thin, sans-serif"}}>
                                        <RouteName>{exact_booking_info?.freight_rate.origin.code}</RouteName>
                                        <RouteName>{exact_booking_info?.freight_rate.destination.code}</RouteName>
                                    </InfoRowValue>
                                </InfoRow>
                                <ValuesShipmentWrapper>
                                    <div style={{marginRight:80, display: 'flex', flexDirection: 'column'}}>
                                        <InfoRow>
                                            <InfoRowLabel>{t("Bookings/SHIPPING MODE")}</InfoRowLabel>
                                            <InfoRowValue>{exact_booking_info?.freight_rate.shipping_mode.title}</InfoRowValue>
                                        </InfoRow>
                                        <InfoRow>
                                            <InfoRowLabel>{t("Bookings/TRANSIT TIME")}</InfoRowLabel>
                                            <InfoRowValue>{exact_booking_info?.freight_rate.transit_time
                                                ? `${exact_booking_info?.freight_rate.transit_time} days `
                                                : '0 days'}
                                            </InfoRowValue>
                                        </InfoRow>
                                    </div>
                                    <div style={{marginRight:80, display: 'flex', flexDirection: 'column'}}>
                                        <InfoRow>
                                            <InfoRowLabel>{t("Bookings/STATUS")}</InfoRowLabel>
                                            <InfoRowValue>{local_time}<br/>
                                                <span style={{textTransform: 'uppercase',}}>
                                                {t(`Statuses/${exact_booking_info?.status}`)}
                                            </span>
                                            </InfoRowValue>
                                        </InfoRow>
                                    </div>
                                </ValuesShipmentWrapper>
                            </GeneralBookingContent>
                        </GeneralBookingInfo>
                        <ShipmentInfoBlock shipper={exact_booking_info?.shipper ? exact_booking_info?.shipper : null}
                                           client={String(exact_booking_info?.client)}
                                           client_contact={String(exact_booking_info?.client_contact_person)}
                                           exact_booking_info={exact_booking_info}
                        />
                        <HiddenInfoPart
                            cargo_groups={exact_booking_info?.cargo_groups ? exact_booking_info.cargo_groups : []}
                            number_of_documents={Number(exact_booking_info?.number_of_documents)}
                            release_type={exact_booking_info?.release_type}
                            charges_cost={exact_booking_info?.charges ? exact_booking_info?.charges : null}
                            booking_shipping_mode={exact_booking_info?.freight_rate.shipping_mode}
                        />
                    </CardContent>
                </CardWrapper>
            }
        </>
    )
}

export default BookingCard