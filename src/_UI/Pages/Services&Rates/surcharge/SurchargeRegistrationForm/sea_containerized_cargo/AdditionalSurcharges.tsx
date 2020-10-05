import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {HandlingSurchargeContainer, HandlingTitle} from "./sea-conteneraized-cargo-styles";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import {AdditionalSurchargeType} from "../../../../../../_BLL/types/rates&surcharges/surchargesTypes";


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
        borderBottom: '1px solid #E0E0E0;',
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

type PropsType = {
    additionals?: AdditionalSurchargeType[] | null
}

const AdditionalSurcharges:React.FC<PropsType> = ({additionals}) => {
    const classes = useStyles();

    function createData(name: string, currency: string, charge: number) {
        return { name, currency, charge};
    }

    let rows = (additionals && additionals?.length > 0)
        ?  additionals?.map((a) => createData(a?.title, '', 0))
        : null


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
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows?.map((row) => (
                            <TableRow key={row.name}>
                                <TableCell className={classes.innerMainCell}  component="th" scope="row">
                                    {row.name}
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

export default AdditionalSurcharges