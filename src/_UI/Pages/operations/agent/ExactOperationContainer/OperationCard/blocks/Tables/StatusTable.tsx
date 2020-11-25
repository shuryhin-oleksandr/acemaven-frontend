import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import styled from "styled-components";

const useStyles = makeStyles({
    container: {
        boxShadow: "none",
    },
    table: {
        "& .MuiTableHead-root": {},
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
        borderBottom: "1px solid #115B86",
        padding: "0",
        paddingBottom: "15px",
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
    dateCell: {
        borderBottom: "1px solid #ECECEC",
        fontFamily: "Helvetica Light",
        fontSize: "16px",
        color: "#1B1B25",
        height: "72px",
        padding: "0",
        paddingRight: "30px",
        whiteSpace: "nowrap",
    },

    statusCell: {
        borderBottom: "1px solid #ECECEC",
        fontFamily: "Helvetica Light",
        fontSize: "16px",
        color: "#1B1B25",
        height: "72px",
        padding: "0",
        paddingRight: "30px",
        width: "25%",
    },
    commentCell: {
        borderBottom: "1px solid #ECECEC",
        fontFamily: "Helvetica Light",
        fontSize: "16px",
        color: "#1B1B25",
        height: "72px",
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

const StatusTable: React.FC = () => {
    const classes = useStyles();
    return (
        <TableWrapper>
            <TableContainer className={classes.container} component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.cell} align="left">
                                DATE
                            </TableCell>
                            <TableCell className={classes.cell} align="left">
                                STATUS
                            </TableCell>
                            <TableCell className={classes.cell} align="left">
                                COMMENTS
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {[1, 2, 3, 4]?.map((row, idx) => (
                            <TableRow key={idx} className={classes.row}>
                                <TableCell className={classes.dateCell} align="left">
                  <span
                      style={{
                          color: "black",
                          fontFamily: "Helvetica Light",
                          fontSize: "14px",
                      }}
                  >
                    20/10
                    <span
                        style={{
                            fontFamily: "Helvetica Reg",
                            marginLeft: "10px",
                        }}
                    >
                      22:30
                    </span>
                  </span>
                                </TableCell>
                                <TableCell className={classes.statusCell} align="left">
                  <span
                      style={{
                          color: "black",
                          fontFamily: "Helvetica Reg",
                          fontSize: "14px",
                      }}
                  >
                    Vessel Arrived in Transshipment Port
                  </span>
                                </TableCell>
                                <TableCell className={classes.commentCell} align="left">
                  <span
                      style={{
                          color: "black",
                          fontFamily: "Helvetica Light",
                          fontSize: "14px",
                          display: "flex",
                      }}
                  >
                    <div style={{ marginRight: "8px", whiteSpace: "nowrap" }}>
                      Cameron Williamson:
                    </div>
                    <div
                        style={{
                            fontFamily: "Helvetica Light",
                            fontStyle: "italic",
                        }}
                    >
                      Amet minim mollit non deserunt ullamco est sit aliqua
                      dolor do amet sint. Velit offii ia conseq uat duis enim
                      velit mollit. Exercitation veniam consequat sunt nostrud.
                    </div>
                  </span>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </TableWrapper>
    );
};

export default StatusTable;

const TableWrapper = styled.div`
  max-height: 350px;
  overflow: auto;
`;
