import React from 'react'
import {ListEmpty, Subtitle, UpperTitle} from "./empty-list-styles";
import {useTranslation} from "react-i18next";

type PropsType = {
    text?: string
}

const EmptyList:React.FC<PropsType> = ({text}) => {
  const {t} = useTranslation();
    return (
        <ListEmpty>
            <UpperTitle>{text}</UpperTitle>
            <Subtitle>{t("Create New User/Fulfill the form at the left")}</Subtitle>
        </ListEmpty>
    )
}

export default EmptyList