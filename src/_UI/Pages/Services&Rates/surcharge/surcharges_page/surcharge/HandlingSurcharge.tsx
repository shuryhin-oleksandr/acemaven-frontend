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
    setFormMode?: VoidFunctionType
}

const HandlingSurcharge:React.FC<PropsType> = ({setFormMode}) => {
    const classes = useStyles();

    function createData(container_type: string, currency: any, charge: string, update_by: string, on: string) {
        return { container_type, currency, charge, update_by, on};
    }

    const rows = [
        createData('Type 1', [{name: 'BRL', value: 'BRL'},{name: '$', value: "$"}, {name: 'Euro', value: 'Euro'}],
            '6.0 $', 'Hanna Yarash', '13:00 10 MAY 2020' ),
        createData('Type2', [{name: 'BRL', value: 'BRL'},{name: '$', value: "$"}, {name: 'Euro', value: 'Euro'}],
            '9.0 $', 'Lara Croft', '13:00 10 MAY 2020'),
        createData('Type3', [{name: 'BRL', value: 'BRL'},{name: '$', value: "$"}, {name: 'Euro', value: 'Euro'}],
            '16.0 $', 'James Bond', '13:00 10 MAY 2020' ),
        createData('Type4', [{name: 'BRL', value: 'BRL'},{name: '$', value: "$"}, {name: 'Euro', value: 'Euro'}],
            '16.0 $', 'James Bond', '15:00 10 MAY 2020' ),
        createData('Type4', [{name: 'BRL', value: 'BRL'},{name: '$', value: "$"}, {name: 'Euro', value: 'Euro'}],
            '16.0 $', 'James Bond', '15:00 10 MAY 2020' )
    ];

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
                        {rows.map((row) => (
                            <TableRow key={row.container_type}>
                                <TableCell className={classes.innerCell}  component="th" scope="row">
                                   {row.container_type}
                                </TableCell>
                                <TableCell className={classes.innerCell} align="left" onClick={() => setFormMode && setFormMode(true)}>
                                    <FormSelect options={row.currency}
                                                placeholder='Currency'
                                                maxW='80px'
                                    />
                                </TableCell>
                                <TableCell className={classes.innerCell} align="left" onClick={() => setFormMode && setFormMode(true)}>
                                    <FormField name='charge'
                                               value={row.charge}
                                               maxW='100px'
                                    />

                                </TableCell>
                                <TableCell className={classes.innerCell} align="left">{row.update_by}</TableCell>
                                <TableCell className={classes.innerCell} align="left">{row.on}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </HandlingSurchargeContainer>
    )
}

export default HandlingSurcharge