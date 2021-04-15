import React, { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import { Tooltip } from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import plane_surcharge from "../../../../assets/icons/rates&services/plane-surcharge.svg";
import ship_surcharge from "../../../../assets/icons/rates&services/ship-surcharge.svg";
import template_icon from "../../../../assets/icons/rates&services/template.svg";
import { TemplateIcon } from "../../../../components/_commonComponents/hover_message/hover-message-styles";
import TableCellContent from "../../../../components/_commonComponents/tables/TableCellContent";
import ScrollbarStyled from "../../../../components/_commonComponents/ScrollbarStyled/ScrollbarStyled";
import { GetSurchargeForTooltip } from "../../../../../_BLL/thunks/rates&surcharge/surchargeThunks";
import { surchargeActions } from "../../../../../_BLL/reducers/surcharge&rates/surchargeReducer";
import { CurrentShippingType } from "../../../../../_BLL/types/rates&surcharges/newSurchargesTypes";
import { SurchargeObjectType } from "../../../../../_BLL/types/rates&surcharges/surchargesTypes";
import { ModeIcon, Outer, SpanMode } from "./surcharges-style";
import {useTranslation} from "react-i18next";

const useStyles = makeStyles({
  container: {
    boxShadow: "none",
    paddingRight: "12px",
    maxHeight: "600px",
  },
  table: {
    "& .MuiTableHead-root": {},
  },
  row: {
    "&:hover": {
      cursor: "pointer",
      backgroundColor: "#E0E0E0",
    },
  },
  shipping_cell: {
    width: "220px",
    color: "#115B86",
    fontFamily: "Helvetica Bold",
    fontSize: "16px",
    borderBottom: "1px solid #828282",
    padding: "0",
    paddingLeft: "63px",
    paddingRight: "30px",
    backgroundColor: "white",
  },
  cell: {
    color: "#115B86",
    fontFamily: "Helvetica Bold",
    fontSize: "16px",
    borderBottom: "1px solid #828282",
    width: "150px",
    padding: "0",
    paddingRight: "30px",
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
    paddingLeft: "63px",
    paddingTop: "13px",
    paddingBottom: 13,
    paddingRight: "30px",
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
  surcharges_list: SurchargeObjectType[] | null;
  dispatch: any;
  directory: string;
  mode: string;
  setSearchValue: (value: any) => void;
  searchValue: string;
  searchColumn: string;
  setSearchColumn: (value: string) => void;
  setNewSurchargeMode: (value: boolean) => void;
};

const SurchargesPage: React.FC<PropsType> = ({ surcharges_list, ...props }) => {
  const [isSearchMode, setSearchMode] = useState(false);

  let setMode = useCallback(
    (mode: CurrentShippingType) => {
      props.dispatch(surchargeActions.setCurrentShippingType(mode));
    },
    [props]
  );

  //material ui table
  const classes = useStyles();

  let history = useHistory();
  let goToPage = (id: number) => {
    history.push(`/services/surcharge/${id}`);
  };

  function createData(
    id: number,
    shipping_type: any,
    shipping_mode: string | number,
    carrier: string | number,
    location: string | number,
    direction: string,
    start_date: string,
    expiration_date: string
  ) {
    return {
      id,
      shipping_type,
      shipping_mode,
      carrier,
      location,
      direction,
      start_date,
      expiration_date,
    };
  }
  const rows =
    surcharges_list && surcharges_list.length > 0
      ? surcharges_list.map((s) =>
          createData(
            s.id,
            s?.shipping_type,
            s?.shipping_mode,
            s.carrier,
            s.location,
            s.direction,
            s.start_date,
            s.expiration_date
          )
        )
      : null;

  let templateDataHandler = (
    id: number,
    shipping_type: CurrentShippingType
  ) => {
    setMode(shipping_type);
    props.dispatch(GetSurchargeForTooltip(id));
    props.setNewSurchargeMode(true);
  };
  const {t} = useTranslation();
  return (
    <Outer>
      <TableContainer className={classes.container} component={Paper}>
        <Table stickyHeader className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className={classes.emptyHeader} align="left" />
              <TableCell className={classes.shipping_cell} align="left">
                <TableCellContent
                  setSearchValue={props.setSearchValue}
                  setSearchMode={setSearchMode}
                  direction={props.directory}
                  type={props.mode}
                  column_name="shipping_mode"
                  searchValue={props.searchValue}
                  isSearchMode={isSearchMode}
                  title={t("Bookings/SHIPPING MODE")}
                  searchColumn={props.searchColumn}
                  setSearchColumn={props.setSearchColumn}
                />
              </TableCell>
              <TableCell className={classes.cell} align="left">
                <TableCellContent
                  setSearchValue={props.setSearchValue}
                  setSearchMode={setSearchMode}
                  direction={props.directory}
                  type={props.mode}
                  column_name="carrier"
                  searchValue={props.searchValue}
                  isSearchMode={isSearchMode}
                  title={t("Quote bid screen/CARRIER")}
                  searchColumn={props.searchColumn}
                  setSearchColumn={props.setSearchColumn}
                />
              </TableCell>
              <TableCell className={classes.cell} align="left">
                <TableCellContent
                  setSearchValue={props.setSearchValue}
                  setSearchMode={setSearchMode}
                  direction={props.directory}
                  type={props.mode}
                  column_name="location"
                  searchValue={props.searchValue}
                  searchColumn={props.searchColumn}
                  setSearchColumn={props.setSearchColumn}
                  isSearchMode={isSearchMode}
                  title={t("Surcharges/LOCATION")}
                />
              </TableCell>
              <TableCell className={classes.cell} align="left">
                {t("Surcharges/DIRECTION")}
              </TableCell>
              <TableCell className={classes.cell} align="left">
                <TableCellContent
                  setSearchValue={props.setSearchValue}
                  setSearchMode={setSearchMode}
                  direction={props.directory}
                  type={props.mode}
                  column_name="start_date"
                  searchValue={props.searchValue}
                  isSearchMode={isSearchMode}
                  title={t("Surcharges/START DATE")}
                  searchColumn={props.searchColumn}
                  setSearchColumn={props.setSearchColumn}
                />
              </TableCell>
              <TableCell className={classes.cell} align="left">
                <TableCellContent
                  setSearchValue={props.setSearchValue}
                  setSearchMode={setSearchMode}
                  direction={props.directory}
                  type={props.mode}
                  column_name="expiration_date"
                  searchValue={props.searchValue}
                  isSearchMode={isSearchMode}
                  title={t("Surcharges/EXPIRATION DATE")}
                  searchColumn={props.searchColumn}
                  setSearchColumn={props.setSearchColumn}
                />
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows?.map((row) => (
              <TableRow key={row.id} className={classes.row}>
                <TableCell
                  className={classes.empty}
                  align="left"
                  component="th"
                  scope="row"
                />
                <TableCell
                  onClick={() => goToPage(row.id)}
                  className={classes.innerMainCell}
                  align="left"
                  component="th"
                  scope="row"
                >
                  <ModeIcon
                    src={
                      row.shipping_type === "sea"
                        ? ship_surcharge
                        : plane_surcharge
                    }
                    alt=""
                  />
                  <SpanMode>{row.shipping_mode}</SpanMode>
                </TableCell>
                <TableCell
                  className={classes.innerCell}
                  align="left"
                  onClick={() => goToPage(row.id)}
                >
                  <span>{row.carrier}</span>
                </TableCell>
                <TableCell
                  className={classes.innerCell}
                  align="left"
                  onClick={() => goToPage(row.id)}
                >
                  {row.location}
                </TableCell>
                <TableCell
                  className={classes.innerCell}
                  align="left"
                  onClick={() => goToPage(row.id)}
                >
                  {row.direction}
                </TableCell>
                <TableCell
                  className={classes.innerCell}
                  align="left"
                  onClick={() => goToPage(row.id)}
                >
                  {row.start_date}
                </TableCell>
                <TableCell className={classes.innerCell} align="left">
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    {row.expiration_date}
                    <Tooltip
                      title={`${t("Freight rates/Use this registry as a template for a new rate, with the same values and parameters")}`}
                      arrow
                      classes={{ tooltip: classes.customTooltip }}
                    >
                      <TemplateIcon
                        onClick={() =>
                          templateDataHandler(row.id, row.shipping_type)
                        }
                      >
                        <img src={template_icon} alt="" />
                      </TemplateIcon>
                    </Tooltip>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Outer>
  );
};

export default SurchargesPage;
