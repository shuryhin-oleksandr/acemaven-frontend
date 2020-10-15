import React from "react";
import {
  CurrencyType,
  ShippingModeType,
} from "../../../../../../_BLL/types/rates&surcharges/ratesTypes";
import { HandlingTitle } from "../../../surcharge/SurchargeRegistrationForm/sea_containerized_cargo/sea-conteneraized-cargo-styles";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { Controller } from "react-hook-form";
import SurchargeRateSelect from "../../../../../components/_commonComponents/select/SurchargeRateSelect";
import { Field } from "../../../../../components/_commonComponents/Input/input-styles";
import DayPickerInput from "react-day-picker/DayPickerInput";
import MomentLocaleUtils from "react-day-picker/moment";
import { CalendarWrapper } from "../../../../../components/_commonComponents/calendar/calendar-styles";

const useStyles = makeStyles({
  container: {
    boxShadow: "none",
    width: 760,
    overflowX: "unset",
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
    borderBottom: "1px solid #E0E0E0;",
    fontFamily: "Helvetica Bold",
    fontSize: "16px",
    color: "#115B86",
    width: "213px",
    padding: "8px 0 0",
  },
  innerCell: {
    borderBottom: "1px solid #E0E0E0;",
    fontFamily: "Helvetica Light",
    fontSize: "16px",
    color: "#1B1B25",
    padding: "8px 16px 0",
  },
});

type PropsType = {
  ship_mode?: ShippingModeType | null;
  register?: any;
  control?: any;
  // currency_list: CurrencyType[] | null;
  // shipping_value?: number;
};

const CommonRateTable: React.FC<PropsType> = ({ control }) => {
  const classes = useStyles();

  return (
    <div>
      <HandlingTitle>Rates</HandlingTitle>
      <TableContainer className={classes.container} component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className={classes.cell}>CURRENCY</TableCell>
              <TableCell className={classes.cell} align="left">
                RATE PER W/M
              </TableCell>
              <TableCell className={classes.cell} align="left">
                START DATE
              </TableCell>
              <TableCell className={classes.cell} align="left">
                EXPIRATION DATE
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell className={classes.innerCell} align="left">
                <Controller
                  control={control}
                  name={`rates[0].currency`}
                  defaultValue={37}
                  as={
                    <SurchargeRateSelect
                      options={[
                        { id: 37, code: "BRL" },
                        { id: 43, code: "USD" },
                        { id: 98, code: "EUR" },
                      ]}
                      placeholder="Currency"
                      maxW="80px"
                    />
                  }
                />
              </TableCell>
              <TableCell className={classes.innerCell} align="left">
                <Controller
                  name={`rates[0].rate`}
                  control={control}
                  // defaultValue={row.charge}
                  as={<Field />}
                />
              </TableCell>
              <TableCell className={classes.innerCell} align="left">
                <CalendarWrapper style={{ marginBottom: 0 }}>
                  <Controller
                    name={"from"}
                    control={control}
                    rules={{
                      required: true,
                    }}
                    defaultValue=""
                    as={
                      <DayPickerInput
                        inputProps={{
                          readOnly: "readonly",
                          // disabled: disabled,
                        }}
                        format="DD/MM/YYYY"
                        placeholder="DD/MM/YYYY"
                        // formatDate={formatDate}
                        // parseDate={parseDate}
                        hideOnDayClick={false}
                        // value={value}
                        onDayChange={(v) => console.log(v)}
                        // ref={ref}
                        dayPickerProps={{
                          // selectedDays: [from, { from, to }],
                          // modifiers,
                          numberOfMonths: 1,
                          localeUtils: MomentLocaleUtils,
                          // onDayClick: onDayClick,
                          // disabledDays: disabledDates,
                        }}
                      />
                    }
                  />
                </CalendarWrapper>
              </TableCell>
              <TableCell className={classes.innerCell} align="left">
                <CalendarWrapper style={{ marginBottom: 0 }}>
                  <Controller
                      name={"from"}
                      control={control}
                      rules={{
                        required: true,
                      }}
                      defaultValue=""
                      as={
                        <DayPickerInput
                            inputProps={{
                              readOnly: "readonly",
                              // disabled: disabled,
                            }}
                            format="DD/MM/YYYY"
                            placeholder="DD/MM/YYYY"
                            // formatDate={formatDate}
                            // parseDate={parseDate}
                            hideOnDayClick={false}
                            // value={value}
                            onDayChange={(v) => console.log(v)}
                            // ref={ref}
                            dayPickerProps={{
                              // selectedDays: [from, { from, to }],
                              // modifiers,
                              numberOfMonths: 1,
                              localeUtils: MomentLocaleUtils,
                              // onDayClick: onDayClick,
                              // disabledDays: disabledDates,
                            }}
                        />
                      }
                  />
                </CalendarWrapper>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default CommonRateTable;
