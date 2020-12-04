import React from "react";
import {GeneralTitle} from "../../../../Pages/quotes/agent/table/agent-quotes-styles";
import {
    InfoBlockContent,
    InfoBlockInner,
    InfoBlockLabel, InfoBlockOuter, InfoBlockValue,
    ShippingModeValue,
    ValuesWrapper
} from "../change-request-agent-styles";
import {
    ShippingModeBlock,
    ShippingModeLabel
} from "../../../../Pages/Requests/Booking_agent/booking_card/blocks/hidden-part-styles";
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
        boxShadow: 'none',
        maxWidth: 1020,
        minWidth: 650,
    },
    changed_container: {
        boxShadow: 'none',
        maxWidth: 1020,
        minWidth: 650,
        backgroundColor: 'rgba(17, 91, 134, .05)',
        padding: '8px'
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
        height: '30px',
        padding: '0',
    },
    innerCellBlue: {
        borderBottom: '1px solid transparent',
        fontFamily: 'Helvetica Light',
        fontSize: '14px',
        color: '#115B86',
        height: '30px',
        padding: '0',
    },
});

const Cargos:React.FC = () => {
    const classes = useStyles();

    return (
        <InfoBlockOuter>
            <GeneralTitle margin_bottom='17px'>CARGO</GeneralTitle>
            <ShippingModeBlock>
                <ShippingModeLabel>FCL</ShippingModeLabel>
                <TableContainer className={classes.container} component={Paper}>
                    <Table className={classes.table} aria-label="collapsible table">
                        <TableHead>
                            {true
                                ? <TableRow>
                                    <TableCell className={classes.cell} align="left">
                                        VOLUME
                                    </TableCell>
                                    <TableCell className={classes.cell} align="left">
                                        CONTAINER TYPE
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
                        <TableRow  className={classes.row}>

                                <>
                                    <TableCell className={classes.innerCell} align="left">
                                        40DV
                                    </TableCell>
                                    <TableCell className={classes.innerCell} align="left">
                                       3
                                    </TableCell>
                                    <TableCell className={classes.innerCell} align="left">
                                        ORANGES
                                    </TableCell>
                                </>

                        </TableRow>
                       {/* <TableBody>
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
                                                {c.height + c.length_measurement},{' '}
                                                {c.width + c.length_measurement}, {' '}
                                                {c.length + c.length_measurement}, {' '}
                                                {c.weight + c.weight_measurement}
                                            </TableCell>
                                            <TableCell className={classes.innerCell} align="left">
                                                {c.description}
                                            </TableCell>
                                        </>
                                    }
                                </TableRow>
                            )}
                        </TableBody>*/}
                    </Table>
                </TableContainer>
            </ShippingModeBlock>
            <div style={{fontFamily: 'Helvetica Bold', fontSize: '16px', color: '#1B1B25', display: 'flex', alignItems: 'flex-end', margin: ' 17px 0'}}>
                to
            </div>
            <TableContainer className={classes.changed_container} component={Paper}>
                <Table className={classes.table} aria-label="collapsible table">
                    <TableHead>
                        {true
                            ? <TableRow>
                                <TableCell className={classes.cell} align="left">
                                    VOLUME
                                </TableCell>
                                <TableCell className={classes.cell} align="left">
                                    CONTAINER TYPE
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
                    <TableRow  className={classes.row}>

                        <>
                            <TableCell className={classes.innerCellBlue} align="left">
                                40DV
                            </TableCell>
                            <TableCell className={classes.innerCellBlue} align="left">
                                3
                            </TableCell>
                            <TableCell className={classes.innerCellBlue} align="left">
                                ORANGES
                            </TableCell>
                        </>

                    </TableRow>
                    {/* <TableBody>
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
                                                {c.height + c.length_measurement},{' '}
                                                {c.width + c.length_measurement}, {' '}
                                                {c.length + c.length_measurement}, {' '}
                                                {c.weight + c.weight_measurement}
                                            </TableCell>
                                            <TableCell className={classes.innerCell} align="left">
                                                {c.description}
                                            </TableCell>
                                        </>
                                    }
                                </TableRow>
                            )}
                        </TableBody>*/}
                </Table>
            </TableContainer>
        </InfoBlockOuter>
    )
}

export default Cargos
