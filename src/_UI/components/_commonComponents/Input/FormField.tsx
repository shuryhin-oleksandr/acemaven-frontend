import React from 'react';
import {Field, HelperText, InputOuter, Label} from './input-styles';
import {VoidFunctionType} from "../../../../_BLL/types/commonTypes";



type PropsType = {
    placeholder?: string,
    name?: string,
    value?: string,
    onChange?: VoidFunctionType,
    inputRef?: React.Ref<HTMLInputElement>,
    error?: string
    label?: string,
    getValues?: (key: string) => Record<string, unknown>,
    type?: string
}


const FormField:React.FC<PropsType> = ({error, label, ...props}) => {
   /*
    let blurHandler = () => {
        let v = props.getValues(props.name)
        if(!v) {
            setFocus(false)
        } else {
            setFocus(true)
        }
    }*/

    return (
        <InputOuter>
           <Label>{label}</Label>
            <Field error={error}
                        value={props.value}
                        name={props.name}
                        ref={props.inputRef}
                        placeholder={props.placeholder}
                        type={props.type ? props.type : 'text'}
                    onChange={(e) => props.onChange && props.onChange(e.currentTarget)}
                      />
            {error && <HelperText>{error}</HelperText>}
        </InputOuter>
    )
}

export default FormField
