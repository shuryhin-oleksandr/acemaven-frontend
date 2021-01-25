import React, { useEffect } from "react";
//moment js
import moment from "moment";
//material ui
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
//react-redux
import { useDispatch, useSelector } from "react-redux";
//BLL
import { AppStateType } from "../../../../../_BLL/store";
import { getClientBillingOperationsThunk } from "../../../../../_BLL/thunks/billing/agent/ClientBillingThunks";
import { clientBillingActions } from "../../../../../_BLL/reducers/billing/client/ClientBillingReducer";
//types
import { ShippingTypesEnum } from "../../../../../_BLL/types/rates&surcharges/newSurchargesTypes";
//components
import BaseWidget from "../BaseWidgetContainer/BaseWidgetContainer";
//styles
import { useStyles } from "../WidgetTableStyles";
//icons
import ShipIcon from "../../../../assets/icons/widgets/widget-ship-icon.svg";
import PlaneIcon from "../../../../assets/icons/widgets/widget-plane-icon.svg";
import { useHistory } from "react-router-dom";

const FeePaymentWidget: React.FC = () => {
  //hooks
  const classes = useStyles();
  let dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    dispatch(getClientBillingOperationsThunk("", "pending", "", ""));
    return () => {
      dispatch(clientBillingActions.setClientBillingList([]));
    };
  }, []);

  //data from store
  const billing_list = useSelector(
    (state: AppStateType) => state.client_billing.client_billing_operations_list
  );

  return (
    <BaseWidget heading="pending of Booking Fee payment">
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className={classes.cell} align="left" />
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
          </TableRow>
        </TableHead>
        <TableBody>
          {billing_list.map((item) => (
            <TableRow
              key={item.id}
              className={classes.row}
              onClick={() => {
                history.push(`/operations/${item.id}`);
              }}
            >
              <TableCell className={classes.innerCell}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    paddingRight: 10,
                  }}
                >
                  <img
                    src={
                      item.shipping_type === ShippingTypesEnum.SEA
                        ? ShipIcon
                        : PlaneIcon
                    }
                    alt=""
                  />
                </div>
              </TableCell>
              <TableCell className={classes.boldCell} align="left">
                {item.aceid}
              </TableCell>
              <TableCell className={classes.innerCell} align="left">
                {`${item.origin.code} - ${item.destination.code}`}
              </TableCell>
              <TableCell className={classes.innerCell} align="left">
                {moment(item.date_created, "DD-MM-YYYY").format("DD/MM")}
              </TableCell>
              <TableCell className={classes.innerCell} align="left">
                {item.status}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </BaseWidget>
  );
};

export default FeePaymentWidget;
