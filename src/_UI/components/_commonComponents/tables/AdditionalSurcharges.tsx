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
import {AdditionalSurchargeType, CurrencyType} from "../../../../_BLL/types/rates&surcharges/surchargesTypes";
import {Controller} from "react-hook-form";
import SurchargeRateSelect from "../select/SurchargeRateSelect";
import {Field} from "../Input/input-styles";

const useStyles = makeStyles({
    container: {
        boxShadow: 'none',
        width: 662
    },
    table: {
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

type PropsType = {
    additionals?: AdditionalSurchargeType[] | null,
    control?: any,
    register?: any,
    currency_list: CurrencyType[] | null
}

const AdditionalWithConditionsSurcharges:React.FC<PropsType> = ({additionals, ...props}) => {

    const classes = useStyles();
    type Conditions = {
        id: number,
        title: string,
        tooltip: string
    }

    function createData(name: FeeType, conditions: Conditions[], currency: CurrencyType[], charge: number) {
        return { name, conditions, currency, charge};
    }

    type FeeType = {
        id: number,
        title: string
    }

    let rows = (additionals && additionals?.length > 0)
        ?  additionals?.map((a) => createData(
            {id: a.id, title: a?.title},
            [{id: 1, title: 'w/m', tooltip: 'This option will indicate that the charge will be calculated by the chargeable weight (w/m) of the cargo.'},
                {id: 2, title: 'per weight', tooltip: 'Will be calculated by the weight of the cargo.'},
                {id: 3, title: 'per no. of packs', tooltip: 'As opposed to the previous option, it will consider the charge by the number of packs in the shipment/client’s search.'},
                {id: 4, title: 'fixed', tooltip: 'This means that the value indicated will be considered once in the shipment.'}],
            [{id: 37, code: 'BRL'}, {id: 43, code: 'USD'}, {id: 98, code: 'EUR'}],
            0))
        : null

    return (
        <HandlingSurchargeContainer>
            <HandlingTitle>Additional surcharges </HandlingTitle>
            <TableContainer className={classes.container} component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.cell}>{' '}</TableCell>
                            <TableCell className={classes.cell} align="left">CONDITIONS</TableCell>
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
                                                name={`additional_surcharges[${row.name.id}.conditions]`}
                                                defaultValue={row.conditions[0].id}
                                                as={
                                                    <SurchargeRateSelect options={row.conditions}
                                                                         placeholder='Currency'
                                                                         maxW='80px'
                                                    />
                                                }
                                    />
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

export default AdditionalWithConditionsSurcharges