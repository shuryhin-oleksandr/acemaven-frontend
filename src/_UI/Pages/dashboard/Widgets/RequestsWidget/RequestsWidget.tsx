import React, {useEffect} from "react";
//react-redux
import {useDispatch, useSelector} from "react-redux";
//react-router-dom
import {useHistory} from "react-router-dom";
//material ui
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
//BLL
import {getBookingRequestListThunk} from "../../../../../_BLL/thunks/booking_agent_thunk/bookingAgentThunk";
import {getBookingRequestListSelector} from "../../../../../_BLL/selectors/booking/bookingAgentSelector";
//helpers
import {getTwoLastElementsHelper} from "../../../../../_BLL/helpers/widgets/getTwoLastElementsHelper";
//types
import {ShippingTypesEnum} from "../../../../../_BLL/types/rates&surcharges/newSurchargesTypes";
//components
import BaseWidget from "../BaseWidgetContainer/BaseWidgetContainer";
//styles
import {useStyles} from "../WidgetTableStyles";
//icons
import ShipIcon from "../../../../assets/icons/widgets/widget-ship-icon.svg";
import PlaneIcon from "../../../../assets/icons/widgets/widget-plane-icon.svg";




const RequestWidget: React.FC = () => {
    //hooks
    const dispatch = useDispatch()
    const classes = useStyles();
    const history = useHistory()

    //data from store
    let requests = useSelector(getBookingRequestListSelector)


    //hooks
    useEffect(() => {
        dispatch(getBookingRequestListThunk('', '', '', ''))
    }, [])

    //local state (get last 2 elements from an array)
    let latest_list = getTwoLastElementsHelper(requests)
    const goToPage = (id: number) => {
        history.push(`/requests/booking/${id}`)
    }

    return (
        <BaseWidget heading="NEW REQUESTS">
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell className={classes.cell} align="left"/>
                        <TableCell className={classes.cell} align="left">
                            Route
                        </TableCell>
                        <TableCell className={classes.cell} align="left">
                            Volume
                        </TableCell>
                        <TableCell className={classes.cell} align="left">
                            Departure Date
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {latest_list.map((req) => (
                        <TableRow key={req?.id} className={classes.row} onClick={() => goToPage(req?.id)}>
                            <TableCell className={classes.innerCell}>
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        paddingRight: 10,
                                    }}
                                >
                                    <img src={req?.shipping_type === ShippingTypesEnum.SEA ? ShipIcon : PlaneIcon}
                                         alt=""/>
                                </div>
                            </TableCell>
                            <TableCell className={classes.boldCell} align="left">
                                {req?.freight_rate.origin.code} - {req?.freight_rate.destination.code}
                            </TableCell>
                            <TableCell className={classes.innerCell} align="left">
                                <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'left'}}>
                                    {req?.cargo_groups.map((c: any) =>
                                        <span key={c?.id}>
                                          {c.volume}{'x'}{' '}{c.container_type ? c.container_type.code : c.packaging_type?.description}
                                        </span>)
                                    }
                                </div>
                            </TableCell>
                            <TableCell className={classes.innerCell} align="left">
                                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                    {req?.date_from}
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </BaseWidget>
    );
};

export default RequestWidget;
