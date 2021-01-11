import React, { useEffect, useState } from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import styled from "styled-components";
import { TrackingBackendType } from "../../../../../../../../_BLL/types/operations/operationsTypes";
import IconLocation from "../../../../../../../assets/icons/location_blue.svg";
import { Controller, useForm } from "react-hook-form";
import SurchargeRateSelect from "../../../../../../../components/_commonComponents/select/SurchargeRateSelect";
import { FormOperationButton } from "../../../../../../Requests/Booking_agent/booking_card/booking-card-style";
import close_icon from "../../../../../../../assets/icons/profile/closeForm.svg";
import save_icon from "../../../../../../../assets/icons/profile/add.svg";
import { userCompaniesType } from "../../../../../../../../_BLL/types/authTypes";
import { AppCompaniesTypes } from "../../../../../../../../_BLL/types/commonTypes";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteTrackingStatus,
  getManualTrackingStatusOptions,
  updateShipmentInfo,
} from "../../../../../../../../_BLL/thunks/operations/agent/OperationsAgentThunk";
import { getTrackingStatusOptions } from "../../../../../../../../_BLL/selectors/operations/agentOperationsSelector";
import moment from "moment";
import { agentOperationsActions } from "../../../../../../../../_BLL/reducers/operations/agent/agentOperationsReducer";
import { AppStateType } from "../../../../../../../../_BLL/store";
import Garbage from "../../../../../../../assets/icons/garbage-icon.svg";
import BaseTooltip from "../../../../../../../components/_commonComponents/baseTooltip/BaseTooltip";
import FormField from "../../../../../../../components/_commonComponents/Input/FormField";

