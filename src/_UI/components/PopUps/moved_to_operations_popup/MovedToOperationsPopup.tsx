import React from 'react'
//material ui
import {IconButton} from "@material-ui/core";
//styles
import {
    OperationsPopupButton,
    OperationsPopupContent,
    OperationsPopupInner,
    OperationsPopupMessage,
    OperationsPopupOuter
} from "./moved-to-operations-styles";
//icons
import close_icon from '../../../assets/icons/close-icon.svg'


type PropsType = {
    setMovedToOperations: (value: boolean) => void
}

const MovedToOperationsPopup:React.FC<PropsType> = ({setMovedToOperations}) => {
    return (
        <OperationsPopupOuter>
            <OperationsPopupInner>
                <IconButton onClick={() => setMovedToOperations(false)}
                            style={{position: 'absolute', top: '20px', right: '20px'}}
                >
                    <img src={close_icon} alt=""/>
                </IconButton>
                <OperationsPopupContent>
                    <OperationsPopupMessage>
                        The request will be moved to the operations. <br/>
                        You can find it in mine section.
                    </OperationsPopupMessage>
                    <OperationsPopupButton onClick={() => setMovedToOperations(false)}>GOT IT!</OperationsPopupButton>
                </OperationsPopupContent>
            </OperationsPopupInner>
        </OperationsPopupOuter>
    )
}

export default MovedToOperationsPopup