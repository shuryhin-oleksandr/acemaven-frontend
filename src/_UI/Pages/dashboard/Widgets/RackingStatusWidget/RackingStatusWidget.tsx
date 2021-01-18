import BaseWidget from "../BaseWidgetContainer/BaseWidgetContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import React from "react";
import { useStyles } from "../WidgetTableStyles";
import ShipIcon from "../../../../assets/icons/widgets/widget-ship-icon.svg";

const RackingStatusWidget: React.FC = () => {
  const classes = useStyles();


  return (
    <BaseWidget heading="latest tracking Status update">
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
            <TableRow >
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
                AMX100097
              </TableCell>
              <TableCell className={classes.innerCell} align="left">
                HOU-GJS
              </TableCell>
              <TableCell className={classes.innerCell} align="left">
                25/12
              </TableCell>
              <TableCell className={classes.innerCell} align="left">
                In transit
              </TableCell>
            </TableRow>
            <TableRow >
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
              AMX100097
            </TableCell>
            <TableCell className={classes.innerCell} align="left">
              HOU-GJS
            </TableCell>
            <TableCell className={classes.innerCell} align="left">
              25/12
            </TableCell>
            <TableCell className={classes.innerCell} align="left">
              In transit
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </BaseWidget>
  );
};

export default RackingStatusWidget;
