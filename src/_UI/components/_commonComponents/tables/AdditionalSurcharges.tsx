import React from 'react';
import {
    HandlingSurchargeContainer,
    HandlingTitle
} from "../../../Pages/Services&Rates/surcharge/SurchargeRegistrationForm/sea_containerized_cargo/sea-conteneraized-cargo-styles";
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
        minWidth: 662,
        maxWidth: 662,
        '& .MuiTableHead-root' : {
            borderBottom: '2px solid #115B86'
        }
    },
    cell: {
        color: '#115B86',
        fontFamily: 'Helvetica Bold',
        fontSize: '16px'
    },
    innerMainCell: {
        borderBottom: 'border: 1px solid #E0E0E0;',
        fontFamily: 'Helvetica Bold',
        fontSize: '16px',
        color: '#115B86',
        width: '213px'
    },
    innerCell: {
        borderBottom: 'border: 1px solid #E0E0E0;',
        fontFamily: 'Helvetica Thin',
        fontSize: '16px',
        color: '#1B1B25'
    }
});


const AdditionalSurcharges:React.FC = () => {

    const classes = useStyles();

    function createData(name: string, currency: string, charge: string, conditions: string) {
        return { name, currency, charge, conditions};
    }

    const rows = [
        createData('DOCUMENT FEE', '159.0', '6.0 $', 'fixed'),
        createData('OTHER SURCHARGES (PER CONTAINER)', '237.0', '9.0 $', 'fixed'),
        createData('DANGEROUS CARGO FEE', '262.0', '16.0 $', 'fixed' ),
        createData('COLD CARGO CHARGE', '262.0', '16.0 $', 'fixed' )
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
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row.name}>
                                <TableCell className={classes.innerMainCell}  component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell className={classes.innerCell} align="left">{row.currency}</TableCell>
                                <TableCell className={classes.innerCell} align="left">{row.charge}</TableCell>
                                <TableCell className={classes.innerCell} align="left">{row.conditions}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </HandlingSurchargeContainer>
    )
}

export default AdditionalSurcharges