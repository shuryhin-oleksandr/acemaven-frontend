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
//react-hook-form
import {Controller} from "react-hook-form";
//types
import {AdditionalSurchargeType} from "../../../../../_BLL/types/rates&surcharges/surchargesTypes";
import {ShippingModeEnum} from "../../../../../_BLL/types/rates&surcharges/newSurchargesTypes";
//helpers
import {conditions, currency} from "../../../../../_BLL/helpers/surcharge_helpers_methods&arrays";
//components
import SurchargeRateSelect from "../../../_commonComponents/select/SurchargeRateSelect";
import ConditionSelect from "../../../ConditionSelect/ConditionSelect";
//styles
import {
    HandlingSurchargeContainer,
    HandlingTitle
} from "../../../../Pages/Services&Rates/surcharge/surcharges_page/surcharge/sea-conteneraized-cargo-styles";
import {Field} from "../../../_commonComponents/Input/input-styles";



const useStyles = makeStyles({
    container: {
        boxShadow: 'none'
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
        width: '100px',
        padding: '5px 10px 5px 0'
    },
    innerCell: {
        fontFamily: 'Helvetica Light',
        fontSize: '16px',
        color: '#1B1B25',
        padding: '5px 0px',
        width: '102px'
    }
});

type PropsType = {
    charges: AdditionalSurchargeType[],
    quote_shipping_mode_id: number,
    control: any,
    register: any,
    setValue: any
}

const AdditionalSurchargesPopupTable:React.FC<PropsType> = ({charges, quote_shipping_mode_id, control, register, setValue}) => {


    const classes = useStyles();

    const noConditions = ShippingModeEnum.FCL === quote_shipping_mode_id;

    return (
        <HandlingSurchargeContainer max_height='440px' max_width={!noConditions ? '730px' : '600px'} margin_left={noConditions ? '30px' : '0x'}>
            <HandlingTitle margin_bottom='0px'>Additional surcharges </HandlingTitle>
            <TableContainer className={classes.container} component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.cell}>{' '}</TableCell>
                            <TableCell className={classes.cell} align="left">CURRENCY</TableCell>
                            <TableCell className={classes.cell} align="left">CHARGE</TableCell>
                            {!noConditions && <TableCell className={classes.cell} align="left">CONDITIONS</TableCell>}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {charges?.map(c => (
                            <TableRow key={c.id}>
                                <TableCell className={classes.innerMainCell}  component="th" scope="row">
                                    <Controller name={`charges.${c.id}.additional_surcharge`}
                                                control={control}
                                                defaultValue={c.id}
                                                as={
                                                    <span style={{fontFamily: 'Helvetica Bold', fontSize:'16px', color: '#115b86'}}>
                                                        {c.title}
                                                    </span>
                                                }
                                    />
                                </TableCell>
                                <TableCell className={classes.innerCell} align="center" >
                                    <Controller name={`charges.${c.id}.currency`}
                                                control={control}
                                                defaultValue={currency[0].id}
                                                as={
                                                    <SurchargeRateSelect options={currency}
                                                                         maxW={'80px'}
                                                    />
                                                }
                                    />
                                </TableCell>
                                <TableCell className={classes.innerCell} align="left" >
                                    <Field name={`charges.${c.id}.charge`}
                                           ref={register}
                                           placeholder={'0.00$'}
                                           defaultValue={'0'}
                                           maxW='95px'
                                    />
                                </TableCell>
                                {!noConditions
                                    && <Controller
                                        control={control}
                                        name={`charges.${c.id}.conditions`}
                                        defaultValue={
                                            c.id === 1 ? "fixed" : conditions[0]?.title
                                        }
                                        as={
                                            c.id === 1 ? (
                                                <TableCell className={classes.innerCell}>
                                                    {"Fixed"}
                                                </TableCell>
                                            ) : (
                                                <TableCell className={classes.innerCell} align="left">
                                                    <ConditionSelect
                                                        options={conditions}
                                                        name={`charges.${c.id}.conditions`}
                                                        setValue={setValue}
                                                        defaultV={conditions[0]?.displayName}
                                                        setFormMode=""
                                                        right={'85px'}
                                                    />
                                                </TableCell>
                                            )
                                        }
                                    />
                                }
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </HandlingSurchargeContainer>
    )
}

export default AdditionalSurchargesPopupTable