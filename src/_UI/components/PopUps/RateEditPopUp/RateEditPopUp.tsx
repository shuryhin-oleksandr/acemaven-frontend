import React from "react";
import {
  PopupOuter,
  Content,
  Question,
  RegisterButton,
  ButtonGroup,
} from "./rate-edit-styles";
import CancelButton from "../../_commonComponents/buttons/navFormButtons/CancelButton";

type PropsType = {
  setRateEditPopUpVisible: (value: boolean) => void;
};

const RateEditPopUp: React.FC<PropsType> = ({ setRateEditPopUpVisible }) => {
  return (
    <PopupOuter>
      <Content>
        <Question>Do you want to save the changes?</Question>
        <ButtonGroup>
          <RegisterButton type="submit">Yes</RegisterButton>
          <CancelButton text="NO" setIsOpen={setRateEditPopUpVisible} />
        </ButtonGroup>
      </Content>
    </PopupOuter>
  );
};

export default RateEditPopUp;
