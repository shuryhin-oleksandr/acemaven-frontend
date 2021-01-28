import React from "react";
//react-redux
import {useSelector} from "react-redux";
//react-router-dom
import {useHistory} from "react-router-dom";
//material ui
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
//BLL
import {getAgentsOperationsListSelector} from "../../../../../_BLL/selectors/operations/agentOperationsSelector";
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



const OperationsInProgressWidget: React.FC = () => {
    //hooks
    const classes = useStyles();
    const history = useHistory()

    //data from store
    let operations_list = useSelector(getAgentsOperationsListSelector);

    //local state (get last 2 elements from an array)
    let latest_list = getTwoLastElementsHelper(operations_list)

    //handlers
    const goToPage = (id: number) => {
        history.push(`/operations/${id}`)
    }

    return (
        <>
        {latest_list[0]
                ? <BaseWidget heading="operations in progress">
                        <Table className={classes.table} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell className={classes.cell} align="left"/>
                                    <TableCell className={classes.cell} align="left">
                                        Reservation No.
                                    </TableCell>
                                    <TableCell className={classes.cell} align="left">
                                        Route
                                    </TableCell>
                                    <TableCell className={classes.cell} align="left">
                                        Date
                                    </TableCell>
                                    <TableCell className={classes.cell} align="left">
                                        Status
                                    </TableCell>
                                    <TableCell className={classes.cell} align="center"/>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {latest_list.map((operation, index: number) => (
                                    <TableRow key={operation?.id + index} className={classes.row} onClick={() => goToPage(operation?.id)}>
                                        <TableCell className={classes.innerCell}>
                                            <div
                                                style={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    paddingRight: 10,
                                                }}
                                            >
                                                <img src={operation?.shipping_type === ShippingTypesEnum.SEA ? ShipIcon : PlaneIcon}
                                                     alt=""/>
                                            </div>
                                        </TableCell>
                                        <TableCell className={classes.boldCell} align="left">
                                            {operation?.shipment_details[0].booking_number}
                                        </TableCell>
                                        <TableCell className={classes.innerCell} align="left">
                                            {operation?.freight_rate.origin.code} -{' '}
                                            {operation?.freight_rate.destination.code}
                                        </TableCell>
                                        <TableCell className={classes.innerCell} align="left">
                                            {operation?.date_from}
                                        </TableCell>
                                        <TableCell className={classes.innerCell} align="left">
                                            {operation?.status}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </BaseWidget>
                : null
        }
        </>
    );
};

export default OperationsInProgressWidget;
