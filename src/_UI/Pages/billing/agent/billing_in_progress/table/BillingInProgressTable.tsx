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
import { BillingOperationType } from "../../../../../../_BLL/types/billing/billingTypes";
import { ShippingTypesEnum } from "../../../../../../_BLL/types/rates&surcharges/newSurchargesTypes";
//components
import TableCellContent from "../../../../../components/_commonComponents/tables/TableCellContent";
import ScrollbarStyled from "../../../../../components/_commonComponents/ScrollbarStyled/ScrollbarStyled";
//styles
import {
  ModeIcon,
  SpanMode,
} from "../../../../Services&Rates/surcharge/surcharges_page/surcharges-style";
//icons
import sea_type from "../../../../../assets/icons/long-ship-icon-for-tables.svg";
import air_type from "../../../../../assets/icons/long-plane-icon-for-tables.svg";

const useStyles = makeStyles({
  container: {
    boxShadow: "none",
    paddingRight: "12px",
  },
  shipping_cell: {
    width: "220px",
    color: "#115B86",
    fontFamily: "Helvetica Bold",
    fontSize: "16px",
    borderBottom: "1px solid #828282",
    paddingLeft: "63px",
    // padding: '0',
    paddingRight: "15px",
    backgroundColor: "white",
  },
  root: {
    "& > *": {
      borderBottom: "unset",
    },
    "&:hover": {
      transition: ".3s",
      cursor: "pointer",
      backgroundColor: "#E0E0E0",
    },
  },
  cell: {
    color: "#115B86",
    fontFamily: "Helvetica Bold",
    fontSize: "16px",
    borderBottom: "1px solid #828282",
    width: "150px",
    padding: "0",
    paddingBottom: 13,
    paddingTop: "13px",
    paddingRight: "15px",
    backgroundColor: "white",
  },
  innerMainCell: {
    borderBottom: "1px solid #BDBDBD",
    fontFamily: "Helvetica Light",
    fontSize: "16px",
    width: "220px",
    color: "#1B1B25",
    position: "relative",
    padding: 0,
    paddingTop: "13px",
    paddingBottom: 13,
    paddingLeft: "63px",
    height: "72px",
    verticalAlign: "top !important",
  },
  innerCell: {
    borderBottom: "1px solid #BDBDBD",
    fontFamily: "Helvetica Light",
    fontSize: "16px",
    color: "#1B1B25",
    height: "72px",
    padding: "0",
    paddingTop: "13px",
    paddingBottom: 13,
    verticalAlign: "top !important",
  },
  empty: {
    width: "30px",
    padding:0,
    borderBottom: "none",
  },
  emptyHeader: {
    width: "30px",
    padding:0,
    borderBottom: "none",
    backgroundColor: "white",
  },
});

type PropsType = {
  searchValue: string;
  setSearchValue: (value: string) => void;
  setSearchMode: (value: boolean) => void;
  isSearchMode: boolean;
  mode: string;
  search_column: string;
  setSearchColumn: (value: string) => void;
  billing_list: BillingOperationType[];
  billing_status: string;
  thunkName: string;
  goToPageHandler?: (value: number) => void;
  dates?: string[];
};

