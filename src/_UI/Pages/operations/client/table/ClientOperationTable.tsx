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
import { OperationType } from "../../../../../_BLL/types/operations/operationsTypes";
//components
import TableCellContent from "../../../../components/_commonComponents/tables/TableCellContent";
import OperationsRow from "../../agent/table/OperationsRow";
import { CurrentShippingType } from "../../../../../_BLL/types/rates&surcharges/newSurchargesTypes";
import ScrollbarStyled from "../../../../components/_commonComponents/ScrollbarStyled/ScrollbarStyled";
import {useTranslation} from "react-i18next";

const useStyles = makeStyles({
  container: {
    boxShadow: "none",
    overflowY: "scroll",
  },
  empty: {
    width: "30px",
    padding:0,
    borderBottom: "none",
    backgroundColor:"white"
  },
  shipping_cell: {
    width: "220px",
    color: "#115B86",
    fontFamily: "Helvetica Bold",
    fontSize: "16px",
    borderBottom: "1px solid #828282",
    paddingLeft: "63px",
    padding: "0",
    paddingRight: "15px",
    backgroundColor:"white"
  },
  cell: {
    color: "#115B86",
    fontFamily: "Helvetica Bold",
    fontSize: "16px",
    borderBottom: "1px solid #828282",
    width: "150px",
    padding: "0",
    paddingRight: "15px",
    backgroundColor:"white"
  },
  innerMainCell: {
    borderBottom: "1px solid #BDBDBD",
    fontFamily: "Helvetica Light",
    fontSize: "16px",
    width: "220px",
    color: "#1B1B25",
    position: "relative",
    paddingLeft: "63px",
    height: "72px",
  },
  innerCell: {
    borderBottom: "1px solid #BDBDBD",
    fontFamily: "Helvetica Light",
    fontSize: "16px",
    color: "#1B1B25",
    height: "72px",
    padding: "0",
  },
  customTooltip: {
    maxWidth: 330,
    height: 60,
    fontFamily: "Helvetica Reg",
    fontSize: "14px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "15px",
  },
});

type PropsType = {
  setSearchMode: (value: boolean) => void;
  isSearchMode: boolean;
  mode: string;
  setMode: (value: CurrentShippingType) => void;
  searchValue: string;
  setSearchValue: (value: string) => void;
  search_column: string;
  setSearchColumn: (value: string) => void;
  operations_list: OperationType[];
  my_operations?: string;
  operation_status?: string;
};

const ClientOperationTable: React.FC<PropsType> = ({ ...props }) => {
  const classes = useStyles();
const {t} = useTranslation();
  return (
      <TableContainer className={classes.container} component={Paper}>
        <Table stickyHeader aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell className={classes.empty} align="left" />
              <TableCell className={classes.shipping_cell} align="left">
                <TableCellContent
                  setSearchValue={props.setSearchValue}
                  setSearchMode={props.setSearchMode}
                  direction={""}
                  type={props.mode}
                  column_name="aceid"
                  searchValue={props.searchValue}
                  isSearchMode={props.isSearchMode}
                  title="IDs"
                  searchColumn={props.search_column}
                  setSearchColumn={props.setSearchColumn}
                  thunkName="operations_client"
                  my_operations={props.my_operations}
                  operation_status={props.operation_status}
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
                  title={t("Bookings/ROUTE")}
                  searchColumn={props.search_column}
                  setSearchColumn={props.setSearchColumn}
                  withoutSearch={true}
                  thunkName="operations_client"
                  my_operations={props.my_operations}
                  operation_status={props.operation_status}
                />
              </TableCell>
              <TableCell className={classes.cell} align="left">
                <TableCellContent
                  setSearchValue={props.setSearchValue}
                  setSearchMode={props.setSearchMode}
                  direction={""}
                  type={props.mode}
                  column_name="shipping_mode"
                  searchValue={props.searchValue}
                  isSearchMode={props.isSearchMode}
                  title={t("Bookings/SHIPPING MODE")}
                  searchColumn={props.search_column}
                  setSearchColumn={props.setSearchColumn}
                  withoutSearch={true}
                  thunkName="operations_client"
                  my_operations={props.my_operations}
                  operation_status={props.operation_status}
                />
              </TableCell>
              <TableCell className={classes.cell} align="left">
                {/*<TableCellContent setSearchValue={props.setSearchValue}
                                                setSearchMode={props.setSearchMode}
                                                direction={''}
                                                type={props.mode}
                                                column_name='date_from'
                                                searchValue={props.searchValue}
                                                isSearchMode={props.isSearchMode}
                                                title='DATES'
                                                searchColumn={props.search_column}
                                                setSearchColumn={props.setSearchColumn}
                                                thunkName='operations'
                                                my_operations={props.my_operations}
                                                //search should be done at backend later
                                                withoutSearch={true}
                              />*/}
                {t("Bookings/DATES")}
              </TableCell>
              <TableCell className={classes.cell} align="left">
                <TableCellContent
                  setSearchValue={props.setSearchValue}
                  setSearchMode={props.setSearchMode}
                  direction={""}
                  type={props.mode}
                  column_name="carrier"
                  searchValue={props.searchValue}
                  isSearchMode={props.isSearchMode}
                  title={t("Quote bid screen/CARRIER")}
                  searchColumn={props.search_column}
                  setSearchColumn={props.setSearchColumn}
                  thunkName="operations_client"
                  my_operations={props.my_operations}
                  operation_status={props.operation_status}
                />
              </TableCell>
              <TableCell className={classes.cell} align="left">
                <TableCellContent
                  setSearchValue={props.setSearchValue}
                  setSearchMode={props.setSearchMode}
                  direction={""}
                  type={props.mode}
                  column_name="status"
                  searchValue={props.searchValue}
                  isSearchMode={props.isSearchMode}
                  title={t("Operations/STATUS")}
                  searchColumn={props.search_column}
                  setSearchColumn={props.setSearchColumn}
                  withoutSearch={true}
                  thunkName="operations_client"
                  my_operations={props.my_operations}
                  operation_status={props.operation_status}
                />
              </TableCell>
              {/*<TableCell className={classes.cell} align="left">*/}
              {/*    STATUS*/}
              {/*</TableCell>*/}
              <TableCell className={classes.cell} align="right">
                <TableCellContent
                  setSearchValue={props.setSearchValue}
                  setSearchMode={props.setSearchMode}
                  direction={""}
                  type={props.mode}
                  column_name="agent"
                  searchValue={props.searchValue}
                  isSearchMode={props.isSearchMode}
                  title={t("Role/AGENT")}
                  searchColumn={props.search_column}
                  setSearchColumn={props.setSearchColumn}
                  withoutSearch={true}
                  thunkName="operations_client"
                  my_operations={props.my_operations}
                  operation_status={props.operation_status}
                />
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.operations_list.map((operation, index) => (
              <OperationsRow
                key={index}
                operation={operation}
                operation_status={props.operation_status}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
  );
};

export default ClientOperationTable;
