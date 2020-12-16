import React from "react";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {SubmitQuoteButton} from "../../../quotes/agent/table/agent-quotes-styles";
import FormField from "../../../../components/_commonComponents/Input/FormField";
import moment from "moment";
import {Controller, useForm} from "react-hook-form";

type PropsType = {}

const useStyles = makeStyles({
    container: {
        boxShadow: 'none',
        paddingRight: 12,
        marginBottom: '40px',
    },
    shipping_cell: {
        width: '220px',
        color: '#115B86',
        fontFamily: 'Helvetica Bold',
        fontSize: '16px',
        borderBottom: '1px solid #115B86',
        padding: '0 0 10px'
    },
    cell: {
        color: '#115B86',
        fontFamily: 'Helvetica Bold',
        fontSize: '16px',
        borderBottom: '1px solid #115B86',
        width: '150px',
        padding: '0 0 10px'
    },
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
        '&:hover': {
            transition: '.3s',
            cursor: 'pointer'
        }
    },
    innerMainCell: {
        borderBottom: '1px solid #BDBDBD',
        fontFamily: 'Helvetica Light',
        fontSize: '16px',
        width: '220px',
        color: '#1B1B25',
        position: 'relative',
        height: '72px'
    },
    innerCell: {
        borderBottom: '1px solid #BDBDBD',
        fontFamily: 'Helvetica Light',
        fontSize: '16px',
        color: '#1B1B25',
        height: '72px',
        padding: '0',
    },
    innerRow: {
        transition: '.3s',
        '&:hover': {
            transition: '.3s',
            backgroundColor: '#e8f7fc',
            cursor: 'pointer'
        }
    },
    collapseCell: {
        borderBottom: 0,
        fontFamily: 'Helvetica Bold',
        fontSize: '16px'
    },
    collapseMainInnerCell: {
        borderBottom: 0,
        fontFamily: 'Helvetica Reg',
        fontSize: '14px'
    },
    collapseInnerCell: {
        borderBottom: 0,
        fontFamily: 'Helvetica Light',
        fontSize: '14px'
    }
});

const ExchangeTable: React.FC<PropsType> = ({}) => {
    const classes = useStyles();

    let current_day = moment().format('DD/MM/YYYY')

    const {handleSubmit, errors, register, control} = useForm<{ usd: number, eur: number, spread: number, date: string }>()

    const onSubmit = (values: { usd: number, eur: number, spread: number, date: string }) => {
        console.log(values)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <TableContainer className={classes.container} component={Paper}>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.shipping_cell} align="left">
                                CURRENCIES
                            </TableCell>
                            <TableCell className={classes.cell} align="left">
                                USD
                            </TableCell>
                            <TableCell className={classes.cell} align="left">
                                EUR
                            </TableCell>
                            <TableCell className={classes.cell} align="left">
                                SPREAD % *
                            </TableCell>
                            <TableCell className={classes.cell} align="left">
                                DATE
                            </TableCell>
                            <TableCell className={classes.cell} align="right"/>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow className={classes.root}>
                            <TableCell className={classes.innerMainCell} align="left" component="th" scope="row">
                            <span style={{fontFamily: 'Helvetica Reg', fontSize: '14px', color: '#1b1b25'}}>
                                BRZ
                            </span>
                            </TableCell>
                            <TableCell className={classes.innerCell} align="left">
                                <FormField maxW='97px'
                                           placeholder='000.00'
                                           marginBottom='0'
                                           type='number'
                                           name='usd'
                                           inputRef={register({
                                               required: true,
                                               minLength: 1
                                           })}
                                           error={errors?.usd}
                                           min='1'
                                           messagePaddingTop='0'
                                />
                            </TableCell>
                            <TableCell className={classes.innerCell} align="left">
                                <FormField maxW='97px'
                                           placeholder='000.00'
                                           marginBottom='0'
                                           type='number'
                                           name='eur'
                                           inputRef={register({
                                               required: true,
                                               minLength: 1
                                           })}
                                           min='1'
                                           error={errors?.eur}
                                           messagePaddingTop='0'
                                />
                            </TableCell>
                            <TableCell className={classes.innerCell} align="center">
                                <FormField maxW='97px'
                                           placeholder='0.00%'
                                           marginBottom='0'
                                           type='number'
                                           name='spread'
                                           inputRef={register({
                                               required: true,
                                               minLength: 1
                                           })}
                                           min='1'
                                           error={errors?.spread}
                                           messagePaddingTop='0'
                                />
                            </TableCell>
                            <TableCell className={classes.innerCell} align="left">
                                <Controller control={control}
                                            name='date'
                                            defaultValue={current_day}
                                            as={
                                                <span style={{
                                                    fontFamily: 'Helvetica Reg',
                                                    fontSize: '14px',
                                                    color: '#115b86'
                                                }}>
                                                    {current_day}
                                                 </span>
                                            }
                                />

                            </TableCell>
                            <TableCell className={classes.innerCell} align="center">
                                <SubmitQuoteButton onClick={() => {
                                }} type='submit'>ADD RATE</SubmitQuoteButton>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </form>

    )
}

export default ExchangeTable