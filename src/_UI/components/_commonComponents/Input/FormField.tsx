import React from "react";
import { Field, HelperText, InputOuter, Label } from "./input-styles";
import {AgentComment} from "../../PopUps/accept_booking_popup/accept-popup-styles";

type PropsType = {
  placeholder?: string;
  name?: string;
  value?: string | number;
  onChange?: (value: any) => void;
  inputRef?: React.Ref<HTMLInputElement>;
  error?: any;
  label?: string;
  type?: string;
  max?: string;
  min?: string;
  max_width?: string;
  focusBack?: string;
  height?: string;
  onBlur?: (value: any) => void;
  marginBottom?: string;
  server_error?: string;
  defaultValue?: any;
  pattern_message?: string;
  disabled?: boolean;
  background?: string;
  messagePaddingTop?: string;
  color_label?: string,
  booking_process?: boolean,
  font_weight?: string,
  label_uppercase?: boolean
};

const FormField: React.FC<PropsType> = ({ error, label, ...props }) => {
  return (
    <InputOuter max_width={props.max_width} marginBottom={props.marginBottom}>
      {!!label &&
      <Label font_weight={props.font_weight}
             color_label={props.color_label}
             label_uppercase={props.label_uppercase}
      >
        {label}
      </Label>}
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
        onBlur={(e) => props.onBlur && props.onBlur(e.target.value)}
        autoComplete="off"
        max_width={props.max_width}
        defaultValue={props.defaultValue}
        disabled={props.disabled}
        background={props.background}
        step='0.0001'
      />
        {props.booking_process && <AgentComment>For shipment tracking purposes, won’t be shown to the client.</AgentComment>}
        {error?.type === "required" && <HelperText messagePaddingTop={props.messagePaddingTop}>{error?.message}</HelperText>}
        {error?.type === "validate" && <HelperText messagePaddingTop={props.messagePaddingTop}>{error?.message}</HelperText>}
      {error?.type === "pattern" && (
        <HelperText>
          {props.pattern_message ? props.pattern_message : "Value is not valid"}
        </HelperText>
      )}
      {error?.type === "maxLength" && (
        <HelperText>Maximum length is {props.max} symbols</HelperText>
      )}
      {error?.type === "minLength" && (
        <HelperText>Minimum length is {props.min} symbols</HelperText>
      )}
      {props.server_error && <HelperText>{props.server_error}</HelperText>}
    </InputOuter>
  );
};

export default FormField;
