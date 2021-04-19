import React from "react";
import {
  CardButton,
  CardInner,
  CardTitle,
  SurchargeCardWrapper,
} from "./form-styles";


import {ContainerType} from "../../../../../_BLL/types/rates&surcharges/surchargesTypes";
import {useTranslation} from "react-i18next";

type PropsType = {
  setNewSurchargePopUpVisible: (value: boolean) => void;
  shippingValue?: any,
  usageFees?: ContainerType[] | null
};

const NoSurchargeCard: React.FC<PropsType> = ({
  setNewSurchargePopUpVisible,
    usageFees
}) => {

  const {t} = useTranslation();
  return (
    <SurchargeCardWrapper usageFees={usageFees ? usageFees : undefined} >
      <CardInner>
        <CardTitle>
          {t("Freight rates/There are no surcharges. The rate won´t be posted until a matching surcharge agreement is created. ")}
        </CardTitle>
        <CardButton type='button' onClick={() => setNewSurchargePopUpVisible(true)}>
          {t("Freight rates/REGISTER NEW SURCHARGE")}
        </CardButton>
      </CardInner>
    </SurchargeCardWrapper>
  );
};

export default NoSurchargeCard;
