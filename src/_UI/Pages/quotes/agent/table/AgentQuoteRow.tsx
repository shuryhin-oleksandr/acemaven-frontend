import React from 'react'
//material ui
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import makeStyles from "@material-ui/core/styles/makeStyles";
//types
import {QuoteType} from "../../../../../_BLL/types/quotes/quotesTypes";
//styles
import {ModeIcon, SpanMode} from "../../../Services&Rates/surcharge/surcharges_page/surcharges-style";
import {StatusSpan} from "../../client/tables/client-quotes-table-styles";
import {DoneIcon, SubmitQuoteButton, SubmittedWrapper} from "./agent-quotes-styles";
//icons
import sea_type from "../../../../assets/icons/rates&services/ship-surcharge.svg";
import air_type from '../../../../assets/icons/rates&services/plane-surcharge.svg'
import moment from "moment";
import {CargosOuter} from "../../client/quotes-client-styles";


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
        width: '220px',
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
        padding: '0',
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
    }
});

type PropsType = {
    setCardOpen: (value: number) => void,
    quote: QuoteType
}

const AgentQuoteRow:React.FC<PropsType> = ({ setCardOpen, quote}) => {

    const classes = useStyles();
    let a = moment(quote.date_from, 'DD/MM/YYYY').toDate()
    let day_from = moment(a).format('D')
    let c = moment(quote.date_to, 'DD/MM/YYYY').toDate()
    let date_to = moment(c).format('D MMMM YYYY')

    return (
        <TableRow  className={classes.root}>
            <TableCell className={classes.innerMainCell} align="left" component="th" scope="row">
                <ModeIcon src={quote.shipping_type === 'sea' ? sea_type : air_type} alt=""/>
                <SpanMode>{quote.origin.code}</SpanMode>
            </TableCell>
            <TableCell className={classes.innerCell} align="left">{quote.destination.code}</TableCell>
            <TableCell className={classes.innerCell} align="left">{quote.shipping_mode.title}</TableCell>
            <TableCell className={classes.innerCell} align="center">
                <CargosOuter>
                    {quote.cargo_groups.map((c, index) => {
                        return <span key={index}>{c.volume}{' x '}{c.packaging_type ? c.packaging_type?.description : c.container_type?.code}
                            {c.total_wm && ` - ${c.total_wm}w/m`}</span>
                    })}
                </CargosOuter>
            </TableCell>
            <TableCell className={classes.innerCell} align="center">
                <div style={{fontFamily: 'Helvetica Light', fontSize: '15px', textAlign: 'start'}}>{day_from} - {date_to}</div>
                <div style={{textAlign: 'start'}}>WEEK {quote.week_range.week_from}{quote.week_range.week_from !== quote.week_range.week_to && ` - ${quote.week_range.week_to}`}</div>
            </TableCell>
            <TableCell className={classes.innerCell} align="center">
                {quote.is_submitted
                    ? <SubmittedWrapper>
                        <DoneIcon />
                        <StatusSpan onClick={() => setCardOpen(Number(quote.id))}>Submitted</StatusSpan>
                    </SubmittedWrapper>
                    :  <SubmitQuoteButton onClick={() => setCardOpen(Number(quote.id))}>SUBMIT QUOTE</SubmitQuoteButton>
                }
            </TableCell>
        </TableRow>
    )
}

export default AgentQuoteRow