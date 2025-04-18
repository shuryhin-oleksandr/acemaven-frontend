import React, { useEffect } from "react";
import {
  AddWrap,
  ButtonsWrap,
  Container,
  FormContainer,
  ListWrap,
  Title,
} from "./add-bank-container-styles";
import BankListContainer from "./BanksList/BankListContainer";
import AddBankForm from "./AddBankForm";
import BaseNextButton from "../../../components/base/BaseNextButton/index";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { getBanksList } from "../../../../_BLL/reducers/employeesAndBanksReducer";
import { AppStateType } from "../../../../_BLL/store";
import { NavLink } from "react-router-dom";
import RouteButton from "src/_UI/components/_commonComponents/buttons/route_button/RouteButton";
import {CancelButton} from "../CreateNewUser/add-new-user-styles";
import {useTranslation} from "react-i18next";

type PropsType = {
  setIsOpen: (value: boolean) => void;
};

const AddNewBank: React.FC<PropsType> = ({ setIsOpen }) => {
  const dispatch = useDispatch();
  let banksList = useSelector(
    (state: AppStateType) => state.company.banksAccounts
  );

  useEffect(() => {
    dispatch(getBanksList());
  }, [dispatch]);
  const {t} = useTranslation();
  return (
    <Container>
      <AddWrap>
        <FormContainer>
          <Title>{t("Add bank account/Add bank account")}</Title>
          <AddBankForm />
        </FormContainer>
        <ListWrap>
          <BankListContainer banksList={banksList} />
        </ListWrap>
      </AddWrap>
      <LineWrap />
      <ButtonsWrap>
        <NavWrap>
          <RouteButton path='/create/user'
                       text={t('Booking process/BACK')}
                       back='transparent'
                       textColor='#3B3B41'
                       border='1px solid #3B3B41'
                       w='100px'
                       h='40px'
                       fontSize='14px'
                       hover_color='rgba(0, 0, 0, .15)'
          />
          <CancelButton onClick={() => setIsOpen(true)}>{t("Bookings/CANCEL")}</CancelButton>
        </NavWrap>
          <NavLink style={{ textDecoration: "none" }} to="/create/finish">
            <BaseNextButton>{t("Booking process/NEXT")}</BaseNextButton>
          </NavLink>
      </ButtonsWrap>
    </Container>
  );
};

export default AddNewBank;

const LineWrap = styled.div`
  background-color: #115b86;
  height: 1px;
  width: 100%;
`;
const NavWrap = styled.div`
  display: flex;
  justify-content: space-between;
    max-width: 230px;
    width: 100%;
`
