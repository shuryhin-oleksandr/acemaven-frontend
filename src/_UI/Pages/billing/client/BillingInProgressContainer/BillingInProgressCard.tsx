import React from "react";
//styles
import {
  BillingCardContainer,
  InfoText,
  InfoTitle,
  Route,
  RouteText,
  ChargeRow,
  ChargesBlock,
  ChargeTitle,
  ChargeValue,
  MainInfo,
  Row,
  DueToText,
} from "./billing-in-progress-styles";
//icons
import sea_type from "../../../../assets/icons/rates&services/ship-surcharge.svg";
import air_type from "../../../../assets/icons/rates&services/plane-surcharge.svg";
import { BillingOperationType } from "../../../../../_BLL/types/billing/billingTypes";
import moment from "moment";
import { ShippingTypesEnum } from "../../../../../_BLL/types/rates&surcharges/newSurchargesTypes";
import {useTranslation} from "react-i18next";

type PropsType = {
  billing: BillingOperationType;
};

const BillingInProgressCard: React.FC<PropsType> = ({ billing }) => {
  const {t} =useTranslation();
  return (
    <BillingCardContainer>
      <Route>
        <img
          src={
            billing.shipping_type === ShippingTypesEnum.SEA
              ? sea_type
              : air_type
          }
          alt=""
        />
        <div style={{ marginLeft: "9px" }}>
          <RouteText>{`${billing.origin.code} - ${billing.destination.code}`}</RouteText>
          <InfoTitle>ACID</InfoTitle>
          <InfoText>{billing.aceid}</InfoText>
        </div>
      </Route>
      <MainInfo>
        <Row>
          <InfoTitle>{t("Bookings/STATUS")}</InfoTitle>
          <InfoText>{billing.status}</InfoText>
        </Row>
        <Row>
          <InfoTitle>{t("Bookings/SHIPPING MODE")}</InfoTitle>
          <InfoText>{billing.shipping_mode}</InfoText>
        </Row>
        {billing.dates && (
          <Row>
            <InfoTitle>{t("Bookings/DATES")}</InfoTitle>
            <InfoText>{billing.dates}</InfoText>
          </Row>
        )}
      </MainInfo>
      <ChargesBlock>
        <div style={{ width: "100%" }}>
          {billing.payment_due_by && (
            <DueToText>{`due to ${moment(
              billing.payment_due_by,
              "DD-MM-YYYY"
            ).format("MMMM Do  YYYY")} :`}</DueToText>
          )}
          {!!billing.charges.totals.USD && (
            <ChargeRow>
              <ChargeTitle>{t("Bookings/CHARGES IN")} USD</ChargeTitle>
              <ChargeValue>{billing.charges.totals.USD.toFixed(2)}</ChargeValue>
            </ChargeRow>
          )}
          {!!billing.charges.totals.BRL && (
            <ChargeRow>
              <ChargeTitle>{t("Bookings/CHARGES IN")} BRL</ChargeTitle>
              <ChargeValue>{billing.charges.totals.BRL.toFixed(2)}</ChargeValue>
            </ChargeRow>
          )}
          {!!billing.charges.totals.EUR && (
            <ChargeRow>
              <ChargeTitle>{t("Bookings/CHARGES IN")} EUR</ChargeTitle>
              <ChargeValue>{billing.charges.totals.EUR.toFixed(2)}</ChargeValue>
            </ChargeRow>
          )}
        </div>
      </ChargesBlock>
    </BillingCardContainer>
  );
};

export default BillingInProgressCard;
