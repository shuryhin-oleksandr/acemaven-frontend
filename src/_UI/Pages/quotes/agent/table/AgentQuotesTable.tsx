import React, {useState} from 'react'
import makeStyles from "@material-ui/core/styles/makeStyles";
import {HeaderTitle, QuotesTableContainer, QuotesTableHeader} from "../../client/tables/client-quotes-table-styles";
import OptionsDeliveryButtons
    from "../../../../components/_commonComponents/optionsButtons/delivery/OptionsDeliveryButtons";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableCellContent from "../../../../components/_commonComponents/tables/TableCellContent";
import TableBody from "@material-ui/core/TableBody";
import {useDispatch} from "react-redux";
import AgentQuoteRow from "./AgentQuoteRow";

type PropsType = {
    setCardOpen: (value: boolean) => void
}

const useStyles = makeStyles({
    container: {
        boxShadow: 'none',
        height: 400,
        overflowY: 'scroll',

    },
    table: {
        '& .MuiTableHead-root' : {

        }
    },
    shipping_cell: {
        width: '220px',
        color: '#115B86',
        fontFamily: 'Helvetica Bold',
        fontSize: '16px',
        borderBottom: '1px solid #828282',
        paddingLeft: '63px',
        padding: '0'

    },
    cell: {
        color: '#115B86',
        fontFamily: 'Helvetica Bold',
        fontSize: '16px',
        borderBottom: '1px solid #828282',
        width: '150px',
        padding: '0'
    },
    innerMainCell: {
        borderBottom: '1px solid #BDBDBD',
        fontFamily: 'Helvetica Light',
        fontSize: '16px',
        width: '220px',
        color: '#1B1B25',
        position: 'relative',
        paddingLeft: '63px',
        height: '72px'
    },
    innerCell: {
        borderBottom: '1px solid #BDBDBD',
        fontFamily: 'Helvetica Light',
        fontSize: '16px',
        color: '#1B1B25',
        height: '72px',
        padding: '0',
    },
    customTooltip: {
        maxWidth: 330,
        height: 60,
        fontFamily: 'Helvetica Reg',
        fontSize: '14px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '15px'
    },
});

const AgentQuotesTable:React.FC<PropsType> = ({setCardOpen}) => {

    const classes = useStyles();

    const dispatch = useDispatch()

    const [isSearchMode, setSearchMode] = useState(false)
    const [mode, setMode] = useState("sea");
    const [directory, setDirectory] = useState("import");
    const [searchValue, setSearchValue] = useState('')
    const [search_column, setSearchColumn] = useState('')

    return (
        <QuotesTableContainer>
            <QuotesTableHeader>
                <HeaderTitle>Quotes</HeaderTitle>
                <OptionsDeliveryButtons directory=''
                                        searchColumn=''
                                        searchValue=''
                                        mode={mode}
                                        setMode={setMode}
                />
            </QuotesTableHeader>
            <TableContainer className={classes.container} component={Paper}>
                <Table className={classes.table} aria-label="collapsible table">
                    <TableHead>
                        <TableRow >
                            <TableCell className={classes.shipping_cell} align="left">
                                <TableCellContent setSearchValue={setSearchValue}
                                                  setSearchMode={setSearchMode}
                                                  dispatch={dispatch}
                                                  direction={directory}
                                                  type={mode}
                                                  column_name='origin'
                                                  searchValue={searchValue}
                                                  isSearchMode={isSearchMode}
                                                  title='ORIGIN'
                                                  searchColumn={search_column}
                                                  setSearchColumn={setSearchColumn}
                                />
                            </TableCell>
                            <TableCell className={classes.cell} align="left">
                                <TableCellContent setSearchValue={setSearchValue}
                                                  setSearchMode={setSearchMode}
                                                  dispatch={dispatch}
                                                  direction={directory}
                                                  type={mode}
                                                  column_name='destination'
                                                  searchValue={searchValue}
                                                  isSearchMode={isSearchMode}
                                                  title='DESTINATION'
                                                  searchColumn={search_column}
                                                  setSearchColumn={setSearchColumn}
                                />
                            </TableCell>
                            <TableCell className={classes.cell} align="left">
                                <TableCellContent setSearchValue={setSearchValue}
                                                  setSearchMode={setSearchMode}
                                                  dispatch={dispatch}
                                                  direction={directory}
                                                  type={mode}
                                                  column_name='shipping_mode'
                                                  searchValue={searchValue}
                                                  isSearchMode={isSearchMode}
                                                  title='SHIPPING MODE'
                                                  searchColumn={search_column}
                                                  setSearchColumn={setSearchColumn}
                                />
                            </TableCell>
                            <TableCell className={classes.cell} align="center">
                               VOLUME
                            </TableCell>
                            <TableCell className={classes.cell} align="left">
                                SHIPMENT DATE
                            </TableCell>
                            <TableCell className={classes.cell} align="right" />
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <AgentQuoteRow submit_status={true} setCardOpen={setCardOpen}/>
                        <AgentQuoteRow  submit_status={false} setCardOpen={setCardOpen}/>
                    </TableBody>
                </Table>
            </TableContainer>
        </QuotesTableContainer>
    )
}

export default AgentQuotesTable