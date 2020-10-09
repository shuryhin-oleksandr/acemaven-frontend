import React from "react";
import {
    HandlingSurchargeContainer,
    HandlingTitle
} from "../../SurchargeRegistrationForm/sea_containerized_cargo/sea-conteneraized-cargo-styles";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import makeStyles from "@material-ui/core/styles/makeStyles";
import FormSelect from "../../../../../components/_commonComponents/select/FormSelect";
import FormField from "src/_UI/components/_commonComponents/Input/FormField";
import {VoidFunctionType} from "../../../../../../_BLL/types/commonTypes";
import {ContainerType, CurrencyType, UsageFeeType} from "../../../../../../_BLL/types/rates&surcharges/surchargesTypes";
import SurchargeRateSelect from "../../../../../components/_commonComponents/select/SurchargeRateSelect";

const useStyles = makeStyles({
    container: {
        boxShadow: 'none',
        height: 300
    },
    table: {
        minWidth: 479,

    },
    body: {
        height: '201px'
    },
    cell: {
        color: '#115B86',
        fontFamily: 'Helvetica Bold',
        fontSize: '16px',
        borderBottom: '1px solid #115B86',
        padding: ' 0'
    },
    innerCell: {
        borderBottom: 'none',
        fontFamily: 'Helvetica Light',
        fontSize: '16px',
        color: '#1B1B25',
        padding: '0'
    }
});

type PropsType = {
    setFormMode?: VoidFunctionType,
    containers?: UsageFeeType[]
}

const HandlingSurcharge:React.FC<PropsType> = ({setFormMode, ...props}) => {
    const classes = useStyles();

    function createData(id: number, container_type: any, currency: CurrencyType[], charge: string, updated_by: string, date_updated: string) {
        return { id, container_type, currency, charge, updated_by, date_updated};
    }

    const rows = props.containers && props.containers.length > 0
        ? props.containers.map(c => createData(c.id, c.container_type, c.currency, c.charge, c.updated_by, c.date_updated ))
        : null;

    return (
        <HandlingSurchargeContainer style={{maxWidth: '834px'}}>
            <HandlingTitle>Handling (surcharge)</HandlingTitle>
            <TableContainer className={classes.container} component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.cell}>CONTAINER TYPE</TableCell>
                            <TableCell className={classes.cell} align="left">CURRENCY</TableCell>
                            <TableCell className={classes.cell} align="left">CHARGE</TableCell>
                            <TableCell className={classes.cell} align="left">UPDATE BY</TableCell>
                            <TableCell className={classes.cell} align="left">ON</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody className={classes.body}>
                        {rows?.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell className={classes.innerCell}  component="th" scope="row">
                                   {row.container_type.code}
                                </TableCell>
                                <TableCell className={classes.innerCell} align="left" onClick={() => setFormMode && setFormMode(true)}>
                                   {/* <SurchargeRateSelect options={row.currency}
                                                placeholder='Currency'
                                                maxW='80px'
                                    />*/}
                                </TableCell>
                                <TableCell className={classes.innerCell} align="left" onClick={() => setFormMode && setFormMode(true)}>
                                    <FormField name='charge'
                                               value={row.charge}
                                               maxW='100px'
                                    />
                                </TableCell>
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

export default HandlingSurcharge