import React from "react";
import {
  ButtonsWrap,
  CancelButton,
  CancelTitle,
  CloseBtn,
  PopupContainer,
  PopupContent,
} from "./cancel-popup-styles";
import { VoidFunctionType } from "../../../../_BLL/types/commonTypes";
import { NavLink } from "react-router-dom";
const close = require("../../../../_UI/assets/icons/close-icon.svg") as string;

type PropsTypes = {
  setIsOpen: VoidFunctionType;
};

const CancelPopup: React.FC<PropsTypes> = ({ setIsOpen }) => {
  return (
    <PopupContainer>
      <PopupContent>
        <CloseBtn onClick={() => setIsOpen(false)}>
          <img src={close} alt="" />
        </CloseBtn>
        <CancelTitle>
          Are you sure you want to cancel users adding?
        </CancelTitle>
        <ButtonsWrap>
          <NavLink style={{ textDecoration: "none" }} to="/">
            <CancelButton>Cancel registration</CancelButton>
          </NavLink>
          <CancelButton onClick={() => setIsOpen(false)}>
            Continue registration
          </CancelButton>
        </ButtonsWrap>
      </PopupContent>
    </PopupContainer>
  );
};

export default CancelPopup;
