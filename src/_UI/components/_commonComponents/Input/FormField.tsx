import React from "react";
//styles
import { Field, HelperText, InputOuter, Label } from "./input-styles";
import {AgentComment} from "../../PopUps/accept_booking_popup/accept-popup-styles";
import {useTranslation} from "react-i18next";

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
  label_uppercase?: boolean,
  min_height?: string,
  min_width?: string,
  without_border?:number,
  width?: string,
};

const FormField: React.FC<PropsType> = ({ error, label, ...props }) => {
  const {t} = useTranslation();
  return (
    <InputOuter max_width={props.max_width} min_width={props.min_width} marginBottom={props.marginBottom} min_height={props.min_height} width={props.width}>
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
        step='0.01'
        without_border={props.without_border && props.without_border}
      />
        {props.booking_process && <AgentComment>{t("Billing/For shipment tracking purposes, won’t be shown to the client.")}</AgentComment>}
        {error?.type === "required" && <HelperText messagePaddingTop={props.messagePaddingTop}>{error?.message}</HelperText>}
        {error?.type === "validate" && <HelperText messagePaddingTop={props.messagePaddingTop}>{error?.message}</HelperText>}
      {error?.type === "pattern" && (
        <HelperText>
          {props.pattern_message ? props.pattern_message : t("Error message/Value is not valid")}
        </HelperText>
      )}
      {error?.type === "maxLength" && (
        <HelperText>{t("Error message/Maximum length is", {parameter: props.max})}</HelperText>
      )}
      {error?.type === "minLength" && (
        <HelperText>{t("Error message/Minimum length is", {parameter: props.min})}</HelperText>
      )}
      {props.server_error && <HelperText>{props.server_error}</HelperText>}
    </InputOuter>
  );
};

export default FormField;
