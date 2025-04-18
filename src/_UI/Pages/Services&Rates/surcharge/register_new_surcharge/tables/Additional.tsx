import React from "react";
//react-hook-form
import {Controller} from "react-hook-form";
//material ui
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import makeStyles from "@material-ui/core/styles/makeStyles";
//types
import {ShippingModeEnum} from "../../../../../../_BLL/types/rates&surcharges/newSurchargesTypes";
import {AdditionalSurchargeType} from "../../../../../../_BLL/types/rates&surcharges/surchargesTypes";
//helpers
import {
    conditions,
    currency,
} from "../../../../../../_BLL/helpers/surcharge_helpers_methods&arrays";
//components
import SurchargeRateSelect from "../../../../../components/_commonComponents/select/SurchargeRateSelect";
import ConditionSelect from "../../../../../components/ConditionSelect/ConditionSelect";
//styles
import {
    HandlingSurchargeContainer,
    HandlingTitle,
} from "../../surcharges_page/surcharge/sea-conteneraized-cargo-styles";
import {Field} from "../../../../../components/_commonComponents/Input/input-styles";
import {useTranslation} from "react-i18next";
import ScrollbarStyled from "../../../../../components/_commonComponents/ScrollbarStyled/ScrollbarStyled";


const useStyles = makeStyles({
    container: {
        boxShadow: "none",
        width: 660,
        height: "300px",
        overflowY: "auto",
    },
    table: {
        "& .MuiTableHead-root": {
            borderBottom: "2px solid #115B86",
        },
    },
    cell: {
        color: "#115B86",
        fontFamily: "Helvetica Bold",
        fontSize: "16px",
        backgroundColor: 'white',
        padding: '16px 16px 5px 16px'
    },
    innerMainCell: {
        fontFamily: "Helvetica Bold",
        fontSize: "16px",
        color: "#115B86",
        width: "213px",
        padding: "0 16px",
    },
    innerCell: {
        fontFamily: "Helvetica Thin",
        fontSize: "16px",
        color: "#1B1B25",
        padding: "0 16px",
    },
});

type PropsType = {
    control: any;
    shippingMode: number;
    charges: AdditionalSurchargeType[];
    setValue?: (name: string, value: string | number) => void;
    errors?: any,
    shipping_mode_add?: string
};

const Additional: React.FC<PropsType> = ({
                                             control,
                                             setValue,
                                             shippingMode,
                                             charges,
                                             shipping_mode_add
                                         }) => {
    const classes = useStyles();
    const noConditions = ShippingModeEnum.FCL === shippingMode;

    const {t} = useTranslation();
    return (
        <HandlingSurchargeContainer max_width="662px" max_height="490px">
            <HandlingTitle>{t("Surcharges/ADDITIONAL SURCHARGES")}</HandlingTitle>
            <TableContainer className={classes.container} component={Paper}>
                <ScrollbarStyled>
                <Table stickyHeader className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.cell}/>
                            {!noConditions && (
                                <TableCell className={classes.cell} align="left">
                                    {t("Bookings/CONDITIONS")}
                                </TableCell>
                            )}
                            <TableCell className={classes.cell} align="left">
                                {t("Bookings/CURRENCY")}
                            </TableCell>
                            <TableCell className={classes.cell} align="left">
                                {t("Bookings/CHARGE")}
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {charges?.map((charge) => (
                            <TableRow key={charge.id}>
                                <Controller
                                    name={`charges.${charge.id}.additional_surcharge`}
                                    control={control}
                                    defaultValue={charge.id}
                                    as={
                                        <TableCell
                                            className={classes.innerMainCell}
                                            component="th"
                                            scope="row"
                                        >
                                            {shippingMode === 3 && charge.title === 'OTHER SURCHARGES' ?  `${charge?.title} (PER CONTAINER)` : `${charge?.title}`}
                                        </TableCell>
                                    }
                                />

                                {!noConditions && (
                                    <Controller
                                        control={control}
                                        name={`charges.${charge.id}.conditions`}
                                        defaultValue={
                                            charge.id === 1 ? "fixed" : conditions[0]?.title
                                        }
                                        as={
                                            charge.id === 1 ? (
                                                <TableCell className={classes.innerCell}>
                                                    {"Fixed"}
                                                </TableCell>
                                            ) : (
                                                // : <SurchargeRateConditionsSelect options={conditions}
                                                //                                 placeholder='Currency'
                                                //                                 maxW='80px'
                                                // />
                                                <TableCell className={classes.innerCell} align="left">
                                                    <ConditionSelect
                                                        options={conditions}
                                                        name={`charges.${charge.id}.conditions`}
                                                        setValue={setValue}
                                                        defaultV={conditions[0]?.displayName}
                                                        setFormMode=""
                                                        right={'20px'}
                                                    />
                                                </TableCell>
                                            )
                                        }
                                    />
                                )}
                                <TableCell className={classes.innerCell} align="left">
                                    <Controller
                                        control={control}
                                        name={`charges.${charge.id}.currency`}
                                        defaultValue={currency[0].id}
                                        as={
                                            <SurchargeRateSelect
                                                options={currency}
                                                placeholder={t("Bookings/Currency")}
                                                max_width="80px"
                                            />
                                        }
                                    />
                                </TableCell>
                                <TableCell className={classes.innerCell} align="left">
                                    <Controller
                                        name={`charges.${charge.id}.charge`}
                                        control={control}
                                        defaultValue={'0'}
                                        as={
                                            <Field max_width="100px"
                                                   placeholder="0.00"
                                                   type="number"
                                                   step='0.01'
                                            />
                                        }
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                </ScrollbarStyled>
            </TableContainer>
        </HandlingSurchargeContainer>
    );
};

export default Additional;
