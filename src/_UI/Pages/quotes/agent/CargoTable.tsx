import React from 'react'
import makeStyles from "@material-ui/core/styles/makeStyles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";

type PropsType = {

}

const useStyles = makeStyles({
    container: {
        boxShadow: 'none'
    },
    table: {
        width: 700,
        '& .MuiTableHead-root' : {

        }
    },
    cell: {
        color: '#115B86',
        fontFamily: 'Helvetica Bold',
        fontSize: '14px',
        borderBottom: '0',
        padding: '0 0 5px'
    },
    innerCell: {
        borderBottom: '0',
        fontFamily: 'Helvetica Light',
        fontSize: '14px',
        color: '#1B1B25',
        padding: '0 0 5px'
    }
});

const CargoTable:React.FC<PropsType> = ({}) => {
    const classes = useStyles();

    return (
        <TableContainer className={classes.container} component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell className={classes.cell} align="left">VOLUME ?</TableCell>
                        <TableCell className={classes.cell} align="left">PACKAGING TYPE</TableCell>
                        <TableCell className={classes.cell} align="left">CARGO DESCRIPTION</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                        <TableRow>
                            <TableCell className={classes.innerCell}  component="th" scope="row">
                               CONTAINER TYPE
                            </TableCell>
                            <TableCell className={classes.innerCell} align="left" >
                                2 OF 250 SACKS
                            </TableCell>
                            <TableCell className={classes.innerCell} align="left">
                                CARGO DESCRIPTION ( COFFEE & ETC.)
                            </TableCell>
                        </TableRow>
                        <TableRow>
                        <TableCell className={classes.innerCell}  component="th" scope="row">
                            CONTAINER TYPE
                        </TableCell>
                        <TableCell className={classes.innerCell} align="left" >
                            2 OF 250 SACKS
                        </TableCell>
                        <TableCell className={classes.innerCell} align="left">
                            CARGO DESCRIPTION ( COFFEE & ETC.)
                        </TableCell>
                    </TableRow>
                        <TableRow>
                        <TableCell className={classes.innerCell}  component="th" scope="row">
                            CONTAINER TYPE
                        </TableCell>
                        <TableCell className={classes.innerCell} align="left" >
                            2 OF 250 SACKS
                        </TableCell>
                        <TableCell className={classes.innerCell} align="left">
                            CARGO DESCRIPTION ( COFFEE & ETC.)
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default CargoTable