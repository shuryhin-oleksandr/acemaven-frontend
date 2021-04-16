import React, {useEffect} from "react";
import {
    AwareOuter,
    CancelOperationByAgentContent,
    CancelOperationByAgentInner,
    CancelOperationByAgentWrapper, CancelOperationSubtitle, CancelOperationTitle
} from "./cancel-operation-by-agent-styles";
import {IconButton} from "@material-ui/core";
import close_icon from "../../../assets/icons/close-icon.svg";
import aware_icon from '../../../assets/icons/operations/aware_cancel_operation.svg'
import {Controller, useForm} from "react-hook-form";
import {FormTextarea, TextareaLabel} from "../accept_booking_popup/accept-popup-styles";
import {useDispatch, useSelector} from "react-redux";
import {getCancellationChoicesSelector} from "../../../../_BLL/selectors/operations/agentOperationsSelector";
import {getCancellationChoicesThunk} from "../../../../_BLL/thunks/operations/agent/OperationsAgentThunk";
import FormSelect from "../../_commonComponents/select/FormSelect";
import {HelperText} from "../../_commonComponents/Input/input-styles";
import {
    CompleteButtonsWrapper,
    CompleteCancelButton,
    CompleteConfirmButton
} from "../complete_operation_by_agent/complete-operation-styles";
import {useTranslation} from "react-i18next";


type PropsType = {
    setIsCancelByAgent: (value: boolean) => void,
    cancelOperationByAgentHandler: (value: {reason: string, comment: string}) => void,
}

const CancelOperationByAgentPopup:React.FC<PropsType> = ({setIsCancelByAgent, cancelOperationByAgentHandler}) => {

    const dispatch = useDispatch()

    const {handleSubmit, errors, control, watch} = useForm()
    const onSubmit = (values: any) => {
        cancelOperationByAgentHandler(values)
    }

    let choice = watch('reason')

    useEffect(() => {
        dispatch(getCancellationChoicesThunk())
    }, [])

    let choices = useSelector(getCancellationChoicesSelector)
    const {t} = useTranslation();
    return (
        <CancelOperationByAgentWrapper>
            <CancelOperationByAgentInner>
                <IconButton onClick={() => setIsCancelByAgent(false)}
                            style={{position: 'absolute', top: '20px', right: '20px'}}
                >
                    <img src={close_icon} alt=""/>
                </IconButton>
                <CancelOperationByAgentContent onSubmit={handleSubmit(onSubmit)}>
                    <CancelOperationTitle>
                        {t("Confirm Operation/Do you want to cancel the operation?")}
                    </CancelOperationTitle>
                    <div style={{display: 'flex'}}>
                        <AwareOuter><img src={aware_icon} alt=""/></AwareOuter>
                        <CancelOperationSubtitle>
                            {t("Confirm Operation/Cancellation could result in getting a bad review from the client or to be banned from the platform.")}
                        </CancelOperationSubtitle>
                    </div>
                    <Controller name='reason'
                                control={control}
                                rules={{
                                    required: `${t("Error message/Field is required")}`
                                }}
                                defaultValue=''
                                as={
                                    <FormSelect label={t('Confirm Operation/Cancellation reason')}
                                                         placeholder={t('Confirm Operation/Cancellation reason')}
                                                         error={errors?.reason?.message}
                                                         options={choices}
                                    />
                                }
                    />
                    <Controller name='comment'
                                control={control}
                                defaultValue=''
                                rules={{
                                    validate : (value: any) => {
                                        if(!value && choice === 'dates') {
                                            return false
                                        } else if (!value && choice === 'client_requested') {
                                            return false
                                        } else return !(!value && choice === 'other');
                                    }
                                }}
                                as={
                                    <div style={{width: '100%', marginBottom: '50px'}}>
                                        <TextareaLabel>{t("Confirm Operation/Your comments")}</TextareaLabel>
                                        <FormTextarea error={!!errors?.comment}
                                                      placeholder={t('Bookings/Comments')}
                                        />
                                        {errors?.comment && <HelperText messagePaddingTop='4px'>{t("Error message/Field is required")}</HelperText>}
                                    </div>
                                }
                    />
                    <CompleteButtonsWrapper>
                        <CompleteConfirmButton>{t("Bookings/CONFIRM")}</CompleteConfirmButton>
                        <CompleteCancelButton onClick={() => setIsCancelByAgent(false)}>{t("Bookings/CANCEL")}</CompleteCancelButton>
                    </CompleteButtonsWrapper>
                </CancelOperationByAgentContent>
            </CancelOperationByAgentInner>
        </CancelOperationByAgentWrapper>
    )
}

export default CancelOperationByAgentPopup