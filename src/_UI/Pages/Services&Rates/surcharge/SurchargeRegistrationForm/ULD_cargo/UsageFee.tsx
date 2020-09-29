import React from "react";
import {HandlingSurchargeContainer, HandlingTitle} from "../sea_containerized_cargo/sea-conteneraized-cargo-styles";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import makeStyles from "@material-ui/core/styles/makeStyles";


const useStyles = makeStyles({
    container: {
        boxShadow: 'none'
    },
    table: {
        minWidth: 479,
        '& .MuiTableHead-root' : {
            borderBottom: '2px solid #115B86'
        }
    },
    cell: {
        color: '#115B86',
        fontFamily: 'Helvetica Bold',
        fontSize: '16px'
    },
    innerCell: {
        borderBottom: 'none',
        fontFamily: 'Helvetica Thin',
        fontSize: '16px',
        color: '#1B1B25'
    }
});


const UsageFee = () => {

    const classes = useStyles();

    function createData(uld_type: string, currency: string, charge: string) {
        return { uld_type, currency, charge};
    }

    const rows = [
        createData('Type 1', '159.0', '6.0 $' ),
        createData('Type2', '237.0', '9.0 $'),
        createData('Type3', '262.0', '16.0 $' )
    ];

    return (
        <HandlingSurchargeContainer>
            <HandlingTitle>Usage Fee</HandlingTitle>
            <TableContainer className={classes.container} component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.cell}>ULD TYPES</TableCell>
                            <TableCell className={classes.cell} align="left">CURRENCY</TableCell>
                            <TableCell className={classes.cell} align="left">CHARGE</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row.uld_type}>
                                <TableCell className={classes.innerCell}  component="th" scope="row">
                                    {row.uld_type}
                                </TableCell>
                                <TableCell className={classes.innerCell} align="left">{row.currency}</TableCell>
                                <TableCell className={classes.innerCell} align="left">{row.charge}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </HandlingSurchargeContainer>
    )
}

export default UsageFee