import React, { useEffect } from "react";
//material ui
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { IconButton } from "@material-ui/core";
//react-redux
import { useDispatch, useSelector } from "react-redux";
//BLL
import { AppStateType } from "../../../../_BLL/store";
import { getCompanyInfo } from "../../../../_BLL/thunks/profile/profileThunks";
import { bookingActions } from "../../../../_BLL/reducers/booking/bookingReducer";
import { getReleaseTypeChoices } from "../../../../_BLL/thunks/booking_client_thunk/bookingClientThunk";
import { quotesClientActions } from "../../../../_BLL/reducers/quotes/quotesClientReducer";
//types
import { VoidFunctionType } from "../../../../_BLL/types/commonTypes";
import { SearchResultType } from "../../../../_BLL/types/search/search_types";
//components
import RootShippingForm from "./forms/RootShippingForm";
import BaseButton from "../../base/BaseButton";
import PaymentContainer from "./payment/PaymentContainer";
import BookingCard from "../../../Pages/dashboard/search/search_rate_card/BookingCard";
//styles
import { PopupContainer, PopupContent, Heading } from "./client-popup-styles";
import {
  HiddenTable,
  HiddenTitle,
  HiddenWrapper,
  TableTotal,
  TotalLine,
  TotalName,
  TotalValue,
} from "../../../Pages/dashboard/search/search_rate_card/search-card-styles";
//icons
import close from "../../../assets/icons/close-icon.svg";
import { useTranslation } from "react-i18next";
import { Container, Message, QRWrapper } from "./payment/payment-styles";
import QRCode from "qrcode.react";
import { getClientQuotesThunk } from "../../../../_BLL/thunks/quotes/clientQuotesThunk";

const useStyles = makeStyles({
  container: {
    boxShadow: "none",
  },
  info_row: {
    "&:hover": {
      cursor: "pointer",
    },
  },
  cell: {
    color: "#115B86",
    fontFamily: "Helvetica Bold",
    fontSize: "16px",
    borderBottom: "1px solid white",
    padding: "16px 0 0",
  },
  innerMainCell: {
    borderBottom: "1px solid #E0E0E0;",
    fontFamily: "Helvetica Bold",
    fontSize: "16px",
    color: "#115B86",
  },
  innerCell: {
    borderBottom: "1px solid #E0E0E0;",
    fontFamily: "Helvetica Light",
    fontSize: "16px",
    color: "#1B1B25",
    padding: "8px 0 0",
    verticalAlign: "top"
  },
});

type PropsType = {
  setBookingPopupVisible: (value: boolean) => void;
  setWidgetsVisible?: (value: boolean) => void;
  shippingValue: number;
  currentFreightRate: SearchResultType;
  newSearch?: any;
  quote_dates?: { date_from: string; date_to: string };
  close_totals?: VoidFunctionType;
  quotes_mode?: boolean;
};

