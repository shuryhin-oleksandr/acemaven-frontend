import React from "react";
import { ActivateContainer, ActivateInner, EndButton, EndText } from "./activate-end-styles";
import {useTranslation} from "react-i18next";


const ActivateEnd:React.FC = () => {
  const {t} = useTranslation();
    return (
        <ActivateContainer>
            <ActivateInner>
                <EndText>{t("Add bank account/You have completed all the fields.")}</EndText>
                <a style={{textDecoration: "none"}} href='/'><EndButton style={{textTransform: "uppercase"}}>{t("Add bank account/Got it!")}</EndButton></a>
            </ActivateInner>
        </ActivateContainer>
    )
}


export default ActivateEnd