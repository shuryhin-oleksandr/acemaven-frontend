import React from "react";
import styled from "styled-components";
import {useTranslation} from "react-i18next";


type PropsType = {
    setIsAdd: (value: boolean) => void,
    disabled?: boolean
}

const AddNewButton:React.FC<PropsType> = ({setIsAdd, disabled}) => {
    // debugger
    const {t} = useTranslation();
    console.log("o/")
    return (
        <AddButton onClick={() => setIsAdd(true)} disabled={!!disabled}>
            <span>+ {t("User Management/Add new")}</span>
        </AddButton>
    )
}

export default AddNewButton

const AddButton = styled.button`
  width: 100%;
  height: 60px;
  border: 1px dashed #828282;
  background: none;
  outline: none;
  color: #828282;
  font-family: "Helvetica Bold", sans-serif;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  transition: .3s;
  
  &:hover {
    cursor: pointer;
    transition: .3s;
    background-color: rgba(0,0 ,0 , .07);
  }
  
   &:disabled {
    cursor: not-allowed;
  }
`