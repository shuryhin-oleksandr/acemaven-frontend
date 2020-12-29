import React, { useEffect } from "react";
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
import { Field } from "../../../../../../../components/_commonComponents/Input/input-styles";
import { FormOperationButton } from "../../../../../../Requests/Booking_agent/booking_card/booking-card-style";
import close_icon from "../../../../../../../assets/icons/profile/closeForm.svg";
import save_icon from "../../../../../../../assets/icons/profile/add.svg";
import { userCompaniesType } from "../../../../../../../../_BLL/types/authTypes";
import { AppCompaniesTypes } from "../../../../../../../../_BLL/types/commonTypes";
import { useDispatch, useSelector } from "react-redux";
import { getManualTrackingStatusOptions } from "../../../../../../../../_BLL/thunks/operations/agent/OperationsAgentThunk";
import { getTrackingStatusOptions } from "../../../../../../../../_BLL/selectors/operations/agentOperationsSelector";

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
  },
  innerCommentCell: {
    borderBottom: "1px solid #ECECEC",
    fontFamily: "Helvetica Light",
    fontSize: "16px",
    color: "#1B1B25",
    padding: "15px 30px 10px 0",
    width: "50%",
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

type PropsType = {
  // tracking: TrackingBackendType[];
  company_type: userCompaniesType | undefined;
  shipping_mode_id:number;
  direction: string;
};

const data = [
  {
    date: "29/10",
    status: "Vessel Arrived in Transshipment Port ",
    comment:
        "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. ",
    user: "Cameron Williamson",
  },
  {
    date: "29/10",
    status: "Vessel Arrived in Transshipment Port ",
    comment:
        "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. ",
    user: "Cameron Williamson",
  },
];

let columns = [
  { name: "" },
  { name: "STATUS" },
  { name: "COMMENTS" },
  { name: "" },
];

const ManualTracking: React.FC<PropsType> = ({ company_type,shipping_mode_id,direction }) => {
  const classes = useStyles();
  const { handleSubmit, errors, setValue, control, getValues, reset } = useForm(
    {
      reValidateMode: "onBlur",
    }
  );

  const onSubmit = (values: any) => {
    console.log("values", values);
  };



  // const rows = tracking[0].data.data.containers.map((c:any)=>({...c, events: c.events.map((ce:any)=>({...ce}))}));

  let dispatch = useDispatch();

  useEffect(() => {
    console.log("useffect");
    dispatch(getManualTrackingStatusOptions(shipping_mode_id, direction));
  }, []);

  const statusOptions = useSelector(getTrackingStatusOptions);

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
                {columns.map((s) => (
                  <TableCell className={classes.cell} align="left">
                    {s.name}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow className={classes.row}>
                <TableCell className={classes.innerCell} align="left" />
                <TableCell className={classes.innerStatusCell} align="left">
                  <Controller
                    control={control}
                    name={`status`}
                    defaultValue=""
                    as={
                      <SurchargeRateSelect
                        placeholder={"Select status"}
                        options={statusOptions}
                        maxW="260px"
                      />
                    }
                  />
                </TableCell>
                <TableCell className={classes.innerCommentCell} align="left">
                  <Controller
                    control={control}
                    name={`comment`}
                    defaultValue={""}
                    as={<Field placeholder="Add comment..." maxW="100%" />}
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
                  <FormOperationButton type="submit" style={{ padding: "5px" }}>
                    <img src={save_icon} alt="" />
                  </FormOperationButton>
                </TableCell>
              </TableRow>
              {data.map((row, idx) => (
                <TableRow key={idx}>
                  <TableCell
                    valign={"top"}
                    className={classes.innerCell}
                    align="left"
                  >
                    {row.date}
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
                        {row.user}:
                      </div>
                      <div style={{ fontStyle: "italic" }}> {row.comment}</div>
                    </div>
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
