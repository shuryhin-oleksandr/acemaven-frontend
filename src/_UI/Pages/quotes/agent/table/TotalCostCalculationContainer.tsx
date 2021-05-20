import React from "react";
import {
  HiddenTable,
  HiddenTitle,
  HiddenWrapper,
  TableTotal,
  TotalLine,
  TotalName,
  TotalValue,
} from "../../../dashboard/search/search_rate_card/search-card-styles";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { useTranslation } from "react-i18next";
type PropsType = {
  calculation: any;
};

const useStyles = makeStyles({
  container: {
    boxShadow: "none",
  },
  table: {
    "& .MuiTableHead-root": {},
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

const TotalCostCalculationContainer: React.FC<PropsType> = ({
  calculation,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();
  return (
    <HiddenWrapper margin_top={"28px"}>
      <HiddenTitle>{t("Bookings/CHARGES")}</HiddenTitle>
      <HiddenTable>
        <TableContainer className={classes.container} component={Paper}>
          <Table className={classes.table} aria-label="simple table">
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
              {calculation?.cargo_groups?.map((s: any) => (
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
                  {calculation?.doc_fee?.volume}
                </TableCell>
                <TableCell className={classes.innerCell} align="left" />
                <TableCell className={classes.innerCell} align="left">
                  {t("Surcharges/DOCUMENT FEE")}
                </TableCell>
                <TableCell className={classes.innerCell} align="left">
                  {calculation?.doc_fee?.currency}
                </TableCell>
                <TableCell className={classes.innerCell} align="right">
                  {calculation?.doc_fee?.cost}
                </TableCell>
                <TableCell className={classes.innerCell} align="right">
                  {calculation?.doc_fee?.subtotal}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </HiddenTable>
      <TableTotal>
        {calculation?.totals_pure &&
          Object.keys(calculation?.totals_pure).map(
            (key: any) =>
              !!calculation?.totals_pure[key] && (
                <TotalLine>
                  <TotalName>
                    {t("Bookings/CHARGES IN")} {key}:
                  </TotalName>
                  <TotalValue>{calculation?.totals_pure[key]}</TotalValue>
                </TotalLine>
              )
          )}
      </TableTotal>
    </HiddenWrapper>
  );
};

export default TotalCostCalculationContainer;
