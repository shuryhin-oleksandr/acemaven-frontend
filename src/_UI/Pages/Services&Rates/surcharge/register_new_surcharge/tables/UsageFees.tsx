import React from 'react'
//react-hook-form
import {Controller} from "react-hook-form";
//material ui
import TableContainer from "@material-ui/core/TableContainer";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import makeStyles from "@material-ui/core/styles/makeStyles";
//types
import {ContainerType} from "../../../../../../_BLL/types/rates&surcharges/surchargesTypes";
//helpers
import {currency} from "../../../../../../_BLL/helpers/surcharge_helpers_methods&arrays";
//components
import SurchargeRateSelect from "../../../../../components/_commonComponents/select/SurchargeRateSelect";
import ScrollbarStyled from "../../../../../components/_commonComponents/ScrollbarStyled/ScrollbarStyled";
//styles
import styled from "styled-components";
import {
    HandlingSurchargeContainer,
    HandlingTitle
} from "../../surcharges_page/surcharge/sea-conteneraized-cargo-styles";
import {Field} from "../../../../../components/_commonComponents/Input/input-styles";
import {useTranslation} from "react-i18next";


const useStyles = makeStyles({
    container: {
        boxShadow: "none",
        paddingRight: 12
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
        borderBottom: '1px solid #115B86',
        padding: '14px 0'
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
    usageFees: ContainerType[] | null
    tableName: string
    type: string
    setValue: any
}

const UsageFees: React.FC<PropsType> = ({control, usageFees, tableName, type, setValue}) => {

    const classes = useStyles()

    // const [awareMessage, setAware] = useState(true)
    // const [charge_value, setChargeValue] = useState('')
    // let onChange = (e: any, id: string) => {
    //     if(e.currentTarget.value === '0') {
    //         setChargeValue(id)
    //         setAware(true)
    //         setValue(`usage_fees.${id}.charge`, e.currentTarget.value)
    //     } else {
    //         setValue(`usage_fees.${id}.charge`, e.currentTarget.value)
    //     }
    // }
    const {t} = useTranslation();
    return (
        <HandlingSurchargeContainer max_height='400px'>
            <HandlingTitle>{tableName}</HandlingTitle>
            <ScrollbarStyled {...{style: {width: "100%", height: 270}}}>
                <TableContainer className={classes.container}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell className={classes.cell}>
                                    {type}
                                </TableCell>
                                <TableCell className={classes.cell} align="left">
                                    {t("Bookings/CURRENCY")}
                                </TableCell>
                                <TableCell className={classes.cell} align="left">
                                    {t("Bookings/CHARGE")}
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
                                                        max_width="80px"
                                                    />
                                                }
                                            />
                                        </TableCell>
                                        <TableCell className={classes.innerCell} align="left">
                                            <div style={{position: 'relative'}}>
                                                <Controller
                                                    control={control}
                                                    name={`usage_fees.${fees.id}.charge`}
                                                    defaultValue=''
                                                    rules={{
                                                        maxLength: 15
                                                    }}
                                                    as={
                                                        <Field max_width="100px"
                                                               marginBottom="0"
                                                            //onChange={(e) => onChange(e, String(fees.id))}
                                                            //onBlur={() => setAware(false)}
                                                               placeholder='0.00'
                                                               type='number'
                                                               step='0.01'
                                                        />
                                                    }
                                                />
                                                {/*{awareMessage && String(fees.id) === charge_value*/}
                                                {/*&& <SpanAware><Title>You are setting this surcharge as $0,*/}
                                                {/*    please double check before saving.</Title></SpanAware>}*/}
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </ScrollbarStyled>
        </HandlingSurchargeContainer>
    )
};

export default UsageFees

const SpanAware = styled.div`
  width: 270px;
  height: 70px;
  justify-content: center;
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
  clip-path: polygon(0% 0%, 100% 0%, 100% 75%, 34% 75%, 26% 89%, 18% 75%, 0 75%);


  transform: rotate(180deg);
  right: 0;
`
const Title = styled.div`
   transform: rotate(180deg);
`