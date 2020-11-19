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
import LocationContainer from "./LocationContainer";



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

    let direction = 'export'
    let shipping_mode = 'LCL'
    let shipping_type = 'sea'

    return (
        <AcceptWrapper>
            <AcceptInner>
                <IconButton onClick={() => openAcceptPopup(false)}
                    style={{position: 'absolute', top: '20px', right: '20px'}}><img src={close_icon} alt=""/></IconButton>
                <AcceptContent>
                    <AcceptContentTitle>Type the required shipments details to confirm booking</AcceptContentTitle>
                    <AcceptFormOuter onSubmit={handleSubmit(onSubmit)}>
                        <FormField error={errors?.booking_number}
                                   label='Booking number'
                                   placeholder='Placeholder'
                                   maxW='100%'
                                   name='booking_number'
                                   inputRef={register({required: 'Field is required'})}
                                   booking_process={true}
                        />
                        {shipping_mode === 'LCL'
                        && <>
                            <FormField error={errors?.booking_number_with_carrier}
                                       label='Booking Number With Carrier'
                                       placeholder='Placeholder'
                                       maxW='100%'
                                       name='booking_number_with_carrier'
                                       inputRef={register({required: 'Field is required'})}
                                       booking_process={true}
                            />
                            <FormField error={errors?.container_number}
                                       label='Container Number'
                                       placeholder='Placeholder'
                                       maxW='100%'
                                       booking_process={true}
                                       inputRef={register({required: 'Field is required'})}
                                       name='container_number'
                            />
                        </>
                        }
                        {shipping_type === 'air'
                            && <FormField error={errors?.mawb}
                                          name='mawb'
                                          label='MAWB'
                                          placeholder='Placeholder'
                                          maxW='100%'
                                          booking_process={true}
                                          inputRef={register({required: 'Field is required'})}
                            />
                        }
                        {shipping_type === 'air'
                            ? <FormField error={errors?.flight_number}
                                         name='flight_number'
                                         inputRef={register({required: 'Field is required'})}
                                         label='Flight Number'
                                         placeholder='Placeholder'
                                         maxW='100%'
                            />
                            : <div style={{width: '100%', display: 'flex', justifyContent: 'space-between'}}>
                                <FormField error={errors?.vessel}
                                           name='vessel'
                                           inputRef={register({required: 'Field is required'})}
                                           label='Vessel'
                                           placeholder='Placeholder'
                                           maxW='310px'
                                />

                                <FormField error={errors?.voyage}
                                           name='voyage'
                                           inputRef={register({required: 'Field is required'})}
                                           label='Voyage'
                                           placeholder='Placeholder'
                                           maxW='310px'
                                />
                            </div>
                        }
                        <AcceptPopupDates control={control}
                                          errors={{from: errors.from, to: errors.to, departure_time: errors.departure_time, arrival_time: errors.arrival_time}}
                                          setValue={setValue}
                                          required_dates={true}
                                          label1={'Estimated Time of Departure'}
                                          label2={'Estimated Time of Arrival'}
                                          time_name_first={'estimated_time.departure_time'}
                                          time_name_second={'estimated_time.arrival_time'}
                                          date_name_first={'estimated_time.from'}
                                          date_name_second={'estimated_time.to'}
                        />
                        {direction === 'export'
                            && <AcceptPopupDates control={control}
                                                 errors={{from: errors.from, to: errors.to, departure_time: errors.departure_time, arrival_time: errors.arrival_time}}
                                                 setValue={setValue}
                                                 required_dates={true}
                                                 label1={'Documents Cut Off Date'}
                                                 label2={'Cargo Cut Off Date'}
                                                 time_name_first={'documents_cut_off.cut_off_time'}
                                                 time_name_second={'cargo_cut_off.cut_off_time'}
                                                 date_name_first={'documents_cut_off.from'}
                                                 date_name_second={'cargo_cut_off.to'}
                            />
                        }
                        <LocationContainer errors={errors}
                                           register={register}
                                           shipping_mode={shipping_mode}
                                           direction={direction}
                        />
                        {shipping_mode === 'FCL'
                            && <FormField error={errors?.container_free_time}
                                          name='container_free_time'
                                          inputRef={register({required: 'Field is required'})}
                                          label='Container Free time'
                                          placeholder='Number of days'
                                          maxW='310px'
                        />
                        }
                        <Controller name='booking_notes'
                                    control={control}
                                    rules={{
                                        required: 'Field is required'
                                    }}
                                    as={
                                        <div style={{width: '100%'}}>
                                            <TextareaLabel>{'Booking Notes'}</TextareaLabel>
                                            <FormTextarea error={!!errors?.booking_notes}
                                                          placeholder='Comments..'
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
                                           callback={() => openAcceptPopup(false)}

                            />
                        </AcceptPopupActions>
                    </AcceptFormOuter>
                </AcceptContent>
            </AcceptInner>
        </AcceptWrapper>
    )
}

export default AcceptPopup;

