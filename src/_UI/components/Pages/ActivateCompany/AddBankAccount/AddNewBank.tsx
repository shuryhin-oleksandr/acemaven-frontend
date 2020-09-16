import React from 'react'
import {AddWrap, ButtonsWrap, Container, FormContainer, ListWrap, Title} from "./add-bank-container-styles";
import {VoidFunctionType} from "../../../../../_BLL/types/commonTypes";
import BankListContainer from "./BanksList/BankListContainer";
import AddBankForm from "../../../Forms/AddBankForm";
import CancelButton from "../../../_commonComponents/buttons/navFormButtons/CancelButton";
import BaseNextButton from "../../../base/BaseNextButton";
import styled from "styled-components";


type PropsType = {
    setIsOpen: VoidFunctionType
}

const AddNewBank:React.FC<PropsType> = ({setIsOpen}) => {
    return (
        <Container>
            <AddWrap>
                <FormContainer>
                    <Title>Add bank account</Title>
                    <AddBankForm/>
                </FormContainer>
               <ListWrap>
                   <BankListContainer/>
               </ListWrap>
            </AddWrap>
            <LineWrap />
            <ButtonsWrap>
                <CancelButton setIsOpen={setIsOpen} text='Cancel'/>
                <BaseNextButton>Next</BaseNextButton>
            </ButtonsWrap>
        </Container>
    )
}

export default AddNewBank

const LineWrap = styled.div`
background-color: #115B86;
height: 1px;
width: 100%;
`