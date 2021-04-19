import React from "react";
import {
  PopupOuter,
  Content,
  Question,
  RegisterButton,
  ButtonGroup,
} from "./rate-edit-styles";
import CancelButton from "../../_commonComponents/buttons/navFormButtons/CancelButton";
import {useTranslation} from "react-i18next";

type PropsType = {
  setRateEditPopUpVisible: (value: boolean) => void;
};

const RateEditPopUp: React.FC<PropsType> = ({ setRateEditPopUpVisible }) => {
  const {t} = useTranslation();
  return (
    <PopupOuter>
      <Content>
        <Question>{t("Freight rates/Do you want to save the changes?")}</Question>
        <ButtonGroup>
          <RegisterButton type="submit">{t("Surcharges/YES")}</RegisterButton>
          <CancelButton text={t("Surcharges/NO")} setIsOpen={setRateEditPopUpVisible} />
        </ButtonGroup>
      </Content>
    </PopupOuter>
  );
};

export default RateEditPopUp;
