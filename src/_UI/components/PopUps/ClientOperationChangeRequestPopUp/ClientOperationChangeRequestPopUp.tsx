import React, { useState } from "react";
import {
  CloseBtn,
  PopupContainer,
  PopupContent,
  Heading,
  HeadingText,
  HeadingWrap,
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
  const [dates, setDates] = useState([]);
  const classes = useStyles();
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
        <SectionWrapper>
          <SectionTitle>Documents</SectionTitle>
          <div style={{ display: "flex" }}>
            <InfoRow margin_right="25px">
              <InfoRowLabel>Release type</InfoRowLabel>
              <SurchargeRateSelect
                options={[{ id: 1, title: 123 }]}
                // error={errors?.release_type?.message}
                placeholder="Release type"
              />
            </InfoRow>
            <InfoRow>
              <InfoRowLabel>NUMBER OF DOCUMENTS</InfoRowLabel>
              <div style={{ paddingTop: "8px" }}>
                <FormField
                  // inputRef={register({
                  //   required: "Field is required",
                  // })}
                  placeholder="No. of Documents"
                  name="number_of_documents"
                  // getValues={getValues}
                  defaultValue={1}
                  // error={errors?.number_of_documents}
                />
              </div>
            </InfoRow>
          </div>
        </SectionWrapper>
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
                      NO. OF PACKS
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
                          {c.volume}
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
                          {c.total_wm}
                        </TableCell>
                        <TableCell className={classes.innerCell} align="left">
                          {c.volume}
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
      </PopupContent>
    </PopupContainer>
  );
};

export default ClientOperationChangeRequestPopUp;