const useStyles = makeStyles({
  container: {
    boxShadow: "none",
  },
  row: {},
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
    borderTop: "none",
    borderBottom: "1px solid #115B86",
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
    borderBottom: "1px solid #ECECEC",
    fontFamily: "Helvetica Light",
    fontSize: "16px",
    color: "#1B1B25",
    padding: "15px 30px 10px 0",
    verticalAlign: "top",
  },
  innerStatusCell: {
    borderBottom: "1px solid #ECECEC",
    fontFamily: "Helvetica Light",
    fontSize: "16px",
    color: "#1B1B25",
    padding: "15px 30px 10px 0",
    width: "30%",
    verticalAlign: "bottom",
  },
  innerCommentCell: {
    borderBottom: "1px solid #ECECEC",
    fontFamily: "Helvetica Light",
    fontSize: "16px",
    color: "#1B1B25",
    padding: "15px 30px 10px 0",
    width: "50%",
    verticalAlign: "bottom",
  },
  buttonCell: {
    borderBottom: "1px solid #ECECEC",
    fontFamily: "Helvetica Light",
    fontSize: "16px",
    color: "#1B1B25",
    width: "70px",
    padding: "0",
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

let columns = [
  { name: "" },
  { name: "STATUS" },
  { name: "COMMENTS" },
  { name: "" },
];

type PropsType = {
  company_type: userCompaniesType | undefined;
  shipping_mode_id: number;
  direction: string;
  booking_id: number;
  tracking: TrackingBackendType[];
};

const ManualTracking: React.FC<PropsType> = ({
  company_type,
  shipping_mode_id,
  direction,
  booking_id,
  tracking,
}) => {
  const classes = useStyles();
  const { handleSubmit, errors, control, reset, register } = useForm({
    reValidateMode: "onBlur",
  });

  const [dateTime, setDateTime] = useState(new Date());
  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(getManualTrackingStatusOptions(shipping_mode_id, direction));
  }, []);

  useEffect(() => {
    const id = setInterval(() => setDateTime(new Date()), 1000);
    return () => {
      clearInterval(id);
    };
  }, []);

  useEffect(() => {
    dispatch(agentOperationsActions.saveTrackingToStore(tracking));
  }, []);

  const statusOptions = useSelector(getTrackingStatusOptions);

  const manual_tracking = useSelector(
    (state: AppStateType) => state.agent_operations.tracking_data
  );

  const onSubmit = (values: any) => {
    const data = { ...values, booking: booking_id };
    dispatch(updateShipmentInfo(data, reset));
  };

  return (
    <Wrap onSubmit={handleSubmit(onSubmit)}>
      <Notification>
        <img src={IconLocation} alt="" style={{ marginRight: "7px" }} />
        {company_type?.type === AppCompaniesTypes.AGENT
          ? "Automatic statuses for this shipment are not available, please keep the client up to date with the shipment milestones below."
          : "Automatic statuses for this shipment are not available, agent updates shipment milestones manually."}
      </Notification>
      <TableWrapper>
        <TableContainer className={classes.container} component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                {columns.map((s, idx) => (
                  <TableCell key={idx} className={classes.cell} align="left">
                    {s.name}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {company_type?.type === AppCompaniesTypes.AGENT && (
                <TableRow className={classes.row}>
                  <TableCell className={classes.innerCell} align="left" />
                  <TableCell className={classes.innerStatusCell} align="left">
                    <Controller
                      control={control}
                      name={`status`}
                      defaultValue=""
                      rules={{
                        required: "Field is required",
                      }}
                      as={
                        <SurchargeRateSelect
                          placeholder={"Select status"}
                          options={statusOptions}
                          maxW="260px"
                          error={errors?.status?.message}
                        />
                      }
                    />
                  </TableCell>
                  <TableCell className={classes.innerCommentCell} align="left">
                    <FormField
                      inputRef={register({
                        required: "Field is required",
                      })}
                      placeholder="Add comment..."
                      name="comment"
                      error={errors?.comment}
                      maxW={"100%"}
                    />
                  </TableCell>
                  <TableCell className={classes.buttonCell} align="left">
                    <FormOperationButton
                      type="button"
                      onClick={() => {
                        reset();
                      }}
                      style={{ padding: "5px" }}
                    >
                      <img src={close_icon} alt="" />
                    </FormOperationButton>
                    <BaseTooltip title="After confirmation the tracking updates will be sent to the client.">
                      <FormOperationButton
                        type="submit"
                        style={{ padding: "5px" }}
                      >
                        <img src={save_icon} alt="" />
                      </FormOperationButton>
                    </BaseTooltip>
                  </TableCell>
                </TableRow>
              )}

              {manual_tracking.map((row) => (
                <TableRow key={row.id}>
                  <TableCell
                    valign={"top"}
                    className={classes.innerCell}
                    align="left"
                  >
                    {moment(row.date_created).format("DD/MM")}
                    <span
                      style={{
                        marginLeft: "15px",
                        fontFamily: "Helvetica Reg, sans-serif",
                      }}
                    >
                      {moment(row.date_created).format("HH:MM")}
                    </span>
                  </TableCell>
                  <TableCell
                    valign={"top"}
                    className={classes.innerCell}
                    align="left"
                  >
                    <div style={{ fontFamily: "Helvetica Reg, sans-serif" }}>
                      {row.status}
                    </div>
                  </TableCell>
                  <TableCell
                    valign={"top"}
                    className={classes.innerCell}
                    align="left"
                  >
                    <div style={{ display: "flex" }}>
                      <div style={{ whiteSpace: "nowrap", marginRight: "5px" }}>
                        {row.created_by && `${row.created_by}:`}
                      </div>
                      <div style={{ fontStyle: "italic" }}> {row.comment}</div>
                    </div>
                  </TableCell>
                  <TableCell
                    valign={"top"}
                    className={classes.innerCell}
                    align="right"
                  >
                    {moment
                      .utc(dateTime)
                      .diff(moment.utc(row.date_created), "seconds") <= 300 && (
                      <img
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          dispatch(deleteTrackingStatus(row.id));
                        }}
                        src={Garbage}
                        alt={""}
                      />
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </TableWrapper>
    </Wrap>
  );
};

export default ManualTracking;

const TableWrapper = styled.div`
  max-height: 350px;
  overflow: auto;
`;

const Notification = styled.div`
  background: #3b3b41;
  opacity: 0.9;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  padding: 8px 10px;
  font-family: "Helvetica Neue", sans-serif;
  font-size: 16px;
  letter-spacing: 0.209px;
  color: #00c5ff;
  align-self: flex-start;
`;

const Wrap = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;
