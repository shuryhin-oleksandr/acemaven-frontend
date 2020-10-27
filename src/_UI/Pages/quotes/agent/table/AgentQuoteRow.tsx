import React from 'react'
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import {ModeIcon, SpanMode} from "../../../Services&Rates/surcharge/surcharges_page/surcharges-style";
import sea_type from "../../../../assets/icons/rates&services/ship-surcharge.svg";
import {StatusSpan} from "../../client/tables/client-quotes-table-styles";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {DoneIcon, SubmitQuoteButton, SubmittedWrapper} from "./agent-quotes-styles";

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
    submit_status: boolean,
    setCardOpen: (value: boolean) => void
}

const AgentQuoteRow:React.FC<PropsType> = ({submit_status, setCardOpen}) => {

    const classes = useStyles();

    return (
        <TableRow onClick={() => setCardOpen(true)} className={classes.root}>
            <TableCell  className={classes.innerMainCell} align="left" component="th" scope="row">
                <ModeIcon src={sea_type} alt=""/>
                <SpanMode>LHR</SpanMode>
            </TableCell>
            <TableCell className={classes.innerCell} align="left">JFK</TableCell>
            <TableCell className={classes.innerCell} align="left">FCL</TableCell>
            <TableCell className={classes.innerCell} align="left">2 x 3.0 kg</TableCell>
            <TableCell className={classes.innerCell} align="center"><div>12 march 2020</div><div>WEEK 5</div></TableCell>
            <TableCell className={classes.innerCell} align="center">
                {submit_status
                    ? <SubmittedWrapper>
                        <DoneIcon />
                        <StatusSpan status='active'>Submitted</StatusSpan>
                    </SubmittedWrapper>
                    :  <SubmitQuoteButton>SUBMIT QUOTE</SubmitQuoteButton>
                }
            </TableCell>
        </TableRow>
    )
}

export default AgentQuoteRow