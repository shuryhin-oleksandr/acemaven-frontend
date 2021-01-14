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


type PropsType = {
  partner: ShipperType;
};

const PartnersCard: React.FC<PropsType> = ({ partner }) => {
  return (
    <PartnersCardOuter>
      <CardContent>
        <SpanWrap>
          <LabelWrap>Company name</LabelWrap>
          <TextWrap>{partner.name}</TextWrap>
        </SpanWrap>
        {partner.address_line_first && (
          <SpanWrap>
            <LabelWrap>Address</LabelWrap>
            <TextWrap>{partner.address_line_first}</TextWrap>
          </SpanWrap>
        )}
        <SpanWrap>
          <LabelWrap>City</LabelWrap>
          <TextWrap>{partner.city}</TextWrap>
        </SpanWrap>
        {partner.state && (
          <SpanWrap>
            <LabelWrap>State</LabelWrap>
            <TextWrap>{partner.state}</TextWrap>
          </SpanWrap>
        )}
        {partner.zip_code && (
          <SpanWrap>
            <LabelWrap>Zip code</LabelWrap>
            <TextWrap>{partner.zip_code}</TextWrap>
          </SpanWrap>
        )}
        <SpanWrap>
          <LabelWrap>Phone number</LabelWrap>
          <TextWrap>{partner.phone}</TextWrap>
        </SpanWrap>
        <SpanWrap>
          <LabelWrap>Email address</LabelWrap>
          <TextWrap>{partner.email}</TextWrap>
        </SpanWrap>
        <SpanWrap>
          <LabelWrap>Contact name</LabelWrap>
          <TextWrap>{partner.contact_name}</TextWrap>
        </SpanWrap>
      </CardContent>
    </PartnersCardOuter>
  );
};

export default PartnersCard;
