import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {TableRow} from "@material-ui/core";
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import makeStyles from "@material-ui/core/styles/makeStyles";
import {BookLittleButton} from "../quotes-client-styles";
import {QuoteType, StatusesQuoteType} from "../../../../../_BLL/types/quotes/quotesTypes";
import {AppStateType} from "../../../../../_BLL/store";
import {quotesClientActions} from "../../../../../_BLL/reducers/quotes/quotesClientReducer";
import SearchCard from "../../../dashboard/search/search_rate_card/SearchCard";
import {CardsAbsoluteWrapper} from "../../../dashboard/search/search_rate_card/search-card-styles";
import ClientBookingPopUp from "../../../../components/PopUps/ClientBookingPopUp/ClientBookingPopUp";
import ModalWindow from "../../../../components/_commonComponents/ModalWindow/ModalWindow";

type PropsType = {
    isOpen?: boolean,
    offers: StatusesQuoteType[],
    setShowRating: (value: boolean) => void,
    offerViewedHandler: (value: number) => void,
    quote?: QuoteType,
}

const useStyles = makeStyles({
    innerRow: {
        transition: '.3s',
        '&:hover': {
            transition: '.3s',
            backgroundColor: '#e8f7fc',
            cursor: 'pointer'
        }
    },
    collapseCell: {
        borderBottom: 0,
        fontFamily: 'Helvetica Bold',
        fontSize: '16px',
        padding: '5px 10px'
    },
    collapseMainInnerCell: {
        borderBottom: 0,
        fontFamily: 'Helvetica Reg',
        fontSize: '14px',
        padding: '0 7px'
    },
    collapseInnerCell: {
        borderBottom: 0,
        fontFamily: 'Helvetica Light',
        fontSize: '14px'
    }
});

const OfferDescription:React.FC<PropsType> = ({isOpen, offers, setShowRating, offerViewedHandler, quote}) => {
    //HOOKS
    const classes = useStyles();
    const dispatch = useDispatch()

    //local state
    const [showTotals, setShowTotals] = useState(false)
    const [bookingPopupVisible, setBookingPopupVisible] = useState(false);
    let [totalId, setTotalId] = useState(0);

    let totalsHandler = (id: number, quote_id: number) => {
        offerViewedHandler(id)
        setTotalId(id)
        setShowTotals(true)
        dispatch(quotesClientActions.setFutureArchiveQuoteId(quote_id))
    }
    let closeTotals = () => {
        setTotalId(0)
        setShowTotals(false)
        dispatch(quotesClientActions.setFutureArchiveQuoteId(0))

    }


    //data from store
    const currentBookingRate = useSelector((state: AppStateType) => state.booking.current_booking_freight_rate);

    return (
        <>
            {offers.map((o, index) => <>
                    <TableRow key={index}>
                        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                            <Collapse in={isOpen} timeout="auto" unmountOnExit>
                                <Box>
                                    <Table size="small" aria-label="purchases">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell className={classes.collapseCell} align="center">OFFER NO</TableCell>
                                                <TableCell className={classes.collapseCell}>CARRIER</TableCell>
                                                <TableCell align="left" className={classes.collapseCell}>TRANSIT TIME</TableCell>
                                                <TableCell align="left" className={classes.collapseCell}>TOTAL USD</TableCell>
                                                <TableCell align="left" className={classes.collapseCell}>TOTAL BRL</TableCell>
                                                <TableCell align="left" className={classes.collapseCell}/>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            <TableRow className={classes.innerRow}>
                                                <TableCell className={classes.collapseMainInnerCell} component="th" scope="row" align="center">
                                                    {o.id}
                                                </TableCell>
                                                <TableCell className={classes.collapseInnerCell} align="left">
                                                    {o.freight_rate?.carrier_disclosure
                                                        ? 'Carrier is disclosed'
                                                        : o.freight_rate?.carrier.title
                                                    }
                                                </TableCell>
                                                <TableCell align="left" className={classes.collapseInnerCell}>
                                                    {o.charges.freight_rate?.transit_time
                                                        ? o.charges.freight_rate?.transit_time
                                                        : 0} DAYS
                                                </TableCell>
                                                <TableCell align="left" className={classes.collapseInnerCell}>
                                                    {o.charges.totals.USD
                                                        ? `$ ${o.charges.totals.USD}`
                                                        : '-'
                                                    }
                                                </TableCell>
                                                <TableCell align="left" className={classes.collapseInnerCell}>
                                                    {o.charges.totals.BRL
                                                        ? `BRL ${o.charges.totals.BRL}`
                                                        : '-'
                                                    }
                                                </TableCell>
                                                <TableCell align="left" className={classes.collapseInnerCell}>
                                                    <BookLittleButton onClick={() => totalsHandler(o.id, quote?.id as number)}>BOOK</BookLittleButton>
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </Box>
                            </Collapse>
                        </TableCell>
                    </TableRow>
                    <ModalWindow isOpen={showTotals && (totalId === o.id)}>
                        <CardsAbsoluteWrapper>
                            <SearchCard showRatingPopup={setShowRating}
                                        search_result={o.charges}
                                        closeTotals={closeTotals}
                                        quote={quote}
                                        setBookingPopupVisible={setBookingPopupVisible}
                                        bookingPopupVisible={bookingPopupVisible}

                            />
                        </CardsAbsoluteWrapper>
                    </ModalWindow>
                    {bookingPopupVisible && currentBookingRate &&
                        <ModalWindow isOpen={bookingPopupVisible && !!currentBookingRate}>
                            <ClientBookingPopUp
                                shippingValue={Number(quote?.shipping_mode.id)}
                                setBookingPopupVisible={setBookingPopupVisible}
                                currentFreightRate={currentBookingRate}
                                quote_dates={{date_from: String(quote?.date_from), date_to: String(quote?.date_to)}}
                                close_totals={closeTotals}
                                quotes_mode={true}
                            />
                        </ModalWindow>
                    }

            </>
            )}

        </>

    )
}

export default OfferDescription