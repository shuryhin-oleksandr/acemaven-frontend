import React, {useEffect} from "react";
import {ButtonWrap, Container, TextWrap} from "./edit-popup-styles";
import styled from "styled-components";
import { DeepMap, FieldError } from "react-hook-form";
import {UserFromDataType} from "../../../../_BLL/types/addNewUserTypes";


type PropsType = {
    callback: (value: boolean) => void,
    errors: DeepMap<UserFromDataType, FieldError>
}

const EditUserPopup:React.FC<PropsType> = ({callback, errors}) => {

    useEffect(() => {
        if(Object.keys(errors).length !== 0) {
            callback(false)
        }
    }, [errors])

    return (
        <Container>
            <TextWrap>Are you sure you want to edit user info?</TextWrap>
            <div style={{display: 'flex', maxWidth: '300px', width: '100%', justifyContent: 'space-between'}}>
                <ButtonWrap type='submit'>CONFIRM</ButtonWrap>
                <CancelButtonWrap onClick={() => callback(false)} type='button'>CANCEL</CancelButtonWrap>
            </div>
        </Container>
    )
}

export default EditUserPopup

const CancelButtonWrap = styled.button`
font-family: "Helvetica Reg", sans-serif;
font-size: 14px;
background: white;
outline: none;
border: 1px solid #3B3B41;
height: 40px;
max-width: 130px;
width: 100%;
color: #3B3B41;
transition: .3s;

&:hover {
 transition: .3s;
 background-color: #E0E0E0;
cursor: pointer
}
`