import React, { useState } from "react";
//react-redux
import { useDispatch, useSelector } from "react-redux";
//material ui
import { TableRow } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import makeStyles from "@material-ui/core/styles/makeStyles";
//BLL
import { AppStateType } from "../../../../../_BLL/store";
import { quotesClientActions } from "../../../../../_BLL/reducers/quotes/quotesClientReducer";
//types
import {
  QuoteType,
  StatusesQuoteType,
} from "../../../../../_BLL/types/quotes/quotesTypes";
import { VoidFunctionType } from "../../../../../_BLL/types/commonTypes";
//components
import SearchCard from "../../../dashboard/search/search_rate_card/SearchCard";
import ClientBookingPopUp from "../../../../components/PopUps/ClientBookingPopUp/ClientBookingPopUp";
import ModalWindow from "../../../../components/_commonComponents/ModalWindow/ModalWindow";
import RatingInfoPopup from "../../../../components/PopUps/rating_info_popup/RatingInfoPopup";
//styles
import { BookLittleButton } from "../quotes-client-styles";
import { CardsAbsoluteWrapper } from "../../../dashboard/search/search_rate_card/search-card-styles";
import {useTranslation} from "react-i18next";

type PropsType = {
  isOpen?: boolean;
  offers: StatusesQuoteType[];
  setShowRating: (value: boolean) => void;
  offerViewedHandler: (value: number) => void;
  quote?: QuoteType;
  setClickedReview?: (value: number) => void;
  clickedReview: number;
  closeReviewPopupHandler: VoidFunctionType;
  showRating: boolean;
};

const useStyles = makeStyles({
  innerRow: {
    transition: ".3s",
    "&:hover": {
      transition: ".3s",
      backgroundColor: "#e8f7fc",
      cursor: "pointer",
    },
  },
  collapseCell: {
    borderBottom: 0,
    fontFamily: "Helvetica Bold",
    fontSize: "16px",
    padding: "5px 10px",
  },
  collapseMainInnerCell: {
    borderBottom: "1px solid #E0E0E0",
    fontFamily: "Helvetica Reg",
    fontSize: "14px",
    padding: "0 7px",
  },
  collapseInnerCell: {
    borderBottom: "1px solid #E0E0E0",
    fontFamily: "Helvetica Light",
    fontSize: "14px",
  },
  empty: {
    width: "30px",
    padding: 0,
    borderBottom: "1px solid #E0E0E0",
  },
  emptyHeader: {
    width: "30px",
    padding: 0,
    borderBottom: "none",
    backgroundColor: "white",
  },
});

