import BaseWidget from "../BaseWidgetContainer/BaseWidgetContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import React from "react";
import { useStyles } from "../WidgetTableStyles";
import ShipIcon from "../../../../assets/icons/widgets/widget-ship-icon.svg";
import { useSelector } from "react-redux";
import { AppStateType } from "../../../../../_BLL/store";
import { getFiveLatestHelper } from "../../../../../_BLL/helpers/widgets/getFiveLatestHelper";
import moment from "moment";
import { ShippingTypesEnum } from "../../../../../_BLL/types/rates&surcharges/newSurchargesTypes";
import PlaneIcon from "../../../../assets/icons/widgets/widget-plane-icon.svg";
import { useHistory } from "react-router-dom";

const RackingStatusWidget: React.FC = () => {
  const classes = useStyles();

  const list = useSelector(
    (state: AppStateType) => state.client_operations.latest_tracking_widget_data
  );

  const latest_list = getFiveLatestHelper(list);
  const history = useHistory();
  return (
    <BaseWidget heading="latest tracking Status update">
      <div style={{ maxHeight: "200px", overflow: "auto" }}>
        <Table stickyHeader className={classes.table} aria-label="simple table">
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
            {latest_list.map((item, idx) => (
              <TableRow
                key={item.booking_number + "-" + idx}
                className={classes.row}
                onClick={() => {
                  history.push(`/operations/${item.booking}`);
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
                  {item.booking_number}
                </TableCell>
                <TableCell className={classes.innerCell} align="left">
                  {item.route}
                </TableCell>
                <TableCell className={classes.innerCell} align="left">
                  {moment(item.date_created.slice(6)).format("DD/MM")}
                </TableCell>
                <TableCell className={classes.innerCell} align="left">
                  <div
                    style={{
                      overflow: "auto",
                      textOverflow: "ellipsis",
                      width: "100px",
                    }}
                  >
                    {item.status}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </BaseWidget>
  );
};

export default RackingStatusWidget;
