import React from "react";
import { CostBookingType } from "../../../../../_BLL/types/bookingTypes";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import {
  HiddenTable,
  HiddenWrapper,
  TableTotal,
  TotalLine,
  TotalName,
  TotalValue,
} from "../../../../Pages/dashboard/search/search_rate_card/search-card-styles";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { useTranslation } from "react-i18next";

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
  operation_charges?: any;
  number_of_docs?: number | null;
};

const ChargesChangeTable: React.FC<PropsType> = ({
  operation_charges,
  number_of_docs,
}) => {
  const { t } = useTranslation();
  const column_object = [
    { name: t("Bookings/VOLUME"), align: "left" },
    { name: t("Bookings/TYPE"), align: "left" },
    { name: t("Bookings/CHARGE"), align: "left" },
    { name: t("Bookings/CURRENCY"), align: "left" },
    { name: t("Bookings/COST"), align: "right" },
    { name: t("Bookings/SUBTOTAL"), align: "right" },
  ];

  const classes = useStyles();

  return (
    <TableContainer className={classes.container} component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            {column_object.map((c: any, index: number) => (
              <TableCell key={index} className={classes.cell} align={c.align}>
                {t(`Bookings/${c.name}`)}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {operation_charges?.cargo_groups?.map((s: any) => (
            <TableRow key={s.cargo_type} className={classes.info_row}>
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
                <div>{s.freight.cost}</div>
                <div>{s.handling.cost}</div>
                {s.cold && <div>{s.cold.cost}</div>}
                {s.dangerous && <div>{s.dangerous.cost}</div>}
                <div>{s.other.cost}</div>
              </TableCell>
              <TableCell className={classes.innerCell} align="right">
                <div>{s.freight.subtotal}</div>
                <div>{s.handling.subtotal}</div>
                {s.cold && <div>{s.cold.subtotal}</div>}
                {s.dangerous && <div>{s.dangerous.subtotal}</div>}
                <div>{s.other.subtotal}</div>
              </TableCell>
            </TableRow>
          ))}
          <TableRow className={classes.info_row}>
            <TableCell className={classes.innerCell} scope="row">
              {operation_charges?.doc_fee?.volume}
            </TableCell>
            <TableCell className={classes.innerCell} align="left" />
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

      <TableTotal>
        {operation_charges?.totals &&
          operation_charges?.service_fee &&
          Object.keys(operation_charges?.totals).map(
            (key: any) =>
              !!operation_charges?.totals[key] && (
                <TotalLine>
                  <TotalName>
                    {t("Bookings/CHARGES IN")} {key}:
                  </TotalName>
                  <TotalValue>{operation_charges?.totals[key]}</TotalValue>
                </TotalLine>
              )
          )}

        {operation_charges?.booking_fee &&
          Object.keys(operation_charges?.booking_fee).map((key: any) => (
            <TotalLine>
              <TotalName>{t("Bookings/BOOKING FEE IN")} {key}:</TotalName>
              <TotalValue>{operation_charges?.booking_fee[key]}</TotalValue>
            </TotalLine>
          ))}
        {operation_charges?.service_fee && (
          <TotalLine>
            <TotalName>
              {t("Bookings/ACEMAVEN SERVICE FEE: IN")} {operation_charges?.service_fee?.currency}
              :
            </TotalName>
            <TotalValue>{operation_charges?.service_fee?.subtotal}</TotalValue>
          </TotalLine>
        )}

        {operation_charges?.exchange_rates &&
          Object.keys(operation_charges?.exchange_rates).length > 0 &&
          Object.keys(operation_charges?.exchange_rates).map((key: any) => (
            <TotalLine>
              <TotalName>{t("Quote bid screen/ACEMAVEN EXCHANGE RATE", {parameter: key})}:</TotalName>
              <TotalValue>{operation_charges?.exchange_rates[key]}</TotalValue>
            </TotalLine>
          ))}

        {/*{operation_charges?.pay_to_book && (*/}
        {/*  <TotalLine>*/}
        {/*    <TotalName>*/}
        {/*      TO BOOK IN {operation_charges?.pay_to_book?.currency}:*/}
        {/*    </TotalName>*/}
        {/*    <TotalValue>*/}
        {/*      {operation_charges?.pay_to_book?.pay_to_book}*/}
        {/*    </TotalValue>*/}
        {/*  </TotalLine>*/}
        {/*)}*/}
        {operation_charges?.totals_pure && (
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
            {Object.keys(operation_charges?.totals_pure).map(
              (key) =>
                !!operation_charges?.totals_pure[key] && (
                  <TotalLine>
                    <TotalName>{t("Bookings/CHARGES IN")} {key}:</TotalName>
                    <TotalValue>
                      {operation_charges?.totals_pure[key]}
                    </TotalValue>
                  </TotalLine>
                )
            )}
          </>
        )}
      </TableTotal>
    </TableContainer>
  );
};

export default ChargesChangeTable;
