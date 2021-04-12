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
  operation_charges?: any;
  number_of_docs?: number | null;
};

const ChargesChangeTable: React.FC<PropsType> = ({
  operation_charges,
  number_of_docs,
}) => {
  const column_object = [
    { name: "VOLUME", align: "left" },
    { name: "TYPE", align: "left" },
    { name: "CHARGE", align: "left" },
    { name: "CURRENCY", align: "left" },
    { name: "COST", align: "right" },
    { name: "SUBTOTAL", align: "right" },
  ];

  const classes = useStyles();
  const {t} = useTranslation();
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
                <div>FREIGHT</div>
                <div>HANDLING</div>
                {s.cold && <div>COLD</div>}
                {s.dangerous && <div>DANGEROUS</div>}
                <div>OTHERS</div>
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
              DOC FEE
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
        {operation_charges?.totals && (
          <>
            {operation_charges?.totals?.USD && (
              <TotalLine>
                <TotalName>CHARGES IN USD:</TotalName>
                <TotalValue>{operation_charges?.totals?.USD}</TotalValue>
              </TotalLine>
            )}
            {operation_charges?.totals?.EUR && (
              <TotalLine>
                <TotalName>CHARGES IN EUR:</TotalName>
                <TotalValue>{operation_charges?.totals?.EUR}</TotalValue>
              </TotalLine>
            )}
            {operation_charges?.totals?.BRL && (
              <TotalLine>
                <TotalName>CHARGES IN BRL:</TotalName>
                <TotalValue>{operation_charges?.totals?.BRL}</TotalValue>
              </TotalLine>
            )}
          </>
        )}

        {operation_charges?.pay_to_book && (
          <TotalLine>
            <TotalName>
              BOOKING FEE IN{" "}
              {operation_charges?.pay_to_book?.currency === "BRL"
                ? "BRL"
                : "USD"}
              :
            </TotalName>
            <TotalValue>
              {operation_charges?.pay_to_book?.booking_fee}
            </TotalValue>
          </TotalLine>
        )}
        {operation_charges?.service_fee && (
          <TotalLine>
            <TotalName>
              ACEMAVEN SERVICE FEE IN{" "}
              {operation_charges?.service_fee?.currency === "BRL"
                ? "BRL"
                : "USD"}
              :
            </TotalName>
            <TotalValue>{operation_charges?.service_fee?.subtotal}</TotalValue>
          </TotalLine>
        )}

        {operation_charges?.exchange_rates?.USD && (
          <TotalLine>
            <TotalName>ACEMAVEN USD EXCHANGE RATE:</TotalName>
            <TotalValue>{operation_charges?.exchange_rates?.USD}</TotalValue>
          </TotalLine>
        )}
        {operation_charges?.exchange_rates?.EUR && (
          <TotalLine>
            <TotalName>ACEMAVEN EUR EXCHANGE RATE:</TotalName>
            <TotalValue>{operation_charges?.exchange_rates?.EUR}</TotalValue>
          </TotalLine>
        )}
        {operation_charges?.pay_to_book && (
          <TotalLine>
            <TotalName>
              TO BOOK IN {operation_charges?.pay_to_book?.currency}:
            </TotalName>
            <TotalValue>
              {operation_charges?.pay_to_book?.pay_to_book}
            </TotalValue>
          </TotalLine>
        )}
        {operation_charges?.totals_pure && (
          <>
            {operation_charges?.totals_pure?.USD && (
              <TotalLine>
                <TotalName>TOTAL CHARGES IN USD:</TotalName>
                <TotalValue>{operation_charges?.totals_pure?.USD}</TotalValue>
              </TotalLine>
            )}
            {operation_charges?.totals_pure?.EUR && (
              <TotalLine>
                <TotalName>TOTAL CHARGES IN EUR:</TotalName>
                <TotalValue>{operation_charges?.totals_pure?.EUR}</TotalValue>
              </TotalLine>
            )}
            {operation_charges?.totals_pure?.BRL && (
              <TotalLine>
                <TotalName>TOTAL CHARGES IN BRL:</TotalName>
                <TotalValue>{operation_charges?.totals_pure?.BRL}</TotalValue>
              </TotalLine>
            )}
          </>
        )}
      </TableTotal>
    </TableContainer>
  );
};

export default ChargesChangeTable;
