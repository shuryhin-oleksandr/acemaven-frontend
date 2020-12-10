import React from 'react'
import {
    HiddenTable,
     HiddenWrapper,
    TableTotal, TotalLine, TotalName, TotalValue
} from "../../../../../dashboard/search/search_rate_card/search-card-styles";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {CostBookingType} from "../../../../../../../_BLL/types/bookingTypes";

const useStyles = makeStyles({
    container: {
        boxShadow: "none",
    },
    table: {
        "& .MuiTableHead-root": {},
    },
    info_row: {
        '&:hover' : {
            cursor: 'pointer'
        }
    },
    cell: {
        color: "#115B86",
        fontFamily: "Helvetica Bold",
        fontSize: "16px",
        borderBottom: "1px solid white",
        padding: "16px 0 0",
    },
    innerMainCell: {
        borderBottom: "1px solid #E0E0E0;",
        fontFamily: "Helvetica Bold",
        fontSize: "16px",
        color: "#115B86",

    },
    innerCell: {
        borderBottom: "1px solid #E0E0E0;",
        fontFamily: "Helvetica Light",
        fontSize: "16px",
        color: "#1B1B25",
        padding: "8px 0 0",
    }
});

type PropsType = {
    operation_charges: CostBookingType | null,
    number_of_docs: number | null
}

const ChargesBlock:React.FC<PropsType> = ({operation_charges, number_of_docs}) => {

    const classes = useStyles();

    const column_object = [
        {name: 'VOLUME', align: 'left'},
        {name: 'TYPE', align: 'left'},
        {name: 'CHARGE', align: 'left'},
        {name: 'CURRENCY', align: 'left'},
        {name: 'COST', align: 'right'},
        {name: 'SUBTOTAL', align: 'right'},
    ]


    return (
        <HiddenWrapper margin_top={'30px'}>
            <HiddenTable>
                <TableContainer className={classes.container} component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                {column_object.map((c: any, index: number) => <TableCell key={index} className={classes.cell} align={c.align}>
                                    {c.name}
                                </TableCell>)}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {operation_charges?.cargo_groups?.map(s =>
                                <TableRow key={s.cargo_type} className={classes.info_row}>
                                    <TableCell className={classes.innerCell} scope="row">
                                        {s.volume}
                                    </TableCell>
                                    <TableCell className={classes.innerCell} align="left" >
                                        {s.cargo_type}
                                    </TableCell>
                                    <TableCell className={classes.innerCell} align="left">
                                        <div>FREIGHT</div>
                                        <div>HANDLING</div>
                                        <div>OTHERS</div>
                                    </TableCell>
                                    <TableCell className={classes.innerCell} align="left">
                                        <div>{s.freight.currency}</div>
                                        <div>{s.handling.currency}</div>
                                        <div>{s.other.currency}</div>
                                    </TableCell>
                                    <TableCell className={classes.innerCell} align="right">
                                        <div>{s.freight.cost}</div>
                                        <div>{s.handling.cost}</div>
                                        <div>{s.other.cost}</div>
                                    </TableCell>
                                    <TableCell className={classes.innerCell} align="right">
                                        <div>{s.freight.subtotal}</div>
                                        <div>{s.handling.subtotal}</div>
                                        <div>{s.other.subtotal}</div>
                                    </TableCell>
                                </TableRow>
                            )}
                            <TableRow className={classes.info_row}>
                                <TableCell className={classes.innerCell} scope="row">
                                    {number_of_docs ? number_of_docs : '1'}
                                </TableCell>
                                <TableCell className={classes.innerCell} align="left" >
                                </TableCell>
                                <TableCell className={classes.innerCell} align="left">
                                    DOC FEE
                                </TableCell>
                                <TableCell className={classes.innerCell} align="left">
                                    {operation_charges?.doc_fee?.currency}
                                </TableCell>
                                <TableCell className={classes.innerCell} align="right">
                                    {operation_charges?.doc_fee?.cost}
                                </TableCell>
                                <TableCell className={classes.innerCell} align="right">
                                    {operation_charges?.doc_fee?.subtotal}
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </HiddenTable>
            <TableTotal>
                <TotalLine>
                    <TotalName>
                        TOTAL FREIGHT IN {operation_charges?.total_freight_rate?.USD
                        ? "BRL"
                        : "USD" }
                    </TotalName>
                    <TotalValue>
                        {operation_charges?.total_freight_rate?.USD
                            ? operation_charges?.total_freight_rate?.USD
                            : operation_charges?.total_freight_rate?.BRL}
                    </TotalValue>
                </TotalLine>
                <TotalLine>
                    <TotalName>
                        CHARGES IN {operation_charges?.total_surcharge?.BRL
                        ? "BRL"
                        : "USD"
                    }
                    </TotalName>
                    <TotalValue>
                        {operation_charges?.total_surcharge?.BRL
                            ? operation_charges?.total_surcharge?.BRL
                            : operation_charges?.total_surcharge?.USD
                        }
                    </TotalValue>
                </TotalLine>
                {/*<TotalLine>
                    <TotalName>
                       ??? Today’s USD EXCHANGE RATE ???
                    </TotalName>
                    <TotalValue>
                        5.02
                    </TotalValue>
                </TotalLine>
                <TotalLine>
                    <TotalName>
                        ??? Total Today ???
                    </TotalName>
                    <TotalValue>
                       ?? 7100 ??
                    </TotalValue>
                </TotalLine>*/}
                {/*<TotalLine>
                    <TotalName>ACEMAVEN SERVICE FEE: IN {calculation?.service_fee?.currency}</TotalName>
                    <TotalValue>{calculation?.service_fee?.cost}</TotalValue>
                </TotalLine>*/}
            </TableTotal>
        </HiddenWrapper>
    )
}

export default ChargesBlock