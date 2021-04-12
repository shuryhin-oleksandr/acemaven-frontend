import React, {useEffect} from "react";
//moment js
import moment from "moment";
//react-hook-form
import {useForm} from "react-hook-form";
//react-redux
import {useDispatch} from "react-redux";
//material ui
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import makeStyles from "@material-ui/core/styles/makeStyles";
//BLL
import {createNewExchangeRateThunk} from "../../../../../../_BLL/thunks/billing/agent/AgentBillingThunks";
import {agentBillingActions} from "../../../../../../_BLL/reducers/billing/agent/AgentBillingReducer";
//types
import {ExchangeRateType} from "../../../../../../_BLL/types/billing/billingTypes";
//components
import FormField from "../../../../../components/_commonComponents/Input/FormField";
//styles
import {SubmitQuoteButton} from "../../../../quotes/agent/table/agent-quotes-styles";
import {useTranslation} from "react-i18next";


const useStyles = makeStyles({
    container: {
        boxShadow: 'none',
        paddingRight: 12,
        marginBottom: '20px',
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

type PropsType = {
    exchange_list: ExchangeRateType[],
    setProceed: (value: boolean) => void,
    setRepeatedExchangeHandler: (data: { rates: Array<{ currency: number, rate: string, spread: string }> } | null) => void,
    adding_exchange_success: boolean
}

const ExchangeTable: React.FC<PropsType> = ({exchange_list, setProceed, setRepeatedExchangeHandler, ...props}) => {
    //hooks
    const dispatch = useDispatch()
    const classes = useStyles();

    //moment
    let current_day = moment().format('DD/MM/YYYY')

    //react hook form
    const {handleSubmit, errors, register, reset} = useForm<{ usd: string, eur: string, spread: string }>({
        mode: 'onSubmit',
        reValidateMode: 'onBlur'
    })
    const onSubmit = (values: { usd: string, eur: string, spread: string }) => {
        let usd_exchange = {currency: 43, rate: values.usd, spread: values.spread}
        let eur_exchange = {currency: 98, rate: values.eur, spread: values.spread}
        let data_array = [];
        data_array.push(usd_exchange, eur_exchange)

        //check if we dont have exchange already for today
        let repeated_exchange = exchange_list.find((x) => x.date === current_day)
        if (repeated_exchange) {
            setProceed(true)
            setRepeatedExchangeHandler({rates: data_array})
        } else {
            let usd_exchange = {currency: 43, rate: values.usd, spread: values.spread}
            let eur_exchange = {currency: 98, rate: values.eur, spread: values.spread}
            let data_array = [];
            data_array.push(usd_exchange, eur_exchange)

            dispatch(createNewExchangeRateThunk({rates: data_array}))
        }
    }

    useEffect(() => {
        if(props.adding_exchange_success) {
            reset()
            dispatch(agentBillingActions.setAddingExchangeSuccess(false))
        }
     }, [props.adding_exchange_success])
    const {t} = useTranslation();
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <TableContainer className={classes.container} component={Paper}>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.shipping_cell} align="left">
                                {t("Billing/CURRENCIES")}
                            </TableCell>
                            <TableCell className={classes.cell} align="left">
                                USD
                            </TableCell>
                            <TableCell className={classes.cell} align="left">
                                EUR
                            </TableCell>
                            <TableCell className={classes.cell} align="left">
                                {t("Billing/SPREAD")} % *
                            </TableCell>
                            <TableCell className={classes.cell} align="left">
                                {t("Billing/DATE")}
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
                                <FormField max_width='97px'
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
                                <FormField max_width='97px'
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
                                <FormField max_width='97px'
                                           placeholder='0.00%'
                                           marginBottom='0'
                                           type='number'
                                           name='spread'
                                           inputRef={register({
                                               required: true,
                                               minLength: 1,
                                               min: 0.01
                                           })}
                                           min='1'
                                           error={errors?.spread}
                                           messagePaddingTop='0'
                                />
                            </TableCell>
                            <TableCell className={classes.innerCell} align="left">
                                <span style={{
                                    fontFamily: 'Helvetica Reg',
                                    fontSize: '14px',
                                    color: '#115b86'
                                }}>
                                    {current_day}
                                </span>
                            </TableCell>
                            <TableCell className={classes.innerCell} align="center">
                                <SubmitQuoteButton type='submit' style={{textTransform: "uppercase"}}>{t("Billing/Add rate")}</SubmitQuoteButton>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </form>

    )
}

export default ExchangeTable