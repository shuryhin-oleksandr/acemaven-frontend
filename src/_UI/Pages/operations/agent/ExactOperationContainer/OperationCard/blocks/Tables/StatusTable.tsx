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
import {TrackingBackendType} from "../../../../../../../../_BLL/types/operations/operationsTypes";
//styles
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
        padding: "15 px 0 10px"
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
        fontFamily: "Helvetica Reg",
        fontSize: "14px",
        color: "#333333"
    },
    statusCell: {
        borderBottom: "1px solid #ECECEC",
        fontFamily: "Helvetica Reg",
        fontSize: "14px",
        color: "#000000",
    },
    commentCell: {
        borderBottom: "1px solid #ECECEC",
        fontFamily: "Helvetica Light",
        fontSize: "14px",
        color: "#3B3B41"
    }
});

type PropsType = {
    tracking: TrackingBackendType[],
    shipping_type: string,
}

const StatusTable: React.FC<PropsType> = ({tracking}) => {
    const classes = useStyles();

    const events = tracking.map(ae => ae.data.events[0])

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
                               FLIGHT
                            </TableCell>
                            <TableCell className={classes.cell} align="left">
                                STATUS
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {events?.map((ev, idx) => (
                            <TableRow key={idx} className={classes.row}>
                                <TableCell className={classes.dateCell} align="left">
                                    <span style={{fontFamily: 'Helvetica Light', color: '#000000'}}>
                                        {ev?.timeOfEvent.split('T')[0]}{' '}
                                    </span>
                                    {' '}{ev?.timeOfEvent.split('T')[1]}
                                </TableCell>
                                <TableCell className={classes.statusCell} align="left">
                                    {ev?.flight}
                                </TableCell>
                                <TableCell className={classes.commentCell} align="left">
                                    {ev?.type}
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
