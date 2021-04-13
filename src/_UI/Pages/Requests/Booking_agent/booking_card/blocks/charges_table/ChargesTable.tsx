import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import {useTranslation} from "react-i18next";
import { CostBookingType } from "../../../../../../../_BLL/types/bookingTypes";
import {
  HiddenWrapper,
  TableTotal,
  TotalLine,
  TotalName,
  TotalValue,
} from "../../../../../dashboard/search/search_rate_card/search-card-styles";
import { AppOperationBookingStatusesType } from "../../../../../../../_BLL/types/operations/operationsTypes";

const useStyles = makeStyles({
  container: {
    boxShadow: "none",
    maxWidth: 700,
    minWidth: 650,
  },
  table: {
    "& .MuiTableHead-root": {},
  },
  row: {
    verticalAlign: "top",
  },
  cell: {
    color: "#115B86",
    fontFamily: "Helvetica Bold",
    fontSize: "14px",
    borderBottom: "1px solid #115b86",
    borderTop: "1px solid #115b86",
    padding: "10px 0",
    marginRight: "44px",
  },
  innerCell: {
    borderBottom: "1px solid #e0e0e0",
    fontFamily: "Helvetica Light",
    fontSize: "14px",
    color: "#1B1B25",
    height: "100px",
    padding: "16px 0 0",
  },
  innerCell_doc: {
    borderBottom: "1px solid #e0e0e0",
    fontFamily: "Helvetica Light",
    fontSize: "14px",
    color: "#1B1B25",
    height: "100px",
    padding: "5px 0 0",
  },
});

type PropsType = {
  charges_cost: any;
  charges_today_exchange:
    | {
        total_today: number;
        "EUR exchange rate"?: number;
        "USD exchange rate"?: number;
      }
    | null
    | undefined;
};

const ChargesTable: React.FC<PropsType> = ({
  charges_cost,
  charges_today_exchange,
}) => {
  const classes = useStyles();
  const {t} = useTranslation();

  return (
    <TableContainer className={classes.container} component={Paper}>
      <Table className={classes.table} aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell className={classes.cell} align="left">
                {t("Bookings/VOLUME")}
            </TableCell>
            <TableCell className={classes.cell} align="left">
                {t("Bookings/TYPE")}
            </TableCell>
            {/*<TableCell className={classes.cell} align="left">
                            CARGO DESCRIPTIONS
                        </TableCell>*/}
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
          {charges_cost?.cargo_groups.map((cc: any) => (
            <TableRow key={cc.cargo_type} className={classes.row}>
              <TableCell className={classes.innerCell} align="left">
                {cc.volume}
              </TableCell>
              <TableCell className={classes.innerCell} align="left">
                {cc.cargo_type}
              </TableCell>
              <TableCell className={classes.innerCell} align="left">
                <div>{t("Quote bid screen/FREIGHT")}</div>
                <div>{t("Quote bid screen/HANDLING")}</div>
                {cc.cold && <div>{t("Quote bid screen/COLD")}</div>}
                {cc.dangerous && <div>{t("Quote bid screen/DANGEROUS")}</div>}
                <div>{t("Quote bid screen/OTHERS")}</div>
              </TableCell>
              <TableCell className={classes.innerCell} align="center">
                <div>{cc.freight.currency}</div>
                <div>{cc.handling.currency}</div>
                {cc.cold && <div>{cc.cold.currency}</div>}
                {cc.dangerous && <div>{cc.dangerous.currency}</div>}
                <div>{cc.other.currency}</div>
              </TableCell>
              <TableCell className={classes.innerCell} align="right">
                <div>{cc.freight.cost_pure}</div>
                <div>{cc.handling.cost}</div>
                {cc.cold && <div>{cc.cold.cost}</div>}
                {cc.dangerous && <div>{cc.dangerous.cost}</div>}
                <div>{cc.other.cost}</div>
              </TableCell>
              <TableCell className={classes.innerCell} align="right">
                <div>{cc.freight.subtotal_pure}</div>
                <div>{cc.handling.subtotal}</div>
                {cc.cold && <div>{cc.cold.subtotal}</div>}
                {cc.dangerous && <div>{cc.dangerous.subtotal}</div>}
                <div>{cc.other.subtotal}</div>
              </TableCell>
            </TableRow>
          ))}
          <TableRow className={classes.row}>
            <TableCell className={classes.innerCell_doc} align="left">
              {charges_cost?.doc_fee.volume}
            </TableCell>
            <TableCell className={classes.innerCell_doc} align="left" />
            <TableCell className={classes.innerCell_doc} align="left">
              {t("Surcharges/DOCUMENT FEE")}
            </TableCell>
            <TableCell className={classes.innerCell_doc} align="center">
              {charges_cost?.doc_fee.currency}
            </TableCell>
            <TableCell className={classes.innerCell_doc} align="right">
              {charges_cost?.doc_fee.cost}
            </TableCell>
            <TableCell className={classes.innerCell_doc} align="right">
              {charges_cost?.doc_fee.subtotal}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <TableTotal>
        {charges_cost?.totals_pure &&
          Object.keys(charges_cost?.totals_pure).map(
            (key: any) =>
              !!charges_cost?.totals_pure[key] && (
                <TotalLine>
                  <TotalName>{t("Bookings/CHARGES IN")}{' '}{key}:</TotalName>
                  <TotalValue>{charges_cost?.totals_pure[key]}</TotalValue>
                </TotalLine>
              )
          )}
      </TableTotal>
    </TableContainer>
  );
};

export default ChargesTable;

//FIX TOTAL_PURE in the end!!
