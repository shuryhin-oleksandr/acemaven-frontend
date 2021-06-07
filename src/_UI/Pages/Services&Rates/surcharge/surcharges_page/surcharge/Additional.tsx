import React from "react";
//react-hook-form
import { Controller } from "react-hook-form";
//material ui
import makeStyles from "@material-ui/core/styles/makeStyles";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
//types
import { ChargesType } from "../../../../../../_BLL/types/rates&surcharges/surchargesTypes";
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
  Field,
  HandlingSurchargeContainer,
  HandlingTitle,
} from "./sea-conteneraized-cargo-styles";
import {useTranslation} from "react-i18next";



const useStyles = makeStyles({
  container: {
    boxShadow: "none",
    minHeight: '350px'
  },
  table: {
    "& .MuiTableHead-root": {},
  },
  cell: {
    color: "#115B86",
    fontFamily: "Helvetica Bold",
    fontSize: "16px",
    borderBottom: "1px solid #115B86",
  },
  innerMainCell: {
    borderBottom: " 1px solid #E0E0E0;",
    fontFamily: "Helvetica Bold",
    fontSize: "16px",
    color: "#115B86",
    width: "213px",
    padding: "0 16px",
  },
  innerCell: {
    borderBottom: "1px solid #E0E0E0;",
    fontFamily: "Helvetica Light",
    fontSize: "16px",
    color: "#1B1B25",
    padding: "0 16px",
  },
});

type PropsType = {
  setFormMode?: (value: boolean) => void
  charges?: ChargesType[];
  control: any;
  errors: any;
  setValue: (name: string, value: any) => void;
  shipping_mode_add?: string;
};

const Additional: React.FC<PropsType> = ({
  setFormMode,
  setValue,
  shipping_mode_add,
  ...props
}) => {
  const classes = useStyles();

  let findConditionDefaultValue = (name: string) => {
    const filtered = conditions.filter((condition) => condition.title === name);
    return filtered[0].title;
  };

  let findConditionDisplayName = (value: string) => {
    const filtered = conditions.filter(
      (condition) => condition.title === value
    );
    return filtered[0].displayName;
  };
  const {t} = useTranslation();
  return (
    <HandlingSurchargeContainer max_height="440px" max_width="1000px ">
      <HandlingTitle>{t("Quote bid screen/ADDITIONAL SURCHARGES")}</HandlingTitle>
      <TableContainer className={classes.container} component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className={classes.cell}> </TableCell>
              <TableCell className={classes.cell} align="left">
                {t("Bookings/CURRENCY")}
              </TableCell>
              <TableCell className={classes.cell} align="left">
                {t("Bookings/CHARGE")}
              </TableCell>
              <TableCell className={classes.cell} align="left">
                {t("Bookings/CONDITIONS")}
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
            {props.charges?.map((charge) => (
              <TableRow key={charge.id}>
                <Controller
                  control={props.control}
                  defaultValue={charge.additional_surcharge.id}
                  name={`charges.${charge.id}.additional_surcharge`}
                  as={
                    <TableCell
                      className={classes.innerMainCell}
                      component="th"
                      scope="row"
                    >
                      {shipping_mode_add === 'FCL' &&  charge.additional_surcharge.title === 'OTHER SURCHARGES' ? `${charge.additional_surcharge.title} (PER CONTAINER)` : `${charge.additional_surcharge.title}`}
                    </TableCell>
                  }
                />
                <TableCell
                  className={classes.innerCell}
                  align="left"
                  onClick={() => setFormMode && setFormMode(true)}
                >
                  <Controller
                    control={props.control}
                    name={`charges.${charge.id}.currency`}
                    defaultValue={charge.currency.id}
                    as={
                      <SurchargeRateSelect
                        options={currency}
                        placeholder={t("Bookings/Currency")}
                        max_width="80px"
                      />
                    }
                  />
                </TableCell>
                <TableCell
                  className={classes.innerCell}
                  align="left"
                  onClick={() => setFormMode && setFormMode(true)}
                >
                  <Controller
                    control={props.control}
                    name={`charges.${charge.id}.charge`}
                    defaultValue={charge.charge ? charge.charge : '0.00'}
                    as={
                      <Field type="number"
                      />
                    }
                  />
                </TableCell>
                {charge.additional_surcharge.id === 1 ? (
                  <Controller
                    control={props.control}
                    defaultValue={charge.conditions}
                    name={`charges.${charge.id}.conditions`}
                    as={
                      <TableCell className={classes.innerCell} align="left">
                        {findConditionDisplayName(charge.conditions)}
                      </TableCell>
                    }
                  />
                ) : (
                  <Controller
                    control={props.control}
                    defaultValue={findConditionDefaultValue(charge.conditions)}
                    name={`charges.${charge.id}.conditions`}
                    rules={{required: true}}
                    as={
                      // <SurchargeRateConditionsSelect options={conditions}
                      //                      placeholder='Currency'
                      //
                      // />
                      <TableCell className={classes.innerCell} align="left">
                        <ConditionSelect
                          options={conditions}
                          name={`charges.${charge.id}.conditions`}
                          setValue={setValue}
                          defaultV={findConditionDisplayName(charge.conditions)}
                          setFormMode={setFormMode}
                          right={'20px'}
                        />
                      </TableCell>
                    }
                  />
                )}
                <Controller
                  control={props.control}
                  defaultValue={charge.updated_by}
                  name={`charges.${charge.id}.updated_by`}
                  as={
                    <TableCell className={classes.innerCell} align="left">
                      {charge.updated_by}
                    </TableCell>
                  }
                />
                <Controller
                  control={props.control}
                  defaultValue={charge.date_updated}
                  name={`charges.${charge.id}.date_updated`}
                  as={
                    <TableCell className={classes.innerCell} align="left">
                      {charge.date_updated}
                    </TableCell>
                  }
                />
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </HandlingSurchargeContainer>
  );
};

export default Additional;
