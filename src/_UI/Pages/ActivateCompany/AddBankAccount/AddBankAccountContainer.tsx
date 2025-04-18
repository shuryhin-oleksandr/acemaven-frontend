import React, { useState } from "react";
import styled from "styled-components";
import AddNewBank from "./AddNewBank";
import CancelPopup from "../../../components/PopUps/Cancel/CancelPopup";
import LayoutWithoutNav from "../../../components/BaseLayout/LayoutWithoutNav";
import ModalWindow from "../../../components/_commonComponents/ModalWindow/ModalWindow";
import {useTranslation} from "react-i18next";

const AddBankAccountContainer: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {t} = useTranslation();
  return (
    <Outer>
      <ModalWindow isOpen={isOpen}>
        <CancelPopup things={t("Booking Confirmation/Are you sure you want to cancel bank accounts adding?")} setIsOpen={setIsOpen} />
      </ModalWindow>
      <LayoutWithoutNav>
        <AddNewBank setIsOpen={setIsOpen} />
      </LayoutWithoutNav>
    </Outer>
  );
};

export default AddBankAccountContainer;

const Outer = styled.div`
  width: 100%;
  min-height: 100vh;
  height: 100%;
  position: relative;
`;
