import React, {useState} from 'react'
//moment
import moment from "moment";
//material ui
import IconButton from '@material-ui/core/IconButton';
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Tooltip from "@material-ui/core/Tooltip";
//react-redux
import {useDispatch} from "react-redux";
//BLL
import {bookingActions} from "../../../../../_BLL/reducers/booking/bookingReducer";
import {searchActions} from "../../../../../_BLL/reducers/search_client/searchClientReducer";
//types
import {QuoteType} from "../../../../../_BLL/types/quotes/quotesTypes";
//components
import OfferDescription from "./OfferDescription";
//styles
import {ModeIcon, SpanMode} from "../../../Services&Rates/surcharge/surcharges_page/surcharges-style";
import {OffersSpan, StatusSpan} from "./client-quotes-table-styles";
import {CargosOuter} from "../quotes-client-styles";
//icons
import play_icon from "../../../../assets/icons/rates&services/play_icon.svg";
import pause_icon from "../../../../assets/icons/rates&services/pause.svg";
import sea_type from "../../../../assets/icons/rates&services/ship-surcharge.svg";
import air_type from '../../../../assets/icons/rates&services/plane-surcharge.svg';
import close_icon from '../../../../../_UI/assets/icons/close-icon.svg'



const useStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
        '&:hover': {
            transition: '.3s',
            cursor: 'pointer'
        }
    },
    innerMainCell: {
        borderBottom: '1px solid #BDBDBD',
        fontFamily: 'Helvetica Light',
        fontSize: '16px',
        // width: '220px',
        color: '#1B1B25',
        position: 'relative',
        paddingLeft: '63px',
        height: '72px'
    },
    innerCell: {
        borderBottom: '1px solid #BDBDBD',
        fontFamily: 'Helvetica Light',
        fontSize: '16px',
        color: '#1B1B25',
        height: '72px',
        padding: '0 ',
    },
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
        fontSize: '16px'
    },
    collapseMainInnerCell: {
        borderBottom: 0,
        fontFamily: 'Helvetica Reg',
        fontSize: '14px'
    },
    collapseInnerCell: {
        borderBottom: 0,
        fontFamily: 'Helvetica Light',
        fontSize: '14px'
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
    quote: QuoteType,
    activeInactiveQuote: (id: number, is_active: boolean) => void,
    deleteQuoteByClient: (id: number) => void,
    offerViewedHandler: (value: number) =>  void
}

const QuoteRow: React.FC<PropsType> = ({quote, activeInactiveQuote, deleteQuoteByClient, offerViewedHandler}) => {

    const classes = useStyles();
    const dispatch = useDispatch()

    const [isOpen, setIsOpen] = useState(false)
    const [showRating, setShowRating] = useState(false)
    const [clickedReview, setClickedReview] = useState(0)

    const closeReviewPopupHandler = () => {
        setShowRating(false)
        dispatch(searchActions.setSearchedCompanyRating(null))
    }


    let quotes_cargos = quote.cargo_groups.map((q, index) => ({...q, id: index, container_type: q.container_type?.id, packaging_type: q.packaging_type?.id}))
    let getCargoGroupsFromQuote = () => {
        if(isOpen) {
            setIsOpen(false)
            dispatch(bookingActions.set_current_booking_cargo_groups([]))
        } else {
            setIsOpen(true)
            dispatch(bookingActions.set_current_booking_cargo_groups(quotes_cargos))
        }
    }

    //refactor dates
    let a = moment(quote.date_from, 'DD/MM/YYYY').toDate()
    let day_from = moment(a).format('D')
    let c = moment(quote.date_to, 'DD/MM/YYYY').toDate()
    let date_to = moment(c).format('D MMMM YYYY')

    return (
        <React.Fragment>
            <TableRow className={classes.root}>
                <TableCell className={classes.innerMainCell} align="left" component="th" scope="row">
                    <ModeIcon src={quote.shipping_type === 'sea' ? sea_type : air_type} alt=""/>
                    <SpanMode>{quote.shipping_mode.title}</SpanMode>
                </TableCell>
                <TableCell className={classes.innerCell} align="left"><div>{quote.origin.code}</div><div>{quote.destination.code}</div></TableCell>
                <TableCell className={classes.innerCell} align="left">
                    <CargosOuter>
                        {quote.cargo_groups.map((c, index) => {
                           return <span key={index}>{c.volume}{' x '}{c.packaging_type ? c.packaging_type?.description : c.container_type?.code}
                           {c.total_wm && ` - ${c.total_wm}w/m`}</span>
                        })}
                    </CargosOuter>
                </TableCell>
                <TableCell className={classes.innerCell} align="left">
                    {(quote.week_range.week_from !== quote.week_range.week_to)
                        ? `WEEK ${quote.week_range.week_from} - ${quote.week_range.week_to}`
                        : `WEEK ${quote.week_range.week_from}`
                    }
                    <br/> <span style={{fontFamily: 'Helvetica Light', fontSize: '14px'}}>{day_from}{'-'}{date_to}</span>
                </TableCell>
                <TableCell className={classes.innerCell} align="left" onClick={getCargoGroupsFromQuote}>
                    <OffersSpan new_offer={!!quote.unchecked_offers}>{quote.offers}</OffersSpan>
                </TableCell>
                <TableCell className={classes.innerCell} align="left">
                    <StatusSpan status={quote.is_active}>{quote.is_active ? 'Active' : 'Paused'}</StatusSpan>
                </TableCell>
                <TableCell className={classes.innerCell} align="right">
                    <Tooltip
                        arrow
                        title="Quotes can be paused or reactivated using this button. "
                        classes={{ tooltip: classes.customTooltip }}
                    >
                        <IconButton onClick={() => activeInactiveQuote(Number(quote.id), !quote.is_active)}>
                            <img style={{width: '24px', height: '24px'}} src={!quote.is_active ? play_icon : pause_icon} alt=""/>
                        </IconButton>
                    </Tooltip>
                    <Tooltip
                        arrow
                        title="Quotes can be cancelled using this button. "
                        classes={{ tooltip: classes.customTooltip }}
                    >
                        <IconButton onClick={() => deleteQuoteByClient(Number(quote.id))}>
                            <img src={close_icon} alt=""/>
                        </IconButton>
                    </Tooltip>
                </TableCell>
            </TableRow>
           <OfferDescription isOpen={isOpen}
                             offers={quote.statuses ? quote.statuses : []}
                             setShowRating={setShowRating}
                             offerViewedHandler={offerViewedHandler}
                             quote={quote}
                             setClickedReview={setClickedReview}
                             clickedReview={Number(clickedReview)}
                             closeReviewPopupHandler={closeReviewPopupHandler}
                             showRating={showRating}
           />

        </React.Fragment>

    )
}

export default QuoteRow