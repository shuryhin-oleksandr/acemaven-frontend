import React, {useEffect, useState} from 'react'
import {BookingTitle, NumberOfBooking} from "../operation-card-style";
import {ShipmentDetailsType} from "../../../../../../../_BLL/types/operations/operationsTypes";
import {AppCompaniesTypes} from "../../../../../../../_BLL/types/commonTypes";
import FormField from "../../../../../../components/_commonComponents/Input/FormField";
import {useForm} from "react-hook-form";
import edit_icon from "../../../../../../assets/icons/profile/editCard.svg";
import {IconButton} from "@material-ui/core";
import {
    EditButtonsWrapper,
    FormOperationButton
} from "../../../../../Requests/Booking_agent/booking_card/booking-card-style";
import close_icon from "../../../../../../assets/icons/profile/closeForm.svg";
import save_icon from "../../../../../../assets/icons/profile/add.svg";
import {useDispatch, useSelector} from "react-redux";
import {editOperationByAgentThunk} from "../../../../../../../_BLL/thunks/operations/agent/OperationsAgentThunk";
import {agentOperationsActions} from "../../../../../../../_BLL/reducers/operations/agent/agentOperationsReducer";
import {getEditOperationSuccessSelector} from "../../../../../../../_BLL/selectors/operations/agentOperationsSelector";


type PropsType = {
    shipment: ShipmentDetailsType | undefined,
    company_type: string
}

const BookingNumberBlockContainer: React.FC<PropsType> = ({shipment, company_type}) => {
    const [isEdit, setIsEdit] = useState(false)

    const edit_success = useSelector(getEditOperationSuccessSelector)

    const dispatch = useDispatch()

    const {errors, handleSubmit, register} = useForm()
    const onSubmit = (values: any) => {
        dispatch(editOperationByAgentThunk({booking_number: values.booking_number}, Number(shipment?.id)))

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
                ? (shipment?.booking_number && (
                    <div style={{display: "flex"}}>
                        <BookingTitle>BOOKING</BookingTitle>
                        <NumberOfBooking>No {shipment?.booking_number}</NumberOfBooking>
                    </div>
                ))
                : <form onSubmit={handleSubmit(onSubmit)}>
                    {shipment?.booking_number && (
                        <div style={{display: "flex"}}>
                            <div>
                                <BookingTitle>BOOKING</BookingTitle>
                                <>
                                    {!isEdit
                                        ? <IconButton onClick={() => setIsEdit(true)}
                                                      style={{position: 'absolute', right: 0}}>
                                            <img src={edit_icon} alt=""/>
                                        </IconButton>
                                        : <EditButtonsWrapper top='85px'>
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
                            </div>

                            {!isEdit
                                ? <NumberOfBooking>No {shipment?.booking_number}</NumberOfBooking>
                                : <FormField name='booking_number'
                                             inputRef={register({required: 'Field is required'})}
                                             error={errors?.booking_number}
                                             maxW='100px'
                                             defaultValue={shipment?.booking_number ? shipment?.booking_number : ''}
                                />
                            }

                        </div>
                    )}
                </form>
            }

        </>
    )
}

export default BookingNumberBlockContainer