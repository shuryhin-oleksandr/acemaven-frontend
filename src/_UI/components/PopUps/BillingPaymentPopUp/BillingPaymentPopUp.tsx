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
  const classes = useStyles();
  return (
    <PopUpWrapper>
      <PopUpInner>
        <Heading>Payment process</Heading>
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
              <Title>CHARGES</Title>
              <BaseButton
                onClick={() => {
                  setQRStep(true);
                }}
                type="button"
              >
                Pay
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
                        <TableCell className={classes.cell}>VOLUME</TableCell>
                        <TableCell className={classes.cell} align="left">
                          TYPE
                        </TableCell>
                        <TableCell className={classes.cell} align="left">
                          CHARGE
                        </TableCell>
                        <TableCell className={classes.cell} align="left">
                          CURRENCY
                        </TableCell>
                        <TableCell className={classes.cell} align="right">
                          COST
                        </TableCell>
                        <TableCell className={classes.cell} align="right">
                          SUBTOTAL
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
                              <div>FREIGHT</div>
                              <div>HANDLING</div>
                              {s.cold && <div>COLD</div>}
                              {s.dangerous && <div>DANGEROUS</div>}
                              <div>OTHERS</div>
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
                          DOC FEE
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
                {booking?.charges?.totals &&
                  Object.keys(booking?.charges.totals).map(
                    (key: any) =>
                      !!booking?.charges.totals[key] && (
                        <TotalLine>
                          <TotalName>CHARGES IN {key}:</TotalName>
                          <TotalValue>
                            {booking?.charges.totals[key]}
                          </TotalValue>
                        </TotalLine>
                      )
                  )}
                {booking?.charges?.booking_fee &&
                  Object.keys(booking?.charges?.booking_fee).map((key: any) => (
                    <TotalLine>
                      <TotalName>BOOKING FEE IN {key}:</TotalName>
                      <TotalValue>
                        {booking?.charges?.booking_fee[key]}
                      </TotalValue>
                    </TotalLine>
                  ))}
                {booking?.charges?.service_fee && (
                  <TotalLine>
                    <TotalName>
                      ACEMAVEN SERVICE FEE IN{" "}
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
                        <TotalName>ACEMAVEN {key} EXCHANGE RATE:</TotalName>
                        <TotalValue>
                          {booking?.charges?.exchange_rates[key]}
                        </TotalValue>
                      </TotalLine>
                    )
                  )}

                {booking?.charges?.pay_to_book && (
                  <TotalLine>
                    <TotalName>
                      TO BOOK IN {booking?.charges?.pay_to_book?.currency}:
                    </TotalName>
                    <TotalValue>
                      {booking?.charges?.pay_to_book?.pay_to_book}
                    </TotalValue>
                  </TotalLine>
                )}
                {booking?.charges?.totals_pure &&
                  Object.keys(booking?.charges?.totals_pure).map(
                    (key) =>
                      !!booking?.charges?.totals_pure[key] && (
                        <TotalLine>
                          <TotalName>CHARGES IN {key}:</TotalName>
                          <TotalValue>
                            {booking?.charges?.totals_pure[key]}
                          </TotalValue>
                        </TotalLine>
                      )
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
