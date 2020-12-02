import React, {useEffect, useState} from 'react'
import {
    CalendarIcon, EditButtonsWrapper, FormOperationButton,
    GeneralBookingContent,
    InfoRow,
    InfoRowLabel,
    InfoRowValue
} from "../../../../../../Requests/Booking_agent/booking_card/booking-card-style";
import {OperationType, ShipmentDetailsType} from "../../../../../../../../_BLL/types/operations/operationsTypes";
import {SectionTitle, SectionWrapper} from "../../operation-card-style";
import calendar_icon from "../../../../../../../assets/icons/date_1.svg";
import moment from "moment";
import ConfirmedDatesEditForm from "./ConfirmedDatesEditForm";
import {useForm} from "react-hook-form";
import {IconButton} from "@material-ui/core";
import edit_icon from '../../../../../../../assets/icons/profile/editCard.svg'
import close_icon from "../../../../../../../assets/icons/profile/closeForm.svg";
import save_icon from "../../../../../../../assets/icons/profile/add.svg";
import {useDispatch, useSelector} from "react-redux";
import {editOperationByAgentThunk} from "../../../../../../../../_BLL/thunks/operations/agent/OperationsAgentThunk";
import {getEditOperationSuccessSelector} from "../../../../../../../../_BLL/selectors/operations/agentOperationsSelector";
import {agentOperationsActions} from "../../../../../../../../_BLL/reducers/operations/agent/agentOperationsReducer";
import {AppCompaniesTypes} from "../../../../../../../../_BLL/types/commonTypes";

type PropsType = {
    shipment: ShipmentDetailsType | null,
    operation_info: OperationType,
    company_type: string
}

const ConfirmedDatesContainerBlock:React.FC<PropsType> = ({shipment, operation_info, company_type}) => {

    let dispatch = useDispatch()
    const {control, errors, setValue,handleSubmit} = useForm()

    const onSubmit = (values: any) => {
       let date_of_departure = moment(values.estimated_time?.from).format('DD/MM/YYYY') + ' ' + values.estimated_time?.departure_time
       let date_of_arrival = moment(values.estimated_time?.to).format('DD/MM/YYYY') + ' ' + values.estimated_time?.arrival_time
       dispatch(editOperationByAgentThunk({date_of_departure: date_of_departure, date_of_arrival: date_of_arrival}, shipment?.id as number))
    }

    //refactoring dates
    let a = moment(operation_info?.date_from, 'DD/MM/YYYY').toDate()
    let date_from = moment(a).format('DD/MM')
    let c = moment(operation_info?.date_to, 'DD/MM/YYYY').toDate()
    let date_to = moment(c).format('DD/MM')


    const [isEdit, setIsEdit] = useState(false)

    let edit_success = useSelector(getEditOperationSuccessSelector)

    useEffect(() => {
        if(edit_success) {
            setIsEdit(false)
            dispatch(agentOperationsActions.setEditSuccess(''))
        }
    }, [edit_success])

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
                    <SectionWrapper>
                        <div style={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>
                            <SectionTitle>DATES</SectionTitle>
                            {company_type === AppCompaniesTypes.AGENT &&
                                (!isEdit
                                    ? <IconButton onClick={() => setIsEdit(true)}>
                                        <img src={edit_icon} alt=""/>
                                    </IconButton>
                                    : <EditButtonsWrapper>
                                    <FormOperationButton type='button' onClick={() => setIsEdit(false)} style={{padding: '5px'}}>
                                        <img src={close_icon} alt=""/>
                                    </FormOperationButton>
                                    <FormOperationButton type='submit' style={{padding: '5px'}}>
                                        <img src={save_icon} alt=""/>
                                    </FormOperationButton>
                                    </EditButtonsWrapper>
                                )
                            }
                        </div>
                        <GeneralBookingContent>
                            <div style={{ display: "flex" }}>
                                <CalendarIcon style={{ width: "87px", height: "96px" }}>
                                    <img src={calendar_icon} alt="" />
                                </CalendarIcon>
                                <InfoRow margin_right="50px" margin_bottom="0px">
                                    <InfoRowLabel>SHIPMENT DATE</InfoRowLabel>
                                    <span style={{width: "150px", fontSize: "24px", color: "black", fontFamily: "Helvetica Light", marginBottom: "5px",}}>
                  {(operation_info?.week_range?.week_from !== operation_info?.week_range?.week_to)
                      ? `WEEK ${operation_info?.week_range?.week_from} - ${operation_info?.week_range?.week_to}`
                      : `WEEK ${operation_info?.week_range?.week_from}`
                  }
                </span>
                                    <InfoRowValue>{date_from} - {date_to}</InfoRowValue>
                                </InfoRow>
                            </div>
                            {isEdit
                                ? <ConfirmedDatesEditForm control={control}
                                                          errors={errors}
                                                          setValue={setValue}
                                                          exact_operation_info={operation_info}
                                />
                                :
                                (operation_info?.status === "Booking Confirmed" &&
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
                                            <InfoRowLabel>CARGO CUT OFF </InfoRowLabel>
                                            <InfoRowValue>{shipment?.cargo_cut_off_date}</InfoRowValue>
                                        </InfoRow>
                                        <InfoRow>
                                            <InfoRowLabel>DOCUMENTS CUT OFF </InfoRowLabel>
                                            <InfoRowValue>{shipment?.document_cut_off_date}</InfoRowValue>
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
                                )
                            }
                        </GeneralBookingContent>
                    </SectionWrapper>
        </form>

    )
}

export default ConfirmedDatesContainerBlock