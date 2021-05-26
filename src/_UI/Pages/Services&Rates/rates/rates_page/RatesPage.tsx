import React, { useState } from "react";
//material ui
import makeStyles from "@material-ui/core/styles/makeStyles";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Tooltip from "@material-ui/core/Tooltip";
//react-router-dom
import { useHistory } from "react-router-dom";
//BLL
import { setActiveOrPausedRateThunk } from "../../../../../_BLL/thunks/rates&surcharge/rateThunks";
//types
import { FreightRateObjectType } from "../../../../../_BLL/types/rates&surcharges/ratesTypes";
//components
import TableCellContent from "../../../../components/_commonComponents/tables/TableCellContent";
import ScrollbarStyled from "../../../../components/_commonComponents/ScrollbarStyled/ScrollbarStyled";
//styles
import { Outer } from "./rates-style";
//icons
import plane_surcharge from "../../../../assets/icons/rates&services/plane-surcharge.svg";
import template_icon from "../../../../assets/icons/rates&services/template.svg";
import pause_icon from "../../../../assets/icons/rates&services/pause.svg";
import play_icon from "../../../../assets/icons/rates&services/play_icon.svg";
import ship_surcharge from "../../../../assets/icons/rates&services/ship-surcharge.svg";
import styled from "styled-components";
import {useTranslation} from "react-i18next";

const useStyles = makeStyles({
  container: {
    boxShadow: "none",
    paddingRight: "12px",
    height: "600px",
    overflowY: "auto",
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
    color: "#115B86",
    fontFamily: "Helvetica Bold",
    fontSize: "16px",
    borderBottom: "1px solid #828282",
    padding: "0",
    paddingBottom: "15px",
    backgroundColor: "white",
  },
  cell: {
    color: "#115B86",
    fontFamily: "Helvetica Bold",
    fontSize: "16px",
    borderBottom: "1px solid #828282",
    padding: "0",
    paddingBottom: "15px",
    paddingRight: "30px",
    backgroundColor: "white",
  },
  innerMainCell: {
    borderBottom: "1px solid #BDBDBD",
    fontFamily: "Helvetica Light",
    fontSize: "16px",
    color: "#1B1B25",
    position: "relative",
    padding: 0,
    paddingTop: "13px",
    paddingBottom: 13,
    height: "72px",
    width: "70px",
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
    paddingRight: "30px",
    width: "150px",
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
  freight_rates_list: FreightRateObjectType[] | null;
  dispatch: any;
  directory: string;
  mode: string;
  setSearchValue: (value: any) => void;
  searchValue: string;
  searchColumn: string;
  setSearchColumn: (value: string) => void;
  setNewRateMode: (value: boolean) => void;
  setCheckedFreightRate: (rate: any) => void;
};

const RatesPage: React.FC<PropsType> = ({ freight_rates_list, ...props }) => {
  //hooks
  const classes = useStyles();
  let history = useHistory();

  //local state
  const [isSearchMode, setSearchMode] = useState(false);

  //handlers
  let goToPage = (id: number) => {
    history.push(`/services/rate/${id}`);
  };
  const {t} = useTranslation();
  return (
    <Outer>
      <TableContainer className={classes.container} component={Paper}>
        <ScrollbarStyled>
        <Table stickyHeader className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className={classes.emptyHeader} align="left" />
              <TableCell className={classes.shipping_cell} align="left" />
              <TableCell className={classes.cell} align="left">
                <TableCellContent
                  setSearchValue={props.setSearchValue}
                  setSearchMode={setSearchMode}
                  direction={props.directory}
                  type={props.mode}
                  column_name="shipping_mode"
                  searchValue={props.searchValue}
                  isSearchMode={isSearchMode}
                  title={t("Booking Columns/SHIPPING MODE")}
                  searchColumn={props.searchColumn}
                  setSearchColumn={props.setSearchColumn}
                  thunkName="rates"
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
                  thunkName="rates"
                />
              </TableCell>
              <TableCell className={classes.cell} align="left">
                <TableCellContent
                  setSearchValue={props.setSearchValue}
                  setSearchMode={setSearchMode}
                  direction={props.directory}
                  type={props.mode}
                  column_name="origin"
                  searchValue={props.searchValue}
                  isSearchMode={isSearchMode}
                  title={t("Quotes/ORIGIN")}
                  searchColumn={props.searchColumn}
                  setSearchColumn={props.setSearchColumn}
                  thunkName="rates"
                />
              </TableCell>
              <TableCell className={classes.cell} align="left">
                <TableCellContent
                  setSearchValue={props.setSearchValue}
                  setSearchMode={setSearchMode}
                  direction={props.directory}
                  type={props.mode}
                  column_name="destination"
                  searchValue={props.searchValue}
                  isSearchMode={isSearchMode}
                  title={t("Quotes/DESTINATION")}
                  searchColumn={props.searchColumn}
                  setSearchColumn={props.setSearchColumn}
                  thunkName="rates"
                />
              </TableCell>
              <TableCell className={classes.cell} align="left">
                <div style={{ display: "flex" }}>{t("Quote bid screen/EXPIRATION DATE")}</div>
              </TableCell>
              <TableCell className={classes.cell} align="left">
                <div style={{ display: "flex" }}>{t("Freight rates/ACTIONS")}</div>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {freight_rates_list?.map((row) => (
              <TableRow key={row.id} className={classes.row}>
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
                  onClick={() => goToPage(row.id)}
                >
                  <ModeIcon
                    src={
                      row.shipping_type === "sea"
                        ? ship_surcharge
                        : plane_surcharge
                    }
                    alt=""
                  />
                </TableCell>
                <TableCell
                  className={classes.innerCell}
                  align="left"
                  onClick={() => goToPage(row.id)}
                >
                  {row.shipping_mode}
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
                  {row.origin}
                </TableCell>
                <TableCell
                  className={classes.innerCell}
                  align="left"
                  onClick={() => goToPage(row.id)}
                >
                  {row.destination}
                </TableCell>
                <TableCell
                  className={classes.innerCell}
                  align="left"
                  onClick={() => goToPage(row.id)}
                >
                  {row.expiration_date}
                </TableCell>
                <TableCell className={classes.innerCell} align="left">
                  <div style={{ display: "flex" }}>
                    <Tooltip
                      arrow
                      title={`${t("Freight rates/Rates can be paused or reactivated using this button")}.`}
                      classes={{ tooltip: classes.customTooltip }}
                    >
                      <TemplateIcon>
                        <img
                          style={{ height: 24, width: 24 }}
                          src={row.is_active ? pause_icon : play_icon}
                          alt=""
                          onClick={() =>
                            props.dispatch(
                              setActiveOrPausedRateThunk(row.id, !row.is_active)
                            )
                          }
                        />
                      </TemplateIcon>
                    </Tooltip>
                    <Tooltip
                      arrow
                      title={`${t("Freight rates/Use this registry as a template for a new rate, with the same values and parameters")}.`}
                      classes={{ tooltip: classes.customTooltip }}
                    >
                      <TemplateIcon
                        onClick={() => props.setCheckedFreightRate(row)}
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
        </ScrollbarStyled>
      </TableContainer>
    </Outer>
  );
};

export default RatesPage;

const ModeIcon = styled.img``;
const SearchButton = styled.button`
  padding: 0;
  outline: none;
  border: none;
  background: none;
  margin: 0 5px;
  display: flex;
  align-items: center;
  img {
  }
  &:hover {
    cursor: pointer;
  }
`;

const TemplateIcon = styled(SearchButton)`
  &:hover {
    cursor: pointer;
  }
`;
