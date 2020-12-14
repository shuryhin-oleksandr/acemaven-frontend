import React from "react";
import {
  ButtonsWrap,
  CancelButton,
  CancelTitle,
  PopupContainer,
  PopupContent,
} from "./cancel-popup-styles";
import close from "../../../../_UI/assets/icons/close-icon.svg";
import {IconButton} from "@material-ui/core";

type PropsTypes = {
  setIsOpen: (value: boolean) => void;
  things: string
};

const CancelPopup: React.FC<PropsTypes> = ({ setIsOpen, things}) => {
  return (
    <PopupContainer>
      <PopupContent>
        <IconButton onClick={() => setIsOpen(false)} style={{position: "absolute", top: '20px', right: '20px'}}>
          <img src={close} alt="" />
        </IconButton>
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
