import React from 'react'
import {
    RejectActions,
    RejectAware, RejectCancelButton, RejectConfirmButton,
    RejectContent,
    RejectInner, RejectLabel,
    RejectTextarea,
    RejectTitle,
    RejectWrapper
} from "./reject-booking-styles";
import reject_aware_icon from '../../../../_UI/assets/icons/booking/aware_reject_icon.svg'
import close_icon from '../../../../_UI/assets/icons/close-icon.svg'
import {IconButton} from "@material-ui/core";
import {Controller, useForm} from "react-hook-form";
import {HelperText} from "../../_commonComponents/Input/input-styles";
import {useDispatch} from "react-redux";
import {rejectAgentBookingByIdThunk} from "../../../../_BLL/thunks/booking_agent_thunk/bookingAgentThunk";
import {useHistory, useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";

type PropsType = {
    setRejectPopupOpen: (value:boolean) => void
}

const RejectBookingByAgentPopup:React.FC<PropsType> = ({setRejectPopupOpen}) => {

    const dispatch = useDispatch()
    const history = useHistory()
    let query = useParams()
    // @ts-ignore
    let id = query.id


    const  {control, errors, handleSubmit} = useForm<{reason: string}>({
      reValidateMode: 'onBlur'
  })

    const onSubmit = (values: {reason: string}) => {
        dispatch(rejectAgentBookingByIdThunk(id, values.reason, history))
    }
  const {t} = useTranslation();
    return (
        <RejectWrapper>
            <RejectInner>
                <IconButton onClick={() => setRejectPopupOpen(false)}
                            style={{position: "absolute", top: '26px', right: '20px', padding: '0px'}}
                >
                    <img src={close_icon} alt=""/>
                </IconButton>
                <RejectContent onSubmit={handleSubmit(onSubmit)}>
                    <RejectTitle>{t("Bookings/Do you want to reject the booking?")}</RejectTitle>
                    <RejectAware>
                        <img src={reject_aware_icon} alt=""/>
                        <span>{t("Bookings/Please, confirm_booking")}</span>
                    </RejectAware>
                    <div style={{width: '100%', marginBottom: '40px'}}>
                        <RejectLabel>{t("Bookings/Rejection reason")}</RejectLabel>
                        <Controller name='reason'
                                    control={control}
                                    rules={{required: 'Field is required'}}
                                    as={
                                        <RejectTextarea placeholder={t("Bookings/Comments")}
                                                        error={!!errors?.reason}
                                        />
                                    }
                        />
                        {errors?.reason?.type === "required" && <HelperText>{errors?.reason?.message}</HelperText>}
                    </div>
                    <RejectActions>
                        <RejectConfirmButton type='submit'>{t("Bookings/CONFIRM")}</RejectConfirmButton>
                        <RejectCancelButton type='button' onClick={() => setRejectPopupOpen(false)}>{t("Bookings/CANCEL")}</RejectCancelButton>
                    </RejectActions>
                </RejectContent>
            </RejectInner>
        </RejectWrapper>
    )
}

export default RejectBookingByAgentPopup