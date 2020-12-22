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

}

const DetailedTable: React.FC<PropsType> = ({}) => {
    const classes = useStyles();

    let sea_column = [
        {name: 'CONTEINER REF.'},
        {name: 'TYPE'},
        {name: 'DATE'},
        {name: 'STATUS'},
        {name: 'PORTO'},
        {name: 'SHIP'},
        {name: 'TRAVEL'},
        {name: 'ETA'},
    ]


    return (
        <TableWrapper>
            <TableContainer className={classes.container} component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>

                            {sea_column.map(s => <TableCell className={classes.cell} align="left">
                                {s.name}
                            </TableCell>)
                            }

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {[1, 2, 3, 4]?.map((row, idx) => (
                            <TableRow key={idx} className={classes.row}>
                                <TableCell className={classes.innerCell} align="left">
                  <span
                      style={{
                          color: "black",
                          fontFamily: "Helvetica Light",
                          fontSize: "14px",
                      }}
                  >
                    CRXU7660961
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
                    40FR
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
                    20/11
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
                    LOADED ON BOARD
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
                    CARTAGENA
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
                    MSC MARINA
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
                    240GBO
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
                    25/11
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

export default DetailedTable;

const TableWrapper = styled.div`
  max-height: 200px;
  overflow: auto;
`;
