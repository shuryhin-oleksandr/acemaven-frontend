import React from "react";
//material ui
import makeStyles from "@material-ui/core/styles/makeStyles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
//types
import { QuoteType } from "../../../../../_BLL/types/quotes/quotesTypes";
//BLL
import { useDispatch } from "react-redux";
import { makeOfferViewedThunk } from "../../../../../_BLL/thunks/quotes/clientQuotesThunk";
//components
import OptionsDeliveryButtons from "../../../../components/_commonComponents/optionsButtons/delivery/OptionsDeliveryButtons";
import TableCellContent from "../../../../components/_commonComponents/tables/TableCellContent";
import QuoteRow from "./QuoteRow";
import ScrollbarStyled from "../../../../components/_commonComponents/ScrollbarStyled/ScrollbarStyled";
import NoQuotesCard from "../../NoQuotesCard";
//styles
import {
  HeaderTitle,
  QuotesTableContainer,
  QuotesTableHeader,
} from "./client-quotes-table-styles";
import {useTranslation} from "react-i18next";

type PropsType = {
  my_quotes_list: QuoteType[];
  activeInactiveQuote: (id: number, is_active: boolean) => void;
  deleteQuoteByClient: (id: number) => void;
  getQuotesByFilters: (
    type: string,
    field_name: string,
    search_column: string,
    search_value: string
  ) => void;
  setSearchMode: (value: boolean) => void;
  isSearchMode: boolean;
  mode: string;
  setMode: (value: string) => void;
  searchValue: string;
  setSearchValue: (value: string) => void;
  search_column: string;
  setSearchColumn: (value: string) => void;
  text: string;
};

const useStyles = makeStyles({
  container: {
    boxShadow: 'none',
    paddingRight: 12,
    height: '600px',
    overflowY: "auto",
  },
  table: {
    "& .MuiTableHead-root": {},
  },
  shipping_cell: {
    paddingLeft: "63px",
    padding: "0",
    paddingRight: "10px",
    color: "#115B86",
    fontFamily: "Helvetica Bold",
    fontSize: "16px",
    borderBottom: "1px solid #115B86",
    width: '200px',
    backgroundColor: "white",
    letterSpacing: '0.7px',
    whiteSpace: 'nowrap'

  },
  cell: {
    color: "#115B86",
    fontFamily: "Helvetica Bold",
    fontSize: "16px",
    borderBottom: "1px solid #115B86",
    width: '130px',
    padding: "0",
    paddingRight: "10px",
    backgroundColor: "white",
    letterSpacing: '0.7px',
    whiteSpace: 'nowrap'
  },
  innerMainCell: {
    color: "#115B86",
    fontFamily: "Helvetica Bold",
    fontSize: "16px",
    borderBottom: "1px solid #115B86",
    width: '200px',
    padding: "0",
    paddingRight: "10px",
    backgroundColor: "white",
    letterSpacing: '0.7px',
    whiteSpace: 'nowrap'
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

const ClientQuotesTable: React.FC<PropsType> = ({
  my_quotes_list,
  activeInactiveQuote,
  deleteQuoteByClient,
  getQuotesByFilters,
  ...props
}) => {
  const classes = useStyles();

  const dispatch = useDispatch();
  let offerViewedHandler = (offer_id: number) => {
    dispatch(makeOfferViewedThunk(offer_id));
  };
const {t} = useTranslation();
  return (
    <QuotesTableContainer>
      <QuotesTableHeader>
        <HeaderTitle>{t("Quotes/Quotes")}</HeaderTitle>
        <OptionsDeliveryButtons
          directory=""
          searchColumn={props.search_column}
          searchValue={props.searchValue}
          mode={props.mode}
          setMode={props.setMode}
          thunkName="quotes"
        />
      </QuotesTableHeader>
      {my_quotes_list.length === 0 ? (
        <NoQuotesCard text={props.text} />
      ) : (
        <TableContainer className={classes.container} component={Paper}>
          <ScrollbarStyled>
          <Table stickyHeader className={classes.table}  aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell className={classes.emptyHeader} align="left" />
                <TableCell className={classes.shipping_cell} align="left">
                  <TableCellContent
                    setSearchValue={props.setSearchValue}
                    setSearchMode={props.setSearchMode}
                    direction={""}
                    type={props.mode}
                    column_name="shipping_mode"
                    searchValue={props.searchValue}
                    isSearchMode={props.isSearchMode}
                    title={t("Quotes/SHIPPING MODE")}
                    searchColumn={props.search_column}
                    setSearchColumn={props.setSearchColumn}
                    thunkName="quotes"
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
                    title={t("Booking Columns/ROUTE")}
                    searchColumn={props.search_column}
                    setSearchColumn={props.setSearchColumn}
                    thunkName="quotes"
                  />
                </TableCell>
                <TableCell className={classes.cell} align="left">
                  {t("Quotes/VOLUME")}
                </TableCell>
                <TableCell className={classes.innerMainCell} align="left">
                  <TableCellContent
                    setSearchValue={props.setSearchValue}
                    setSearchMode={props.setSearchMode}
                    direction={""}
                    type={props.mode}
                    column_name="date_from"
                    searchValue={props.searchValue}
                    isSearchMode={props.isSearchMode}
                    title={t("Quotes/SHIPMENT DATE")}
                    searchColumn={props.search_column}
                    setSearchColumn={props.setSearchColumn}
                    thunkName="quotes"
                  />
                </TableCell>
                <TableCell className={classes.cell} align="left">
                  {t("Quotes/OFFERS")}
                </TableCell>
                <TableCell className={classes.cell} align="right">
                  <TableCellContent
                    setSearchValue={props.setSearchValue}
                    setSearchMode={props.setSearchMode}
                    direction={""}
                    type={props.mode}
                    column_name="is_active"
                    searchValue={props.searchValue}
                    isSearchMode={props.isSearchMode}
                    title={t("Bookings/STATUS")}
                    searchColumn={props.search_column}
                    setSearchColumn={props.setSearchColumn}
                    thunkName="quotes"
                  />
                </TableCell>
                <TableCell className={classes.cell} align="center">
                  {t("Freight rates/ACTIONS")}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {my_quotes_list?.map((q) => (
                <QuoteRow
                  key={q.id}
                  quote={q}
                  activeInactiveQuote={activeInactiveQuote}
                  deleteQuoteByClient={deleteQuoteByClient}
                  offerViewedHandler={offerViewedHandler}
                />
              ))}
            </TableBody>
          </Table>
          </ScrollbarStyled>
        </TableContainer>
      )}
    </QuotesTableContainer>
  );
};

export default ClientQuotesTable;
