import React from 'react'
//moment js
import moment from "moment";
//types
import {
    AppOperationBookingStatusesType,
    OperationType,
    ShipmentDetailsType
} from "../../../../../../../../_BLL/types/operations/operationsTypes";
//styles
import {
    CalendarIcon,
    GeneralBookingContent,
    InfoRow,
    InfoRowLabel,
    InfoRowValue
} from "../../../../../../Requests/Booking_agent/booking_card/booking-card-style";
import {SectionTitle, SectionWrapper} from "../../operation-card-style";
//icons
import calendar_icon from "../../../../../../../assets/icons/date_1.svg";
import {useTranslation} from "react-i18next";


type PropsType = {
    shipment: ShipmentDetailsType | null,
    operation_info: OperationType
}

const ConfirmedDatesContainerBlock: React.FC<PropsType> = ({shipment, operation_info}) => {

    //refactoring dates
    let a = moment(operation_info?.date_from, 'DD/MM/YYYY').toDate()
    let date_from = moment(a).format('DD/MM')
    let c = moment(operation_info?.date_to, 'DD/MM/YYYY').toDate()
    let date_to = moment(c).format('DD/MM')

    const {t} = useTranslation();
    return (
        <SectionWrapper>
            <SectionTitle>{t("Bookings/DATES")}</SectionTitle>
            <GeneralBookingContent>
                <div style={{display: "flex"}}>
                    <CalendarIcon style={{width: "87px", height: "96px"}}>
                        <img src={calendar_icon} alt=""/>
                    </CalendarIcon>
                    <InfoRow margin_right="50px" margin_bottom="0px">
                        <InfoRowLabel>{t("Quotes/SHIPMENT DATE")}</InfoRowLabel>
                        <span style={{
                            fontSize: "24px",
                            color: "black",
                            fontFamily: "Helvetica Light",
                            marginBottom: "5px",
                        }}>
                  {(operation_info?.week_range?.week_from !== operation_info?.week_range?.week_to)
                      ? `${t("Bookings/WEEK")} ${operation_info?.week_range?.week_from} - ${operation_info?.week_range?.week_to}`
                      : `${t("Bookings/WEEK")} ${operation_info?.week_range?.week_from}`
                  }
                </span>
                        <InfoRowValue>{date_from} - {date_to}</InfoRowValue>
                    </InfoRow>
                </div>

                {(operation_info?.status === AppOperationBookingStatusesType.CONFIRMED ||
                    operation_info?.status === AppOperationBookingStatusesType.CHANGE_REQUEST ||
                    operation_info?.status === AppOperationBookingStatusesType.CONFIRMED_CHANGE_REQUEST ||
                    operation_info?.status === AppOperationBookingStatusesType.SHIPMENT_IN_PROGRESS ||
                    operation_info?.status === AppOperationBookingStatusesType.AWAITING_PAYMENT
                ) &&
                <>
                    <div style={{display: "flex", flexDirection: "column", marginRight: '26px'}}>
                        {shipment?.date_of_departure && <InfoRow>
                            <InfoRowLabel>{t("Bookings/ESTIMATED TIME OF DEPARTURE")}</InfoRowLabel>
                            <InfoRowValue>{shipment?.date_of_departure}</InfoRowValue>
                        </InfoRow>}
                        {shipment?.date_of_arrival &&
                        <InfoRow>
                            <InfoRowLabel>{t("Bookings/ESTIMATED TIME OF ARRIVAL")}</InfoRowLabel>
                            <InfoRowValue>{shipment?.date_of_arrival}</InfoRowValue>
                        </InfoRow>
                        }
                    </div>
                    {shipment?.cargo_cut_off_date &&
                    <div style={{display: "flex", flexDirection: "column", marginRight: '26px'}}>
                        <InfoRow>
                            <InfoRowLabel>{t("Bookings/DOCUMENTS CUT OFF")} </InfoRowLabel>
                            <InfoRowValue>{shipment?.document_cut_off_date}</InfoRowValue>
                        </InfoRow>
                        <InfoRow>
                            <InfoRowLabel>{t("Bookings/CARGO CUT OFF")} </InfoRowLabel>
                            <InfoRowValue>{shipment?.cargo_cut_off_date}</InfoRowValue>
                        </InfoRow>
                    </div>
                    }
                    <div style={{width: "20%", display: "flex", flexDirection: "column",}}>
                        {shipment?.actual_date_of_departure && <InfoRow>
                            <InfoRowLabel>{t("Bookings/ACTUAL TIME OF DEPARTURE")}</InfoRowLabel>
                            <InfoRowValue>{shipment?.actual_date_of_departure}</InfoRowValue>
                        </InfoRow>
                        }
                        {shipment?.actual_date_of_arrival && <InfoRow>
                            <InfoRowLabel>{t("Bookings/ACTUAL TIME OF ARRIVAL")}</InfoRowLabel>
                            <InfoRowValue>{shipment?.actual_date_of_arrival}</InfoRowValue>
                        </InfoRow>}
                    </div>
                </>
                }
            </GeneralBookingContent>
        </SectionWrapper>
    )
}

export default ConfirmedDatesContainerBlock



