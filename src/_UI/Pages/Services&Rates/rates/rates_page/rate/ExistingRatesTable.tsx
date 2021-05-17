import React, {useState} from 'react';
//react-redux
import {useSelector} from "react-redux";
//react-hook-form
import {Controller} from "react-hook-form";
//material ui
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {IconButton} from "@material-ui/core";
//BLL
import {getRateBookedDatesSelector} from "../../../../../../_BLL/selectors/rates&surcharge/ratesSelectors";
//types
import {RateInfoType} from "../../../../../../_BLL/types/rates&surcharges/ratesTypes";
//helpers
import {currency} from "../../../../../../_BLL/helpers/surcharge_helpers_methods&arrays";
//components
import SurchargeRateSelect from "../../../../../components/_commonComponents/select/SurchargeRateSelect";
import {Field} from "../../../../../components/_commonComponents/Input/input-styles";
import ScrollbarStyled from "../../../../../components/_commonComponents/ScrollbarStyled/ScrollbarStyled";
import DatesCells from "../../register_new_freight_rate/tables/DatesCells";
import {SpanAware, Title} from "../../register_new_freight_rate/tables/Rates";
//styles
import {HandlingTitle, SpanType} from "../../../surcharge/surcharges_page/surcharge/sea-conteneraized-cargo-styles";
import {Arrow} from "../../register_new_freight_rate/tables/surcharges-to-rate-styles";
//icons
import close_icon from "../../../../../assets/icons/close-icon.svg";
import show_arrow from "../../../../../assets/icons/rates&services/show_arrow.svg";
import hide_arrow from "../../../../../assets/icons/rates&services/hide_arrow.svg";
import {useTranslation} from "react-i18next";



type PropsType = {
    rate: RateInfoType | null,
    control: any,
    setValue: (value: string | number) => void,
    getValues: any
    errors: any
    getSurchargeForRate: any
    getSurchargeForNewRate: any
    setFormMode: (value: boolean) => void
}

const useStyles = makeStyles({
    container: {
        boxShadow: "none",
        paddingRight: "12px", height: '100%',
        maxHeight:420,
        maxWidth:1100
    },
    table: {
        "& .MuiTableHead-root": {},
    },
    info_row: {
        '&:hover': {
            cursor: 'pointer'
        }
    },
    cell: {
        color: "#115B86",
        fontFamily: "Helvetica Bold",
        fontSize: "16px",
        borderBottom: "1px solid #115B86",
        padding: "16px 0",
        backgroundColor: "white",
    },
    innerMainCell: {
        borderBottom: "1px solid #E0E0E0;",
        fontFamily: "Helvetica Bold",
        fontSize: "16px",
        color: "#115B86",
        width: "213px",
    },
    innerCell: {
        borderBottom: "1px solid #E0E0E0;",
        fontFamily: "Helvetica Light",
        fontSize: "16px",
        color: "#1B1B25",
        padding: "8px 0 0",
    }
});

