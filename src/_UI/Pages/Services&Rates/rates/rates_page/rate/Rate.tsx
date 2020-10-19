import React, {useEffect, useState} from "react";
import {
  RateContainer,
  Wrap,
  RateTitle,
  ButtonsWrap,
  PauseImg,
  ShippingMode,
  InfoWrap,
  RouteName,
  Content,
  FieldOuter,
  FieldsWrap,
  Label, PauseButton,
} from "./exact-rate-styles";
import pause from "../../../../../assets/icons/rates&services/pause.svg";
import play from "../../../../../assets/icons/rates&services/play_icon.svg";
import { SaveButton } from "../../../surcharge/surcharges_page/surcharge/surcharge-style";
import { Controller } from "react-hook-form";
import ship from "../../../../../assets/icons/rates&services/ship-surcharge.svg";
import plane from "../../../../../assets/icons/rates&services/plane-surcharge.svg";
import { HandlingTitle } from "../../../surcharge/surcharges_page/surcharge/sea-conteneraized-cargo-styles";
import makeStyles from "@material-ui/core/styles/makeStyles";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import { currency } from "../../../../../../_BLL/helpers/surcharge_helpers_methods&arrays";
import SurchargeRateSelect from "../../../../../components/_commonComponents/select/SurchargeRateSelect";
import { Field } from "../../../../../components/_commonComponents/Input/input-styles";
import DatesCells from "../../register_new_freight_rate/tables/DatesCells";
import {RateInfoType} from "../../../../../../_BLL/types/rates&surcharges/ratesTypes";

const useStyles = makeStyles({
  container: {
    boxShadow: "none",
    height: "420px",
    overflowY: "scroll",
  },
  table: {
    "& .MuiTableHead-root": {},
  },
  cell: {
    color: "#115B86",
    fontFamily: "Helvetica Bold",
    fontSize: "16px",
    borderBottom: "1px solid #115B86",
    padding: "16px 0",
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
  is_active: boolean,
  rate: RateInfoType | null,
  id: number,
  handleSubmit: any,
  errors: any,
  setValue: any,
  control: any,
  getValues: any,
  activateRateHandler: (id: any, value: boolean) => void
}

const Rate:React.FC<PropsType> = ({is_active, rate, id, handleSubmit, errors, setValue, control, getValues, activateRateHandler}) => {
  const [formMode, setFormMode] = useState(false);

  const classes = useStyles();

  useEffect(() => {
    if(rate) {
      rate.rates.map((r: any) => {
        setValue(`rates.${r.id}.rate`)
        setValue(`rates.${r.id}.from`, r.start_date)
        setValue(`rates.${r.id}.to`, r.expiration_date)
      })
    }
  }, [rate, setValue])



  return (
    <RateContainer>
      <Wrap>
        <RateTitle>Freight Rate</RateTitle>
        <ButtonsWrap>
          {formMode && <SaveButton type="submit">SAVE CHANGES</SaveButton>}
          <PauseButton type='button' onClick={() => activateRateHandler(rate?.id, !rate?.is_active)}>
            <PauseImg src={is_active ? pause : play} alt="" />
          </PauseButton>
        </ButtonsWrap>
      </Wrap>
      {rate && (
        <>
          <InfoWrap>
            <ShippingMode>
              <img
                src={rate?.shipping_type === "sea" ? ship : plane}
                alt="picture"
              />
            </ShippingMode>
            <FieldsWrap>
              <FieldOuter>
                <Label>Route</Label>
                <RouteName>{rate?.origin.code}</RouteName>
                <RouteName>{rate?.destination.code}</RouteName>
              </FieldOuter>
            </FieldsWrap>
            <FieldsWrap>
              <FieldOuter>
                <Label>Carrier</Label>
                <Controller
                  name="carrier"
                  control={control}
                  defaultValue={rate?.carrier.id}
                  as={<Content>{rate?.carrier.title}</Content>}
                />
              </FieldOuter>
              <FieldOuter>
                <Label>Shipping mode</Label>
                <Controller
                  name="shipping_mode"
                  control={control}
                  defaultValue={rate?.shipping_mode.id}
                  as={<Content>{rate?.shipping_mode.title}</Content>}
                />
              </FieldOuter>
            </FieldsWrap>
            <FieldsWrap>
              <FieldOuter>
                <Label>Status</Label>
                <Controller
                  name="carrier"
                  control={control}
                  defaultValue={rate?.is_active}
                  as={
                    <Content>{rate?.is_active ? "ACTIVE" : "INACTIVE"}</Content>
                  }
                />
              </FieldOuter>
              <FieldOuter>
                <Label>Transit time</Label>
                <Controller
                  name="shipping_mode"
                  control={control}
                  defaultValue={rate?.transit_time}
                  as={<Content>{`${rate?.transit_time} days`}</Content>}
                />
              </FieldOuter>
            </FieldsWrap>
          </InfoWrap>
          {rate.rates?.length > 0 && (
            <div style={{width: '100%'}}>
              <HandlingTitle>RATES</HandlingTitle>
              <TableContainer className={classes.container} component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      {rate?.shipping_mode.id === 2 ||
                        (rate?.shipping_mode.id === 3 && (
                          <TableCell className={classes.cell}>
                            CONTAINER TYPE
                          </TableCell>
                        ))}
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
                      <TableCell className={classes.cell} align="left">
                        UPDATE BY
                      </TableCell>
                      <TableCell className={classes.cell} align="left">
                        ON
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rate.rates.map((r: any) => (
                      <TableRow key={r.id}>
                        {rate.shipping_mode.id === 2 ||
                          (rate.shipping_mode.id === 3 && (
                            <Controller
                              control={control}
                              defaultValue={r.id}
                              name={`rates.${r.id}.container_type`}
                              as={
                                <TableCell
                                  className={classes.innerCell}
                                  component="th"
                                  scope="row"
                                >
                                  {r.container_type.code}
                                </TableCell>
                              }
                            />
                          ))}
                        <TableCell className={classes.innerCell} align="left">
                          <Controller
                            control={control}
                            name={`rates.${r.id}.currency`}
                            defaultValue={r.currency.id}
                            as={
                              <SurchargeRateSelect
                                options={currency}
                                maxW="70px"
                              />
                            }
                          />
                        </TableCell>
                        <TableCell className={classes.innerCell} align="left">
                          <Controller
                            control={control}
                            name={`rates.${r.id}.rate`}
                            defaultValue={r.rate}
                            as={
                              <Field placeholder="0.00$"
                                     maxW="100px"
                                     type='number'
                              />
                            }
                          />
                        </TableCell>
                        <DatesCells
                            currentDates={{from: r.start_date, to: r.expiration_date}}
                            setValue={setValue}
                            control={control}
                            id={r.id}
                            //reservedDates={reservedDates}
                            errors={errors}
                            classes={classes}
                            getValues={getValues}
                            getSurchargeToRateHandle={() => {}}
                        />
                        <Controller
                          control={control}
                          defaultValue={r.updated_by}
                          name={`rates.${r.container_type?.id}.updated_by`}
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
                          name={`rates.${r.container_type?.id}.date_updated`}
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
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          )}
        </>
      )}
    </RateContainer>
  );
};

export default Rate;
