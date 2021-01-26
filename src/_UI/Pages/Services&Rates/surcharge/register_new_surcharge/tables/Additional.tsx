import React from "react";
import {
  HandlingSurchargeContainer,
  HandlingTitle,
} from "../../surcharges_page/surcharge/sea-conteneraized-cargo-styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import { Controller } from "react-hook-form";
import SurchargeRateSelect from "../../../../../components/_commonComponents/select/SurchargeRateSelect";
import { Field } from "../../../../../components/_commonComponents/Input/input-styles";
import TableContainer from "@material-ui/core/TableContainer";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { ShippingModeEnum } from "../../../../../../_BLL/types/rates&surcharges/newSurchargesTypes";
import { AdditionalSurchargeType } from "../../../../../../_BLL/types/rates&surcharges/surchargesTypes";
import {
  conditions,
  currency,
} from "../../../../../../_BLL/helpers/surcharge_helpers_methods&arrays";
import ConditionSelect from "../../../../../components/ConditionSelect/ConditionSelect";

const useStyles = makeStyles({
  container: {
    boxShadow: "none",
    width: 662,
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
  errors?: any
};

const Additional: React.FC<PropsType> = ({
  control,
  setValue,
  shippingMode,
  charges
}) => {
  const classes = useStyles();
  const noConditions = ShippingModeEnum.FCL === shippingMode;


  return (
    <HandlingSurchargeContainer max_width="662px" max_height="490px">
      <HandlingTitle>Additional surcharges</HandlingTitle>
      <TableContainer className={classes.container} component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className={classes.cell} />
              {!noConditions && (
                <TableCell className={classes.cell} align="left">
                  CONDITIONS
                </TableCell>
              )}
              <TableCell className={classes.cell} align="left">
                CURRENCY
              </TableCell>
              <TableCell className={classes.cell} align="left">
                CHARGE
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
                        {charge.title}
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
                        placeholder="Currency"
                        max_width="80px"
                      />
                    }
                  />
                </TableCell>
                <TableCell className={classes.innerCell} align="left">
                  <Controller
                    name={`charges.${charge.id}.charge`}
                    control={control}
                    defaultValue={0}
                    //rules={{required: true}}
                    as={
                        <Field max_width="100px"
                               placeholder="0.00$"
                               type="number"  />
                    }
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </HandlingSurchargeContainer>
  );
};

export default Additional;
