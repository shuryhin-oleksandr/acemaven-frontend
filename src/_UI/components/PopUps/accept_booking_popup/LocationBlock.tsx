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
    margin_bottom?: string,
    color_label?: string,
    font_weight?: string,
    label_uppercase?: boolean,
    default_location?: string,
    default_address?: string,
    disabled: boolean
}

export const LocationBlock:React.FC<PropsType> = ({register, errors, label, field_name, google_field_name, google_label, margin_bottom, color_label, ...props}) => {
    return (
        <>
            <FormField error={errors?.field_name}
                       label={label ? label : ''}
                       name={field_name}
                       placeholder='Placeholder'
                       max_width='100%'
                       inputRef={register({required: 'Field is required'})}
                       marginBottom={margin_bottom}
                       color_label={color_label}
                       font_weight={props.font_weight}
                       label_uppercase={props.label_uppercase}
                       defaultValue={props.default_location ? props.default_location : ''}
                       disabled={props.disabled}
            />
            <GoogleInput register={register}
                         google_field_name={google_field_name}
                         errors={errors}
                         google_label={google_label ? google_label : undefined}
                         color_label={color_label}
                         font_weight={props.font_weight}
                         label_uppercase={props.label_uppercase}
                         defaultValue={props.default_address}
                         disabled={props.disabled}

            />
        </>
    )
}

export default LocationBlock