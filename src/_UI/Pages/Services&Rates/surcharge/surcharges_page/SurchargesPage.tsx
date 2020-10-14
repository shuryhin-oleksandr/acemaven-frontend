import React, {useCallback, useState} from "react";
import {ModeIcon, Outer, SpanMode} from "./surcharges-style";
import makeStyles from "@material-ui/core/styles/makeStyles";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import plane_surcharge from '../../../../assets/icons/rates&services/plane-surcharge.svg'
import ship_surcharge from '../../../../assets/icons/rates&services/ship-surcharge.svg'
import {TemplateIcon} from "../../../../components/_commonComponents/hover_message/hover-message-styles";
import template_icon from "../../../../assets/icons/rates&services/template.svg";
import {Tooltip} from "@material-ui/core";
import {SurchargeObjectType} from "../../../../../_BLL/types/rates&surcharges/surchargesTypes";
import {VoidFunctionType} from "../../../../../_BLL/types/commonTypes";
import TableCellContent from "../../../../components/_commonComponents/tables/TableCellContent";
import {GetSurchargeForTooltip, getSurchargeInfo} from "../../../../../_BLL/reducers/surcharge&rates/surchargeThunks";
import { useHistory } from "react-router-dom";
import {surchargeActions} from "../../../../../_BLL/reducers/surcharge&rates/surchargeReducer";
import {useSelector} from "react-redux";
import {getCurrentShippingTypeSelector} from "../../../../../_BLL/selectors/rates&surcharge/surchargeSelectors";

const useStyles = makeStyles({
    container: {
        boxShadow: 'none',
        height: 415,
        overflowY: 'scroll'
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

type PropsType = {
    surcharges_list: SurchargeObjectType[] | null,
    dispatch: VoidFunctionType,
    directory: string,
    mode: string,
    setSearchValue: VoidFunctionType,
    searchValue: string,
    searchColumn: string,
    setSearchColumn: VoidFunctionType,
    setNewSurchargeMode: VoidFunctionType
}

const SurchargesPage:React.FC<PropsType> = ({surcharges_list, ...props}) => {

    const [isSearchMode, setSearchMode] = useState(false)

    let setMode = useCallback((mode: string) => {
        props.dispatch(surchargeActions.setCurrentShippingType(mode))
    }, [])
    const mode = useSelector(getCurrentShippingTypeSelector)

    const classes = useStyles();

    let history = useHistory()
    let goToPage = (id:number) => {
        props.dispatch(getSurchargeInfo(id, history))
    }

    function createData(id: number, shipping_type: string, shipping_mode: string | number, carrier: string | number, location: string | number, direction: string, start_date: string, expiration_date: string) {
        return { id, shipping_type, shipping_mode, carrier, location, direction, start_date, expiration_date};
    }
    const rows = surcharges_list && surcharges_list.length > 0
        ? surcharges_list.map(s => createData(s.id, s?.shipping_type, s?.shipping_mode, s.carrier,
            s.location, s.direction, s.start_date, s.expiration_date))
        : null;


    let templateDataHandler = (id: number, shipping_type: string) => {
        setMode(shipping_type)
        console.log('type', mode)
        props.dispatch(GetSurchargeForTooltip(id))
        props.setNewSurchargeMode(true)
    }

    return (
        <Outer>
            <TableContainer className={classes.container} component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.shipping_cell} align="left">
                                <TableCellContent setSearchValue={props.setSearchValue}
                                                  setSearchMode={setSearchMode}
                                                  dispatch={props.dispatch}
                                                  direction={props.directory}
                                                  type={props.mode}
                                                  column_name='shipping_mode'
                                                  searchValue={props.searchValue}
                                                  isSearchMode={isSearchMode}
                                                  title='SHIPPING TYPE'
                                                  searchColumn={props.searchColumn}
                                                  setSearchColumn={props.setSearchColumn}
                                />
                            </TableCell>
                            <TableCell className={classes.cell} align="left">
                                <TableCellContent setSearchValue={props.setSearchValue}
                                                  setSearchMode={setSearchMode}
                                                  dispatch={props.dispatch}
                                                  direction={props.directory}
                                                  type={props.mode}
                                                  column_name='carrier'
                                                  searchValue={props.searchValue}
                                                  isSearchMode={isSearchMode}
                                                  title='CARRIER'
                                                  searchColumn={props.searchColumn}
                                                  setSearchColumn={props.setSearchColumn}
                                />
                            </TableCell>
                            <TableCell className={classes.cell} align="left">
                                <TableCellContent setSearchValue={props.setSearchValue}
                                                  setSearchMode={setSearchMode}
                                                  dispatch={props.dispatch}
                                                  direction={props.directory}
                                                  type={props.mode}
                                                  column_name='location'
                                                  searchValue={props.searchValue}
                                                  searchColumn={props.searchColumn}
                                                  setSearchColumn={props.setSearchColumn}
                                                  isSearchMode={isSearchMode}
                                                  title='LOCATION'
                                />
                            </TableCell>
                            <TableCell className={classes.cell} align="left">
                                DIRECTION
                            </TableCell>
                            <TableCell className={classes.cell} align="left">
                                <TableCellContent setSearchValue={props.setSearchValue}
                                                  setSearchMode={setSearchMode}
                                                  dispatch={props.dispatch}
                                                  direction={props.directory}
                                                  type={props.mode}
                                                  column_name='start_date'
                                                  searchValue={props.searchValue}
                                                  isSearchMode={isSearchMode}
                                                  title='START DATE'
                                                  searchColumn={props.searchColumn}
                                                  setSearchColumn={props.setSearchColumn}
                                />
                            </TableCell>
                            <TableCell className={classes.cell} align="left">
                                <TableCellContent setSearchValue={props.setSearchValue}
                                                  setSearchMode={setSearchMode}
                                                  dispatch={props.dispatch}
                                                  direction={props.directory}
                                                  type={props.mode}
                                                  column_name='expiration_date'
                                                  searchValue={props.searchValue}
                                                  isSearchMode={isSearchMode}
                                                  title='EXPIRATION DATE'
                                                  searchColumn={props.searchColumn}
                                                  setSearchColumn={props.setSearchColumn}
                                />
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows?.map((row) => (
                            <TableRow key={row.id}>
                                    <TableCell onClick={() => goToPage(row.id)} className={classes.innerMainCell} align="left" component="th" scope="row">
                                        <ModeIcon src={ row.shipping_type === 'sea' ? ship_surcharge : plane_surcharge} alt=""/>
                                        <SpanMode >{row.shipping_mode}</SpanMode>
                                    </TableCell>
                                <TableCell className={classes.innerCell} align="left"><span >{row.carrier}</span></TableCell>
                                <TableCell className={classes.innerCell} align="left">{row.location}</TableCell>
                                <TableCell className={classes.innerCell} align="left">{row.direction}</TableCell>
                                <TableCell className={classes.innerCell} align="left">{row.start_date}</TableCell>
                                <TableCell className={classes.innerCell} align="left">
                                   <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                       {row.expiration_date}
                                       <Tooltip title='Use this registry as a template for a new rate, with the same values and parameters.'
                                                arrow
                                                classes={{ tooltip: classes.customTooltip }}
                                       >
                                           <TemplateIcon onClick={() => templateDataHandler(row.id, row.shipping_type)}>
                                               <img src={template_icon} alt="" />
                                           </TemplateIcon>
                                       </Tooltip>
                                   </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Outer>
    )
}

export default SurchargesPage





