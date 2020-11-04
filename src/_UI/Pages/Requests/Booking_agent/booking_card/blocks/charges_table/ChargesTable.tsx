import React from 'react'
import makeStyles from "@material-ui/core/styles/makeStyles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";

const useStyles = makeStyles({
    container: {
        boxShadow: 'none',
        overflowY: 'scroll',
        maxWidth: 700,
        minWidth: 650
    },
    table: {
        '& .MuiTableHead-root' : {

        }
    },
    row: {
        verticalAlign: 'top'
    },
    cell: {
        color: '#115B86',
        fontFamily: 'Helvetica Bold',
        fontSize: '14px',
        borderBottom: '1px solid #115b86',
        borderTop: '1px solid #115b86',
        padding: '10px 0',
        marginRight: '44px'
    },
    innerCell: {
        borderBottom: '1px solid #e0e0e0',
        fontFamily: 'Helvetica Light',
        fontSize: '14px',
        color: '#1B1B25',
        height: '100px',
        padding: '16px 0 0',
    }
});

const ChargesTable = () => {
    const classes = useStyles();

    return (
        <TableContainer className={classes.container} component={Paper}>
            <Table className={classes.table} aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell className={classes.cell} align="left">
                            VOLUME
                        </TableCell>
                        <TableCell className={classes.cell} align="left">
                            TYPE
                        </TableCell>
                        <TableCell className={classes.cell} align="left">
                            CARGO DESCRIPTIONS
                        </TableCell>
                        <TableCell className={classes.cell} align="left">
                            CHARGE
                        </TableCell>
                        <TableCell className={classes.cell} align="left">
                            CURRENCY
                        </TableCell>
                        <TableCell className={classes.cell} align="right">
                            COST
                        </TableCell>
                        <TableCell className={classes.cell} align="right">
                            SUBTOTAL
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow className={classes.row}>
                        <TableCell className={classes.innerCell} align="left">1</TableCell>
                        <TableCell className={classes.innerCell} align="left">40HC</TableCell>
                        <TableCell className={classes.innerCell} align="left">GREEN COFFEE BEANS</TableCell>
                        <TableCell className={classes.innerCell} align="left">FREIGHT <br/> HANDLING <br/> OTHERS</TableCell>
                        <TableCell className={classes.innerCell} align="center">USD <br/> BRL<br/> EUR</TableCell>
                        <TableCell className={classes.innerCell} align="right">100 <br/> 1000<br/> 150</TableCell>
                        <TableCell className={classes.innerCell} align="right">2000 <br/> 2900<br/> 3100</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default ChargesTable
