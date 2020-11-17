import React from 'react'
import {Controller} from "react-hook-form";
import FormField from "../../_commonComponents/Input/FormField";
import GoogleInput from "../../_commonComponents/Input/google_autocomplete_input/GoogleInput";


type PropsType = {
    control: any,
    register: any,
    errors: any,
    label: string,
    field_name: string,
    google_field_name: string
}

export const LocationBlock:React.FC<PropsType> = ({control, register, errors, label, field_name, google_field_name}) => {
    return (
        <>
            <Controller name={field_name}
                        control={control}
                        rules={{
                              required: 'Field is required'
                        }}
                        as={
                            <FormField error={errors?.empty_pickup_location}
                                       label={label}
                                       placeholder='Placeholder'
                                       maxW='100%'
                                       booking_process={true}
                            />
                        }
            />
            <GoogleInput register={register}
                         google_field_name={google_field_name}
                         errors={errors}
            />
        </>
    )
}

export default LocationBlock