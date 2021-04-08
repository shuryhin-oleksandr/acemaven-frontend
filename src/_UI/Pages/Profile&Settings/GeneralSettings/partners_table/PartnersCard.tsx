import React from "react";
//types
import { ShipperType } from "../../../../../_BLL/types/bookingTypes";
//styles
import {
  CardContent,
  LabelWrap,
  PartnersCardOuter,
  SpanWrap,
  TextWrap,
} from "./partenrs-table-style";
import {useTranslation} from "react-i18next";


type PropsType = {
  partner: ShipperType;
};

const PartnersCard: React.FC<PropsType> = ({ partner }) => {
  const {t} = useTranslation();
  return (
    <PartnersCardOuter>
      <CardContent>
        <SpanWrap>
          <LabelWrap>{t("Register/Company Name")}</LabelWrap>
          <TextWrap>{partner.name}</TextWrap>
        </SpanWrap>
        {partner.address_line_first && (
          <SpanWrap>
            <LabelWrap>{t("Register/Address")}</LabelWrap>
            <TextWrap>{partner.address_line_first}</TextWrap>
          </SpanWrap>
        )}
        <SpanWrap>
          <LabelWrap>{t("Register/City")}</LabelWrap>
          <TextWrap>{partner.city}</TextWrap>
        </SpanWrap>
        {partner.state && (
          <SpanWrap>
            <LabelWrap>{t("Register/State")}</LabelWrap>
            <TextWrap>{partner.state}</TextWrap>
          </SpanWrap>
        )}
        {partner.zip_code && (
          <SpanWrap>
            <LabelWrap>{t("Register/Zip Code")}</LabelWrap>
            <TextWrap>{partner.zip_code}</TextWrap>
          </SpanWrap>
        )}
        <SpanWrap>
          <LabelWrap>{t("Register/Phone Number")}</LabelWrap>
          <TextWrap>{partner.phone}</TextWrap>
        </SpanWrap>
        <SpanWrap>
          <LabelWrap>{t("Register/Email")}</LabelWrap>
          <TextWrap>{partner.email}</TextWrap>
        </SpanWrap>
        <SpanWrap>
          <LabelWrap>{t("Register/Contact Name")}</LabelWrap>
          <TextWrap>{partner.contact_name}</TextWrap>
        </SpanWrap>
      </CardContent>
    </PartnersCardOuter>
  );
};

export default PartnersCard;
