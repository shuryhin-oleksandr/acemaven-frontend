import React from 'react'
//react-router-dom
import {useHistory} from 'react-router-dom';
//react-redux
import {useSelector} from "react-redux";
//material-ui
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import makeStyles from "@material-ui/core/styles/makeStyles";
//BLL
import {AppStateType} from "../../../../../_BLL/store";
//types
import {OperationType} from "../../../../../_BLL/types/operations/operationsTypes";
import {AppCompaniesTypes} from "../../../../../_BLL/types/commonTypes";
//styles
import {ModeIcon, ModeIconBlue, SpanMode} from "../../../Services&Rates/surcharge/surcharges_page/surcharges-style";
import {CargosOuter} from "../../../quotes/client/quotes-client-styles";
//icons
import sea_type from "../../../../assets/icons/long-ship-icon-for-tables.svg";
import air_type from "../../../../assets/icons/long-plane-icon-for-tables.svg";
import blue_sea_type from '../../../../assets/icons/blue-long-ship-icon-for-tables.svg';
import blue_air_type from '../../../../assets/icons/blue-long-plane-icon-for-tables.svg';
import {useTranslation} from "react-i18next";


const useStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'unset',


        },
        '&:hover': {
            transition: '.3s',
            cursor: 'pointer',
            backgroundColor:"#E0E0E0"
        },
    },
    innerMainCell: {
        borderBottom: '1px solid #BDBDBD',
        fontFamily: 'Helvetica Light',
        fontSize: '16px',
        width: '220px',
        color: '#1B1B25',
        position: 'relative',
        padding: 0,
        paddingTop:15,
        paddingBottom:10,
        paddingLeft: '63px',
        height: '72px',
        verticalAlign:"top !important"
    },
    empty: {
        width: "30px",
        padding:0,
        borderBottom:"none"
    },
    innerCell: {
        borderBottom: '1px solid #BDBDBD',
        fontFamily: 'Helvetica Light',
        fontSize: '16px',
        color: '#1B1B25',
        height: '72px',
        padding: '0',
        paddingTop:15,
        paddingBottom:10,
        verticalAlign:"top !important"
    },
    innerRow: {
        transition: '.3s',
        '&:hover': {
            transition: '.3s',
            backgroundColor: '#e8f7fc',
            cursor: 'pointer'
        }
    },
    collapseCell: {
        borderBottom: 0,
        fontFamily: 'Helvetica Bold',
        fontSize: '16px'
    },
    collapseMainInnerCell: {
        borderBottom: 0,
        fontFamily: 'Helvetica Reg',
        fontSize: '14px'
    },
    collapseInnerCell: {
        borderBottom: 0,
        fontFamily: 'Helvetica Light',
        fontSize: '14px'
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
    operation: OperationType,
    operation_status?: string
}

const OperationsRow: React.FC<PropsType> = ({operation}) => {
    const classes = useStyles();

    const history = useHistory()
    let goToPageHandler = () => {
        history.push(`/operations/${operation.id}`)
    }

    let shipment = operation?.shipment_details && operation?.shipment_details[0]

    let company_type = useSelector((state: AppStateType) => state.profile.authUserInfo?.companies && state.profile.authUserInfo?.companies[0]);

    const {t} = useTranslation();
    return (
        <React.Fragment>
            <TableRow className={classes.root} onClick={goToPageHandler}>
                <TableCell className={classes.empty} align="left" />
                <TableCell className={classes.innerMainCell} align="left" component="th" scope="row">
                    {company_type?.type === AppCompaniesTypes.AGENT
                        ? (!operation?.has_change_request
                                ? <ModeIcon src={operation.shipping_type === 'sea' ? sea_type : air_type} alt=""/>
                                : <>
                                    <ModeIcon src={operation.shipping_type === 'sea' ? sea_type : air_type} alt=""/>
                                    <ModeIconBlue
                                        src={operation.shipping_type === 'sea' ? blue_sea_type : blue_air_type} alt=""/>
                                </>
                        )
                        : <ModeIcon src={operation.shipping_type === 'sea' ? sea_type : air_type} alt=""/>
                    }

                    <div style={{fontSize:18, fontFamily: 'Helvetica Bold, sans-serif'}}>{operation.aceid}</div>
                </TableCell>
                <TableCell className={classes.innerCell} align="left">
                    <div style={{ fontSize:"24px", marginTop:"-5px", lineHeight:1.3}}>
                        <div>{operation.freight_rate.origin.code}</div>
                        <div>{operation.freight_rate.destination.code}</div>
                    </div>
                </TableCell>
                <TableCell className={classes.innerCell} align="left">
                    <CargosOuter style={{justifyContent: "flex-start", padding:0}}>
                        {company_type?.type === AppCompaniesTypes.AGENT
                            ? operation.cargo_groups.map((c, index) => {
                                return <span
                                    key={index}>{c.volume}{' x '}{c.packaging_type ? c.packaging_type?.description : c.container_type?.code}
                                    {c.total_wm && ` - ${c.total_wm}w/m`}</span>
                            })
                            : operation.freight_rate.shipping_mode.title}
                    </CargosOuter>
                </TableCell>
                <TableCell className={classes.innerCell} align="left">
                    { (shipment && shipment?.date_of_departure && shipment?.date_of_arrival)
                        ? <span style={{fontFamily: 'Helvetica Light', fontSize: '14px'}}>
                            ETD: {shipment?.date_of_departure} <br/> ETA: {shipment?.date_of_arrival}
                          </span>
                        : '-'
                    }
                </TableCell>
                <TableCell className={classes.innerCell} align="left">
                    {!operation.freight_rate.carrier_disclosure ? operation.freight_rate.carrier.title : 'Carrier is disclosed'}
                </TableCell>
                <TableCell className={classes.innerCell} align="left">
                    <span style={{fontFamily: 'Helvetica Light', textTransform: 'uppercase'}}>
                        {t(`Statuses/${operation.status}`)}
                    </span>
                </TableCell>
                <TableCell className={classes.innerCell} align="left">
                    {operation.agent_contact_person?operation.agent_contact_person:"-"}
                </TableCell>
            </TableRow>
        </React.Fragment>
    )
}

export default OperationsRow