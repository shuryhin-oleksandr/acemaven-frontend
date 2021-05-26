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
import { useTranslation } from "react-i18next";
import {
  TotalLine,
  TotalName,
  TotalValue,
} from "../../../dashboard/search/search_rate_card/search-card-styles";
import {useSelector} from "react-redux";
import {getExactOperationSelector} from "../../../../../_BLL/selectors/operations/agentOperationsSelector";

type PropsType = {
  billing: BillingOperationType;
};

const BillingInProgressCard: React.FC<PropsType> = ({ billing }) => {
  const { t } = useTranslation();
  let operation_info = useSelector(getExactOperationSelector);
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
          <InfoTitle>ACEID</InfoTitle>
          <InfoText>{billing.aceid}</InfoText>
        </div>
      </Route>
      <MainInfo>
        <Row>
          <InfoTitle>{t("Bookings/STATUS")}</InfoTitle>
          <InfoText>
            {/*{billing.status}*/}
            <div style={{fontFamily: 'Helvetica Reg', textTransform: 'uppercase'}}>
              {  operation_info?.automatic_tracking
                ? ((operation_info?.tracking && operation_info?.tracking[0].status && operation_info?.tracking[0].date_created )
                  ?
                  <div>
                    <span>${operation_info?.tracking[0].status}</span>
                  </div>
                  : `-`)
                : (billing.tracking[0]?.status
                  ?
                  <div>
                    <span>{t(`Statuses/${billing.tracking[0]?.status}`)}</span>
                  </div> : (t(`Statuses/${billing.status}`)))}
            </div>
          </InfoText>
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
          {billing.charges?.totals &&
            Object.keys(billing.charges?.totals).map(
              (key: any) =>
                !!billing.charges?.totals[key] && (
                  <TotalLine>
                    <TotalName>
                      {t("Bookings/Charges in")} {key}:
                    </TotalName>
                    <TotalValue>{billing.charges?.totals[key]}</TotalValue>
                  </TotalLine>
                )
            )}
        </div>
      </ChargesBlock>
    </BillingCardContainer>
  );
};

export default BillingInProgressCard;
