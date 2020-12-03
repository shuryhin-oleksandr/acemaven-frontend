import React, { useEffect, useState } from "react";
import {
  CloseBtn,
  PopupContainer,
  PopupContent,
  Heading,
  HeadingText,
  HeadingWrap,
  ShippingModeText,
  ButtonsWrap,
  ConfirmButton,
  CancelButton,
} from "./change-request-styles";
import close from "../../../../_UI/assets/icons/close-icon.svg";
import {
  SectionTitle,
  SectionWrapper,
} from "../../../Pages/operations/agent/ExactOperationContainer/OperationCard/operation-card-style";
import {
  CalendarIcon,
  GeneralBookingContent,
  InfoRow,
  InfoRowLabel,
  InfoRowValue,
  RejectButton,
} from "../../../Pages/Requests/Booking_agent/booking_card/booking-card-style";
import SurchargeRateSelect from "../../_commonComponents/select/SurchargeRateSelect";
import FormField from "../../_commonComponents/Input/FormField";
import calendar_icon from "../../../assets/icons/date_1.svg";
import Dates from "../../../Pages/dashboard/Dates";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import { OperationType } from "../../../../_BLL/types/operations/operationsTypes";
import moment from "moment";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { AppStateType } from "../../../../_BLL/store";
import { getReleaseTypeChoices } from "../../../../_BLL/thunks/booking_client_thunk/bookingClientThunk";
import { editOperationByClientThunk } from "../../../../_BLL/thunks/operations/client/OperationsClientThunk";
import { AddImg } from "../../../Pages/dashboard/Widgets/SearchWidget/searchWidgett-styles";
import AddIcon from "../../../assets/icons/widgets/add-icon.svg";
import BaseTooltip from "../../_commonComponents/baseTooltip/BaseTooltip";

const useStyles = makeStyles({
  container: {
    boxShadow: "none",
  },
  table: {
    "& .MuiTableHead-root": {},
  },
  row: {
    "&:hover": {
      cursor: "pointer",
    },
  },
  shipping_cell: {
    color: "#115B86",
    fontFamily: "Helvetica Bold",
    fontSize: "16px",
    borderBottom: "1px solid #115B86",
    padding: "0",
    paddingBottom: "15px",
  },
  cell: {
    color: "#115B86",
    fontFamily: "Helvetica Bold",
    fontSize: "16px",
    borderBottom: "none",
    padding: "0",
    paddingTop: "15px",
    paddingRight: "30px",
  },
  innerMainCell: {
    borderBottom: "1px solid #ECECEC",
    fontFamily: "Helvetica Light",
    fontSize: "16px",
    color: "#1B1B25",
    position: "relative",
    paddingRight: "40px",
    height: "72px",
    width: "50px",
  },
  innerCell: {
    borderBottom: "none",
    fontFamily: "Helvetica Light",
    fontSize: "16px",
    color: "#1B1B25",
    padding: "0",
    paddingRight: "30px",
  },

  customTooltip: {
    maxWidth: 330,
    height: 60,
    fontFamily: "Helvetica Reg",
    fontSize: "14px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "15px",
  },
});

type PropsTypes = {
  setIsOpen: (value: boolean) => void;
  operation_info: OperationType;
};

