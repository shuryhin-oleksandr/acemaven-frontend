import React from 'react'
import styled from "styled-components";

type PropsType = {
    setIsOpen?: (value: boolean) => void,
    text?: string,
    w?: string
}

const CancelButton:React.FC<PropsType> = ({text, setIsOpen, w}) => {
    return (
        <CancelButtonWrap w={w} onClick={() => setIsOpen && setIsOpen(true) }>{text}</CancelButtonWrap>
    )
}

export default CancelButton

type PropsStyle = {
    w? : string
}

const CancelButtonWrap = styled.button<PropsStyle>`
font-family: "Helvetica Reg", sans-serif;
font-size: 14px;
background: white;
outline: none;
border: 1px solid #3B3B41;
height: 40px;
max-width: ${({w}) => w ? w : '115px'};
width: 100%;
color: #3B3B41;
transition: .3s;

&:hover {
 transition: .3s;
 background-color: #E0E0E0;
cursor: pointer
}
`