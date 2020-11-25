import React from "react";
import {
  ButtonsWrap,
  CancelButton,
  CancelTitle,
  CloseBtn,
  PopupContainer,
  PopupContent,
} from "./cancel-popup-styles";
import close from "../../../../_UI/assets/icons/close-icon.svg";

type PropsTypes = {
  setIsOpen: (value: boolean) => void;
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
          <a style={{ textDecoration: "none", marginRight:'15px', width: '165px' }} href="/">
            <CancelButton>CANCEL</CancelButton>
          </a>
          <CancelButton onClick={() => setIsOpen(false)}>
            CONTINUE
          </CancelButton>
        </ButtonsWrap>
      </PopupContent>
    </PopupContainer>
  );
};

export default CancelPopup;
