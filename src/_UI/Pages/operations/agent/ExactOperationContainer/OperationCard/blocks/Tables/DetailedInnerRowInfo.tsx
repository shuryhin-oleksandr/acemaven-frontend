import React from "react";
import { TableRow } from "@material-ui/core";
import TableCell from "@material-ui/core/TableCell";
import Collapse from "@material-ui/core/Collapse";
import Box from "@material-ui/core/Box";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import makeStyles from "@material-ui/core/styles/makeStyles";
import moment from "moment";
import {useTranslation} from "react-i18next";

const useStyles = makeStyles({
  innerRow: {
    transition: ".3s",
    "&:hover": {
      transition: ".3s",
      backgroundColor: "#e8f7fc",
      cursor: "pointer",
    },
  },
  collapseCell: {
    borderBottom: 0,
    fontFamily: "Helvetica Bold",
    fontSize: "14px",
    padding: "0 5px",
    backgroundColor: "#eaeaea",
  },
  collapseMainInnerCell: {
    borderBottom: 0,
    fontFamily: "Helvetica Reg",
    fontSize: "14px",
    padding: "0 7px",
  },
  collapseInnerCell: {
    borderBottom: 0,
    fontFamily: "Helvetica Light",
    fontSize: "14px",
    padding: "0 5px",
  },
  collapseContainer: {
    marginTop: "5px",
  },
});

type PropsType = {
  isOpen: boolean;
  events: any;
};

const DetailedInnerRowInfo: React.FC<PropsType> = ({ isOpen, events }) => {
  const classes = useStyles();
  const {t} = useTranslation();
  return (
    <TableRow>
      <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
        <Collapse
          className={classes.collapseContainer}
          in={isOpen}
          timeout="auto"
          unmountOnExit
        >
          <Box>
            <Table size="small" aria-label="purchases">
              <TableHead>
                <TableRow>
                  <TableCell className={classes.collapseCell} align="left">
                    {t("Operations/DATE")}
                  </TableCell>
                  <TableCell className={classes.collapseCell}>STATUS</TableCell>
                  <TableCell align="left" className={classes.collapseCell}>
                    {t("Operations/PORTO")}
                  </TableCell>
                  <TableCell align="left" className={classes.collapseCell}>
                    {t("Billing/SHIP")}
                  </TableCell>
                  <TableCell align="left" className={classes.collapseCell}>
                    {t("Bookings/TRAVEL")}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {events.map((ev: any, idx: number) => (
                  <TableRow className={classes.innerRow}>
                    <TableCell
                      className={classes.collapseInnerCell}
                      align="left"
                    >
                      {moment(ev.date).format(" DD/MM  h:mm a")}
                    </TableCell>
                    <TableCell
                      className={classes.collapseInnerCell}
                      align="left"
                    >
                      {ev.description}
                    </TableCell>
                    <TableCell
                      align="left"
                      className={classes.collapseInnerCell}
                    >
                      {ev.location}
                    </TableCell>
                    <TableCell
                      align="left"
                      className={classes.collapseInnerCell}
                    >
                      {ev.vessel}
                    </TableCell>
                    <TableCell
                      align="left"
                      className={classes.collapseInnerCell}
                    >
                      {ev.voyage ? ev.voyage : "-"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </Collapse>
      </TableCell>
    </TableRow>
  );
};

export default DetailedInnerRowInfo;

const data = {
  date: "2020-01-16 16:46:00",
  description: "Gate in",
  location: "Chicago",
  status: "CGI",
  type: "land",
  vessel: "GUNDE MAERSK",
  voyage: "952E",
};
