import React from "react";
import CancelButton from "../../_commonComponents/buttons/navFormButtons/CancelButton";

import {VoidFunctionType} from "../../../../_BLL/types/commonTypes";
import {ButtonWrap, Container, TextWrap} from "./edit-popup-styles";


type PropsType = {
    callback: VoidFunctionType
}

const EditUserPopup:React.FC<PropsType> = ({callback}) => {
    return (
        <Container>
            <TextWrap>Are you sure you want to edit user info?</TextWrap>
            <div style={{display: 'flex', maxWidth: '300px', width: '100%', justifyContent: 'space-between'}}>
                <ButtonWrap type='submit'>CONFIRM</ButtonWrap>
                <CancelButton w='130px' setIsOpen={callback} text='CANCEL'/>
            </div>
        </Container>
    )
}

export default EditUserPopup