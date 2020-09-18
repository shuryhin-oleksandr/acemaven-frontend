import React from 'react'
import styled from "styled-components";

type PropsType = {
    setIsEdit?: (value: boolean) => void,
    text?: string
}

const CancelEditButton:React.FC<PropsType> = ({text, setIsEdit}) => {
    return (
        <CancelButtonWrap type='button' onClick={() => setIsEdit && setIsEdit(false) }>{text}</CancelButtonWrap>
    )
}

export default CancelEditButton

const CancelButtonWrap = styled.button`
font-family: "Helvetica Bold", sans-serif;
font-size: 14px;
background: white;
outline: none;
border: 1px solid #3B3B41;
height: 40px;
max-width: 115px;
min-width: 115px;
width: 100%;
color: #3B3B41;

&:hover {
cursor: pointer
}
`