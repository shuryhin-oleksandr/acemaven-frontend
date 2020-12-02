import React, {useEffect} from 'react'
import {
    EditButtonsWrapper,
    FormOperationButton,
    GeneralBookingContent, GeneralBookingContentForm,
    GeneralShipType,
    InfoRow,
    InfoRowLabel, InfoRowValue, ValuesShipmentWrapper
} from "../../../../../../Requests/Booking_agent/booking_card/booking-card-style";
import sea_icon from "../../../../../../../assets/icons/rates&services/ship-surcharge.svg";
import air_icon from "../../../../../../../assets/icons/rates&services/plane-surcharge.svg";
import {useForm} from "react-hook-form";
import {OperationType, ShipmentDetailsType} from "../../../../../../../../_BLL/types/operations/operationsTypes";
import FormField from "../../../../../../../components/_commonComponents/Input/FormField";
import save_icon from "../../../../../../../assets/icons/profile/add.svg";
import close_icon from "../../../../../../../assets/icons/profile/closeForm.svg";
import LocationBlock from "../../../../../../../components/PopUps/accept_booking_popup/LocationBlock";
import {useDispatch} from "react-redux";
import {editOperationByAgentThunk} from "../../../../../../../../_BLL/thunks/operations/agent/OperationsAgentThunk";

type PropsType = {
    operation_info: OperationType,
    shipment: ShipmentDetailsType | null,
    setIsEdit: (value: boolean) => void
}

const GeneralBlockEditForm:React.FC<PropsType> = ({operation_info, shipment, setIsEdit}) => {

    const dispatch = useDispatch()

    const {register, errors, setValue, handleSubmit} = useForm()
    const onSubmit = (values: any) => {
        dispatch(editOperationByAgentThunk(values, shipment?.id as number))
    }

    useEffect(() => {
        if(shipment) {
            Object.keys(shipment).forEach((key: string) => {
                setValue(key, shipment[key])
            })
        }
    }, [shipment])


    return (
        <GeneralBookingContentForm onSubmit={handleSubmit(onSubmit)}>
            <EditButtonsWrapper>
                <FormOperationButton type='button' onClick={() => setIsEdit(false)} style={{padding: '5px'}}>
                    <img src={close_icon} alt=""/>
                </FormOperationButton>
                 <FormOperationButton type='submit' style={{padding: '5px'}}>
                    <img src={save_icon} alt=""/>
                 </FormOperationButton>
            </EditButtonsWrapper>
                <GeneralBookingContent>
                    <GeneralShipType>
                        <img src={operation_info?.shipping_type === "sea" ? sea_icon : air_icon} alt="" />
                    </GeneralShipType>
                <InfoRow margin_right="27px">
                    <InfoRowLabel>ROUTE</InfoRowLabel>
                    <InfoRowValue font_size="36px">
                        {operation_info?.freight_rate.origin.code}
                        <br /> {operation_info?.freight_rate.destination.code}
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
                        <InfoRow margin_bottom='25px'>
                            <InfoRowLabel>SHIPPING MODE</InfoRowLabel>
                            <InfoRowValue>{operation_info?.freight_rate.shipping_mode.title}</InfoRowValue>
                        </InfoRow>
                        <InfoRow margin_bottom='30px'>
                            <InfoRowLabel>CARRIER</InfoRowLabel>
                            <InfoRowValue>
                                {operation_info?.freight_rate.carrier.title}
                            </InfoRowValue>
                        </InfoRow>
                    </div>
                    {operation_info?.status === "Booking Confirmed" &&
                    <>
                        {shipment?.vessel
                            ? <div style={{ display: "flex", flexDirection: "column", marginRight:'26px'}}>
                                <InfoRow margin_bottom='5px'>
                                    <InfoRowLabel>VESSEL</InfoRowLabel>
                                    <FormField name='vessel'
                                               inputRef={register({
                                                   required: 'Field is required'
                                               })}
                                               error={errors?.shipment_details?.vessel}
                                               placeholder='Vessel'
                                               marginBottom='0px'
                                               defaultValue={shipment.vessel}
                                    />
                                </InfoRow>
                                <InfoRow>
                                    <InfoRowLabel>TRIP</InfoRowLabel>
                                    <FormField name='voyage'
                                               inputRef={register({
                                                   required: 'Field is required'
                                               })}
                                               error={errors?.shipment_details?.voyage}
                                               placeholder='Trip'
                                               marginBottom='0px'
                                               defaultValue={shipment.voyage}
                                    />
                                </InfoRow>
                            </div>
                            : <div style={{display: "flex", flexDirection: "column", marginRight:'26px'}}>
                                <InfoRow>
                                    <InfoRowLabel>MAWB</InfoRowLabel>
                                    <FormField name='mawb'
                                               inputRef={register({
                                                   required: 'Field is required'
                                               })}
                                               error={errors?.shipment_details?.mawb}
                                               placeholder='MAWB'
                                               marginBottom='0px'
                                               defaultValue={shipment?.mawb}
                                    />
                                </InfoRow>
                                <InfoRow>
                                    <InfoRowLabel>FLIGHT NUMBER</InfoRowLabel>
                                    <FormField name='flight_number'
                                               inputRef={register({
                                                   required: 'Field is required'
                                               })}
                                               error={errors?.shipment_details?.flight_number}
                                               placeholder='Flight Number'
                                               marginBottom='0px'
                                               defaultValue={shipment?.flight_number}
                                    />
                                </InfoRow>
                            </div>
                        }
                        <div style={{width: "25%", display: "flex", flexDirection: "column"}}>
                            {shipment?.empty_pick_up_location &&
                            <InfoRow>
                                <InfoRowLabel>Empty Pickup Location</InfoRowLabel>
                                <LocationBlock register={register}
                                               errors={errors}
                                               label='Empty Pickup Location'
                                               field_name='empty_pick_up_location'
                                               google_field_name='empty_pick_up_location_address'
                                />
                            </InfoRow>
                            }
                            {shipment?.cargo_drop_off_location &&
                            <InfoRow>
                                <InfoRowLabel>Cargo Drop Off Location </InfoRowLabel>
                                <LocationBlock register={register}
                                               errors={errors}
                                               label='Cargo Drop Off Location'
                                               field_name='cargo_drop_off_location'
                                               google_field_name='cargo_drop_off_location_address'
                                />
                            </InfoRow>}

                        </div>
                    </>
                    }
                </ValuesShipmentWrapper>
            </GeneralBookingContent>
        </GeneralBookingContentForm>
    )
}

export default GeneralBlockEditForm