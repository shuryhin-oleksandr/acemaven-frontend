import React from "react";
import closeIcon from "../../../../assets/icons/profile/closeForm.svg";
import done from "../../../../assets/icons/profile/add.svg";
import styled from "styled-components";


type PropsType = {
    closeCallback?: (id:number, value: boolean) => void
}

const FinishFormButtons:React.FC<PropsType> = ({closeCallback}) => {
    return (
        <ActionsWrap>
            <CloseButton type='button' onClick={() => closeCallback && closeCallback(0, false)}><img src={closeIcon} alt=""/></CloseButton>
            <DoneButton type='submit'><img src={done} alt=""/></DoneButton>
        </ActionsWrap>
    )
}

export default FinishFormButtons


export const ActionsWrap = styled.div`
display: flex;
position: absolute;
top: 2%;
right: 1%;
`
export const DoneButton = styled.button`
background: none;
outline: none;
border: none;

 &:hover {
  cursor: pointer
 }
`
export const CloseButton = styled.button`
background: none;
outline: none;
border: none;
padding-right: 0;

&:hover {
  cursor: pointer
 }
`