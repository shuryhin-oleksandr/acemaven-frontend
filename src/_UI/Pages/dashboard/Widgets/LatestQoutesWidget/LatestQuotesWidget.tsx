import BaseWidget from "../BaseWidgetContainer/BaseWidgetContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import React from "react";
import { useStyles } from "../WidgetTableStyles";
import ShipIcon from "../../../../assets/icons/widgets/widget-ship-icon.svg";

const LatestQuotesWidget: React.FC = () => {
  const classes = useStyles();
  function createData(route: string, volume: string, departure_date: string) {
    return { route, volume, departure_date };
  }

  const rows = [
    createData("HOU-GJS", "5x 20HC / 2x30HC", "25/12/2020"),
    createData("MLY-MSK", "100x 20HC / 10x30RC", "25/12/2020"),
  ];
  return (
    <BaseWidget heading="latest quotes receive">
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className={classes.cell} align="left" />
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
          {rows.map((row) => (
            <TableRow key={row.route}>
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
                {row.route}
              </TableCell>
              <TableCell className={classes.innerCell} align="left">
                {row.volume}
              </TableCell>
              <TableCell className={classes.innerCell} align="left">
                {row.departure_date}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </BaseWidget>
  );
};

export default LatestQuotesWidget;
