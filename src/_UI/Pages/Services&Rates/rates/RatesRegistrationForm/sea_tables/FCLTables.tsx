import React, {useEffect, useRef, useState} from "react";
import {
  ContainerType,
  CurrencyType,
  ShippingModeType,
} from "../../../../../../_BLL/types/rates&surcharges/ratesTypes";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import {
  HandlingSurchargeContainer,
  HandlingTitle,
} from "../../../surcharge/SurchargeRegistrationForm/sea_containerized_cargo/sea-conteneraized-cargo-styles";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import { Controller } from "react-hook-form";
import SurchargeRateSelect from "../../../../../components/_commonComponents/select/SurchargeRateSelect";
import { Field } from "../../../../../components/_commonComponents/Input/input-styles";
import NoSurchargeCard from "../NoSurchargeCard";
import SurchargesDates from "../../../surcharge/SurchargeRegistrationForm/SurchargeDates";
import Calendar from "../../../../../components/_commonComponents/calendar/Calendar";
import {SurchargesDatesFilter} from "../../../surcharge/SurchargeRegistrationForm/form-styles";
import {useSelector} from "react-redux";
import {getBookedDates, getSurcharge} from "../../../../../../_BLL/selectors/rates&surcharge/surchargeSelectors";
import moment from "moment";
import DayPickerInput from "react-day-picker/DayPickerInput";

const useStyles = makeStyles({
  container: {
    boxShadow: "none",
    width: 760,
    maxHeight: '420px',
    overflowY: 'scroll'
  },
  table: {
    "& .MuiTableHead-root": {},
  },
  cell: {
    color: "#115B86",
    fontFamily: "Helvetica Bold",
    fontSize: "16px",
    borderBottom: "1px solid #115B86",
    padding: '16px 0'
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
  },
});

type PropsType = {
  ship_mode?: ShippingModeType | null;
  register?: any;
  control?: any;
  currency_list: CurrencyType[] | null;
  shipping_value?: number;
  errors?: any;
  setValue?: any
};

const FCLTables: React.FC<PropsType> = ({ ship_mode, ...props }) => {
  const classes = useStyles();

  let containers = ship_mode?.container_types;

  function createData(container: ContainerType, currency: any, rate: string, start_date: string, expiration_date: string) {
    return {container, currency, rate, start_date, expiration_date}
  }

  let rows = containers && containers?.length > 0
      ? containers?.map(c => createData(c, [{id: 37, code: 'BRL'}, {id: 43, code: 'USD'}, {id: 98, code: 'EUR'}] ,
          '0', '', '' ))
      : null

//calendar logic start
  const reservedDates = useSelector(getBookedDates)
  const bookedDates = reservedDates?.push({before: new Date()})
  console.log('bookes', bookedDates)

  const [selectedDay, setSelectedDay] = useState<any>({
    from:  '',
    to:  ''
  })

  let surcharge = useSelector(getSurcharge)

  useEffect(() => {
    if(surcharge && !sessionStorage.getItem('reg')) {
      setSelectedDay({from: moment(surcharge.start_date, 'DD/MM/YYYY').toDate(),
        to: moment(surcharge.expiration_date, 'DD/MM/YYYY').toDate()})
      props.setValue('from', surcharge.start_date)
      props.setValue('to', surcharge.expiration_date)
      console.log(new Date(surcharge.start_date))
    }
  }, [surcharge])

  const handleFromChange = (from: string) => {
    setSelectedDay({
      ...selectedDay,
      from
    })

    props.setValue('from', from)
  }

  const handleToChange = (to: string) => {
    setSelectedDay({
      ...selectedDay,
      to
    })
    props.setValue('to', to)
  }

  const toInput = useRef<DayPickerInput>(null)

  const fromDayClick = () => {
    toInput?.current?.getInput().focus()
  }
//calendar logic end

  return (
    <div>
      <HandlingTitle>Rates</HandlingTitle>
      <TableContainer className={classes.container} component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className={classes.cell}>CONTAINER TYPE </TableCell>
              <TableCell className={classes.cell} align="left">
                CURRENCY
              </TableCell>
              <TableCell className={classes.cell} align="left">
                RATE
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
            {rows?.map((row) => (
              <TableRow key={row.container.id}>
               <Controller control={props.control}
                           defaultValue={row.container.id}
                           name={`rates.${row.container.id}.container_type`}
                           as={
                             <TableCell
                                 className={classes.innerCell}
                                 component="th"
                                 scope="row"
                             >
                               {row.container.code}
                             </TableCell>
                           }
               />
                <TableCell className={classes.innerCell} align="left">
                  <Controller control={props.control}
                              name={`rates.${row.container.id}.currency`}
                              defaultValue={row.currency[0].id}
                              as={
                                <SurchargeRateSelect options={row.currency}
                                                     maxW='70px'
                                />
                              }
                  />
                </TableCell>
                <TableCell className={classes.innerCell} align="left">
                    <Controller control={props.control}
                                name={`rates.${row.container.id}.rate`}
                                defaultvalue='0'
                                as={
                                  <Field maxW='100px'/>
                                }

                    />
                </TableCell>
                <TableCell className={classes.innerCell} align="center">
                  <Calendar
                      label='Start Date'
                      name='from'
                      value={selectedDay.from}
                      handleDayChange={handleFromChange}
                      selectedDay={selectedDay}
                      onDayClick={fromDayClick}
                      control={props.control}
                      error={!!props.errors.from}
                      disabledDates={reservedDates}
                      disabled={!reservedDates}
                      display_label='none'
                      max_width='107px'
                      margin_bottom='0'
                  />
                </TableCell>
                  <TableCell className={classes.innerCell} align="center">
                    <Calendar
                      label='Expiration Date'
                      name='to'
                      value={selectedDay.to}
                      handleDayChange={handleToChange}
                      selectedDay={selectedDay}
                      ref={toInput}
                      control={props.control}
                      error={!!props.errors.to}
                      disabledDates={reservedDates}
                      disabled={!reservedDates}
                      display_label='none'
                      max_width='107px'
                      margin_bottom='0'
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <NoSurchargeCard />
    </div>
  );
};

export default FCLTables;
