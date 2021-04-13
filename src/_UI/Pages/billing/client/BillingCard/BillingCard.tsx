import React from "react";
//react-redux
import { useSelector } from "react-redux";
//BLL
import { AppStateType } from "../../../../../_BLL/store";
//types
import { BillingOperationType } from "../../../../../_BLL/types/billing/billingTypes";
import { ShippingTypesEnum } from "../../../../../_BLL/types/rates&surcharges/newSurchargesTypes";
//components
import BillingMapComponent from "./BillingMapComponent";
//styles
import {
  CardContainer,
  ChargeRow,
  ChargesBlock,
  ChargeTitle,
  ChargeValue,
  InformationWrapper,
  InfoText,
  InfoTitle,
  MainInfo,
  MapWrapper,
  Route,
  Row,
  ToBookText,
  ConfirmButton,
  RejectButton,
  NoMap,
} from "./billing-card-styles";
//icons
import plane_surcharge from "../../../../assets/icons/rates&services/plane-surcharge.svg";
import ship_surcharge from "../../../../assets/icons/rates&services/ship-surcharge.svg";
import IconLocation from "../../../../assets/icons/location_blue.svg";
import { useTranslation } from "react-i18next";
import {
  TotalLine,
  TotalName,
  TotalValue,
} from "../../../dashboard/search/search_rate_card/search-card-styles";

type PropTypes = {
  billing: BillingOperationType;
  cancelBooking?: (showPopup: boolean, id: number) => void;
  processPayment?: (showPopup: boolean, id: number) => void;
};

const BillingCard: React.FC<PropTypes> = ({
  billing,
  cancelBooking,
  processPayment,
}) => {
  const hasOriginCoordinates =
    billing.origin.coordinates?.hasOwnProperty("latitude") &&
    billing.origin.coordinates?.hasOwnProperty("longitude");

  const hasDestinationCoordinates =
    billing.destination.coordinates?.hasOwnProperty("latitude") &&
    billing.destination.coordinates?.hasOwnProperty("longitude");

  let current_user_role = useSelector(
    (state: AppStateType) => state.profile.authUserInfo?.roles
  );
  const { t } = useTranslation();
  return (
    <CardContainer>
      {hasOriginCoordinates && hasDestinationCoordinates ? (
        <BillingMapComponent
          loadingElement={<div />}
          containerElement={<MapWrapper />}
          mapElement={<div style={{ height: "233px" }} />}
          origin_coordinates={billing.origin.coordinates}
          destination_coordinates={billing.destination.coordinates}
        />
      ) : (
        <NoMap>
          <img src={IconLocation} alt="" style={{ marginRight: "7px" }} />
          {t("Dashboard/Map is not available")}
        </NoMap>
      )}

      <InformationWrapper>
        <Row style={{ justifyContent: "space-between" }}>
          <Route>
            <img
              src={
                billing.shipping_type === ShippingTypesEnum.SEA
                  ? ship_surcharge
                  : plane_surcharge
              }
              alt=""
            />
            <div>{`${billing.origin.code} - ${billing.destination.code}`}</div>
          </Route>
          {billing.status !== "Operation Complete" &&
            (current_user_role?.includes("master") ||
              current_user_role?.includes("billing")) && (
              <Row>
                <ConfirmButton
                  onClick={() =>
                    processPayment && processPayment(true, billing.id)
                  }
                >
                  {t("Billing/PAY")}
                </ConfirmButton>
                <RejectButton
                  onClick={() => {
                    cancelBooking && cancelBooking(true, billing.id);
                  }}
                >
                  {t("My Profile/CANCEL")}
                </RejectButton>
              </Row>
            )}
        </Row>
        <MainInfo>
          <Row>
            <InfoTitle>ACID</InfoTitle>
            <InfoText>{billing.aceid}</InfoText>
          </Row>
          <Row>
            <InfoTitle>{t("Bookings/STATUS")}</InfoTitle>
            <InfoText>{t(`Statuses/${billing.status}`)}</InfoText>
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
        {billing.status !== "Operation Complete" && (
          <ChargesBlock>
            <div style={{ width: "45%" }}>
              {billing.charges?.totals &&
                Object.keys(billing.charges?.totals).map(
                  (key: any) =>
                    !!billing.charges?.totals[key] && (
                      <TotalLine>
                        <TotalName>
                          {t("Bookings/CHARGES IN")} {key}:
                        </TotalName>
                        <TotalValue>{billing.charges?.totals[key]}</TotalValue>
                      </TotalLine>
                    )
                )}
            </div>
            <div style={{ width: "45%", position: "relative" }}>
              <ToBookText>{t("Bookings/to Book")}:</ToBookText>
              <ChargeRow>
                <ChargeTitle>{t("Dashboard/Acemaven Service Fee")}</ChargeTitle>
                <ChargeValue>
                  {`${billing.charges.pay_to_book?.currency} ${billing.charges.pay_to_book?.service_fee}`}
                </ChargeValue>
              </ChargeRow>
              <ChargeRow>
                <ChargeTitle>{t("Bookings/Booking Fee")}</ChargeTitle>
                <ChargeValue>
                  {`${billing.charges.pay_to_book?.currency} ${billing.charges.pay_to_book?.booking_fee}`}
                </ChargeValue>
              </ChargeRow>
            </div>
          </ChargesBlock>
        )}
      </InformationWrapper>
    </CardContainer>
  );
};

export default BillingCard;
//
