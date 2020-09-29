import React from "react";
import {
    HandlingSurchargeContainer,
    HandlingTitle
} from "../../SurchargeRegistrationForm/sea_containerized_cargo/sea-conteneraized-cargo-styles";
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
    },
    body: {
        height: '201px'
    },
    cell: {
        color: '#115B86',
        fontFamily: 'Helvetica Bold',
        fontSize: '16px',
        borderBottom: '1px solid #115B86',
        padding: '14px 0'
    },
    innerCell: {
        borderBottom: 'none',
        fontFamily: 'Helvetica Light',
        fontSize: '16px',
        color: '#1B1B25',
        padding: '14px 0'
    }
});


const HandlingSurcharge:React.FC = () => {
    const classes = useStyles();

    function createData(container_type: string, currency: string, charge: string, update_by: string, on: string) {
        return { container_type, currency, charge, update_by, on};
    }

    const rows = [
        createData('Type 1', '159.0', '6.0 $', 'Hanna Yarash', '13:00 10 MAY 2020' ),
        createData('Type2', '237.0', '9.0 $', 'Lara Croft', '13:00 10 MAY 2020'),
        createData('Type3', '262.0', '16.0 $', 'James Bond', '13:00 10 MAY 2020' ),
        createData('Type4', '262.0', '16.0 $', 'James Bond', '15:00 10 MAY 2020' ),
        createData('Type4', '262.0', '16.0 $', 'James Bond', '15:00 10 MAY 2020' )
    ];

    return (
        <HandlingSurchargeContainer style={{maxWidth: '834px'}}>
            <HandlingTitle>Handling (surcharge)</HandlingTitle>
            <TableContainer className={classes.container} component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.cell}>CONTAINER TYPE</TableCell>
                            <TableCell className={classes.cell} align="left">CURRENCY</TableCell>
                            <TableCell className={classes.cell} align="left">CHARGE</TableCell>
                            <TableCell className={classes.cell} align="left">UPDATE BY</TableCell>
                            <TableCell className={classes.cell} align="left">ON</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody className={classes.body}>
                        {rows.map((row) => (
                            <TableRow key={row.container_type}>
                                <TableCell className={classes.innerCell}  component="th" scope="row">
                                   {row.container_type}
                                </TableCell>
                                <TableCell className={classes.innerCell} align="left">{row.currency}</TableCell>
                                <TableCell className={classes.innerCell} align="left">{row.charge}</TableCell>
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

export default HandlingSurcharge