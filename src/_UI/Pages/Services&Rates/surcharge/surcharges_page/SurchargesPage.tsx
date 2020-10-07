import React from "react";
import {ModeIcon, Outer, SearchButton, SortButton, SpanMode} from "./surcharges-style";
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
import sort_arrows from '../../../../assets/icons/rates&services/sort_arrows.svg'
import search_icon from '../../../../assets/icons/rates&services/search_loop.svg'
import {TemplateIcon} from "../../../../components/_commonComponents/hover_message/hover-message-styles";
import template_icon from "../../../../assets/icons/rates&services/template.svg";
import {Tooltip} from "@material-ui/core";
import {SurchargeObjectType} from "../../../../../_BLL/types/rates&surcharges/surchargesTypes";

const useStyles = makeStyles({
    container: {
        boxShadow: 'none',
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
    surcharges_list: SurchargeObjectType[] | null
}

const SurchargesPage:React.FC<PropsType> = ({surcharges_list}) => {

    const classes = useStyles();

    function createData(id: number, shipping_mode: string | number, carrier: string | number, location: string | number, direction: string, start_date: string, expiration_date: string) {
        return { id, shipping_mode, carrier, location, direction, start_date, expiration_date};
    }

    const rows = surcharges_list && surcharges_list.length > 0
        ? surcharges_list.map(s => createData(s.id, s?.shipping_mode, s.carrier,
            s.location, s.direction, s.start_date, s.expiration_date))
        : null


    return (
        <Outer>
            <TableContainer className={classes.container} component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.shipping_cell} align="left">
                                <div style={{display: 'flex'}}>
                                    SHIPPING MODE
                                    <SortButton><img src={sort_arrows} alt=""/></SortButton>
                                    <SearchButton><img src={search_icon} alt=""/></SearchButton>
                                </div>
                            </TableCell>
                            <TableCell className={classes.cell} align="left">
                                <div style={{display: 'flex'}}>
                                    CARRIER
                                    <SortButton><img src={sort_arrows} alt=""/></SortButton>
                                    <SearchButton><img src={search_icon} alt=""/></SearchButton>
                                </div>
                            </TableCell>
                            <TableCell className={classes.cell} align="left">
                                <div style={{display: 'flex'}}>
                                    LOCATION
                                    <SortButton><img src={sort_arrows} alt=""/></SortButton>
                                    <SearchButton><img src={search_icon} alt=""/></SearchButton>
                                </div>
                            </TableCell>
                            <TableCell className={classes.cell} align="left">
                                DIRECTION
                            </TableCell>
                            <TableCell className={classes.cell} align="left">
                                <div style={{display: 'flex'}}>
                                    START DATE
                                    <SortButton><img src={sort_arrows} alt=""/></SortButton>
                                    <SearchButton><img src={search_icon} alt=""/></SearchButton>
                                </div>
                            </TableCell>
                            <TableCell className={classes.cell} align="left">
                                <div style={{display: 'flex'}}>
                                    EXPIRATION DATE
                                    <SortButton><img src={sort_arrows} alt=""/></SortButton>
                                    <SearchButton><img src={search_icon} alt=""/></SearchButton>
                                </div>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows?.map((row) => (
                            <TableRow key={row.id}>
                                    <TableCell className={classes.innerMainCell} align="left" component="th" scope="row">
                                        <ModeIcon src={row.shipping_mode !== 'ULD' ||  'Loose Cargo' ? ship_surcharge : plane_surcharge} alt=""/>
                                        <SpanMode>{row.shipping_mode}</SpanMode>
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
                                           <TemplateIcon>
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





