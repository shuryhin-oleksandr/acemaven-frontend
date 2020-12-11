import React from 'react'
import {
    CalendarIcon,
    GeneralBookingContent,
    InfoRow,
    InfoRowLabel,
    InfoRowValue
} from "../../../../../../Requests/Booking_agent/booking_card/booking-card-style";
import {OperationType, ShipmentDetailsType} from "../../../../../../../../_BLL/types/operations/operationsTypes";
import {SectionTitle, SectionWrapper} from "../../operation-card-style";
import calendar_icon from "../../../../../../../assets/icons/date_1.svg";
import moment from "moment";


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


    return (
            <SectionWrapper>
                <SectionTitle>DATES</SectionTitle>
                <GeneralBookingContent>
                    <div style={{display: "flex"}}>
                        <CalendarIcon style={{width: "87px", height: "96px"}}>
                            <img src={calendar_icon} alt=""/>
                        </CalendarIcon>
                        <InfoRow margin_right="50px" margin_bottom="0px">
                            <InfoRowLabel>SHIPMENT DATE</InfoRowLabel>
                            <span style={{
                                width: "150px",
                                fontSize: "24px",
                                color: "black",
                                fontFamily: "Helvetica Light",
                                marginBottom: "5px",
                            }}>
                  {(operation_info?.week_range?.week_from !== operation_info?.week_range?.week_to)
                      ? `WEEK ${operation_info?.week_range?.week_from} - ${operation_info?.week_range?.week_to}`
                      : `WEEK ${operation_info?.week_range?.week_from}`
                  }
                </span>
                            <InfoRowValue>{date_from} - {date_to}</InfoRowValue>
                        </InfoRow>
                    </div>

                    {operation_info?.status === "Booking Confirmed" &&
                    <>
                        <div style={{display: "flex", flexDirection: "column", marginRight: '26px'}}>
                            <InfoRow>
                                <InfoRowLabel>ESTIMATED TIME OF DEPARTURE</InfoRowLabel>
                                <InfoRowValue>{shipment?.date_of_departure}</InfoRowValue>
                            </InfoRow>
                            <InfoRow>
                                <InfoRowLabel>ESTIMATED TIME OF ARRIVAL</InfoRowLabel>
                                <InfoRowValue>{shipment?.date_of_arrival}</InfoRowValue>
                            </InfoRow>
                        </div>
                        {shipment?.cargo_cut_off_date &&
                        <div style={{display: "flex", flexDirection: "column", marginRight: '26px'}}>
                            <InfoRow>
                                <InfoRowLabel>DOCUMENTS CUT OFF </InfoRowLabel>
                                <InfoRowValue>{shipment?.document_cut_off_date}</InfoRowValue>
                            </InfoRow>
                            <InfoRow>
                                <InfoRowLabel>CARGO CUT OFF </InfoRowLabel>
                                <InfoRowValue>{shipment?.cargo_cut_off_date}</InfoRowValue>
                            </InfoRow>
                        </div>
                        }
                        {/*<div style={{width: "20%", display: "flex", flexDirection: "column",}}>
                <InfoRow>
                  <InfoRowLabel>ACTUAL TIME OF DEPARTURE</InfoRowLabel>
                  <InfoRowValue>17 APR 2020, 12:00</InfoRowValue>
                </InfoRow>
                <InfoRow>
                  <InfoRowLabel>ACTUAL TIME OF ARRIVAL</InfoRowLabel>
                  <InfoRowValue>17 APR 2020, 12:00</InfoRowValue>
                </InfoRow>
              </div>*/}
                    </>
                    }
                </GeneralBookingContent>
            </SectionWrapper>
    )
}

export default ConfirmedDatesContainerBlock