import React from 'react'
import makeStyles from "@material-ui/core/styles/makeStyles";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";

type PropsType = {

}

const useStyles = makeStyles({
    container: {
        boxShadow: 'none',
        width: 620
    },
    table: {
        '& .MuiTableHead-root' : {

        }
    },
    cell: {
        color: '#115B86',
        fontFamily: 'Helvetica Bold',
        fontSize: '16px',
        borderBottom: '1px solid #115B86',
        padding: '14px 0'
    },
    innerMainCell: {
        borderBottom: '1px solid #E0E0E0;',
        fontFamily: 'Helvetica Light',
        fontSize: '16px',
        color: '#1B1B25',
        padding: '16px 0'
    },
    innerCell: {
        borderBottom: '1px solid #E0E0E0;',
        fontFamily: 'Helvetica Light',
        fontSize: '14px',
        color: '#1B1B25',
        padding: '16px 0'
    }
});

const AgentSurchargeAdditional:React.FC<PropsType> = ({}) => {
    const classes = useStyles();

    return (
        <TableContainer className={classes.container} component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell className={classes.cell} align="left" />
                        <TableCell className={classes.cell} align="left">CURRENCY</TableCell>
                        <TableCell className={classes.cell} align="left">CHARGE</TableCell>
                        <TableCell className={classes.cell} align="left">CONDITIONS</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow >
                        <TableCell className={classes.innerMainCell}  component="th" scope="row">
                            DOC FEEeeeeeeeeeeee
                        </TableCell>
                        <TableCell className={classes.innerCell} align="left" >
                            BRL
                        </TableCell>
                        <TableCell className={classes.innerCell} align="left" >
                            150
                        </TableCell>
                        <TableCell className={classes.innerCell} align="left" >
                            fixed
                        </TableCell>
                    </TableRow>
                    <TableRow >
                        <TableCell className={classes.innerMainCell}  component="th" scope="row">
                            DOC FEEeeeeeeeee
                        </TableCell>
                        <TableCell className={classes.innerCell} align="left" >
                            BRL
                        </TableCell>
                        <TableCell className={classes.innerCell} align="left" >
                            150
                        </TableCell>
                        <TableCell className={classes.innerCell} align="left" >
                            fixed
                        </TableCell>
                    </TableRow>
                    <TableRow >
                        <TableCell className={classes.innerMainCell}  component="th" scope="row">
                            DOC FEEeeeeeeeeeeee
                        </TableCell>
                        <TableCell className={classes.innerCell} align="left" >
                            BRL
                        </TableCell>
                        <TableCell className={classes.innerCell} align="left" >
                            150
                        </TableCell>
                        <TableCell className={classes.innerCell} align="left" >
                            fixed
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default AgentSurchargeAdditional