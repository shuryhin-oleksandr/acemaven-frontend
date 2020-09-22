import React, {useState} from 'react';
import {Field, HelperText, InputOuter, Label} from './input-styles';
import {VoidFunctionType} from "../../../../_BLL/types/commonTypes";



type PropsType = {
    placeholder?: string,
    name: string,
    value?: string,
    onChange?: VoidFunctionType,
    inputRef?: React.Ref<HTMLInputElement>,
    error?: string
    label?: string,
    getValues: (key: string) => Record<string, unknown>
}


const FormField:React.FC<PropsType> = ({error, label, ...props}) => {
    const [isFocus, setFocus] = useState(false)
    let blurHandler = () => {
        let v = props.getValues(props.name)
        if(!v) {
            setFocus(false)
        } else {
            setFocus(true)
        }
    }

    return (
        <InputOuter>
           <Label isFocus={isFocus}>{label}</Label>
            <Field error={error} onFocus={() => setFocus(true)}
                       onBlur={blurHandler}
                        value={props.value}
                        name={props.name}
                        ref={props.inputRef}
                        placeholder={props.placeholder}
                      />
            {error && <HelperText>{error}</HelperText>}
        </InputOuter>
    )
}

export default FormField
