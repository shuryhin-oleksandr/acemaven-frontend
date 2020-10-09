import makeStyles from "@material-ui/core/styles/makeStyles";

export const useStyles = makeStyles({
  table: {
    "& .MuiTableHead-root": {},
  },
  cell: {
    color: "#115B86",
    fontFamily: "Helvetica Bold",
    fontSize: "14px",
    borderBottom: "1px solid #115B86",
    padding: "0",
    paddingBottom: "7px",
  },
  innerCell: {
    fontFamily: "Helvetica Light",
    fontSize: "14px",
    color: "#1B1B25",
    padding: "5px 0",
    border: "none",
    maxWidth: "140px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  iconCell: {
    border: "none",
  },
  boldCell: {
    fontFamily: "Helvetica Bold",
    fontSize: "14px",
    color: "#1B1B25",
    padding: "5px 0",
    border: "none",
  },
});
