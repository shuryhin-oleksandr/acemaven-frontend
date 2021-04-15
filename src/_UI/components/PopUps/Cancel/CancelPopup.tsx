import React from "react";
import {
  ButtonsWrap,
  CancelButton,
  CancelTitle,
  PopupContainer,
  PopupContent,
  ContinueButton
} from "./cancel-popup-styles";
import close from "../../../../_UI/assets/icons/close-icon.svg";
import {IconButton} from "@material-ui/core";
import {useTranslation} from "react-i18next";

type PropsTypes = {
  setIsOpen: (value: boolean) => void;
  things: string
};

const CancelPopup: React.FC<PropsTypes> = ({ setIsOpen, things}) => {
  const {t} = useTranslation();
  return (
    <PopupContainer>
      <PopupContent>
        <IconButton onClick={() => setIsOpen(false)} style={{position: "absolute", top: '20px', right: '20px'}}>
          <img src={close} alt="" />
        </IconButton>
        <CancelTitle>
         {things}
        </CancelTitle>
        <ButtonsWrap>
          <a style={{ textDecoration: "none", marginRight:'15px', width: '165px' }} href="/">
            <CancelButton>{t("Bookings/CANCEL")}</CancelButton>
          </a>
          <ContinueButton onClick={() => setIsOpen(false)}>
            {t("Bookings/CONTINUE")}
          </ContinueButton>
        </ButtonsWrap>
      </PopupContent>
    </PopupContainer>
  );
};

export default CancelPopup;
