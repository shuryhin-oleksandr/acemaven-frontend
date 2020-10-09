import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import {
    Field,
    HandlingSurchargeContainer,
    HandlingTitle
} from "../../SurchargeRegistrationForm/sea_containerized_cargo/sea-conteneraized-cargo-styles";
import {VoidFunctionType} from "../../../../../../_BLL/types/commonTypes";
import {AdditionalSurchargeType, ChargesType} from "../../../../../../_BLL/types/rates&surcharges/surchargesTypes";
import SurchargeRateSelect from "../../../../../components/_commonComponents/select/SurchargeRateSelect";
import {Controller} from "react-hook-form";
import styled from "styled-components";


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
        borderBottom: ' 1px solid #E0E0E0;',
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
    setFormMode?: VoidFunctionType,
    charges?: ChargesType[],
    control: any
}

const Additional:React.FC<PropsType> = ({setFormMode, ...props}) => {
    const classes = useStyles();

    function createData(id: number, additional_surcharge: AdditionalSurchargeType, currency: any, charge: string, conditions: string, updated_by: string, date_updated: string) {
        return { id, additional_surcharge, currency, charge, conditions, updated_by, date_updated};
    }

    const rows = props.charges && props.charges.length > 0
        ? props.charges.map(c => createData(c.id, c.additional_surcharge, [{id: 37, code: 'BRL'}, {id: 43, code: 'USD'}, {id: 98, code: 'EUR'}],
            c.charge, c.conditions, c.updated_by, c.date_updated ))
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
                            <TableCell className={classes.cell} align="left">CONDITIONS</TableCell>
                            <TableCell className={classes.cell} align="left">UPDATE BY</TableCell>
                            <TableCell className={classes.cell} align="left">ON</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows?.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell className={classes.innerMainCell}  component="th" scope="row">
                                    {row.additional_surcharge.title}
                                </TableCell>
                                <TableCell className={classes.innerCell} align="left" onClick={() => setFormMode && setFormMode(true)}>
                                    <Controller control={props.control}
                                                name='currency'
                                                as={
                                                    <SurchargeRateSelect options={row.currency}
                                                                         placeholder='Currency'
                                                                         maxW='80px'
                                                    />
                                                }
                                    />
                                </TableCell>
                                <TableCell className={classes.innerCell} align="left" onClick={() => setFormMode && setFormMode(true)}>
                                    <Controller control={props.control}
                                                name='charge'
                                                defaultValue={row.charge}
                                                as={
                                                        <Field value={row.charge}
                                                        />
                                                }
                                    />
                                </TableCell>
                                <TableCell className={classes.innerCell} align="left">{row.conditions}</TableCell>
                                <TableCell className={classes.innerCell} align="left">{row.updated_by}</TableCell>
                                <TableCell className={classes.innerCell} align="left">{row.date_updated}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </HandlingSurchargeContainer>
    )
}

export default Additional



