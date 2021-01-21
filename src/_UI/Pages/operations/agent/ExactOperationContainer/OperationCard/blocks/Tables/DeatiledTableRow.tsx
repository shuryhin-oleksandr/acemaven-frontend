import React, { useState } from "react";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import makeStyles from "@material-ui/core/styles/makeStyles";
import DetailedInnerRowInfo from "./DetailedInnerRowInfo";
import moment from "moment";
import down_arrow from "../../../../../../../assets/icons/rates&services/show_arrow.svg";
import up_arrow from "../../../../../../../assets/icons/rates&services/hide_arrow.svg";

const useStyles = makeStyles({
  container: {
    boxShadow: "none",
  },
  row: {
    "&:hover": {
      cursor: "pointer",
    },
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
    borderTop: "1px solid #115B86",
    borderBottom: "none",
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
    borderBottom: "none",
    fontFamily: "Helvetica Light",
    fontSize: "16px",
    color: "#1B1B25",
    padding: "0",
    paddingRight: "30px",
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

type PropsType = {
  row: any;
};

const DetailedTableRow: React.FC<PropsType> = ({ row }) => {
  const [isOpen, setIsOpen] = useState(false);
  const classes = useStyles();
  return (
    <>
      <TableRow
        className={classes.row}
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        <TableCell className={classes.innerCell} align="left">
          <span
            style={{
              color: "black",
              fontFamily: "Helvetica Light",
              fontSize: "14px",
            }}
          >
            {row.events.length > 0 && (
              <img
                src={isOpen ? up_arrow : down_arrow}
                alt=""
                style={{ width: "12px", marginRight: "5px" }}
              />
            )}
            {row.number}
          </span>
        </TableCell>
        <TableCell className={classes.innerCell} align="left">
          <span
            style={{
              color: "black",
              fontFamily: "Helvetica Light",
              fontSize: "14px",
            }}
          >
            {row.iso_code}
          </span>
        </TableCell>
        <TableCell className={classes.innerCell} align="left">
          <span
            style={{
              color: "black",
              fontFamily: "Helvetica Light",
              fontSize: "14px",
            }}
          >
            {moment(row.events[row.events.length - 1].date).format(
              " DD/MM  h:mm a"
            )}
          </span>
        </TableCell>
        <TableCell className={classes.innerCell} align="left">
          <span
            style={{
              color: "black",
              fontFamily: "Helvetica Light",
              fontSize: "14px",
            }}
          >
            {row.events[row.events.length - 1].description}
          </span>
        </TableCell>
        <TableCell className={classes.innerCell} align="left">
          <span
            style={{
              color: "black",
              fontFamily: "Helvetica Light",
              fontSize: "14px",
            }}
          >
            {row.events[row.events.length - 1].location
              ? row.events[row.events.length - 1].location
              : "-"}
          </span>
        </TableCell>
        <TableCell className={classes.innerCell} align="left">
          <span
            style={{
              color: "black",
              fontFamily: "Helvetica Light",
              fontSize: "14px",
            }}
          >
            {row.events[row.events.length - 1].vessel
              ? row.events[row.events.length - 1].vessel
              : "-"}
          </span>
        </TableCell>
        <TableCell className={classes.innerCell} align="left">
          <span
            style={{
              color: "black",
              fontFamily: "Helvetica Light",
              fontSize: "14px",
            }}
          >
            {row.events[row.events.length - 1].voyage
              ? row.events[row.events.length - 1].voyage
              : "-"}
          </span>
        </TableCell>
        <TableCell className={classes.innerCell} align="left">
          <span
            style={{
              color: "black",
              fontFamily: "Helvetica Light",
              fontSize: "14px",
            }}
          >
            {moment(row.ETA).format("DD/MM")}
          </span>
        </TableCell>
      </TableRow>
      <DetailedInnerRowInfo isOpen={isOpen} events={row.events} />
    </>
  );
};

export default DetailedTableRow;
