import React, {useEffect, useState} from 'react'
import {ShipmentDetailsType} from "../../../../../../../../_BLL/types/operations/operationsTypes";
import {useDispatch, useSelector} from "react-redux";
import {getEditOperationSuccessSelector} from "../../../../../../../../_BLL/selectors/operations/agentOperationsSelector";
import {useForm} from "react-hook-form";
import {editOperationByAgentThunk} from "../../../../../../../../_BLL/thunks/operations/agent/OperationsAgentThunk";
import {agentOperationsActions} from "../../../../../../../../_BLL/reducers/operations/agent/agentOperationsReducer";
import {AppCompaniesTypes} from "../../../../../../../../_BLL/types/commonTypes";
import {BookingTitle, NumberOfBooking} from "../../operation-card-style";
import {IconButton} from "@material-ui/core";
import edit_icon from "../../../../../../../assets/icons/profile/editCard.svg";
import {
    EditButtonsWrapper,
    FormOperationButton
} from "../../../../../../Requests/Booking_agent/booking_card/booking-card-style";
import close_icon from "../../../../../../../assets/icons/profile/closeForm.svg";
import save_icon from "../../../../../../../assets/icons/profile/add.svg";
import FormField from "../../../../../../../components/_commonComponents/Input/FormField";

type PropsType = {
    shipment: ShipmentDetailsType | undefined,
    company_type: string,
    my_name: string,
    agent_name: string
}

const BookingNumberWithCarrierBlockContainer:React.FC<PropsType> = ({shipment, company_type, my_name, agent_name}) => {

    const [isEdit, setIsEdit] = useState(false)

    const edit_success = useSelector(getEditOperationSuccessSelector)

    const dispatch = useDispatch()

    const {errors, handleSubmit, register} = useForm()
    const onSubmit = (values: any) => {
        dispatch(editOperationByAgentThunk({booking_number_with_carrier: values.booking_number_with_carrier}, Number(shipment?.id)))

    }

    useEffect(() => {
        if(edit_success) {
            setIsEdit(false)
            dispatch(agentOperationsActions.setEditSuccess(''))
        }
    }, [edit_success])


    return (
        <>
            {company_type === AppCompaniesTypes.CLIENT
                ? (shipment?.booking_number_with_carrier && (
                    <div style={{display: "flex"}}>
                        <BookingTitle>BOOKING WITH CARRIER</BookingTitle>
                        <NumberOfBooking>No {shipment?.booking_number_with_carrier}</NumberOfBooking>
                    </div>
                ))
                : <form onSubmit={handleSubmit(onSubmit)}>
                    {shipment?.booking_number && (
                        <div style={{display: "flex"}}>
                            <div style={{display: 'flex', alignItems: 'center'}}>
                                <BookingTitle style={{fontSize: '18px', marginBottom: 0}}>BOOKING WITH CARRIER</BookingTitle>
                                {agent_name === my_name &&
                                <>
                                    {!isEdit
                                        ? <IconButton onClick={() => setIsEdit(true)}
                                                      style={{position: 'absolute', right: 0,  top: '110px'}}>
                                            <img src={edit_icon} alt=""/>
                                        </IconButton>
                                        : <EditButtonsWrapper top='120px'>
                                            <FormOperationButton type='button' onClick={() => setIsEdit(false)}
                                                                 style={{padding: '5px'}}>
                                                <img src={close_icon} alt=""/>
                                            </FormOperationButton>
                                            <FormOperationButton type='submit' style={{padding: '5px'}}>
                                                <img src={save_icon} alt=""/>
                                            </FormOperationButton>
                                        </EditButtonsWrapper>
                                    }
                                </>
                                }
                            </div>

                            {!isEdit
                                ? <NumberOfBooking style={{fontSize: '18px'}}>No: {shipment?.booking_number_with_carrier}</NumberOfBooking>
                                : <FormField name='booking_number_with_carrier'
                                             inputRef={register({required: 'Field is required'})}
                                             error={errors?.booking_number_with_carrier}
                                             maxW='150px'
                                             defaultValue={shipment?.booking_number_with_carrier ? shipment?.booking_number_with_carrier : ''}
                                />
                            }

                        </div>
                    )}
                </form>
            }

        </>
    )
}

export default BookingNumberWithCarrierBlockContainer