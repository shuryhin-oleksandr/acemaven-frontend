import BaseWidget from "../BaseWidgetContainer/BaseWidgetContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import React from "react";
import { useStyles } from "../WidgetTableStyles";
import ShipIcon from "../../../../assets/icons/widgets/widget-ship-icon.svg";

const FeePaymentWidget: React.FC = () => {
  const classes = useStyles();
  function createData(
    reservation_number: string,
    route: string,
    date: string,
    status: string
  ) {
    return { reservation_number, route, date, status };
  }

  const rows = [
    createData("AMX100097", "HOU-GJS", "25/12", "In transit"),
    createData(
      "AMX100557",
      "JOY-BRZ",
      "09/12",
      "Documentation Receive text text text"
    ),
  ];
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
          {rows.map((row) => (
            <TableRow key={row.reservation_number}>
              <TableCell className={classes.innerCell}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    paddingRight: 10,
                  }}
                >
                  <img src={ShipIcon} alt="" />
                </div>
              </TableCell>
              <TableCell className={classes.boldCell} align="left">
                {row.reservation_number}
              </TableCell>
              <TableCell className={classes.innerCell} align="left">
                {row.route}
              </TableCell>
              <TableCell className={classes.innerCell} align="left">
                {row.date}
              </TableCell>
              <TableCell className={classes.innerCell} align="left">
                {row.status}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </BaseWidget>
  );
};

export default FeePaymentWidget;