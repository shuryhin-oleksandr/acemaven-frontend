import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";

import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import { HandlingSurchargeContainer, HandlingTitle } from "../../SurchargeRegistrationForm/sea_containerized_cargo/sea-conteneraized-cargo-styles";
import { BorderSpan } from "./surcharge-style";


const useStyles = makeStyles({
    container: {
        boxShadow: 'none'
    },
    table: {
        minWidth: 479,
        '& .MuiTableHead-root' : {

        }
    },
    cell: {
        color: '#115B86',
        fontFamily: 'Helvetica Bold',
        fontSize: '16px',
        borderBottom: '1px solid #115B86'
    },
    innerMainCell: {
        borderBottom: ' 1px solid #E0E0E0;',
        fontFamily: 'Helvetica Bold',
        fontSize: '16px',
        color: '#115B86',
        width: '213px'
    },
    innerCell: {
        borderBottom: '1px solid #E0E0E0;',
        fontFamily: 'Helvetica Light',
        fontSize: '16px',
        color: '#1B1B25'
    }
});


const Additional = () => {
    const classes = useStyles();

    function createData(name: string, currency: string, charge: string, conditions: string, update_by: string, on: string) {
        return { name, currency, charge, conditions, update_by, on};
    }

    const rows = [
        createData('DOCUMENT FEE', '159.0', '6.0 $', 'fixed','Hanna Yarash', '13:00 10 MAY 2020' ),
        createData('OTHER SURCHARGES (PER CONTAINER)', '237.0', '9.0 $', 'fixed','Hanna Yarash', '13:00 10 MAY 2020'),
        createData('DANGEROUS CARGO FEE', '262.0', '16.0 $', 'fixed','Hanna Yarash', '13:00 10 MAY 2020'),
        createData('COLD CARGO CHARGE', '262.0', '16.0 $', 'fixed','Hanna Yarash', '13:00 10 MAY 2020')
    ];

    return (
        <HandlingSurchargeContainer>
            <HandlingTitle>Additional surcharges </HandlingTitle>
            <TableContainer className={classes.container} component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.cell}>{' '}</TableCell>
                            <TableCell className={classes.cell} align="left">CURRENCY</TableCell>
                            <TableCell className={classes.cell} align="left">CHARGE</TableCell>
                            <TableCell className={classes.cell} align="left">CONDITIONS</TableCell>
                            <TableCell className={classes.cell} align="left">UPDATE BY</TableCell>
                            <TableCell className={classes.cell} align="left">ON</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row.name}>
                                <TableCell className={classes.innerMainCell}  component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell className={classes.innerCell} align="left">
                                   {row.currency}
                                </TableCell>
                                <TableCell className={classes.innerCell} align="left">
                                    <BorderSpan>
                                        {row.charge}
                                    </BorderSpan>
                                </TableCell>
                                <TableCell className={classes.innerCell} align="left">{row.conditions}</TableCell>
                                <TableCell className={classes.innerCell} align="left">{row.update_by}</TableCell>
                                <TableCell className={classes.innerCell} align="left">{row.on}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </HandlingSurchargeContainer>
    )
}

export default Additional