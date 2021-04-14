import React from "react";
//material ui
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import makeStyles from "@material-ui/core/styles/makeStyles";
//types
import { CostBookingType } from "../../../../../../../_BLL/types/bookingTypes";
//styles
import {
  HiddenTable,
  HiddenWrapper,
  TableTotal,
  TotalLine,
  TotalName,
  TotalValue,
} from "../../../../../dashboard/search/search_rate_card/search-card-styles";
import { AppOperationBookingStatusesType } from "../../../../../../../_BLL/types/operations/operationsTypes";
import {useTranslation} from "react-i18next";

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
    borderBottom: "1px solid #115B86",
    borderTop: "1px solid #115B86",
    padding: "5px 0 5px",
  },
  innerMainCell: {
    borderBottom: "1px solid #E0E0E0;",
    fontFamily: "Helvetica Bold",
    fontSize: "16px",
    color: "#115B86",
  },
  innerCell: {
    borderBottom: "1px solid #E0E0E0",
    fontFamily: "Helvetica Light",
    fontSize: "16px",
    color: "#1B1B25",
    padding: "8px 0 0",
  },
});

type PropsType = {
  operation_charges: any;
  number_of_docs: number | null;
  charges_today_exchange:
    | {
        total_today: number;
        "EUR exchange rate"?: number;
        "USD exchange rate"?: number;
        today_exchange_rate: any;
      }
    | null
    | undefined;
  status?: string;
};

const ChargesBlockAgent: React.FC<PropsType> = ({
  operation_charges,
  number_of_docs,
  charges_today_exchange,
  status,
}) => {
  const classes = useStyles();
  const {t} = useTranslation();
  const column_object = [
    { name: t("Bookings/VOLUME"), align: "left" },
    { name: t("Bookings/TYPE"), align: "left" },
    { name: t("Bookings/CHARGE"), align: "left" },
    { name: t("Bookings/CURRENCY"), align: "left" },
    { name: t("Bookings/COST"), align: "right" },
    { name: t("Bookings/SUBTOTAL"), align: "right" },
  ];

  return (
    <HiddenWrapper margin_top={"30px"}>
      <HiddenTable>
        <TableContainer className={classes.container} component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                {column_object.map((c: any, index: number) => (
                  <TableCell
                    key={index}
                    className={classes.cell}
                    align={c.align}
                  >
                    {c.name}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {operation_charges?.cargo_groups?.map((s: any) => (
                <TableRow key={s.cargo_type} className={classes.info_row}>
                  <TableCell className={classes.innerCell} scope="row">
                    {s.volume}
                  </TableCell>
                  <TableCell className={classes.innerCell} align="left">
                    {s.cargo_type}
                  </TableCell>
                  <TableCell className={classes.innerCell} align="left">
                    <div>{t("Quote bid screen/FREIGHT")}</div>
                    <div>{t("Quote bid screen/HANDLING")}</div>
                    {s.cold && <div>{t("Quote bid screen/COLD")}</div>}
                    {s.dangerous && <div>{t("Quote bid screen/DANGEROUS")}</div>}
                    <div>{t("Quote bid screen/OTHERS")}</div>
                  </TableCell>
                  <TableCell className={classes.innerCell} align="left">
                    <div>{s.freight.currency}</div>
                    <div>{s.handling.currency}</div>
                    {s.cold && <div>{s.cold.currency}</div>}
                    {s.dangerous && <div>{s.dangerous.currency}</div>}
                    <div>{s.other.currency}</div>
                  </TableCell>
                  <TableCell className={classes.innerCell} align="right">
                    <div>{s.freight.cost_pure}</div>
                    <div>{s.handling.cost}</div>
                    {s.cold && <div>{s.cold.cost}</div>}
                    {s.dangerous && <div>{s.dangerous.cost}</div>}
                    <div>{s.other.cost}</div>
                  </TableCell>
                  <TableCell className={classes.innerCell} align="right">
                    <div>{s.freight.subtotal_pure}</div>
                    <div>{s.handling.subtotal}</div>
                    {s.cold && <div>{s.cold.subtotal}</div>}
                    {s.dangerous && <div>{s.dangerous.subtotal}</div>}
                    <div>{s.other.subtotal}</div>
                  </TableCell>
                </TableRow>
              ))}
              <TableRow className={classes.info_row}>
                <TableCell className={classes.innerCell} scope="row">
                  {number_of_docs ? number_of_docs : "1"}
                </TableCell>
                <TableCell
                  className={classes.innerCell}
                  align="left"
                ></TableCell>
                <TableCell className={classes.innerCell} align="left">
                  {t("Surcharges/DOCUMENT FEE")}
                </TableCell>
                <TableCell className={classes.innerCell} align="left">
                  {operation_charges?.doc_fee?.currency}
                </TableCell>
                <TableCell className={classes.innerCell} align="right">
                  {operation_charges?.doc_fee?.cost}
                </TableCell>
                <TableCell className={classes.innerCell} align="right">
                  {operation_charges?.doc_fee?.subtotal}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </HiddenTable>
      <TableTotal>
        {operation_charges?.totals_pure &&
          Object.keys(operation_charges?.totals_pure).map(
            (key: any) =>
              !!operation_charges?.totals_pure[key] && (
                <TotalLine>
                  <TotalName>{t("Bookings/CHARGES IN")} {key}:</TotalName>
                  <TotalValue>{operation_charges?.totals_pure[key]}</TotalValue>
                </TotalLine>
              )
          )}

        {charges_today_exchange &&
          status !== AppOperationBookingStatusesType.BOOKING_FEE_PENDING &&
          Object.keys(charges_today_exchange).length > 0 &&
          charges_today_exchange?.total_today && (
            <>
              {Object.keys(charges_today_exchange.today_exchange_rate).map(
                (key: any) =>
                  charges_today_exchange.today_exchange_rate[key] !== 1 && (
                    <TotalLine>
                      <TotalName>{t("Quote bid screen/Today's")} {key} {t("Billing/Exchange Rate")}:</TotalName>
                      <TotalValue>
                        {charges_today_exchange.today_exchange_rate[key]}
                      </TotalValue>
                    </TotalLine>
                  )
              )}
              <TotalLine>
                <TotalName font_family="Helvetica Bold, sans-serif">
                  {t("Quote bid screen/Total Today")}:
                </TotalName>
                <TotalValue font_family="Helvetica Bold, sans-serif">
                  {charges_today_exchange?.total_today}
                </TotalValue>
              </TotalLine>
            </>
          )}
      </TableTotal>
    </HiddenWrapper>
  );
};

export default ChargesBlockAgent;