const ClientBookingPopUp: React.FC<PropsType> = ({
  setBookingPopupVisible,
  shippingValue,
  currentFreightRate,
  setWidgetsVisible,
  newSearch,
  ...props
}) => {
  const dispatch = useDispatch();
  const company = useSelector(
    (state: AppStateType) =>
      state.profile.authUserInfo?.companies &&
      state.profile.authUserInfo.companies[0]
  );
  const new_total = useSelector(
    (state: AppStateType) => state.booking.recalculated_cost
  );

  useEffect(() => {
    dispatch(getCompanyInfo(Number(company?.id)));
    return () => {
      dispatch(bookingActions.changeBookingStep("shipping-form"));
    };
  }, [dispatch]);

  useEffect(() => {
    dispatch(getReleaseTypeChoices());
  }, []);

  let companyInfo = useSelector(
    (state: AppStateType) => state.profile.companyInfo
  );
  let currentUser = useSelector(
    (state: AppStateType) => state.profile.authUserInfo
  );
  let bookingStep = useSelector(
    (state: AppStateType) => state.booking.booking_step
  );
  const classes = useStyles();

  //change step depends on 'paid' or 'not paid' & role
  let setNextStep = () => {
    if (new_total.is_paid) {
      dispatch(bookingActions.changeBookingStep("payment"));
    } else {
      if (currentUser?.roles?.includes("client")) {
        dispatch(bookingActions.changeBookingStep("payment"));
      } else {
        dispatch(bookingActions.changeBookingStep("payment"));
        //qr code
      }
    }
  };

  let closePopupHandler = () => {
    setBookingPopupVisible(false);
    setWidgetsVisible && setWidgetsVisible(true);
    props.quotes_mode &&
      dispatch(quotesClientActions.setFutureArchiveQuoteId(0));
  };
  const { t } = useTranslation();
  return (
    <PopupContainer>
      <PopupContent>
        <Heading>{t("Booking process/Booking process")}</Heading>
        <IconButton
          style={{ position: "absolute", top: "21px", right: "21px" }}
          onClick={closePopupHandler}
        >
          <img src={close} alt="" />
        </IconButton>
        <BookingCard
          button_display={false}
          search_result={currentFreightRate}
          showRatingPopup={() => {}}
        />
        {bookingStep === "shipping-form" && (
          <RootShippingForm
            companyInfo={companyInfo}
            currentUser={currentUser}
            shippingValue={shippingValue}
            currentFreightRate={currentFreightRate}
            quote_dates={props.quote_dates}
            quotes_mode={props.quotes_mode}
          />
        )}
        {bookingStep === "fee-table" && (
          <HiddenWrapper>
            {!new_total?.charges?.service_fee ? (
              <Message>
                {t(
                  "Booking process/The booking request will be sent to the agent."
                )}
              </Message>
            ) : !new_total.is_paid && currentUser?.roles?.includes("client") ? (
              <Message>{t("Booking process/Your_Booking")}</Message>
            ) : (
              <>
                <Message>{t("Billing/Mesaage_Bil_Allow")}</Message>
                <QRWrapper>
                  <QRCode
                    renderAs="svg"
                    value={
                      new_total.transactions &&
                      new_total.transactions.length > 0
                        ? new_total.transactions[0].qr_code
                        : ""
                    }
                  />
                </QRWrapper>
              </>
            )}

            <div style={{ display: "flex" }}>
              <HiddenTitle>{t("Bookings/CHARGES")}</HiddenTitle>
              <BaseButton
                onClick={() => {
                  setBookingPopupVisible(false);
                  setWidgetsVisible && setWidgetsVisible(true);
                  newSearch && newSearch();
                  props.close_totals && props.close_totals();
                  if (props.quotes_mode) {
                    dispatch(quotesClientActions.setFutureArchiveQuoteId(0));
                    dispatch(getClientQuotesThunk("sea", "", "", ""));
                  }
                }}
                type="button"
              >
                {t("Complete Profile/COMPLETE ACCOUNT")}
              </BaseButton>
              {/*)}*/}
            </div>
            <HiddenTable>
              <TableContainer className={classes.container} component={Paper}>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell className={classes.cell}>
                        {t("Bookings/VOLUME")}
                      </TableCell>
                      <TableCell className={classes.cell} align="left">
                        {t("Bookings/TYPE")}
                      </TableCell>
                      <TableCell className={classes.cell} align="left">
                        {t("Bookings/CHARGE")}
                      </TableCell>
                      <TableCell className={classes.cell} align="left">
                        {t("Bookings/CURRENCY")}
                      </TableCell>
                      <TableCell className={classes.cell} align="right">
                        {t("Bookings/COST")}
                      </TableCell>
                      <TableCell className={classes.cell} align="right">
                        {t("Bookings/SUBTOTAL")}
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {new_total?.charges?.cargo_groups?.map(
                      (s: any, index: number) => (
                        <TableRow key={index} className={classes.info_row}>
                          <TableCell className={classes.innerCell} scope="row">
                            {s?.volume}
                          </TableCell>
                          <TableCell className={classes.innerCell} align="left">
                            {s?.cargo_type}
                          </TableCell>
                          <TableCell className={classes.innerCell} align="left">
                            <div>{t("Quote bid screen/FREIGHT")}</div>
                            <div>{t("Quote bid screen/HANDLING")}</div>
                            {s.cold && <div>{t("Quote bid screen/COLD")}</div>}
                            {s.dangerous && (
                              <div>{t("Quote bid screen/DANGEROUS")}</div>
                            )}
                            <div>{t("Quote bid screen/OTHERS")}</div>
                          </TableCell>
                          <TableCell className={classes.innerCell} align="left">
                            <div>{s.freight.currency}</div>
                            <div>{s.handling.currency}</div>
                            {s.cold && <div>{s.cold.currency}</div>}
                            {s.dangerous && <div>{s.dangerous.currency}</div>}
                            <div>{s.other.currency}</div>
                          </TableCell>
                          <TableCell
                            className={classes.innerCell}
                            align="right"
                          >
                            <div>{s.freight.cost}</div>
                            <div>{s.handling.cost}</div>
                            {s.cold && <div>{s.cold.cost}</div>}
                            {s.dangerous && <div>{s.dangerous.cost}</div>}
                            <div>{s.other.cost}</div>
                          </TableCell>
                          <TableCell
                            className={classes.innerCell}
                            align="right"
                          >
                            <div>{s.freight.subtotal}</div>
                            <div>{s.handling.subtotal}</div>
                            {s.cold && <div>{s.cold.subtotal}</div>}
                            {s.dangerous && <div>{s.dangerous.subtotal}</div>}
                            <div>{s.other.subtotal}</div>
                          </TableCell>
                        </TableRow>
                      )
                    )}
                    <TableRow className={classes.info_row}>
                      <TableCell className={classes.innerCell} scope="row">
                        {new_total?.charges?.doc_fee?.volume}
                      </TableCell>
                      <TableCell className={classes.innerCell} align="left" />
                      <TableCell className={classes.innerCell} align="left">
                        {t("Surcharges/DOCUMENT FEE")}
                      </TableCell>
                      <TableCell className={classes.innerCell} align="left">
                        {new_total?.charges?.doc_fee?.currency}
                      </TableCell>
                      <TableCell className={classes.innerCell} align="right">
                        {new_total?.charges?.doc_fee?.cost}
                      </TableCell>
                      <TableCell className={classes.innerCell} align="right">
                        {new_total?.charges?.doc_fee?.subtotal}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </HiddenTable>
            <TableTotal>
              {new_total?.charges?.service_fee &&
                new_total?.charges?.totals &&
                Object.keys(new_total?.charges.totals).map(
                  (key: any) =>
                    !!new_total?.charges.totals[key] && (
                      <TotalLine>
                        <TotalName>
                          {t("Bookings/CHARGES IN")} {key}:
                        </TotalName>
                        <TotalValue>
                          {new_total?.charges.totals[key]}
                        </TotalValue>
                      </TotalLine>
                    )
                )}

              {new_total?.charges?.booking_fee &&
                Object.keys(new_total?.charges?.booking_fee).map((key: any) => (
                  <TotalLine>
                    <TotalName>
                      {t("Bookings/BOOKING FEE IN")} {key}:
                    </TotalName>
                    <TotalValue>
                      {new_total?.charges?.booking_fee[key]}
                    </TotalValue>
                  </TotalLine>
                ))}
              {new_total?.charges?.service_fee && (
                <TotalLine>
                  <TotalName>
                    {t("Bookings/ACEMAVEN SERVICE FEE IN")}{" "}
                    {new_total?.charges?.service_fee?.currency}:
                  </TotalName>
                  <TotalValue>
                    {new_total?.charges?.service_fee?.subtotal}
                  </TotalValue>
                </TotalLine>
              )}

              {new_total?.charges?.exchange_rates &&
                Object.keys(new_total?.charges?.exchange_rates).length > 0 &&
                Object.keys(new_total?.charges?.exchange_rates).map(
                  (key: any) => (
                    <TotalLine>
                      <TotalName>
                        {t("Quote bid screen/ACEMAVEN EXCHANGE RATE", {
                          parameter: key,
                        })}
                        :
                      </TotalName>
                      <TotalValue>
                        {new_total?.charges?.exchange_rates[key]}
                      </TotalValue>
                    </TotalLine>
                  )
                )}

              {new_total?.charges?.pay_to_book && (
                <TotalLine>
                  <TotalName>
                    {t("Bookings/TO BOOK IN")}{" "}
                    {new_total?.charges?.pay_to_book?.currency}:
                  </TotalName>
                  <TotalValue>
                    {new_total?.charges?.pay_to_book?.pay_to_book}
                  </TotalValue>
                </TotalLine>
              )}

              {new_total?.charges?.totals_pure && (
                <>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      marginBottom: 5,
                    }}
                  >
                    {t("Bookings/Remaining amount to be paid to the agent")}
                  </div>
                  {Object.keys(new_total?.charges?.totals_pure).map(
                    (key) =>
                      !!new_total?.charges?.totals_pure[key] && (
                        <TotalLine>
                          <TotalName>
                            {t("Bookings/CHARGES IN")} {key}:
                          </TotalName>
                          <TotalValue>
                            {new_total?.charges?.totals_pure[key]}
                          </TotalValue>
                        </TotalLine>
                      )
                  )}
                </>
              )}
            </TableTotal>
          </HiddenWrapper>
        )}
      </PopupContent>
    </PopupContainer>
  );
};

export default ClientBookingPopUp;
