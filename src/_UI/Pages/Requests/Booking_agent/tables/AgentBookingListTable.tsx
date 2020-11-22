import React from "react";
//moment
import moment from "moment";
//react-redux
import { useDispatch } from "react-redux";
//react-router-dom
import { useHistory } from "react-router-dom";
//material ui
import makeStyles from "@material-ui/core/styles/makeStyles";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableCellContent from "../../../../components/_commonComponents/tables/TableCellContent";
import TableBody from "@material-ui/core/TableBody";
//types
import {
  BookingInfoType
} from "../../../../../_BLL/types/bookingTypes";
//styles
import { ModeIcon } from "src/_UI/Pages/Services&Rates/surcharge/surcharges_page/surcharges-style";
//icons
import ship_surcharge from "../../../../assets/icons/rates&services/ship-surcharge.svg";
import plane_surcharge from "../../../../assets/icons/rates&services/plane-surcharge.svg";


type PropsType = {
  searchValue: string;
  setSearchValue: (value: string) => void;
  directory: string;
  setDirectory: (value: string) => void;
  mode: string;
  searchColumn: string;
  setSearchColumn: (value: string) => void;
  isSearchMode: boolean;
  setSearchMode: (value: boolean) => void;
  bookingList: BookingInfoType[];
};

const useStyles = makeStyles({
  container: {
    boxShadow: "none",
  },
  table: {
    "& .MuiTableHead-root": {},
  },
  row: {
    "&:hover": {
      cursor: "pointer",
    },
  },
  shipping_cell: {
    color: "#115B86",
    fontFamily: "Helvetica Bold",
    fontSize: "16px",
    borderBottom: "1px solid #115B86",
    padding: "0",
    paddingBottom: "15px",
  },
  cell: {
    color: "#115B86",
    fontFamily: "Helvetica Bold",
    fontSize: "16px",
    borderBottom: "1px solid #115B86",
    padding: "0",
    paddingBottom: "15px",
    paddingRight: "30px",
  },
  innerMainCell: {
    borderBottom: "1px solid #BDBDBD",
    fontFamily: "Helvetica Light",
    fontSize: "16px",
    color: "#1B1B25",
    position: "relative",
    paddingRight: "40px",
    height: "72px",
    width: "50px",
  },
  innerCell: {
    borderBottom: "1px solid #BDBDBD",
    fontFamily: "Helvetica Light",
    fontSize: "16px",
    color: "#1B1B25",
    height: "72px",
    padding: "0",
    paddingRight: "30px",
    width: "170px",
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

const AgentBookingListTable: React.FC<PropsType> = ({
  setSearchValue,
  directory,
  isSearchMode,
  setSearchMode,
  mode,
  searchValue,
  searchColumn,
  setSearchColumn,
  bookingList,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const history = useHistory();
  let setCardOpen = (booking_id: number) => {
    history.push(`/requests/booking/${booking_id}`);
  };

  function createData(
    id: number,
    date_from: string,
    date_to: string,
    client: string,
    aceid: string,
    status: string,
    shipping_mode: string,
    origin: string,
    destination: string,
    week_from: number,
    week_to: number
  ) {
    return {
      id,
      date_from: `${moment(date_from, "DD-MM-YYYY").format("D MMMM YYYY")}`,
      date_to: `${moment(date_to, "DD-MM-YYYY").format("D MMMM YYYY")}`,
      client,
      aceid,
      status,
      shipping_mode,
      origin,
      destination,
      week_from,
      week_to,
    };
  }

  const rows =
    bookingList && bookingList.length > 0
      ? bookingList.map((b) =>
          createData(
            b.id,
            b.date_from,
            b.date_to,
            b.client,
            b.aceid,
            b.status,
            b.freight_rate.shipping_mode.title,
            b.freight_rate.origin.code,
            b.freight_rate.destination.code,
            b.week_range.week_from,
            b.week_range.week_to
          )
        )
      : null;

  return (
    <TableContainer className={classes.container} component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className={classes.shipping_cell} align="left" />
            <TableCell className={classes.cell} align="left">
              <TableCellContent
                setSearchValue={setSearchValue}
                setSearchMode={setSearchMode}
                dispatch={dispatch}
                direction={directory}
                type={mode}
                column_name="ace_id"
                searchValue={searchValue}
                isSearchMode={isSearchMode}
                title="ACE ID"
                searchColumn={searchColumn}
                setSearchColumn={setSearchColumn}
                thunkName="agent_booking"
                withoutSearch={true}
                withoutOrdering={true}
              />
            </TableCell>
            <TableCell className={classes.cell} align="left">
              <TableCellContent
                setSearchValue={setSearchValue}
                setSearchMode={setSearchMode}
                dispatch={dispatch}
                direction={directory}
                type={mode}
                column_name="shipping_mode"
                searchValue={searchValue}
                isSearchMode={isSearchMode}
                title="SHIPPING MODE"
                searchColumn={searchColumn}
                setSearchColumn={setSearchColumn}
                thunkName="agent_booking"
                withoutSearch={true}
              />
            </TableCell>
            <TableCell className={classes.cell} align="left">
              <TableCellContent
                setSearchValue={setSearchValue}
                setSearchMode={setSearchMode}
                dispatch={dispatch}
                direction={directory}
                type={mode}
                column_name="route"
                searchValue={searchValue}
                isSearchMode={isSearchMode}
                title="ROUTE"
                searchColumn={searchColumn}
                setSearchColumn={setSearchColumn}
                thunkName="agent_booking"
              />
            </TableCell>
            <TableCell className={classes.cell} align="left">
              <TableCellContent
                setSearchValue={setSearchValue}
                setSearchMode={setSearchMode}
                dispatch={dispatch}
                direction={directory}
                type={mode}
                column_name="client"
                searchValue={searchValue}
                isSearchMode={isSearchMode}
                title="CLIENT"
                searchColumn={searchColumn}
                setSearchColumn={setSearchColumn}
                thunkName="agent_booking"
              />
            </TableCell>
            <TableCell className={classes.cell} align="left">
              <TableCellContent
                setSearchValue={setSearchValue}
                setSearchMode={setSearchMode}
                dispatch={dispatch}
                direction={directory}
                type={mode}
                column_name="shipment_date"
                searchValue={searchValue}
                isSearchMode={isSearchMode}
                title="SHIPMENT DATE"
                searchColumn={searchColumn}
                setSearchColumn={setSearchColumn}
                thunkName="agent_booking"
                withoutSearch={true}
              />
            </TableCell>
            <TableCell className={classes.cell} align="left">
              <TableCellContent
                setSearchValue={setSearchValue}
                setSearchMode={setSearchMode}
                dispatch={dispatch}
                direction={directory}
                type={mode}
                column_name="status"
                searchValue={searchValue}
                isSearchMode={isSearchMode}
                title="STATUS"
                searchColumn={searchColumn}
                setSearchColumn={setSearchColumn}
                thunkName="agent_booking"
                withoutSearch={true}
              />
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows?.map((row) => (
            <TableRow
              key={row.id}
              className={classes.row}
              onClick={() => setCardOpen(row.id)}
            >
              <TableCell
                className={classes.innerMainCell}
                align="left"
                component="th"
                scope="row"
              >
                <ModeIcon src={row.shipping_mode === 'air' ? plane_surcharge : ship_surcharge} alt="" />
              </TableCell>
              <TableCell className={classes.innerCell} align="left">
                <span
                  style={{
                    color: "black",
                    fontFamily: "Helvetica Bold",
                    fontSize: "18px",
                  }}
                >
                  {row.aceid}
                </span>
              </TableCell>
              <TableCell className={classes.innerCell} align="left">
                <span
                  style={{
                    color: "black",
                    fontFamily: "Helvetica Light",
                    fontSize: "18px",
                  }}
                >
                  {row.shipping_mode}
                </span>
              </TableCell>
              <TableCell className={classes.innerCell} align="left">
                <div
                  style={{
                    color: "black",
                    fontFamily: "Helvetica Light",
                    fontSize: "24px",
                  }}
                >
                  {row.origin}
                </div>
                <div
                  style={{
                    color: "black",
                    fontFamily: "Helvetica Light",
                    fontSize: "24px",
                  }}
                >
                  {row.destination}
                </div>
              </TableCell>
              <TableCell className={classes.innerCell} align="left">
                {row.client}
              </TableCell>
              <TableCell className={classes.innerCell} align="left">
                <div>{row.date_from} -</div>
                <div>{row.date_to}</div>
                <div>
                  {row.week_from === row.week_to
                    ? `Week ${row.week_from}`
                    : `Week ${row.week_from} - Week ${row.week_to}`}
                </div>
              </TableCell>
              <TableCell className={classes.innerCell} align="left">
                <span
                  style={{
                    color: "black",
                    fontFamily: "Helvetica Light",
                    fontSize: "18px",
                    textTransform: "uppercase",
                  }}
                >
                  {row.status}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AgentBookingListTable;
