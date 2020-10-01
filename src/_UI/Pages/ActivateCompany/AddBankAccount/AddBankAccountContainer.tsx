import React, { useState } from "react";
import CancelPopup from "../../../components/PopUps/Cancel/CancelPopup";
import AddNewBank from "./AddNewBank";
import { useSelector } from "react-redux";
import { AppStateType } from "../../../../_BLL/store";
import styled from "styled-components";
import Spinner from "../../../components/_commonComponents/spinner/Spinner";
import LayoutWithoutNav from "../../../components/BaseLayout/LayoutWithoutNav";

const AddBankAccountContainer: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isFetching = useSelector(
    (state: AppStateType) => state.company.isFetching
  );

  return (
    <Outer>
      {isFetching && <Spinner />}
      {isOpen && <CancelPopup setIsOpen={setIsOpen} />}
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