const BillingInProgressTable: React.FC<PropsType> = ({ ...props }) => {
  const classes = useStyles();

  return (
    <TableContainer className={classes.container} component={Paper}>
      <Table stickyHeader aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell className={classes.emptyHeader} align="left" />
            <TableCell className={classes.shipping_cell} align="left">
              <TableCellContent
                setSearchValue={props.setSearchValue}
                setSearchMode={props.setSearchMode}
                direction={""}
                type={props.mode}
                column_name="aceid"
                searchValue={props.searchValue}
                isSearchMode={props.isSearchMode}
                title="ID"
                searchColumn={props.search_column}
                setSearchColumn={props.setSearchColumn}
                thunkName={props.thunkName}
                operation_status={props.billing_status}
                dates={props.dates}
              />
            </TableCell>
            <TableCell className={classes.cell} align="left">
              <TableCellContent
                setSearchValue={props.setSearchValue}
                setSearchMode={props.setSearchMode}
                direction={""}
                type={props.mode}
                column_name="route"
                searchValue={props.searchValue}
                isSearchMode={props.isSearchMode}
                title="ROUTE"
                searchColumn={props.search_column}
                setSearchColumn={props.setSearchColumn}
                thunkName={props.thunkName}
                operation_status={props.billing_status}
                dates={props.dates}
              />
            </TableCell>
            <TableCell className={classes.cell} align="left">
              MODE
            </TableCell>
            <TableCell className={classes.cell} align="left">
              CHARGES (BRL)
            </TableCell>
            <TableCell className={classes.cell} align="left">
              CHARGES (USD)
            </TableCell>
            <TableCell className={classes.cell} align="right">
              <TableCellContent
                setSearchValue={props.setSearchValue}
                setSearchMode={props.setSearchMode}
                direction={""}
                type={props.mode}
                column_name="payment_due_by"
                searchValue={props.searchValue}
                isSearchMode={props.isSearchMode}
                title="PAY DUE"
                searchColumn={props.search_column}
                setSearchColumn={props.setSearchColumn}
                thunkName={props.thunkName}
                withoutSearch={true}
                operation_status={props.billing_status}
                dates={props.dates}
              />
            </TableCell>
            <TableCell className={classes.cell} align="right">
              <TableCellContent
                setSearchValue={props.setSearchValue}
                setSearchMode={props.setSearchMode}
                direction={""}
                type={props.mode}
                column_name="status"
                searchValue={props.searchValue}
                isSearchMode={props.isSearchMode}
                title="STATUS"
                searchColumn={props.search_column}
                setSearchColumn={props.setSearchColumn}
                thunkName={props.thunkName}
                withoutSearch={true}
                operation_status={props.billing_status}
                dates={props.dates}
              />
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.billing_list.map(
            (billing: BillingOperationType, index: number) => (
              <TableRow
                key={index}
                className={classes.root}
                onClick={() =>
                  props.goToPageHandler && props.goToPageHandler(billing.id)
                }
              >
                <TableCell
                  className={classes.empty}
                  align="left"
                  component="th"
                  scope="row"
                />
                <TableCell
                  className={classes.innerMainCell}
                  align="left"
                  component="th"
                  scope="row"
                >
                  <ModeIcon
                    src={
                      billing.shipping_type === ShippingTypesEnum.SEA
                        ? sea_type
                        : air_type
                    }
                    alt=""
                  />
                  <span
                    style={{
                      color: "black",
                      fontFamily: "Helvetica Bold",
                      fontSize: "18px",
                    }}
                  >
                    {billing.aceid}
                  </span>
                </TableCell>
                <TableCell className={classes.innerCell} align="left">
                  <div
                    style={{
                      color: "black",
                      fontFamily: "Helvetica Light, sans-serif",
                      fontSize: "23px",
                      marginTop: "-4px",
                    }}
                  >
                    <div>{billing.origin.code}</div>
                    <div>{billing.destination.code}</div>
                  </div>
                </TableCell>
                <TableCell className={classes.innerCell} align="left">
                  <div
                    style={{
                      color: "black",
                      fontFamily: "Helvetica Light, sans-serif",
                      fontSize: "23px",
                      marginTop: "-4px",
                    }}
                  >
                    {billing.shipping_mode}
                  </div>
                </TableCell>
                <TableCell className={classes.innerCell} align="left">
                  {billing.charges.total_surcharge?.BRL
                    ? billing.charges.total_surcharge?.BRL
                    : "-"}
                </TableCell>
                <TableCell className={classes.innerCell} align="left">
                  {billing.charges.total_surcharge?.USD
                    ? billing.charges.total_surcharge?.USD
                    : "-"}
                </TableCell>
                <TableCell className={classes.innerCell} align="left">
                  <div
                    style={{
                      color: "black",
                      fontFamily: "Helvetica, sans-serif",
                      fontSize: "16px",
                    }}
                  >
                    {billing.payment_due_by}
                  </div>
                </TableCell>
                <TableCell className={classes.innerCell} align="left">
                  <div
                    style={{
                      color: "black",
                      fontFamily: "Helvetica Light, sans-serif",
                      fontSize: "14px",
                    }}
                  >
                    {billing.status}
                  </div>
                </TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BillingInProgressTable;
