import React, { useState } from "react";
import CancelPopup from "../../../components/PopUps/Cancel/CancelPopup";
import AddNewBank from "./AddNewBank";
import styled from "styled-components";
import LayoutWithoutNav from "../../../components/BaseLayout/LayoutWithoutNav";

const AddBankAccountContainer: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Outer>
      {isOpen && <CancelPopup things={'bank accounts'} setIsOpen={setIsOpen} />}
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
