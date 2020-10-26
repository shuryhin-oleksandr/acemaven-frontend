import React, {useState} from 'react'
import TableCell from "@material-ui/core/TableCell";
import {ModeIcon, SpanMode} from "../../../Services&Rates/surcharge/surcharges_page/surcharges-style";
import sea_type from "../../../../assets/icons/rates&services/ship-surcharge.svg";
import {OffersSpan, StatusSpan} from "./client-quotes-table-styles";
import play_icon from "../../../../assets/icons/rates&services/play_icon.svg";
import TableRow from "@material-ui/core/TableRow";
import makeStyles from "@material-ui/core/styles/makeStyles";
import OfferDescription from "./OfferDescription";
import IconButton from '@material-ui/core/IconButton';


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

const QuoteRow = () => {

    const classes = useStyles();

    const [isOpen, setIsOpen] = useState(false)

    return (
        <React.Fragment>
            <TableRow className={classes.root} onClick={() => isOpen ? setIsOpen(false) : setIsOpen(true)}>
                <TableCell  className={classes.innerMainCell} align="left" component="th" scope="row">
                    <ModeIcon src={sea_type} alt=""/>
                    <SpanMode>FCL</SpanMode>
                </TableCell>
                <TableCell className={classes.innerCell} align="left"><div>LHR</div><div>JFK</div></TableCell>
                <TableCell className={classes.innerCell} align="left">12 boxes <br/> 2W/M</TableCell>
                <TableCell className={classes.innerCell} align="left">WEEK 36 <br/> 1-7 APR 2020</TableCell>
                <TableCell className={classes.innerCell} align="center"><OffersSpan new_offer={true}>3</OffersSpan></TableCell>
                <TableCell className={classes.innerCell} align="center"><StatusSpan status='active'>Active</StatusSpan></TableCell>
                <TableCell className={classes.innerCell} align="right">

                    <IconButton><img src={play_icon} alt=""/></IconButton>
                </TableCell>
            </TableRow>
           <OfferDescription isOpen={isOpen}/>
        </React.Fragment>

    )
}

export default QuoteRow