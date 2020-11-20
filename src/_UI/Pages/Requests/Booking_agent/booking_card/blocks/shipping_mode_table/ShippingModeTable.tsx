import React from 'react'
import {ShippingModeBlock, ShippingModeLabel} from "../hidden-part-styles";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import {CargoGroupQuoteType} from "../../../../../../../_BLL/types/quotes/quotesTypes";

const useStyles = makeStyles({
    container: {
        boxShadow: 'none',
        overflowY: 'scroll',
        maxWidth: 1020,
        minWidth: 650
    },
    table: {
        '& .MuiTableHead-root' : {

        }
    },
    shipping_cell: {
        width: '220px',
        color: '#115B86',
        fontFamily: 'Helvetica Bold',
        fontSize: '14px',
        borderBottom: '1px solid transparent',
        paddingLeft: '63px',
        padding: '0'

    },
    row: {
        verticalAlign: 'top'
    },
    cell: {
        color: '#115B86',
        fontFamily: 'Helvetica Bold',
        fontSize: '14px',
        borderBottom: '1px solid transparent',
        padding: '0',
        marginRight: '44px'
    },
    innerMainCell: {
        borderBottom: '1px solid transparent',
        fontFamily: 'Helvetica Light',
        fontSize: '14px',
        color: '#1B1B25',
        position: 'relative',
        paddingLeft: '63px',
        height: '72px'
    },
    innerCell: {
        borderBottom: '1px solid transparent',
        fontFamily: 'Helvetica Light',
        fontSize: '14px',
        color: '#1B1B25',
        height: '72px',
        padding: '0',
    }
});

type PropsType = {
    cargo_groups?: CargoGroupQuoteType[]
}

const ShippingModeTable:React.FC<PropsType> = ({cargo_groups}) => {
    const classes = useStyles();

    return (
        <ShippingModeBlock>
            <ShippingModeLabel>FCL</ShippingModeLabel>
            <TableContainer className={classes.container} component={Paper}>
                <Table className={classes.table} aria-label="collapsible table">
                    <TableHead>
                        {cargo_groups && cargo_groups[0]?.container_type
                            ? <TableRow>
                                <TableCell className={classes.cell} align="left">
                                    VOLUME
                                </TableCell>
                                <TableCell className={classes.cell} align="left">
                                    PACKAGING
                                </TableCell>
                                <TableCell className={classes.cell} align="left">
                                    CARGO DESCRIPTIONS
                                </TableCell>
                            </TableRow>
                            : <TableRow>
                                <TableCell className={classes.cell} align="left">
                                    VOLUME
                                </TableCell>
                                <TableCell className={classes.cell} align="left">
                                    NO. OF PACKS
                                </TableCell>
                                <TableCell className={classes.cell} align="left">
                                    PACKAGING TYPE
                                </TableCell>
                                <TableCell className={classes.cell} align="left">
                                    HEIGHT, WIDTH, LENGTH, WEIGHT
                                </TableCell>
                                <TableCell className={classes.cell} align="left">
                                    CARGO DESCRIPTIONS
                                </TableCell>
                            </TableRow>
                        }
                    </TableHead>
                    <TableBody>
                        {cargo_groups?.map((c, index) => <TableRow key={index} className={classes.row}>
                            {c.container_type
                                ? <>
                                    <TableCell className={classes.innerCell} align="left">
                                        {c.container_type?.code}
                                    </TableCell>
                                    <TableCell className={classes.innerCell} align="left">
                                        {c.volume}
                                    </TableCell>
                                    <TableCell className={classes.innerCell} align="left">
                                        {c.description}
                                    </TableCell>
                                </>
                                : <>
                                    <TableCell className={classes.innerCell} align="left">
                                        {c.total_wm}
                                    </TableCell>
                                    <TableCell className={classes.innerCell} align="left">
                                        {c.volume}
                                    </TableCell>
                                    <TableCell className={classes.innerCell} align="left">
                                        {c.packaging_type?.description}
                                    </TableCell>
                                    <TableCell className={classes.innerCell} align="left">
                                        {c.height}, {c.width}, {c.length}, {c.weight}
                                    </TableCell>
                                    <TableCell className={classes.innerCell} align="left">
                                        {c.description}
                                    </TableCell>
                                </>
                            }
                        </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </ShippingModeBlock>
    )
}

export default ShippingModeTable