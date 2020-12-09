import React from 'react'
import {TakeOverContent, TakeOverInner, TakeOverWrapper} from "./take-over-operation-styles";
import {IconButton} from "@material-ui/core";
import close_icon from '../../../assets/icons/close-icon.svg'

type PropsType = {

}


const TakeOverOperationPopup:React.FC<PropsType> = ({}) => {
    return (
        <TakeOverWrapper>
            <TakeOverInner>
                <IconButton>
                    <img src={close_icon} alt=""/>
                </IconButton>
                <TakeOverContent>

                </TakeOverContent>
            </TakeOverInner>
        </TakeOverWrapper>
    )
}

export default TakeOverOperationPopup