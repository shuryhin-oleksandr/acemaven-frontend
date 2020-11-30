import React from 'react'
//material ui
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import makeStyles from "@material-ui/core/styles/makeStyles";
//components
import ScrollbarStyled from "../../../../../components/_commonComponents/ScrollbarStyled/ScrollbarStyled";


type PropsType = {
    usage_fees: any
}

const useStyles = makeStyles({
    container: {
        boxShadow: 'none',
        paddingRight: 12
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

const AgentSurchargeHandling:React.FC<PropsType> = ({usage_fees}) => {
    const classes = useStyles();

    return (
      <ScrollbarStyled {...{style: {width: 450, height: 280}}}>
        <TableContainer className={classes.container} component={Paper}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell className={classes.cell} align="left">CONTAINER TYPE</TableCell>
                        <TableCell className={classes.cell} align="left">CURRENCY</TableCell>
                        <TableCell className={classes.cell} align="left">CHARGE</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {usage_fees.map((fee: any, index: any) => <TableRow key={index}>
                        <TableCell className={classes.innerMainCell}  component="th" scope="row">
                            {fee.container_type.code}
                        </TableCell>
                        <TableCell className={classes.innerCell} align="left" >
                            {fee.currency.code}
                        </TableCell>
                        <TableCell className={classes.innerCell} align="left" >
                            {fee.charge}
                        </TableCell>
                    </TableRow>)}

                </TableBody>
            </Table>
        </TableContainer>
      </ScrollbarStyled>
    )
}

export default AgentSurchargeHandling