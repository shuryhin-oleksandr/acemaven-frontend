import React from 'react'
import {AddWrap, ButtonsWrap, Container, FormContainer, ListWrap, Title} from "./add-bank-container-styles";
import {VoidFunctionType} from "../../../../../_BLL/types/commonTypes";
import BankListContainer from "./BanksList/BankListContainer";

type PropsType = {
    setIsOpen: VoidFunctionType
}

const AddNewBank:React.FC<PropsType> = () => {
    return (
        <Container>
            <AddWrap>
                <FormContainer>
                    <Title>AddBankAccount</Title>
                </FormContainer>
               <ListWrap>
                   <BankListContainer/>
               </ListWrap>

            </AddWrap>
            <ButtonsWrap>

            </ButtonsWrap>
        </Container>
    )
}

export default AddNewBank