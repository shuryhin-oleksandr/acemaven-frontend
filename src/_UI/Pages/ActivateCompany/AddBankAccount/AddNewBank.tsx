import React, {useEffect} from 'react'
import {AddWrap, ButtonsWrap, Container, FormContainer, ListWrap, Title} from "./add-bank-container-styles";
import {VoidFunctionType} from "../../../../_BLL/types/commonTypes";
import BankListContainer from "./BanksList/BankListContainer";
import AddBankForm from "./AddBankForm";
import CancelButton from "../../../components/_commonComponents/buttons/navFormButtons/CancelButton";
import BaseNextButton from "../../../components/base/BaseNextButton/index";
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {getBanksList} from "../../../../_BLL/reducers/employeesAndBanksReducer";
import {AppStateType} from "../../../../_BLL/store";
import {NavLink} from "react-router-dom";


type PropsType = {
    setIsOpen: VoidFunctionType
}

const AddNewBank:React.FC<PropsType> = ({setIsOpen}) => {
    const dispatch = useDispatch()
    let banksList = useSelector((state: AppStateType) => state.company.banksAccounts)

    useEffect(() => {
        dispatch(getBanksList())
    }, [dispatch])

    return (
        <Container>
            <AddWrap>
                <FormContainer>
                    <Title>Add bank account</Title>
                    <AddBankForm/>
                </FormContainer>
               <ListWrap>
                   <BankListContainer banksList={banksList}/>
               </ListWrap>
            </AddWrap>
            <LineWrap />
            <ButtonsWrap>
                <CancelButton setIsOpen={setIsOpen} text='CANCEL'/>
                <NavLink style={{textDecoration: "none"}} to='/create/finish'><BaseNextButton>NEXT</BaseNextButton></NavLink>
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