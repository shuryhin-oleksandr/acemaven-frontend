import React from 'react'
import makeStyles from "@material-ui/core/styles/makeStyles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import {CostBookingType} from "../../../../../../../_BLL/types/bookingTypes";

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
    },
    innerCell_doc: {
        borderBottom: '1px solid #e0e0e0',
        fontFamily: 'Helvetica Light',
        fontSize: '14px',
        color: '#1B1B25',
        height: '100px',
        padding: '5px 0 0',
    }
});

type PropsType = {
    charges_cost: CostBookingType | null
}

const ChargesTable:React.FC<PropsType> = ({charges_cost}) => {
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
                    {charges_cost?.cargo_groups.map(cc => <TableRow className={classes.row}>
                        <TableCell className={classes.innerCell} align="left">{cc.volume}</TableCell>
                        <TableCell className={classes.innerCell} align="left">{cc.cargo_type}</TableCell>
                        <TableCell className={classes.innerCell} align="left">??</TableCell>
                        <TableCell className={classes.innerCell} align="left">
                            FREIGHT <br/>
                            HANDLING <br/>
                            OTHERS
                        </TableCell>
                        <TableCell className={classes.innerCell} align="center">
                            {cc.freight.currency} <br/>
                            {cc.handling.currency}
                            <br/> {cc.other.currency}
                        </TableCell>
                        <TableCell className={classes.innerCell} align="right">
                            {cc.freight.cost} <br/>
                            {cc.handling.cost}<br/>
                            {cc.other.cost}</TableCell>
                        <TableCell className={classes.innerCell} align="right">
                            {cc.freight.subtotal} <br/>
                            {cc.handling.subtotal}<br/>
                            {cc.other.subtotal}
                        </TableCell>
                    </TableRow>
                    )}
                    <TableRow className={classes.row}>
                        <TableCell className={classes.innerCell_doc} align="left"/>
                        <TableCell className={classes.innerCell_doc} align="left"/>
                        <TableCell className={classes.innerCell_doc} align="left"/>
                        <TableCell className={classes.innerCell_doc} align="left">
                            DOC FEE
                        </TableCell>
                        <TableCell className={classes.innerCell_doc} align="center">
                            {charges_cost?.doc_fee.currency}
                        </TableCell>
                        <TableCell className={classes.innerCell_doc} align="right">
                            {charges_cost?.doc_fee.cost}
                        </TableCell>
                        <TableCell className={classes.innerCell_doc} align="right">
                            {charges_cost?.doc_fee.subtotal}
                        </TableCell>
                    </TableRow>
                    <TableRow className={classes.row}>
                        <TableCell className={classes.innerCell} align="left"/>
                        <TableCell className={classes.innerCell} align="left"/>
                        <TableCell className={classes.innerCell} align="left"/>
                        <TableCell className={classes.innerCell} align="left"/>
                        <TableCell className={classes.innerCell} align="center"/>
                        <TableCell className={classes.innerCell} align="right">
                            {charges_cost?.total_surcharge.BRL && 'CHARGES IN BRL'}
                            {charges_cost?.total_surcharge.USD && 'CHARGES IN USD'}
                        </TableCell>
                        <TableCell className={classes.innerCell} align="right">
                            {charges_cost?.total_surcharge.BRL && charges_cost?.total_surcharge.BRL}
                            {charges_cost?.total_surcharge.USD && charges_cost?.total_surcharge.USD}
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default ChargesTable
