import React from "react";
//material ui
import makeStyles from "@material-ui/core/styles/makeStyles";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
//types
import { TrackingBackendType } from "../../../../../../../../_BLL/types/operations/operationsTypes";
//styles
import styled from "styled-components";
import DetailedTableRow from "./DeatiledTableRow";

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
  tracking: TrackingBackendType[];
};

const DetailedTable: React.FC<PropsType> = ({ tracking }) => {
  const classes = useStyles();

  let sea_column = [
    { name: "CONTAINER REF." },
    { name: "TYPE" },
    { name: "DATE" },
    { name: "STATUS" },
    { name: "PORTO" },
    { name: "SHIP" },
    { name: "TRAVEL" },
    { name: "ETA" },
  ];

  const rows =
    tracking && tracking.length > 0
      ? tracking[0].data?.data?.containers?.map((c: any) => ({
          ...c,
          ETA: tracking[0].data?.data?.route?.pod?.date,
          events: c.events.map((ce: any) => ({ ...ce })),
        }))
      : [];

  console.log("rows", rows);
  return (
    <TableWrapper>
      <TableContainer className={classes.container} component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              {sea_column.map((s) => (
                <TableCell className={classes.cell} align="left">
                  {s.name}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows?.map((row: any, idx: number) => (
              <DetailedTableRow row={row} key={idx} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </TableWrapper>
  );
};

export default DetailedTable;

const TableWrapper = styled.div`
  max-height: 200px;
  overflow: auto;
`;