const ClientOperationChangeRequestPopUp: React.FC<PropsTypes> = ({
  setIsOpen,
  operation_info,
}) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [dates, setDates] = useState([]);

  useEffect(() => {
    dispatch(getReleaseTypeChoices());
  }, []);

  console.log("operation_info", operation_info);

  //refactoring dates
  let a =
    dates.length > 0
      ? moment(dates[0], "DD/MM/YYYY").toDate()
      : moment(operation_info?.date_from, "DD/MM/YYYY").toDate();
  let date_from = moment(a).format("DD/MM");
  let c =
    dates.length > 0
      ? moment(dates[1], "DD/MM/YYYY").toDate()
      : moment(operation_info?.date_from, "DD/MM/YYYY").toDate();
  let date_to = moment(c).format("DD/MM");

  let release_type_choices = useSelector(
    (state: AppStateType) => state.booking.release_type_choices
  );

  const {
    handleSubmit,
    register,
    control,
    reset,
    errors,
    getValues,
    setValue,
    watch,
  } = useForm({
    defaultValues: {},
  });

  const onSubmit = (values: any) => {
    console.log(values);
    let new_groups = operation_info.cargo_groups.map((c, index) => ({
      ...c,
      volume: values.volume[0],
      container_type: c.container_type?.id,
      packaging_type: c.packaging_type?.id,
    }));

    let patchObj = {
      aceid: operation_info.aceid,
      cargo_groups: new_groups,
      date_from: moment(dates[0]).format("DD/MM/YYYY"),
      date_to: moment(dates[1]).format("DD/MM/YYYY"),
      payment_due_by: operation_info.payment_due_by,
      release_type: values.release_type,
      number_of_documents: values.number_of_documents,
      freight_rate: operation_info.freight_rate.id,
      shipper: operation_info.shipper?.id,
      original_booking: operation_info.id,
    };

    console.log("patchObj", patchObj);
    dispatch(editOperationByClientThunk(patchObj));
    setIsOpen(false);
  };

  return (
    <PopupContainer>
      <PopupContent>
        <CloseBtn onClick={() => setIsOpen(false)}>
          <img src={close} alt="" />
        </CloseBtn>
        <HeadingWrap>
          <Heading>Requesting changes</Heading>
          <HeadingText>
            This action should recalculate the charges shown in the operation
            based on the new changes.
          </HeadingText>
        </HeadingWrap>
        <form onSubmit={handleSubmit(onSubmit)}>
          {operation_info.release_type && (
            <SectionWrapper>
              <SectionTitle>Documents</SectionTitle>
              <div style={{ display: "flex" }}>
                <InfoRow margin_right="25px">
                  <InfoRowLabel>RELEASE TYPE</InfoRowLabel>
                  <Controller
                    name="release_type"
                    control={control}
                    defaultValue={operation_info.release_type}
                    as={
                      <SurchargeRateSelect
                        options={release_type_choices}
                        placeholder="Release type"
                      />
                    }
                  />
                </InfoRow>
                <InfoRow>
                  <InfoRowLabel>NUMBER OF DOCUMENTS</InfoRowLabel>
                  <div style={{ paddingTop: "9px" }}>
                    <FormField
                      inputRef={register}
                      placeholder="No. of Documents"
                      name="number_of_documents"
                      getValues={getValues}
                      defaultValue={operation_info.number_of_documents}
                      // error={errors?.number_of_documents}
                    />
                  </div>
                </InfoRow>
              </div>
            </SectionWrapper>
          )}
          <SectionWrapper>
            <SectionTitle>DATES</SectionTitle>
            <GeneralBookingContent>
              <div style={{ display: "flex" }}>
                <CalendarIcon style={{ width: "87px", height: "96px" }}>
                  <img src={calendar_icon} alt="" />
                </CalendarIcon>
                <InfoRow margin_right="50px" margin_bottom="0px">
                  <InfoRowLabel>SHIPMENT DATE</InfoRowLabel>
                  <div style={{ marginBottom: "7px" }}>
                    <Dates
                      setDates={setDates}
                      // extraDateNumber={}
                      extraDateNumber={"sea" === "sea" ? 9 : 2}
                      dates={dates}
                      disabled={false}
                      placeholder={`Week ${operation_info.week_range?.week_from} - Week ${operation_info.week_range?.week_to}`}
                      width={"auto"}
                    />
                  </div>
                  <InfoRowValue>
                    {date_from} - {date_to}
                  </InfoRowValue>
                </InfoRow>
              </div>
            </GeneralBookingContent>
          </SectionWrapper>
          <SectionWrapper>
            <SectionTitle>CARGO</SectionTitle>
            <ShippingModeText>
              {operation_info.freight_rate.shipping_mode.title}
            </ShippingModeText>
            <TableContainer className={classes.container} component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  {operation_info.cargo_groups &&
                  operation_info.cargo_groups[0]?.container_type ? (
                    <TableRow>
                      <TableCell className={classes.cell} align="left">
                        VOLUME
                      </TableCell>
                      <TableCell className={classes.cell} align="left">
                        CONTAINER_TYPE
                      </TableCell>
                      <TableCell className={classes.cell} align="left">
                        CARGO DESCRIPTIONS
                      </TableCell>
                    </TableRow>
                  ) : (
                    <TableRow>
                      <TableCell className={classes.cell} align="left">
                        VOLUME
                      </TableCell>
                      <TableCell className={classes.cell} align="left">
                        PACKAGING TYPE
                      </TableCell>
                      <TableCell className={classes.cell} align="left">
                        HEIGHT
                      </TableCell>
                      <TableCell className={classes.cell} align="left">
                        WIDTH
                      </TableCell>
                      <TableCell className={classes.cell} align="left">
                        LENGTH
                      </TableCell>
                      <TableCell className={classes.cell} align="left">
                        WEIGHT
                      </TableCell>
                      <TableCell className={classes.cell} align="left">
                        CARGO DESCRIPTIONS
                      </TableCell>
                    </TableRow>
                  )}
                </TableHead>
                <TableBody>
                  {operation_info.cargo_groups?.map((c, index) => (
                    <TableRow key={index} className={classes.row}>
                      {c.container_type ? (
                        <>
                          <TableCell className={classes.innerCell} align="left">
                            <FormField
                              inputRef={register}
                              name={`volume.${index}`}
                              getValues={getValues}
                              defaultValue={c.volume}
                              maxW={"100px"}
                            />
                          </TableCell>
                          <TableCell className={classes.innerCell} align="left">
                            {c.container_type?.code}
                          </TableCell>
                          <TableCell className={classes.innerCell} align="left">
                            {c.description}
                          </TableCell>
                        </>
                      ) : (
                        <>
                          <TableCell className={classes.innerCell} align="left">
                            <FormField
                              inputRef={register}
                              name={`volume.${index}`}
                              getValues={getValues}
                              defaultValue={c.volume}
                              maxW={"100px"}
                            />
                          </TableCell>
                          <TableCell className={classes.innerCell} align="left">
                            {c.packaging_type?.description}
                          </TableCell>
                          <TableCell className={classes.innerCell} align="left">
                            {c.height}
                          </TableCell>
                          <TableCell className={classes.innerCell} align="left">
                            {c.width}
                          </TableCell>
                          <TableCell className={classes.innerCell} align="left">
                            {c.length}
                          </TableCell>
                          <TableCell className={classes.innerCell} align="left">
                            {c.weight}
                          </TableCell>
                          <TableCell className={classes.innerCell} align="left">
                            {c.description}
                          </TableCell>
                        </>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </SectionWrapper>
          {operation_info.freight_rate.shipping_mode.id !== 3 && (
            <div style={{ marginTop: "15px" }}>
              <AddImg onClick={() => alert("123")} src={AddIcon} alt="add" />
            </div>
          )}
          <ButtonsWrap>
            <ConfirmButton type="submit">REQUEST</ConfirmButton>
            <CancelButton onClick={() => setIsOpen(false)}>CANCEL</CancelButton>
          </ButtonsWrap>
        </form>
      </PopupContent>
    </PopupContainer>
  );
};

export default ClientOperationChangeRequestPopUp;
