import React from "react";
import { Field, HelperText, InputOuter, Label } from "./input-styles";
import { VoidFunctionType } from "../../../../_BLL/types/commonTypes";

type PropsType = {
  placeholder?: string;
  name?: string;
  value?: string;
  onChange?: VoidFunctionType;
  inputRef?: React.Ref<HTMLInputElement>;
  error?: any;
  label?: string;
  getValues?: (key: string) => Record<string, unknown>;
  type?: string;
  max?: string;
  maxW?: string;
  focusBack?: string;
  height?: string
};

const FormField: React.FC<PropsType> = ({ error, label, ...props }) => {
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
    <InputOuter maxW={props.maxW}>
      <Label>{label}</Label>
      <Field
          height={props.height}
        focusBack={props.focusBack}
        error={error}
        value={props.value}
        name={props.name}
        ref={props.inputRef}
        placeholder={props.placeholder}
        type={props.type ? props.type : "text"}
        onChange={(e) => props.onChange && props.onChange(e.currentTarget)}
      />
      {error?.type === "required" && <HelperText>{error?.message}</HelperText>}
      {error?.type === "pattern" && <HelperText>Value is not valid</HelperText>}
      {error?.type === "minLength" && (
        <HelperText>Minimum length is 1 symbol</HelperText>
      )}
      {error?.type === "maxLength" && (
        <HelperText>Maximum length is {props.max} symbols</HelperText>
      )}
    </InputOuter>
  );
};

export default FormField;
