import React, {useEffect, useState} from "react";
//moment js
import moment from "moment";
//material ui
import makeStyles from "@material-ui/core/styles/makeStyles";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
//react-hook-form
import {Controller, useForm} from "react-hook-form";
//react-redux
import {useDispatch, useSelector} from "react-redux";
//BLL
import {AppStateType} from "../../../../../../../../_BLL/store";
import {
    deleteTrackingStatus,
    getManualTrackingStatusOptions,
    updateShipmentInfo,
} from "../../../../../../../../_BLL/thunks/operations/agent/OperationsAgentThunk";
import {
    getTrackingStatusOptions
} from "../../../../../../../../_BLL/selectors/operations/agentOperationsSelector";
import {agentOperationsActions} from "../../../../../../../../_BLL/reducers/operations/agent/agentOperationsReducer";
//types
import {TrackingBackendType} from "../../../../../../../../_BLL/types/operations/operationsTypes";
import {userCompaniesType} from "../../../../../../../../_BLL/types/authTypes";
import {AppCompaniesTypes} from "../../../../../../../../_BLL/types/commonTypes";
//components
import SurchargeRateSelect from "../../../../../../../components/_commonComponents/select/SurchargeRateSelect";
import BaseTooltip from "../../../../../../../components/_commonComponents/baseTooltip/BaseTooltip";
import FormField from "../../../../../../../components/_commonComponents/Input/FormField";
import ManualTrackingCalendarChoice from "../shipments_tracking_block/ManualTrackingCalendarChoice";
//styles
import {FormOperationButton} from "../../../../../../Requests/Booking_agent/booking_card/booking-card-style";
//icons
import IconLocation from "../../../../../../../assets/icons/location_blue.svg";
import close_icon from "../../../../../../../assets/icons/profile/closeForm.svg";
import save_icon from "../../../../../../../assets/icons/profile/add.svg";
import Garbage from "../../../../../../../assets/icons/garbage-icon.svg";
//styled components
import styled from "styled-components";


