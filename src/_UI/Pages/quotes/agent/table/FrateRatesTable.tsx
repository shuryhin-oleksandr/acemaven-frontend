import React from 'react'
import makeStyles from "@material-ui/core/styles/makeStyles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import {Controller} from "react-hook-form";
import SurchargeRateSelect from "../../../../components/_commonComponents/select/SurchargeRateSelect";
import {currency} from "../../../../../_BLL/helpers/surcharge_helpers_methods&arrays";
import {Field} from "../../../Services&Rates/surcharge/surcharges_page/surcharge/sea-conteneraized-cargo-styles";
import TableContainer from "@material-ui/core/TableContainer";

const useStyles = makeStyles({
    container: {
        boxShadow: 'none',
        width: 700
    },
    table: {
        '& .MuiTableHead-root' : {

        }
    },
    cell: {
        color: '#115B86',
        fontFamily: 'Helvetica Bold',
        fontSize: '16px',
        borderBottom: '1px solid #115B86',
        padding: '14px 0'
    },
    innerCell: {
        borderBottom: '1px solid #E0E0E0;',
        fontFamily: 'Helvetica Light',
        fontSize: '16px',
        color: '#1B1B25',
        padding: '0'
    }
});

type PropsType = {
    control: any
}

const FrateRatesTable:React.FC<PropsType> = ({control}) => {
    const classes = useStyles();

    return (
        <TableContainer className={classes.container} component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell className={classes.cell} align="left">CONTAINER TYPE</TableCell>
                        <TableCell className={classes.cell} align="left">CURRENCY</TableCell>
                        <TableCell className={classes.cell} align="left">FREIGHT RATE</TableCell>
                        <TableCell className={classes.cell} align="left">EXPIRATION DATE</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow >
                            <Controller control={control}
                                        defaultValue={''}
                                        name={`rate.${1}.container_type`}
                                        as={
                                            <TableCell className={classes.innerCell}  component="th" scope="row">
                                                Container type 1
                                            </TableCell>
                                        }
                            />
                            <TableCell className={classes.innerCell} align="left" >
                                <Controller control={control}
                                            name={`rate.${1}.currency`}
                                            defaultValue={currency[0].id}
                                            as={
                                                <SurchargeRateSelect options={currency}
                                                                     placeholder='Currency'
                                                                     maxW='80px'
                                                />
                                            }
                                />
                            </TableCell>
                            <TableCell className={classes.innerCell} align="left" >
                                <Controller control={control}
                                            name={`rate.${1}.freight_rate`}
                                            defaultValue={''}
                                            as={
                                                <Field type='number'
                                                       value={''}
                                                       placeholder='000.0000$'
                                                       maxW='101px'
                                                />
                                            }
                                />
                            </TableCell>
                            <Controller control={control}
                                        defaultValue={''}
                                        name={`charges.${1}.expiration_date`}
                                        as={
                                            <TableCell className={classes.innerCell} align="left">

                                            </TableCell>
                                        }
                            />
                        </TableRow>
                    <TableRow >
                        <Controller control={control}
                                    defaultValue={''}
                                    name={`rate.${1}.container_type`}
                                    as={
                                        <TableCell className={classes.innerCell}  component="th" scope="row">
                                            Container type 1
                                        </TableCell>
                                    }
                        />
                        <TableCell className={classes.innerCell} align="left" >
                            <Controller control={control}
                                        name={`rate.${1}.currency`}
                                        defaultValue={currency[0].id}
                                        as={
                                            <SurchargeRateSelect options={currency}
                                                                 placeholder='Currency'
                                                                 maxW='80px'
                                            />
                                        }
                            />
                        </TableCell>
                        <TableCell className={classes.innerCell} align="left" >
                            <Controller control={control}
                                        name={`rate.${1}.freight_rate`}
                                        defaultValue={''}
                                        as={
                                            <Field type='number'
                                                   value={''}
                                                   placeholder='000.0000$'
                                                   maxW='101px'
                                            />
                                        }
                            />
                        </TableCell>
                        <Controller control={control}
                                    defaultValue={''}
                                    name={`charges.${1}.expiration_date`}
                                    as={
                                        <TableCell className={classes.innerCell} align="left">

                                        </TableCell>
                                    }
                        />
                    </TableRow>
                    <TableRow >
                        <Controller control={control}
                                    defaultValue={''}
                                    name={`rate.${1}.container_type`}
                                    as={
                                        <TableCell className={classes.innerCell}  component="th" scope="row">
                                            Container type 1
                                        </TableCell>
                                    }
                        />
                        <TableCell className={classes.innerCell} align="left" >
                            <Controller control={control}
                                        name={`rate.${1}.currency`}
                                        defaultValue={currency[0].id}
                                        as={
                                            <SurchargeRateSelect options={currency}
                                                                 placeholder='Currency'
                                                                 maxW='80px'
                                            />
                                        }
                            />
                        </TableCell>
                        <TableCell className={classes.innerCell} align="left" >
                            <Controller control={control}
                                        name={`rate.${1}.freight_rate`}
                                        defaultValue={''}
                                        as={
                                            <Field type='number'
                                                   value={''}
                                                   placeholder='000.0000$'
                                                   maxW='101px'
                                            />
                                        }
                            />
                        </TableCell>
                        <Controller control={control}
                                    defaultValue={''}
                                    name={`charges.${1}.expiration_date`}
                                    as={
                                        <TableCell className={classes.innerCell} align="left">

                                        </TableCell>
                                    }
                        />
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default FrateRatesTable