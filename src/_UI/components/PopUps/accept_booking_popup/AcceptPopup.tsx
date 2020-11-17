import React from 'react'
import {
    AcceptContent,
    AcceptContentTitle,
    AcceptFormOuter,
    AcceptInner, AcceptPopupActions,
    AcceptWrapper,
    FormTextarea, TextareaLabel,
} from "./accept-popup-styles";
import {Controller, useForm} from "react-hook-form";
import FormField from "../../_commonComponents/Input/FormField";
import AcceptPopupDates from "./AcceptPopupDates";
import {IconButton} from "@material-ui/core";
import close_icon from '../../../../_UI/assets/icons/close-icon.svg'
import OutlineButton from "../../_commonComponents/buttons/outline_button/OutlineButton";
import GoogleInput from "../../_commonComponents/Input/google_autocomplete_input/GoogleInput";



type PropsType = {
    openAcceptPopup: (value: boolean) => void
}


const AcceptPopup:React.FC<PropsType> = ({openAcceptPopup}) => {
    const {control, errors, handleSubmit, setValue, register} = useForm({
        reValidateMode: 'onBlur'
    })

    const onSubmit = (values: any) => {
        console.log(values)
    }

    return (
        <AcceptWrapper>
            <AcceptInner>
                <IconButton onClick={() => openAcceptPopup(false)}
                    style={{position: 'absolute', top: '20px', right: '20px'}}><img src={close_icon} alt=""/></IconButton>
                <AcceptContent>
                    <AcceptContentTitle>Type the required shipments details to confirm booking</AcceptContentTitle>
                    <AcceptFormOuter onSubmit={handleSubmit(onSubmit)}>
                        <Controller name='booking_number'
                                    control={control}
                                    rules={{
                                        required: 'Field is required'
                                    }}
                                    as={
                                        <FormField error={errors?.booking_number}
                                                   label='Booking number'
                                                   placeholder='Placeholder'
                                                   maxW='100%'
                                        />
                                    }
                        />
                        <Controller name='mawb'
                                    control={control}
                                    rules={{
                                        required: 'Field is required'
                                    }}
                                    as={
                                        <FormField error={errors?.mawb}
                                                   label='MAWB'
                                                   placeholder='Placeholder'
                                                   maxW='100%'
                                        />
                                    }
                        />
                        <Controller name='booking_number_with_carrier'
                                    control={control}
                                    rules={{
                                        required: 'Field is required'
                                    }}
                                    as={
                                        <FormField error={errors?.booking_number_with_carrier}
                                                   label='Booking number with Carrier'
                                                   placeholder='Placeholder'
                                                   maxW='100%'
                                        />
                                    }
                        />
                        <AcceptPopupDates control={control}
                                          errors={{from: errors.from, to: errors.to, departure_time: errors.departure_time, arrival_time: errors.arrival_time}}
                                          setValue={setValue}
                                          required_dates={true}
                        />
                        <Controller name='empty_pickup_location'
                                    control={control}
                                    rules={{
                                        required: 'Field is required'
                                    }}
                                    as={
                                        <FormField error={errors?.empty_pickup_location}
                                                   label='Empty Pick Up Location'
                                                   placeholder='Placeholder'
                                                   maxW='100%'
                                        />
                                    }
                        />
                        <GoogleInput register={register}
                                     name='autocomplete_address'
                                     errors={errors}
                        />
                        <Controller name='booking_notes'
                                    control={control}
                                    rules={{
                                        required: 'Field is required'
                                    }}
                                    as={
                                        <div style={{width: '100%'}}>
                                            <TextareaLabel>{'Booking Notes'}</TextareaLabel>
                                            <FormTextarea error={!!errors?.booking_notes}
                                                          placeholder='Comments'
                                            />
                                        </div>
                                    }
                        />
                        <AcceptPopupActions>
                            <OutlineButton text='CONFIRM'
                                           type="submit"
                                           button_background='#7c7c89'
                                           margin_right='15px'
                            />
                            <OutlineButton text='CANCEL'
                                           type="button"
                                           button_background='white'
                                           borderColor='1px solid #3b3b41'
                                           text_color='#3b3b41'
                            />
                        </AcceptPopupActions>
                    </AcceptFormOuter>
                </AcceptContent>
            </AcceptInner>
        </AcceptWrapper>
    )
}

export default AcceptPopup;