const OfferDescription: React.FC<PropsType> = ({
  isOpen,
  offers,
  setShowRating,
  offerViewedHandler,
  quote,
  ...props
}) => {
  //HOOKS
  const classes = useStyles();
  const dispatch = useDispatch();

  //local state
  const [showTotals, setShowTotals] = useState(false);
  const [bookingPopupVisible, setBookingPopupVisible] = useState(false);
  let [totalId, setTotalId] = useState(0);

  let totalsHandler = (id: number, quote_id: number) => {
    offerViewedHandler(id);
    setTotalId(id);
    setShowTotals(true);
    dispatch(quotesClientActions.setFutureArchiveQuoteId(quote_id));
  };
  let closeTotals = () => {
    setTotalId(0);
    setShowTotals(false);
    dispatch(quotesClientActions.setFutureArchiveQuoteId(0));
  };

  //data from store
  const currentBookingRate = useSelector(
    (state: AppStateType) => state.booking.current_booking_freight_rate
  );
  const {t} = useTranslation();
  return (
    <TableRow>
      <TableCell
        style={{
          paddingBottom: 0,
          paddingTop: 0,
          paddingLeft: 30,
          borderBottom: "none",
        }}
        colSpan={6}
      >
        <Collapse in={isOpen} timeout="auto" unmountOnExit>
          <Box>
            <Table size="small" aria-label="purchases">
              <TableHead>
                <TableRow>
                  <TableCell className={classes.emptyHeader} align="left" />
                  <TableCell className={classes.collapseCell} align="left">
                    {t("Quotes/OFFER NO.")}
                  </TableCell>
                  <TableCell className={classes.collapseCell}>
                    {t("Quote bid screen/CARRIER")}
                  </TableCell>
                  <TableCell align="left" className={classes.collapseCell}>
                    {t("Bookings/TRANSIT TIME")}
                  </TableCell>
                  <TableCell align="left" className={classes.collapseCell}>
                    {t("Dashboard/TOTAL")} USD
                  </TableCell>
                  <TableCell align="left" className={classes.collapseCell}>
                    {t("Dashboard/TOTAL")} BRL
                  </TableCell>
                  <TableCell align="left" className={classes.collapseCell} />
                </TableRow>
              </TableHead>

              {offers.map((o, index) => (
                <TableBody>
                  <TableRow className={classes.innerRow}>
                    <TableCell
                      className={classes.empty}
                      align="left"
                      component="th"
                      scope="row"
                    />
                    <TableCell
                      className={classes.collapseMainInnerCell}
                      component="th"
                      scope="row"
                      align="left"
                    >
                      {o.id}
                    </TableCell>
                    <TableCell
                      className={classes.collapseInnerCell}
                      align="left"
                    >
                      {o.freight_rate?.carrier_disclosure
                        ? "Carrier is disclosed"
                        : o.freight_rate?.carrier.title}
                    </TableCell>
                    <TableCell
                      align="left"
                      className={classes.collapseInnerCell}
                    >
                      {o.charges.freight_rate?.transit_time
                        ? o.charges.freight_rate?.transit_time
                        : 0}{" "}
                      DAYS
                    </TableCell>
                    <TableCell
                      align="left"
                      className={classes.collapseInnerCell}
                    >
                      {o.charges.totals.USD ? `$ ${o.charges.totals.USD}` : "-"}
                    </TableCell>
                    <TableCell
                      align="left"
                      className={classes.collapseInnerCell}
                    >
                      {o.charges.totals.BRL
                        ? `BRL ${o.charges.totals.BRL}`
                        : "-"}
                    </TableCell>
                    <TableCell
                      align="left"
                      className={classes.collapseInnerCell}
                    >
                      <BookLittleButton
                        onClick={() => totalsHandler(o.id, quote?.id as number)}
                      >
                        {t("Dashboard/BOOK")}
                      </BookLittleButton>
                    </TableCell>
                  </TableRow>
                  <ModalWindow isOpen={props.showRating}>
                    <RatingInfoPopup
                      clickedReview={props.clickedReview}
                      closeReviewPopupHandler={props.closeReviewPopupHandler}
                    />
                  </ModalWindow>
                  <ModalWindow
                    isOpen={showTotals && totalId === o.id && !props.showRating}
                  >
                    <CardsAbsoluteWrapper>
                      <SearchCard
                        showRatingPopup={setShowRating}
                        search_result={o.charges}
                        closeTotals={closeTotals}
                        quote={quote}
                        setBookingPopupVisible={setBookingPopupVisible}
                        bookingPopupVisible={bookingPopupVisible}
                        setClickedReview={props.setClickedReview}
                      />
                    </CardsAbsoluteWrapper>
                  </ModalWindow>
                  {bookingPopupVisible && currentBookingRate && (
                    <ModalWindow
                      isOpen={bookingPopupVisible && !!currentBookingRate}
                    >
                      <ClientBookingPopUp
                        shippingValue={Number(quote?.shipping_mode.id)}
                        setBookingPopupVisible={setBookingPopupVisible}
                        currentFreightRate={currentBookingRate}
                        quote_dates={{
                          date_from: String(quote?.date_from),
                          date_to: String(quote?.date_to),
                        }}
                        close_totals={closeTotals}
                        quotes_mode={true}
                      />
                    </ModalWindow>
                  )}
                </TableBody>
              ))}
            </Table>
          </Box>
        </Collapse>
      </TableCell>
    </TableRow>
  );
};

export default OfferDescription;
