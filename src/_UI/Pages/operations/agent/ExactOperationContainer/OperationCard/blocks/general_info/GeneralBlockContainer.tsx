import React from 'react'
//types
import {
    AppOperationBookingStatusesType,
    OperationType,
    ShipmentDetailsType
} from "../../../../../../../../_BLL/types/operations/operationsTypes";
//styles
import {SectionTitle, SectionWrapper} from "../../operation-card-style";
import {
    GeneralBookingContent,
    GeneralShipType, InfoRow, InfoRowLabel, InfoRowValue, RouteName, ValuesShipmentWrapper
} from "../../../../../../Requests/Booking_agent/booking_card/booking-card-style";
//icons
import sea_icon from "../../../../../../../assets/icons/big-ship-icon-for-general.svg";
import air_icon from "../../../../../../../assets/icons/big-plane-icon-for-general.svg";
import {AppCompaniesTypes} from "../../../../../../../../_BLL/types/commonTypes";
import {userCompaniesType} from "../../../../../../../../_BLL/types/authTypes";
import {useTranslation} from "react-i18next";


type PropsType = {
    operation_info: OperationType,
    shipment: ShipmentDetailsType | null,
    company_type: userCompaniesType | undefined,
}

const GeneralBlockContainer: React.FC<PropsType> = ({operation_info, shipment, company_type}) => {
    const {t} = useTranslation();
    return (
        <SectionWrapper>
            <SectionTitle>{t("Bookings/GENERAL INFO")}</SectionTitle>
            <GeneralBookingContent>
                <GeneralShipType margin_top="0">
                    <img src={operation_info?.shipping_type === "sea" ? sea_icon : air_icon} alt=""/>
                </GeneralShipType>
                <InfoRow margin_right="27px">
                    <InfoRowLabel>{t("Bookings/ROUTE")}</InfoRowLabel>
                    <InfoRowValue>
                        <RouteName>{operation_info?.freight_rate?.origin?.code}</RouteName>
                        <RouteName>{operation_info?.freight_rate?.destination?.code}</RouteName>
                    </InfoRowValue>
                </InfoRow>
                <ValuesShipmentWrapper>
                    <div
                        style={{
                            marginRight: '35px',
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        <InfoRow>
                            <InfoRowLabel>{t("Bookings/SHIPPING MODE")}</InfoRowLabel>
                            <InfoRowValue>{operation_info?.freight_rate?.shipping_mode?.title}</InfoRowValue>
                        </InfoRow>
                        <InfoRow>
                            <InfoRowLabel>{t("Quote bid screen/CARRIER")}</InfoRowLabel>
                            <InfoRowValue>
                                {operation_info?.freight_rate?.carrier?.title}
                            </InfoRowValue>
                        </InfoRow>
                    </div>
                    {(operation_info?.status === AppOperationBookingStatusesType.CONFIRMED ||
                        operation_info?.status === AppOperationBookingStatusesType.CHANGE_REQUEST ||
                        operation_info?.status === AppOperationBookingStatusesType.CONFIRMED_CHANGE_REQUEST ||
                        operation_info?.status === AppOperationBookingStatusesType.SHIPMENT_IN_PROGRESS ||
                        operation_info?.status === AppOperationBookingStatusesType.AWAITING_PAYMENT
                    ) &&
                    <>
                        {shipment?.vessel
                            ? <div style={{display: "flex", flexDirection: "column", marginRight: '46px'}}>
                                <InfoRow>
                                    <InfoRowLabel>{t("Booking Confirmation/Vessel")}</InfoRowLabel>
                                    <InfoRowValue>{shipment?.vessel}</InfoRowValue>
                                </InfoRow>
                                <InfoRow>
                                    <InfoRowLabel>{t("Bookings/TRIP")}</InfoRowLabel>
                                    <InfoRowValue>{shipment?.voyage}</InfoRowValue>
                                </InfoRow>
                            </div>
                            : <div style={{display: "flex", flexDirection: "column", marginRight: '46px'}}>
                                {company_type?.type === AppCompaniesTypes.AGENT &&
                                <InfoRow>
                                    <InfoRowLabel>{t("Booking Confirmation/MAWB")}</InfoRowLabel>
                                    <InfoRowValue>{shipment?.mawb}</InfoRowValue>
                                </InfoRow>
                                }

                                <InfoRow>
                                    <InfoRowLabel>{t("Bookings/Flight Number")}</InfoRowLabel>
                                    <InfoRowValue>{shipment?.flight_number}</InfoRowValue>
                                </InfoRow>
                            </div>
                        }
                        <div style={{display: "flex", flexDirection: "column"}}>
                            {shipment?.empty_pick_up_location &&
                            <InfoRow>
                                <InfoRowLabel>{t("Booking Confirmation/Empty Pickup Location")}</InfoRowLabel>
                                <InfoRowValue>
                                    <span style={{color: '#115B86'}}>location:</span> {shipment?.empty_pick_up_location},
                                    <br/> <span
                                    style={{color: '#115B86'}}>address:</span> {shipment?.empty_pick_up_location_address}
                                </InfoRowValue>
                            </InfoRow>
                            }
                            {shipment?.cargo_drop_off_location &&
                            <InfoRow>
                                <InfoRowLabel>{t("Booking Confirmation/Cargo Drop Off Location")}</InfoRowLabel>
                                <InfoRowValue>
                                    <span
                                        style={{color: '#115B86'}}>location:</span> {shipment?.cargo_drop_off_location},
                                    <br/> <span
                                    style={{color: '#115B86'}}>address:</span> {shipment?.cargo_drop_off_location_address}
                                </InfoRowValue>
                            </InfoRow>}
                            {shipment?.cargo_pick_up_location &&
                            <InfoRow>
                                <InfoRowLabel>{t("Booking Confirmation/Empty Pickup Location")}</InfoRowLabel>
                                <InfoRowValue>
                                    <span
                                        style={{color: '#115B86'}}>location:</span> {shipment?.cargo_pick_up_location},
                                    <br/> <span
                                    style={{color: '#115B86'}}>address:</span> {shipment?.cargo_pick_up_location_address}
                                </InfoRowValue>
                            </InfoRow>}

                        </div>
                    </>
                    }
                </ValuesShipmentWrapper>
            </GeneralBookingContent>

        </SectionWrapper>
    )
}

export default GeneralBlockContainer