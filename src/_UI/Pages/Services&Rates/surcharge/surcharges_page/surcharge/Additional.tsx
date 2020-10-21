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
} from "./sea-conteneraized-cargo-styles";
import {VoidFunctionType} from "../../../../../../_BLL/types/commonTypes";
import {AdditionalSurchargeType, ChargesType} from "../../../../../../_BLL/types/rates&surcharges/surchargesTypes";
import SurchargeRateSelect from "../../../../../components/_commonComponents/select/SurchargeRateSelect";
import {Controller} from "react-hook-form";
import SurchargeRateConditionsSelect
    from "../../../../../components/_commonComponents/select/SurchargeRateConditionsSelect";
import {conditions, currency} from "../../../../../../_BLL/helpers/surcharge_helpers_methods&arrays";


const useStyles = makeStyles({
    container: {
        boxShadow: 'none'
    },
    table: {
        minWidth: 948,
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
        width: '213px',
        padding: '0 16px'
    },
    innerCell: {
        borderBottom: '1px solid #E0E0E0;',
        fontFamily: 'Helvetica Light',
        fontSize: '16px',
        color: '#1B1B25',
        padding: '0 16px'
    }
});

type PropsType = {
    setFormMode?: VoidFunctionType,
    charges?: ChargesType[],
    control: any,
    errors: any
}

const Additional:React.FC<PropsType> = ({setFormMode, ...props}) => {
    const classes = useStyles();


    let defaultCondition = conditions?.filter(co => {
        return props.charges?.find(c => co.title === c.conditions)
    })

    let defaultCurrency = currency?.filter(cu => {
       return props.charges?.find(c => c.currency.id === cu.id)
    })


    return (
        <HandlingSurchargeContainer max_height='440px' max_width='948px '>
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
                        {props.charges?.map((charge) => (
                            <TableRow key={charge.id}>
                                <Controller control={props.control}
                                            defaultValue={charge.additional_surcharge.id}
                                            name={`charges.${charge.id}.additional_surcharge`}
                                            as={
                                                <TableCell className={classes.innerMainCell}  component="th" scope="row">
                                                    {charge.additional_surcharge.title}
                                                </TableCell>
                                            }
                                />
                                <TableCell className={classes.innerCell} align="left" onClick={() => setFormMode && setFormMode(true)}>
                                    <Controller control={props.control}
                                                name={`charges.${charge.id}.currency`}
                                                defaultValue={defaultCurrency[0].id}
                                                as={
                                                    <SurchargeRateSelect options={currency}
                                                                         placeholder='Currency'
                                                                         maxW='80px'
                                                    />
                                                }
                                    />
                                </TableCell>
                                <TableCell className={classes.innerCell} align="left" onClick={() => setFormMode && setFormMode(true)}>
                                    <Controller control={props.control}
                                                name={`charges.${charge.id}.charge`}
                                                defaultValue={charge.charge}
                                                as={
                                                    <Field type='number' value={charge.charge}
                                                    />
                                               }
                                    />
                                </TableCell>
                                {charge.additional_surcharge.id === 1
                                    ? <Controller control={props.control}
                                                  defaultValue={charge.conditions}
                                                  name={`charges.${charge.id}.conditions`}
                                                  as={
                                                      <TableCell className={classes.innerCell} align="left">
                                                          fixed
                                                      </TableCell>
                                                  }
                                    />
                                    :  <Controller control={props.control}
                                                   defaultValue={defaultCondition[0].title}
                                                   name={`charges.${charge.id}.conditions`}
                                                   as={
                                                       <SurchargeRateConditionsSelect options={conditions}
                                                                            placeholder='Currency'

                                                       />
                                                   }
                                    />
                                }
                                <Controller control={props.control}
                                            defaultValue={charge.updated_by}
                                            name={`charges.${charge.id}.updated_by`}
                                            as={
                                                <TableCell className={classes.innerCell} align="left">
                                                    {charge.updated_by}
                                                </TableCell>
                                            }
                                />
                                <Controller control={props.control}
                                            defaultValue={charge.date_updated}
                                            name={`charges.${charge.id}.date_updated`}
                                            as={
                                                <TableCell className={classes.innerCell} align="left">
                                                    {charge.date_updated}
                                                </TableCell>
                                            }
                                />
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </HandlingSurchargeContainer>
    )
}

export default Additional



