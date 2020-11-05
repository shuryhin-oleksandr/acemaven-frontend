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
const close = require("../../../../_UI/assets/icons/close-icon.svg") as string;

type PropsTypes = {
  setIsOpen: VoidFunctionType;
  things: string
};

const CancelPopup: React.FC<PropsTypes> = ({ setIsOpen, things}) => {
  return (
    <PopupContainer>
      <PopupContent>
        <CloseBtn onClick={() => setIsOpen(false)}>
          <img src={close} alt="" />
        </CloseBtn>
        <CancelTitle>
          Are you sure you want to cancel {things} adding?
        </CancelTitle>
        <ButtonsWrap>
          <a style={{ textDecoration: "none" }} href="/">
            <CancelButton>CANCEL REGISTRATION</CancelButton>
          </a>
          <CancelButton onClick={() => setIsOpen(false)}>
            CONTINUE REGISTRATION
          </CancelButton>
        </ButtonsWrap>
      </PopupContent>
    </PopupContainer>
  );
};

export default CancelPopup;
