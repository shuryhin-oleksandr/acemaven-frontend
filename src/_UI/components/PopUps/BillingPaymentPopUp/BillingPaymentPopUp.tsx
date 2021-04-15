import React, { useState } from "react";

import { IconButton } from "@material-ui/core";
import close_icon from "../../../assets/icons/close-icon.svg";

import { useDispatch } from "react-redux";
import {
  Heading,
  PopUpInner,
  PopUpWrapper,
  Title,
} from "./billing-payment-popup-styles";
import { BillingOperationType } from "../../../../_BLL/types/billing/billingTypes";
import BookingCard from "../../../Pages/dashboard/search/search_rate_card/BookingCard";
import ChargesChangeTable from "../ClientOperationChangeRequestPopUp/ChargesChangeTable/ChargesChangeTable";
import BaseButton from "../../base/BaseButton";
import ActiveQRPayment from "../ClientBookingPopUp/payment/ActiveQRPayment";
import {useTranslation} from "react-i18next";
import {
  HiddenTable,
  HiddenTitle,
  HiddenWrapper,
  TableTotal,
  TotalLine,
  TotalName,
  TotalValue,
} from "../../../Pages/dashboard/search/search_rate_card/search-card-styles";
import { bookingActions } from "../../../../_BLL/reducers/booking/bookingReducer";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import makeStyles from "@material-ui/core/styles/makeStyles";

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
  },
});

type PropsType = {
  setBillingPaymentPopUpVisible: (value: boolean) => void;
  booking?: any;
  // booking?: BillingOperationType;
};

