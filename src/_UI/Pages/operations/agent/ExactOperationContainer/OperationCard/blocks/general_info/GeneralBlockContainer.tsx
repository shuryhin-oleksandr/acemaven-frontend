import React, {useEffect, useState} from 'react'
import {SectionTitle, SectionWrapper} from "../../operation-card-style";
import {
    GeneralBookingContent,
    GeneralShipType, InfoRow, InfoRowLabel, InfoRowValue, ValuesShipmentWrapper
} from "../../../../../../Requests/Booking_agent/booking_card/booking-card-style";
import sea_icon from "../../../../../../../assets/icons/rates&services/ship-surcharge.svg";
import air_icon from "../../../../../../../assets/icons/rates&services/plane-surcharge.svg";
import {OperationType, ShipmentDetailsType} from "../../../../../../../../_BLL/types/operations/operationsTypes";
import GeneralBlockEditForm from "./GeneralBlockEditForm";
import { IconButton } from '@material-ui/core';
import edit_icon from '../../../../../../../assets/icons/profile/editCard.svg'
import {useDispatch, useSelector} from "react-redux";
import {getEditOperationSuccessSelector} from "../../../../../../../../_BLL/selectors/operations/agentOperationsSelector";
import {agentOperationsActions} from "../../../../../../../../_BLL/reducers/operations/agent/agentOperationsReducer";


type PropsType = {
    operation_info: OperationType,
    shipment: ShipmentDetailsType | null
}

const GeneralBlockContainer:React.FC<PropsType> = ({operation_info, shipment}) => {

    const [isEdit, setIsEdit] = useState(false)

    let edit_success = useSelector(getEditOperationSuccessSelector)
    const dispatch = useDispatch()

    useEffect(() => {
        if(edit_success) {
            setIsEdit(false)
            dispatch(agentOperationsActions.setEditSuccess(''))
        }
    }, [edit_success])

    return (
        <SectionWrapper>
            {operation_info?.status === "Booking Confirmed" && (
                !isEdit && <IconButton onClick={() => setIsEdit(true)} style={{position: 'absolute', right: 0}}>
                <img src={edit_icon} alt=""/>
                </IconButton>
            )}

                <SectionTitle>GENERAL INFO</SectionTitle>
            {isEdit
                ? <GeneralBlockEditForm operation_info={operation_info}
                                        shipment={shipment ? shipment : null}
                                        setIsEdit={setIsEdit}
                />
                : <GeneralBookingContent>
                    <GeneralShipType>
                        <img src={operation_info?.shipping_type === "sea" ? sea_icon : air_icon} alt="" />
                    </GeneralShipType>
                    <InfoRow margin_right="27px">
                        <InfoRowLabel>ROUTE</InfoRowLabel>
                        <InfoRowValue font_size="36px">
                            {operation_info?.freight_rate?.origin?.code}
                            <br /> {operation_info?.freight_rate?.destination?.code}
                        </InfoRowValue>
                    </InfoRow>
                    <ValuesShipmentWrapper>
                        <div
                            style={{
                                marginRight:'35px',
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
                        {operation_info?.status === "Booking Confirmed" &&
                        <>
                            {shipment?.vessel
                                ? <div style={{ display: "flex", flexDirection: "column", marginRight:'26px'}}>
                                    <InfoRow>
                                        <InfoRowLabel>VESSEL</InfoRowLabel>
                                        <InfoRowValue>{shipment?.vessel}</InfoRowValue>
                                    </InfoRow>
                                    <InfoRow>
                                        <InfoRowLabel>TRIP</InfoRowLabel>
                                        <InfoRowValue>{shipment?.voyage}</InfoRowValue>
                                    </InfoRow>
                                </div>
                                : <div style={{display: "flex", flexDirection: "column", marginRight:'26px'}}>
                                    <InfoRow>
                                        <InfoRowLabel>MAWB</InfoRowLabel>
                                        <InfoRowValue>{shipment?.mawb}</InfoRowValue>
                                    </InfoRow>
                                    <InfoRow>
                                        <InfoRowLabel>FLIGHT NUMBER</InfoRowLabel>
                                        <InfoRowValue>{shipment?.flight_number}</InfoRowValue>
                                    </InfoRow>
                                </div>
                            }
                            <div style={{width: "25%", display: "flex", flexDirection: "column"}}>
                                {shipment?.empty_pick_up_location &&
                                <InfoRow>
                                    <InfoRowLabel>Empty Pickup Location</InfoRowLabel>
                                    <InfoRowValue>
                                        terminal: {shipment?.empty_pick_up_location}, airport: {shipment?.empty_pick_up_location_address}
                                    </InfoRowValue>
                                </InfoRow>
                                }
                                {shipment?.cargo_drop_off_location &&
                                <InfoRow>
                                    <InfoRowLabel>Cargo Drop Off Location </InfoRowLabel>
                                    <InfoRowValue>
                                        terminal: {shipment?.cargo_drop_off_location}, airport: {shipment?.cargo_drop_off_location_address}
                                    </InfoRowValue>
                                </InfoRow>}

                            </div>
                        </>
                        }
                    </ValuesShipmentWrapper>
                </GeneralBookingContent>
            }
        </SectionWrapper>
    )
}

export default GeneralBlockContainer