const ExistingRatesTable: React.FC<PropsType> = ({rate, control, getValues, setValue, errors, getSurchargeForRate, setFormMode, getSurchargeForNewRate}) => {
    const classes = useStyles();

    let reservedDates = useSelector(getRateBookedDatesSelector)

    const [awareMessage, setAware] = useState(false)
    const [inputValue, setInputValue] = useState('')
    const [isFullView, setFullView] = useState(true)

    let changeHandler = (value: any) => {

        (value.value === '0') ? setAware(true) : setAware(false)
        setInputValue(value.value)
    }
    const {t} = useTranslation();
    return (
        <div style={{width: '100%', paddingBottom: 30, borderBottom:"1px solid #BDBDBD"}}>
            <div style={{width: '100%', display: 'flex', alignItems: 'center', position: 'relative'}}>
                <HandlingTitle margin_right='20px'>{t("Dashboard Menu/Rates")}</HandlingTitle>
                {awareMessage
                &&
                <SpanAware>
                    <IconButton style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        backgroundColor: 'rgba(255, 255, 255, .7)',
                        padding: '5px'
                    }}
                                onClick={() => setAware(false)}
                    >
                        <img src={close_icon} alt="" style={{width: '6px'}}/>
                    </IconButton>
                    <Title>{t("Bookings/Rate will be register as 0. Are you sure?")}</Title>
                </SpanAware>
                }
                <Arrow type='button'
                       onClick={() => isFullView ? setFullView(false) : setFullView(true)}
                       style={{position: 'absolute', top: '10px', right: 0}}
                >
                    <img src={!isFullView ? show_arrow : hide_arrow} alt=""/>
                </Arrow>
            </div>
            {isFullView
            &&
            <TableContainer className={classes.container} component={Paper}>
                <Table stickyHeader  className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            {rate?.shipping_mode.id === 2 ||
                            (rate?.shipping_mode.id === 3 && (
                                <TableCell className={classes.cell}>
                                    {t("Quote bid screen/CONTAINER TYPE")}
                                </TableCell>
                            ))}
                            <TableCell className={classes.cell} align="left">
                                {t("Bookings/CURRENCY")}
                            </TableCell>
                            <TableCell className={classes.cell} align="left">
                                {t("Quote bid screen/RATE")}
                            </TableCell>
                            <TableCell className={classes.cell} align="left">
                                {t("Surcharges/START DATE")}
                            </TableCell>
                            <TableCell className={classes.cell} align="left">
                                {t("Surcharges/EXPIRATION DATE")}
                            </TableCell>
                            <TableCell className={classes.cell} align="left">
                                {t("Surcharges/UPDATED BY")}
                            </TableCell>
                            <TableCell className={classes.cell} align="left">
                                {t("Surcharges/ON")}
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rate?.rates.map((r) => {
                            if (reservedDates) {
                                if (r.container_type) {
                                    const disabledDates = reservedDates.find(d => d.container_type === r.container_type.id)?.disabledDates || [];
                                    return {...r, disabledDates: [...disabledDates]}
                                } else {
                                    return {...r, disabledDates: [...reservedDates[0].disabledDates]}
                                }
                            } else {
                                return r
                            }
                        }).map((r) => (
                            <TableRow key={r.id} className={classes.info_row}>
                                {rate?.shipping_mode.id === 2 ||
                                (rate?.shipping_mode.id === 3 && (
                                    <Controller
                                        control={control}
                                        defaultValue={r?.container_type.id}
                                        name={`rates.${r.id}.container_type`}
                                        as={
                                            <TableCell
                                                className={classes.innerCell}
                                                component="th"
                                                scope="row"
                                            >
                                                <SpanType
                                                    onClick={() => r.start_date && r.expiration_date && getSurchargeForRate(r.start_date, r.expiration_date)}
                                                    bold_hover={!!(r.start_date && r.expiration_date)}
                                                >
                                                    {r?.container_type.code}
                                                </SpanType>
                                            </TableCell>
                                        }
                                    />
                                ))}
                                <TableCell className={classes.innerCell} align="left" onClick={() => setFormMode(true)}>
                                    <Controller
                                        control={control}
                                        name={`rates.${r.id}.currency`}
                                        defaultValue={r.currency.id}
                                        as={
                                            <SurchargeRateSelect
                                                options={currency}
                                                max_width="80px"
                                            />
                                        }
                                    />
                                </TableCell>
                                <TableCell className={classes.innerCell} align="left" onClick={() => setFormMode(true)}>
                                    <Controller
                                        control={control}
                                        name={`rates.${r.id}.rate`}
                                        defaultValue={r.rate}
                                        render={({value, onChange}) => (
                                            <Field placeholder="0.00"
                                                   max_width="100px"
                                                   type='number'
                                                   onChange={(e) => {onChange(e.currentTarget.value); changeHandler(e.currentTarget)}}
                                                   value={value}
                                            />
                                        )
                                        }
                                    />
                                </TableCell>
                                <DatesCells
                                    currentDates={{from: r.start_date, to: r.expiration_date}}
                                    setValue={setValue}
                                    control={control}
                                    id={r.id}
                                    // @ts-ignore
                                    reservedDates={r.disabledDates || []}
                                    errors={errors}
                                    classes={classes}
                                    getValues={getValues}
                                    getSurchargeToRateHandle={() => {
                                    }}
                                    getSurchargeForNewRate={getSurchargeForNewRate}
                                    setFormMode={setFormMode}
                                    required_dates={false}
                                    margin_top='0px'
                                />
                                <Controller
                                    control={control}
                                    defaultValue={r.updated_by}
                                    name={`rates.${r.id}.updated_by`}
                                    as={
                                        <TableCell
                                            className={classes.innerCell}
                                            align="left"
                                        >
                                            {r.updated_by}
                                        </TableCell>
                                    }
                                />
                                <Controller
                                    control={control}
                                    defaultValue={r.date_updated}
                                    name={`rates.${r.id}.date_updated`}
                                    as={
                                        <TableCell
                                            className={classes.innerCell}
                                            align="left"
                                        >
                                            {r.date_updated}
                                        </TableCell>
                                    }
                                />
                            </TableRow>
                        ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            }
        </div>
    )
}

export default ExistingRatesTable