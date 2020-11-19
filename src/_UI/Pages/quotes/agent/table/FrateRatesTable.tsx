import React from 'react'
//material ui
import makeStyles from "@material-ui/core/styles/makeStyles";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
//types
import {RateQuoteType} from "../../../../../_BLL/types/quotes/quotesTypes";


const useStyles = makeStyles({
    container: {
        boxShadow: 'none',
        width: 700,
        height: 280,
        overflowY: 'scroll'
    },
    cell: {
        color: '#115B86',
        fontFamily: 'Helvetica Bold',
        fontSize: '16px',
        borderBottom: '1px solid #115B86',
        padding: '14px 0'
    },
    innerMainCell: {
        borderBottom: '1px solid #E0E0E0;',
        fontFamily: 'Helvetica Light',
        fontSize: '16px',
        color: '#1B1B25',
        padding: '16px 0'
    },
    innerCell: {
        borderBottom: '1px solid #E0E0E0;',
        fontFamily: 'Helvetica Light',
        fontSize: '14px',
        color: '#1B1B25',
        padding: '16px 0'
    }
});

type PropsType = {
    rate: RateQuoteType | null
}

const FrateRatesTable:React.FC<PropsType> = ({rate}) => {
    const classes = useStyles();


    return (
        <TableContainer className={classes.container} component={Paper}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {rate?.rates && rate.rates[0].container_type && <TableCell className={classes.cell} align="left">CONTAINER TYPE</TableCell>}
                        <TableCell className={classes.cell} align="left">CURRENCY</TableCell>
                        <TableCell className={classes.cell} align="left">FREIGHT RATE</TableCell>
                        <TableCell className={classes.cell} align="left">EXPIRATION DATE</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rate?.rates?.map((r, index) => <TableRow key={index}>
                        {r.container_type && <TableCell className={classes.innerMainCell} component="th" scope="row">
                            {r.container_type.code}
                        </TableCell>
                        }
                        <TableCell className={classes.innerCell} align="left" >
                            {r.currency.code}
                        </TableCell>
                        <TableCell className={classes.innerCell} align="left" >
                            {r.rate}
                        </TableCell>
                        <TableCell className={classes.innerCell} align="left">
                            {r.expiration_date}
                        </TableCell>
                    </TableRow>)}

                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default FrateRatesTable