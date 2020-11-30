import React from 'react'
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
import {QuoteType} from "../../../../../_BLL/types/quotes/quotesTypes";
//components
import OptionsDeliveryButtons from "../../../../components/_commonComponents/optionsButtons/delivery/OptionsDeliveryButtons";
import TableCellContent from "../../../../components/_commonComponents/tables/TableCellContent";
import ScrollbarStyled from "../../../../components/_commonComponents/ScrollbarStyled/ScrollbarStyled";
import AgentQuoteRow from "./AgentQuoteRow";
//styles
import {HeaderTitle, QuotesTableContainer, QuotesTableHeader} from "../../client/tables/client-quotes-table-styles";



type PropsType = {
    setCardOpen: (value: number) => void,
    setSearchMode: (value: boolean) => void
    isSearchMode: boolean
    mode: string
    setMode: (value: string) => void
    searchValue: string
    setSearchValue: (value: string) => void
    search_column: string
    setSearchColumn: (value: string) => void,
    getQuotesByFilters: (type: string, field_name: string, search_column: string, search_value: string) => void,
    agent_quotes_list: QuoteType[],

}

const useStyles = makeStyles({
    container: {
        boxShadow: 'none',
        paddingRight: 12
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

const AgentQuotesTable:React.FC<PropsType> = ({setCardOpen, searchValue,setSearchValue, mode, setMode, search_column,
                                                  setSearchColumn, setSearchMode, isSearchMode, agent_quotes_list}) => {

    const classes = useStyles();


    return (
        <QuotesTableContainer>
            <QuotesTableHeader>
                <HeaderTitle>Quotes</HeaderTitle>
                <OptionsDeliveryButtons directory=''
                                        searchColumn={search_column}
                                        searchValue={searchValue}
                                        mode={mode}
                                        setMode={setMode}
                                        thunkName='quotes_agent'
                />
            </QuotesTableHeader>
            <ScrollbarStyled {...{style: {height: 400}}}>
                <TableContainer className={classes.container} component={Paper}>
                    <Table aria-label="collapsible table">
                        <TableHead>
                            <TableRow >
                                <TableCell className={classes.shipping_cell} align="left">
                                    <TableCellContent setSearchValue={setSearchValue}
                                                      setSearchMode={setSearchMode}
                                                      direction={''}
                                                      type={mode}
                                                      column_name='origin'
                                                      searchValue={searchValue}
                                                      isSearchMode={isSearchMode}
                                                      title='ORIGIN'
                                                      searchColumn={search_column}
                                                      setSearchColumn={setSearchColumn}
                                                      thunkName='quotes_agent'
                                    />
                                </TableCell>
                                <TableCell className={classes.cell} align="left">
                                    <TableCellContent setSearchValue={setSearchValue}
                                                      setSearchMode={setSearchMode}
                                                      direction={''}
                                                      type={mode}
                                                      column_name='destination'
                                                      searchValue={searchValue}
                                                      isSearchMode={isSearchMode}
                                                      title='DESTINATION'
                                                      searchColumn={search_column}
                                                      setSearchColumn={setSearchColumn}
                                                      thunkName='quotes_agent'
                                    />
                                </TableCell>
                                <TableCell className={classes.cell} align="left">
                                    <TableCellContent setSearchValue={setSearchValue}
                                                      setSearchMode={setSearchMode}
                                                      direction={''}
                                                      type={mode}
                                                      column_name='shipping_mode'
                                                      searchValue={searchValue}
                                                      isSearchMode={isSearchMode}
                                                      title='SHIPPING MODE'
                                                      searchColumn={search_column}
                                                      setSearchColumn={setSearchColumn}
                                                      thunkName='quotes_agent'
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
                            {agent_quotes_list.map(a => <AgentQuoteRow key={a.id}
                                                                       quote={a}
                                                                       setCardOpen={setCardOpen}
                            />)}
                        </TableBody>
                    </Table>
                </TableContainer>
            </ScrollbarStyled>
        </QuotesTableContainer>
    )
}

export default AgentQuotesTable