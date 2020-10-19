import React, {useState} from 'react'
import {HandlingSurchargeContainer, HandlingTitle} from "../../surcharges_page/surcharge/sea-conteneraized-cargo-styles";
import TableContainer from "@material-ui/core/TableContainer";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import {Controller} from "react-hook-form";
import SurchargeRateSelect from "../../../../../components/_commonComponents/select/SurchargeRateSelect";
import {Field} from "../../../../../components/_commonComponents/Input/input-styles";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {ContainerType} from "../../../../../../_BLL/types/rates&surcharges/surchargesTypes";
import {currency} from "../../../../../../_BLL/helpers/surcharge_helpers_methods&arrays";

import styled from "styled-components";


const useStyles = makeStyles({
    container: {
        boxShadow: "none",
        height: 270,
        overflowY: "scroll",
    },
    table: {
        minWidth: 495,
        "& .MuiTableHead-root": {
            borderBottom: "2px solid #115B86",
        },
    },
    cell: {
        color: "#115B86",
        fontFamily: "Helvetica Bold",
        fontSize: "16px",
    },
    innerCell: {
        borderBottom: "none",
        fontFamily: "Helvetica Thin",
        fontSize: "16px",
        color: "#1B1B25",
        padding: " 0",
    },
});

type PropsType = {
    control: any
    usageFees: ContainerType[]
    tableName: string
    type: string
    setValue?: any
}

const UsageFees: React.FC<PropsType> = ({ control, usageFees, tableName, type, setValue }) => {

    const classes = useStyles()

    const [awareMessage, setAware] = useState(false)
    const [charge_value, setChargeValue] = useState('')
    let onChange = (e: any, id: string) => {
        if(e.currentTarget.value === '0') {
            setChargeValue(id)
            setValue(`usage_fees.${id}.charge`, e.currentTarget.value)
            setAware(true)
        } else {
            setValue(`usage_fees.${id}.charge`, e.currentTarget.value)
        }
    }


    return (
        <HandlingSurchargeContainer>
            <HandlingTitle>{tableName}</HandlingTitle>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.cell}>
                                {type}
                            </TableCell>
                            <TableCell className={classes.cell} align="left">
                                CURRENCY
                            </TableCell>
                            <TableCell className={classes.cell} align="left">
                                CHARGE
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            usageFees?.map((fees) => (
                            <TableRow key={fees.id}>
                                <Controller
                                    name={`usage_fees.${fees.id}.container_type`}
                                    control={control}
                                    defaultValue={fees.id}
                                    as={
                                        <TableCell
                                            className={classes.innerCell}
                                            component="th"
                                            scope="row"
                                        >
                                            {fees.code}
                                        </TableCell>
                                    }
                                />
                                <TableCell className={classes.innerCell} align="left">
                                    <Controller
                                        name={`usage_fees.${fees.id}.currency`}
                                        control={control}
                                        defaultValue={currency[0].id}
                                        as={
                                            <SurchargeRateSelect
                                                options={currency}
                                                placeholder="Currency"
                                                maxW="80px"
                                            />
                                        }
                                    />
                                </TableCell>
                                <TableCell className={classes.innerCell} align="left">
                                    <Controller
                                        control={control}
                                        name={`usage_fees.${fees.id}.charge`}
                                        defaultValue=''
                                        render={({onBlur}) => (
                                            <div style={{position: 'relative'}}>
                                            <Field maxW="100px"
                                                   marginBottom="0"
                                                   onChange={(e) => onChange(e, String(fees.id))}
                                                   onBlur={() => setAware(false)}
                                                   placeholder='0.00$'
                                            />
                                                {awareMessage && String(fees.id) === charge_value
                                                && <SpanAware><Title>Surcharge will be register as 0. Are you sure?</Title></SpanAware>}
                                            </div>
                                            )
                                        }
                                    />
                                </TableCell>
                            </TableRow>
                        ))
                        }
                    </TableBody>
                </Table>

            </TableContainer>
        </HandlingSurchargeContainer>
    )
};

export default UsageFees

const SpanAware = styled.div`
  width: 180px;
  height: 60px;
  background-color: rgba(0, 0, 0, .6);
  color: white;
  font-family: "Helvetica Reg", sans-serif;
  position: absolute;
  font-size: 14px;
  line-height: 16px;
  padding: 5px;
  z-index: 150;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  clip-path: polygon(0% 0%, 100% 0%, 100% 75%, 58% 75%, 51% 93%, 43% 75%, 0% 75%);
  transform: rotate(180deg);
  right: 0;
`
const Title = styled.div`
   transform: rotate(180deg);
`