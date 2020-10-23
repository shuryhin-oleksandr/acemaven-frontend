import React from 'react'
import {TableRow} from "@material-ui/core";
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import makeStyles from "@material-ui/core/styles/makeStyles";
import {BookLittleButton} from "../quotes-client-styles";

type PropsType = {
    isOpen?: boolean
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

const OfferDescription:React.FC<PropsType> = ({isOpen}) => {
    const classes = useStyles();

    return (
        <TableRow>
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
                                        001
                                    </TableCell>
                                    <TableCell className={classes.collapseInnerCell} align="left">AMERICAN AIRLINES</TableCell>
                                    <TableCell align="left" className={classes.collapseInnerCell}>2 DAYS</TableCell>
                                    <TableCell align="left" className={classes.collapseInnerCell}>
                                        $5390
                                    </TableCell>
                                    <TableCell align="left" className={classes.collapseInnerCell}>
                                        BRL 10600
                                    </TableCell>
                                    <TableCell align="left" className={classes.collapseInnerCell}>
                                       <BookLittleButton>BOOK</BookLittleButton>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </Box>
                </Collapse>
            </TableCell>
        </TableRow>
    )
}

export default OfferDescription