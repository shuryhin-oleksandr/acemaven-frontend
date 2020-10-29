import React from "react";
import {Button} from "./outline-styles";
import {VoidFunctionType} from "../../../../../_BLL/types/commonTypes";

type PropsType = {
    text?: string,
    callback: VoidFunctionType,
    button_background?: string,
    borderColor?: string
}

const OutlineButton:React.FC<PropsType> = ({text, callback, button_background, borderColor}) => {
    return (
        <Button onClick={callback} button_background={button_background} borderColor={borderColor}>{text}</Button>
    )
}

export default OutlineButton
