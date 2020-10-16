import React from 'react'
import {HandlingSurchargeContainer, HandlingTitle} from "../../SurchargeRegistrationForm/sea_containerized_cargo/sea-conteneraized-cargo-styles";
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
}

const UsageFees: React.FC<PropsType> = ({ control, usageFees, tableName, type }) => {

    const classes = useStyles()

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
                                        defaultValue={0}
                                        as={
                                            <Field maxW="100px" marginBottom="0" />
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