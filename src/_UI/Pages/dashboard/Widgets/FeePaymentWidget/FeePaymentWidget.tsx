import BaseWidget from "../BaseWidgetContainer/BaseWidgetContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import React, { useEffect } from "react";
import { useStyles } from "../WidgetTableStyles";
import ShipIcon from "../../../../assets/icons/widgets/widget-ship-icon.svg";
import PlaneIcon from "../../../../assets/icons/widgets/widget-plane-icon.svg";
import { getClientBillingOperationsThunk } from "../../../../../_BLL/thunks/billing/agent/ClientBillingThunks";
import { clientBillingActions } from "../../../../../_BLL/reducers/billing/client/ClientBillingReducer";
import { useDispatch, useSelector } from "react-redux";
import { AppStateType } from "../../../../../_BLL/store";
import { ShippingTypesEnum } from "../../../../../_BLL/types/rates&surcharges/newSurchargesTypes";

const FeePaymentWidget: React.FC = () => {
  const classes = useStyles();
  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(getClientBillingOperationsThunk("", "pending", "", ""));
    return () => {
      dispatch(clientBillingActions.setClientBillingList([]));
    };
  }, []);

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
            <TableRow key={item.id}>
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
                ???????
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
