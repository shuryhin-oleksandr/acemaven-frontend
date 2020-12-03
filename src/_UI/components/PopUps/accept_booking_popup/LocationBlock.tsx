import React from 'react'
//components
import FormField from "../../_commonComponents/Input/FormField";
import GoogleInput from "../../_commonComponents/Input/google_autocomplete_input/GoogleInput";


type PropsType = {
    register: any,
    errors: any,
    label?: string,
    field_name: string,
    google_field_name: string,
    google_label?: boolean,
    margin_bottom?: string
}

export const LocationBlock:React.FC<PropsType> = ({register, errors, label, field_name, google_field_name, google_label, margin_bottom}) => {
    return (
        <>
            <FormField error={errors?.empty_pickup_location}
                       label={label ? label : ''}
                       name={field_name}
                       placeholder='Placeholder'
                       maxW='100%'
                       inputRef={register({required: 'Field is required'})}
                       marginBottom={margin_bottom}
            />
            <GoogleInput register={register}
                         google_field_name={google_field_name}
                         errors={errors}
                         google_label={google_label ? google_label : undefined}
            />
        </>
    )
}

export default LocationBlock