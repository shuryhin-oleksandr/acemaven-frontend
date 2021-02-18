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
    GeneralShipType, InfoRow, InfoRowLabel, InfoRowValue, ValuesShipmentWrapper
} from "../../../../../../Requests/Booking_agent/booking_card/booking-card-style";
//icons
import sea_icon from "../../../../../../../assets/icons/rates&services/ship-surcharge.svg";
import air_icon from "../../../../../../../assets/icons/rates&services/plane-surcharge.svg";
import {AppCompaniesTypes} from "../../../../../../../../_BLL/types/commonTypes";
import {userCompaniesType} from "../../../../../../../../_BLL/types/authTypes";


type PropsType = {
    operation_info: OperationType,
    shipment: ShipmentDetailsType | null,
    company_type: userCompaniesType | undefined,
}

const GeneralBlockContainer: React.FC<PropsType> = ({operation_info, shipment, company_type}) => {
    return (
        <SectionWrapper>
            <SectionTitle>GENERAL INFO</SectionTitle>
            <GeneralBookingContent>
                <GeneralShipType>
                    <img src={operation_info?.shipping_type === "sea" ? sea_icon : air_icon} alt=""/>
                </GeneralShipType>
                <InfoRow margin_right="27px">
                    <InfoRowLabel>ROUTE</InfoRowLabel>
                    <InfoRowValue font_size="36px">
                        {operation_info?.freight_rate?.origin?.code}
                        <br/> {operation_info?.freight_rate?.destination?.code}
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
                            <InfoRowLabel>SHIPPING MODE</InfoRowLabel>
                            <InfoRowValue>{operation_info?.freight_rate?.shipping_mode?.title}</InfoRowValue>
                        </InfoRow>
                        <InfoRow>
                            <InfoRowLabel>CARRIER</InfoRowLabel>
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
                                    <InfoRowLabel>VESSEL</InfoRowLabel>
                                    <InfoRowValue>{shipment?.vessel}</InfoRowValue>
                                </InfoRow>
                                <InfoRow>
                                    <InfoRowLabel>TRIP</InfoRowLabel>
                                    <InfoRowValue>{shipment?.voyage}</InfoRowValue>
                                </InfoRow>
                            </div>
                            : <div style={{display: "flex", flexDirection: "column", marginRight: '46px'}}>
                                {company_type?.type === AppCompaniesTypes.AGENT &&
                                <InfoRow>
                                    <InfoRowLabel>MAWB</InfoRowLabel>
                                    <InfoRowValue>{shipment?.mawb}</InfoRowValue>
                                </InfoRow>
                                }

                                <InfoRow>
                                    <InfoRowLabel>FLIGHT NUMBER</InfoRowLabel>
                                    <InfoRowValue>{shipment?.flight_number}</InfoRowValue>
                                </InfoRow>
                            </div>
                        }
                        <div style={{display: "flex", flexDirection: "column"}}>
                            {shipment?.empty_pick_up_location &&
                            <InfoRow>
                                <InfoRowLabel>EMPTY PICKUP LOCATION</InfoRowLabel>
                                <InfoRowValue>
                                    <span style={{color: '#115B86'}}>location:</span> {shipment?.empty_pick_up_location},
                                    <br/> <span
                                    style={{color: '#115B86'}}>address:</span> {shipment?.empty_pick_up_location_address}
                                </InfoRowValue>
                            </InfoRow>
                            }
                            {shipment?.cargo_drop_off_location &&
                            <InfoRow>
                                <InfoRowLabel>CARGO DROP OFF LOCATION </InfoRowLabel>
                                <InfoRowValue>
                                    <span
                                        style={{color: '#115B86'}}>location:</span> {shipment?.cargo_drop_off_location},
                                    <br/> <span
                                    style={{color: '#115B86'}}>address:</span> {shipment?.cargo_drop_off_location_address}
                                </InfoRowValue>
                            </InfoRow>}
                            {shipment?.cargo_pick_up_location &&
                            <InfoRow>
                                <InfoRowLabel>CARGO PICK UP LOCATION </InfoRowLabel>
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