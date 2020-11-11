import React from 'react'
//material ui
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import makeStyles from "@material-ui/core/styles/makeStyles";
//styles
import {
    HandlingSurchargeContainer,
    HandlingTitle
} from "../../../../Pages/Services&Rates/surcharge/surcharges_page/surcharge/sea-conteneraized-cargo-styles";


const useStyles = makeStyles({
    container: {
        boxShadow: 'none'
    },
    table: {
        width: 730,
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
        width: '100px',
        padding: '16px'
    },
    innerCell: {
        borderBottom: '1px solid #E0E0E0;',
        fontFamily: 'Helvetica Light',
        fontSize: '16px',
        color: '#1B1B25',
        padding: '16px',
        width: '102px'
    }
});

type PropsType = {
    charges?: any
}

const AdditionalSurchargesPopupTable:React.FC<PropsType> = ({}) => {
    const classes = useStyles();

    let charges: any[] = []

    return (
        <HandlingSurchargeContainer max_height='440px' max_width='650px '>
            <HandlingTitle margin_bottom='0px'>Additional surcharges </HandlingTitle>
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
                        {charges?.map((c: any) => (
                            <TableRow key={c.id}>
                                <TableCell className={classes.innerMainCell}  component="th" scope="row">
                                    {c.additional_surcharge.title}
                                </TableCell>
                                <TableCell className={classes.innerCell} align="left" >
                                    {c.currency.code}
                                </TableCell>
                                <TableCell className={classes.innerCell} align="left" >
                                    {c.charge}
                                </TableCell>
                                <TableCell className={classes.innerCell} align="left">
                                    {c.conditions}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </HandlingSurchargeContainer>
    )
}

export default AdditionalSurchargesPopupTable