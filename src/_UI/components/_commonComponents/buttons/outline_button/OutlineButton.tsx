import React from "react";
import {Button} from "./outline-styles";
import {VoidFunctionType} from "../../../../../_BLL/types/commonTypes";

type PropsType = {
    text?: string,
    callback: VoidFunctionType
}

const OutlineButton:React.FC<PropsType> = ({text, callback}) => {
    return (
        <Button onClick={callback}>{text}</Button>
    )
}

export default OutlineButton
