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
import {AdditionalSurchargeType, CurrencyType} from "../../../../../../_BLL/types/rates&surcharges/surchargesTypes";
import SurchargeRateSelect from "../../../../../components/_commonComponents/select/SurchargeRateSelect";
import {Controller} from "react-hook-form";
import {Field} from "../../../../../components/_commonComponents/Input/input-styles";


const useStyles = makeStyles({
    container: {
        boxShadow: 'none',
        width: 479
    },
    table: {

        '& .MuiTableHead-root' : {

        }
    },
    cell: {
        color: '#115B86',
        fontFamily: 'Helvetica Bold',
        fontSize: '16px',
        borderBottom: '1px solid #115B86',


    },
    innerMainCell: {
        borderBottom: '1px solid #E0E0E0;',
        fontFamily: 'Helvetica Bold',
        fontSize: '16px',
        color: '#115B86',
        width: '213px',
        padding: '8px 0 0'
    },
    innerCell: {
        borderBottom: '1px solid #E0E0E0;',
        fontFamily: 'Helvetica Light',
        fontSize: '16px',
        color: '#1B1B25',
        padding: '8px 0 0'
    }
});

type PropsType = {
    additionals?: AdditionalSurchargeType[] | null,
    control?: any,
    register?: any,
    currency_list: CurrencyType[] | null
}

const AdditionalSurcharges:React.FC<PropsType> = ({additionals, ...props}) => {
    const classes = useStyles();

    function createData(name: FeeType, currency: CurrencyType[], charge: number) {
        return { name, currency, charge};
    }

    type FeeType = {
        id: number,
        title: string
    }

    let rows = (additionals && additionals?.length > 0)
        ?  additionals?.map((a) => createData({id: a.id, title: a?.title},
            [{id: 37, code: 'BRL'}, {id: 43, code: 'USD'}, {id: 98, code: 'EUR'}], 0))
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
                            <TableRow key={row.name.id}>
                                <TableCell className={classes.innerMainCell}  component="th" scope="row">
                                    {row.name.title}
                                </TableCell>
                                <TableCell className={classes.innerCell} align="left">
                                    <Controller control={props.control}
                                                name={`additional_surcharges[${row.name.id}.currency]`}
                                                defaultValue={row.currency[0].id}
                                                as={
                                                    <SurchargeRateSelect options={row.currency}
                                                                         placeholder='Currency'
                                                                         maxW='80px'
                                                    />
                                                }
                                    />
                                </TableCell>
                                <TableCell className={classes.innerCell} align="left">
                                    <Controller name={`additional_surcharges[${row.name.id}.charge]`}
                                                control={props.control}
                                                defaultValue={row.charge}
                                                as={
                                                    <Field/>
                                                }
                                    />

                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </HandlingSurchargeContainer>
    )
}

export default AdditionalSurcharges