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
        boxShadow: 'none',
        //height: 320
    },
    table: {
        width: 430,
    },
    body: {
        height: '201px'
    },
    cell: {
        color: '#115B86',
        fontFamily: 'Helvetica Bold',
        fontSize: '16px',
        borderBottom: '1px solid #115B86',
        padding: '16px 0'
    },
    innerCell: {
        borderBottom: 'none',
        fontFamily: 'Helvetica Light',
        fontSize: '16px',
        color: '#1B1B25',
        padding: '16px 0'
    }
});

type PropsType = {
    containers?: any
}

const HandlingTable:React.FC<PropsType> = () => {

    const classes = useStyles();
    let containers: any[] = []

    return (
        <HandlingSurchargeContainer style={{maxWidth: '834px', marginRight: '50px'}}>
            <HandlingTitle margin_bottom='0px'>Handling</HandlingTitle>
            <TableContainer className={classes.container} component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.cell} align="left">CONTAINER TYPE</TableCell>
                            <TableCell className={classes.cell} align="left">CURRENCY</TableCell>
                            <TableCell className={classes.cell} align="right">CHARGE</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody className={classes.body}>
                        {containers?.map((c: any) => (
                            <TableRow key={c.id}>
                                <TableCell className={classes.innerCell}  component="th" scope="row">
                                    {c.container_type.code}
                                </TableCell>
                                <TableCell className={classes.innerCell} align="left">
                                    {c.currency.code}
                                </TableCell>
                                <TableCell className={classes.innerCell} align="right">
                                    {c.charge}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </HandlingSurchargeContainer>
    )
}

export default HandlingTable