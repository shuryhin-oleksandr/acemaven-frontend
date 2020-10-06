import React from 'react';
import {HandlingSurchargeContainer, HandlingTitle} from "./sea-conteneraized-cargo-styles";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {ContainerType, CurrencyType} from "../../../../../../_BLL/types/rates&surcharges/surchargesTypes";
import SurchargeRateSelect from "../../../../../components/_commonComponents/select/SurchargeRateSelect";
import FormField from "../../../../../components/_commonComponents/Input/FormField";
import {Controller} from "react-hook-form";

const useStyles = makeStyles({
    container: {
        boxShadow: 'none',
        height: 270,
        overflowY: 'scroll'
    },
    table: {
        minWidth: 495,
        '& .MuiTableHead-root' : {
            borderBottom: '2px solid #115B86'
        }
    },
    cell: {
        color: '#115B86',
        fontFamily: 'Helvetica Bold',
        fontSize: '16px',

    },
    innerCell: {
        borderBottom: 'none',
        fontFamily: 'Helvetica Thin',
        fontSize: '16px',
        color: '#1B1B25',
        padding: ' 0'
    }
});

type PropsType = {
    containers?: ContainerType[] | null,
    control?: any,
    register?: any,
    currency_list: CurrencyType[] | null,
}

const Handling:React.FC<PropsType> = ({containers, ...props}) => {
    const classes = useStyles();


    function createData(container_type: string, currency: CurrencyType[], charge: number) {
        return { container_type, currency, charge};
    }


    let rows = (containers && containers?.length > 0)
        ?  containers?.map((c) => createData(c?.code,
            [{id: 37, code: 'BRL'}, {id: 43, code: 'USD'}, {id: 98, code: 'EUR'}],
            0))
        : null

    return (
        <HandlingSurchargeContainer>
            <HandlingTitle>Handling (surcharge)</HandlingTitle>
            <TableContainer className={classes.container} component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.cell}>CONTAINER TYPE</TableCell>
                            <TableCell className={classes.cell} align="left">CURRENCY</TableCell>
                            <TableCell className={classes.cell} align="left">CHARGE</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows?.map((row) => (
                            <TableRow key={row.container_type}>
                                <TableCell className={classes.innerCell}  component="th" scope="row">
                                    {row.container_type}
                                </TableCell>
                                <TableCell className={classes.innerCell} align="left">
                                    <Controller name='currency'
                                                control={props.control}
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
                                   <FormField name='charge'
                                              inputRef={props.register}
                                              maxW='100px'
                                              marginBottom='0'
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

export default Handling