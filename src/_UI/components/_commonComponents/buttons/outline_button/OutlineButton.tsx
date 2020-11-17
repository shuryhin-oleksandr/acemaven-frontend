import React from "react";
import {Button} from "./outline-styles";
import {VoidFunctionType} from "../../../../../_BLL/types/commonTypes";

type PropsType = {
    text?: string,
    callback?: VoidFunctionType,
    button_background?: string,
    borderColor?: string,
    type?: any
    text_color?: string,
    margin_right?: string,
    disabled?: boolean
}

const OutlineButton:React.FC<PropsType> = ({text, callback, button_background, borderColor, type, text_color, margin_right, disabled}) => {
    return (
        <Button  type={type}
                 onClick={callback}
                 button_background={button_background}
                 borderColor={borderColor}
                 text_color={text_color}
                 margin_right={margin_right}
                 disabled={disabled}
        >
            {text}
        </Button>
    )
}

export default OutlineButton