const BillingPaymentPopUp: React.FC<PropsType> = ({
  booking,
  setBillingPaymentPopUpVisible,
}) => {
  const dispatch = useDispatch();
  // let result_obj = { ...booking?.charges, freight_rate: booking?.freight_rate };
  const [QRStep, setQRStep] = useState(false);
  const {t} = useTranslation();
  const classes = useStyles();
  return (
    <PopUpWrapper>
      <PopUpInner>
        <Heading>{t("Billing/Payment process")}</Heading>
        <IconButton
          onClick={() => setBillingPaymentPopUpVisible(false)}
          style={{ position: "absolute", top: "20px", right: "20px" }}
        >
          <img src={close_icon} alt="" />
        </IconButton>
        <BookingCard
          button_display={false}
          search_result={booking?.charges}
          showRatingPopup={() => {}}
        />

        {QRStep ? (
          <div style={{ marginTop: "20px" }}>
            <ActiveQRPayment
              setBookingPopupVisible={setBillingPaymentPopUpVisible}
              transactions={booking?.transactions}
            />
          </div>
        ) : (
          <>
            <div
              style={{
                display: "flex",
                margin: "20px 0 30px",
                alignItems: "center",
              }}
            >
              <Title>{t("Bookings/CHARGES")}</Title>
              <BaseButton
                onClick={() => {
                  setQRStep(true);
                }}
                type="button"
              >
                {t("Billing/PAY")}
              </BaseButton>
            </div>
            {/*<ChargesChangeTable*/}
            {/*  operation_charges={booking?.charges}*/}
            {/*  number_of_docs={booking?.number_of_documents}*/}
            {/*/>*/}
            <HiddenWrapper>
              <HiddenTable>
                <TableContainer className={classes.container} component={Paper}>
                  <Table aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell className={classes.cell}>{t("Bookings/VOLUME")}</TableCell>
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
                      {booking?.charges?.cargo_groups?.map(
                        (s: any, index: number) => (
                          <TableRow key={index} className={classes.info_row}>
                            <TableCell
                              className={classes.innerCell}
                              scope="row"
                            >
                              {s?.volume}
                            </TableCell>
                            <TableCell
                              className={classes.innerCell}
                              align="left"
                            >
                              {s?.cargo_type}
                            </TableCell>
                            <TableCell
                              className={classes.innerCell}
                              align="left"
                            >
                              <div>{t("Quote bid screen/FREIGHT")}</div>
                              <div>{t("Quote bid screen/HANDLING")}</div>
                              {s.cold && <div>{t("Quote bid screen/COLD")}</div>}
                              {s.dangerous && <div>{t("Quote bid screen/DANGEROUS")}</div>}
                              <div>{t("Quote bid screen/OTHERS")}</div>
                            </TableCell>
                            <TableCell
                              className={classes.innerCell}
                              align="left"
                            >
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
                          {booking?.charges?.doc_fee?.volume}
                        </TableCell>
                        <TableCell className={classes.innerCell} align="left" />
                        <TableCell className={classes.innerCell} align="left">
                          {t("Surcharges/DOCUMENT FEE")}
                        </TableCell>
                        <TableCell className={classes.innerCell} align="left">
                          {booking?.charges?.doc_fee?.currency}
                        </TableCell>
                        <TableCell className={classes.innerCell} align="right">
                          {booking?.charges?.doc_fee?.cost}
                        </TableCell>
                        <TableCell className={classes.innerCell} align="right">
                          {booking?.charges?.doc_fee?.subtotal}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </HiddenTable>
              <TableTotal>
                {booking?.charges?.service_fee &&
                  booking?.charges?.totals &&
                  Object.keys(booking?.charges.totals).map(
                    (key: any) =>
                      !!booking?.charges.totals[key] && (
                        <TotalLine>
                          <TotalName>{t("Bookings/CHARGES IN")}{" "}{key}:</TotalName>
                          <TotalValue>
                            {booking?.charges.totals[key]}
                          </TotalValue>
                        </TotalLine>
                      )
                  )}
                {booking?.charges?.booking_fee &&
                  Object.keys(booking?.charges?.booking_fee).map((key: any) => (
                    <TotalLine>
                      <TotalName>{t("Bookings/BOOKING FEE IN")}{" "}{key}:</TotalName>
                      <TotalValue>
                        {booking?.charges?.booking_fee[key]}
                      </TotalValue>
                    </TotalLine>
                  ))}
                {booking?.charges?.service_fee && (
                  <TotalLine>
                    <TotalName>
                      {t("Bookings/ACEMAVEN SERVICE FEE: IN")}{" "}
                      {booking?.charges?.service_fee?.currency}:
                    </TotalName>
                    <TotalValue>
                      {booking?.charges?.service_fee?.subtotal}
                    </TotalValue>
                  </TotalLine>
                )}

                {booking?.charges?.exchange_rates &&
                  Object.keys(booking?.charges?.exchange_rates).length > 0 &&
                  Object.keys(booking?.charges?.exchange_rates).map(
                    (key: any) => (
                      <TotalLine>
                        <TotalName>{t("Quote bid screen/ACEMAVEN EXCHANGE RATE", {parameter: key})}:</TotalName>
                        <TotalValue>
                          {booking?.charges?.exchange_rates[key]}
                        </TotalValue>
                      </TotalLine>
                    )
                  )}

                {booking?.charges?.pay_to_book && (
                  <TotalLine>
                    <TotalName>
                      {t("Bookings/TO BOOK IN")}{' '}{booking?.charges?.pay_to_book?.currency}:
                    </TotalName>
                    <TotalValue>
                      {booking?.charges?.pay_to_book?.pay_to_book}
                    </TotalValue>
                  </TotalLine>
                )}
                {booking?.charges?.totals_pure && (
                  <>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        marginBottom: 5,
                      }}
                    >
                      Remaining amount to be paid to the agent
                    </div>
                    {Object.keys(booking?.charges?.totals_pure).map(
                      (key) =>
                        !!booking?.charges?.totals_pure[key] && (
                          <TotalLine>
                            <TotalName>{t("Bookings/CHARGES IN")}{" "}{key}:</TotalName>
                            <TotalValue>
                              {booking?.charges?.totals_pure[key]}
                            </TotalValue>
                          </TotalLine>
                        )
                    )}
                  </>
                )}
              </TableTotal>
            </HiddenWrapper>
          </>
        )}
      </PopUpInner>
    </PopUpWrapper>
  );
};

export default BillingPaymentPopUp;
