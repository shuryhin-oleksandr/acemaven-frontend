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
//react hook form
import {Controller} from "react-hook-form";
//types
import {ContainerType} from "../../../../../_BLL/types/rates&surcharges/ratesTypes";
//helpers
import {currency} from "../../../../../_BLL/helpers/surcharge_helpers_methods&arrays";
//components
import SurchargeRateSelect from "../../../_commonComponents/select/SurchargeRateSelect";
//styles
import {
    HandlingSurchargeContainer,
    HandlingTitle
} from "../../../../Pages/Services&Rates/surcharge/surcharges_page/surcharge/sea-conteneraized-cargo-styles";
import {Field} from "../../../_commonComponents/Input/input-styles";



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
        padding: '5px 0'
    }
});

type PropsType = {
    containers: ContainerType[],
    package_type: string,
    table_name: string,
    control: any,
    register: any
}

const HandlingTable:React.FC<PropsType> = ({containers, ...props}) => {

    const classes = useStyles();

    return (
        <HandlingSurchargeContainer max_height={'380px'} style={{maxWidth: '450px', marginRight: '20px'}}>
            <HandlingTitle margin_bottom='0px'>{props.table_name}</HandlingTitle>
            <TableContainer className={classes.container} component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.cell} align="left">{props.package_type}</TableCell>
                            <TableCell className={classes.cell} align="left">CURRENCY</TableCell>
                            <TableCell className={classes.cell} align="right">CHARGE</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody className={classes.body}>
                        {containers?.map(c => (
                            <TableRow key={c.id}>
                                <TableCell className={classes.innerCell}  component="th" scope="row">
                                    <Controller name={`usage_fees.${c.id}.container_type`}
                                                control={props.control}
                                                defaultValue={c.id}
                                                as={
                                                    <span>{c?.code}</span>
                                                }
                                    />
                                </TableCell>
                                <TableCell className={classes.innerCell} align="left">
                                    <Controller name={`usage_fees.${c.id}.currency`}
                                                control={props.control}
                                                defaultValue={currency[0].id}
                                                as={
                                                    <SurchargeRateSelect options={currency}
                                                                         maxW={'80px'}
                                                    />
                                                }
                                    />
                                </TableCell>
                                <TableCell className={classes.innerCell} align="right">
                                    <Field name={`usage_fees.${c.id}.charge`}
                                           ref={props.register}
                                           placeholder={'0.00$'}
                                           maxW='102px'
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

export default HandlingTable