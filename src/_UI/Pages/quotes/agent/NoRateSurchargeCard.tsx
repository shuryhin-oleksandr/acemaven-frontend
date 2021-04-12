import React from 'react'
//styles
import {NoRatesContent, NoRatesOuter, RegisterButton} from "./table/agent-quotes-styles";
import {useTranslation} from "react-i18next";

type PropsType = {
    openCreatePopup: (value: boolean) => void
}

const NoRateSurchargeCard:React.FC<PropsType> = ({openCreatePopup}) => {
  const {t} = useTranslation();
    return (
        <NoRatesOuter>
            <NoRatesContent>
              {t("Surcharges/There_freight")}
            </NoRatesContent>
            <RegisterButton type={'button'} onClick={() => openCreatePopup(true)}>{t("Surcharges/REGISTER NEW")}</RegisterButton>
        </NoRatesOuter>
    )
}

export default NoRateSurchargeCard