const useStyles = makeStyles({
    container: {
        boxShadow: "none",
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
    {name: ""},
    {name: "STATUS"},
    {name: "COMMENTS"},
    {name: ""},
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


    //local state
    const [dateTime, setDateTime] = useState(new Date());


    //hooks
    const classes = useStyles();
    let dispatch = useDispatch();


    useEffect(() => {
        const id = setInterval(() => setDateTime(new Date()), 1000);
        return () => {
            clearInterval(id);
        };
    }, []);

    useEffect(() => {
        dispatch(agentOperationsActions.saveTrackingToStore(tracking));
    }, []);


    //data from store
    const statusOptions = useSelector(getTrackingStatusOptions);
    const manual_tracking = useSelector(
        (state: AppStateType) => state.agent_operations.tracking_data
    );


    let actual_departure_status = manual_tracking?.find(m => m?.status === 'Vessel Departed' || m?.status === 'Aircraft Departed')

    useEffect(() => {
        if(actual_departure_status) {
            dispatch(getManualTrackingStatusOptions(shipping_mode_id, direction, true));
        }
    }, [actual_departure_status]);


    //react hook form
    const {handleSubmit, errors, control, reset, register, watch, setValue} = useForm({
        reValidateMode: "onBlur",
    });

    //local state
    const calendar_statuses = ['Vessel Departed', 'Vessel Arrived at Destination', 'Aircraft Departed', 'Cargo Arrived at Destination']
    let status = watch('status')
    let departed = statusOptions.find(s => s.id === status)
    let finded_status = departed && calendar_statuses.some(c => c === departed?.title)


    //onSubmit
    const onSubmit = (values: any) => {
        const data = {...values, booking: booking_id};
        if(!finded_status) {
            dispatch(updateShipmentInfo(data));
        } else {
            let ATD = {
                status: values.status,
                actual_date_of_departure: moment(values.date).format('DD/MM/YYYY') + ' ' + values.time,
                booking: booking_id,
                comment: `At ${moment(values.date).format('DD/MM/YYYY') + ' ' + values.time}`
            }
            let ATA = {
                status: values.status,
                actual_date_of_arrival: moment(values.date).format('DD/MM/YYYY') + ' ' + values.time,
                booking: booking_id,
                comment: `At ${moment(values.date).format('DD/MM/YYYY') + ' ' + values.time}`
            }
            if(departed?.title === 'Vessel Departed' || departed?.title === 'Aircraft Departed') {
                dispatch(updateShipmentInfo(ATD));
            }
            if(departed?.title === 'Cargo Arrived at Destination' || departed?.title === 'Vessel Arrived at Destination') {
                dispatch(updateShipmentInfo(ATA));
            }
        }
    };


    return (
        <Wrap onSubmit={handleSubmit(onSubmit)}>
            <Notification>
                <img src={IconLocation} alt="" style={{marginRight: "7px"}}/>
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
                                <TableRow>
                                    <TableCell className={classes.innerCell} align="left"/>
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
                                                    max_width="260px"
                                                    error={errors?.status?.message}
                                                />
                                            }
                                        />
                                    </TableCell>
                                    <TableCell className={classes.innerCommentCell} align="left">
                                        {!finded_status
                                            ? <FormField
                                                inputRef={register({
                                                    required: "Field is required",
                                                })}
                                                placeholder="Add comment..."
                                                name="comment"
                                                error={errors?.comment}
                                                max_width={"100%"}
                                            />
                                            : <ManualTrackingCalendarChoice control={control}
                                                                            date_name_first='date'
                                                                            time_name_first='time'
                                                                            setValue={setValue}
                                                                            errors={{
                                                                                from: errors.date,
                                                                                departure_time: errors.time
                                                                            }}
                                                                            required_dates={false}
                                                                            label1=''
                                                                            justify_content='flex-start'
                                            />
                                        }

                                    </TableCell>
                                    <TableCell className={classes.buttonCell} align="left">
                                        <FormOperationButton
                                            type="button"
                                            onClick={() => {
                                                reset();
                                            }}
                                            style={{padding: "5px"}}
                                        >
                                            <img src={close_icon} alt=""/>
                                        </FormOperationButton>
                                        <BaseTooltip
                                            title="After confirmation the tracking updates will be sent to the client.">
                                            <FormOperationButton
                                                type="submit"
                                                style={{padding: "5px"}}
                                            >
                                                <img src={save_icon} alt=""/>
                                            </FormOperationButton>
                                        </BaseTooltip>
                                    </TableCell>
                                </TableRow>
                            )}

                            {manual_tracking.map((row) => (
                                <TableRow key={row?.id}>
                                    <TableCell
                                        valign={"top"}
                                        className={classes.innerCell}
                                        align="left"
                                    >
                                        {moment(row?.date_created).format("DD/MM")}
                                        <span
                                            style={{
                                                marginLeft: "15px",
                                                fontFamily: "Helvetica Reg, sans-serif",
                                            }}
                                        >
                      {moment(row?.date_created).format("HH:MM")}
                    </span>
                                    </TableCell>
                                    <TableCell
                                        valign={"top"}
                                        className={classes.innerCell}
                                        align="left"
                                    >
                                        <div style={{fontFamily: "Helvetica Reg, sans-serif"}}>
                                            {row?.status}
                                        </div>
                                    </TableCell>
                                    <TableCell
                                        valign={"top"}
                                        className={classes.innerCell}
                                        align="left"
                                    >
                                        <div style={{display: "flex"}}>
                                            <div style={{whiteSpace: "nowrap", marginRight: "5px"}}>
                                                {row?.created_by && `${row?.created_by}:`}
                                            </div>
                                            <div style={{fontStyle: "italic", fontFamily: 'Helvetica Light', fontSize: '15px'}}>
                                                {row?.comment}
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell
                                        valign={"top"}
                                        className={classes.innerCell}
                                        align="right"
                                    >
                                        {moment
                                            .utc(dateTime)
                                            .diff(moment.utc(row?.date_created), "seconds") <= 300 && (
                                            <img
                                                style={{cursor: "pointer"}}
                                                onClick={() => {
                                                    dispatch(deleteTrackingStatus(row?.id));
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
   position: relative;
`;
