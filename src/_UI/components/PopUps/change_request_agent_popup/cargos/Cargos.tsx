import React from "react";
import {GeneralTitle} from "../../../../Pages/quotes/agent/table/agent-quotes-styles";
import {InfoBlockOuter} from "../change-request-agent-styles";
import {
    ShippingModeBlock,
    ShippingModeLabel
} from "../../../../Pages/Requests/Booking_agent/booking_card/blocks/hidden-part-styles";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {OperationType} from "../../../../../_BLL/types/operations/operationsTypes";
import {ShippingModeEnum} from "../../../../../_BLL/types/rates&surcharges/newSurchargesTypes";
import {useTranslation} from "react-i18next";


const useStyles = makeStyles({
    container: {
        boxShadow: 'none',
        maxWidth: 1020,
        minWidth: 650,
    },
    changed_container: {
        boxShadow: 'none',
        maxWidth: 1020,
        minWidth: 650,
        backgroundColor: 'rgba(17, 91, 134, .05)',
        padding: '8px'
    },
    shipping_cell: {
        width: '220px',
        color: '#115B86',
        fontFamily: 'Helvetica Bold',
        fontSize: '14px',
        borderBottom: '1px solid transparent',
        paddingLeft: '63px',
        padding: '0'
    },
    row: {
        verticalAlign: 'top'
    },
    cell: {
        color: '#115B86',
        fontFamily: 'Helvetica Bold',
        fontSize: '14px',
        borderBottom: '1px solid transparent',
        padding: '0',
        marginRight: '44px'
    },
    innerMainCell: {
        borderBottom: '1px solid transparent',
        fontFamily: 'Helvetica Light',
        fontSize: '14px',
        color: '#1B1B25',
        position: 'relative',
        paddingLeft: '63px',
        height: '72px'
    },
    innerCell: {
        borderBottom: '1px solid transparent',
        fontFamily: 'Helvetica Light',
        fontSize: '14px',
        color: '#1B1B25',
        height: '30px',
        padding: '0',
    },
    innerCellBlue: {
        borderBottom: '1px solid transparent',
        fontFamily: 'Helvetica Light',
        fontSize: '14px',
        color: '#115B86',
        height: '30px',
        padding: '0',
    },
});

type PropsType = {
    operation_info: OperationType | null
}

const Cargos: React.FC<PropsType> = ({operation_info}) => {
    const classes = useStyles();

    const change_requests_cargos = operation_info?.change_requests ? operation_info?.change_requests[0].cargo_groups : []

    const {t} = useTranslation();
    let fcl_cargos_header = [
        {name: t('Bookings/VOLUME'), align: "left"},
        {name: t('Quote bid screen/CONTAINER TYPE'), align: "left"},
        {name: t('Bookings/CARGO DESCRIPTION'), align: "left"}
    ]
    let other_cargos_header = [
        {name:  t('Bookings/VOLUME'), align: 'left'},
        {name: t('Bookings/NO. OF PACKS'), align: 'left'},
        {name: t('Bookings/PACKAGING TYPE'), align: 'left'},
        {name: t('Bookings/HEIGHT, WIDTH, LENGTH, WEIGHT'), align: 'left'},
        {name: t('Bookings/CARGO DESCRIPTIONS'), align: 'left'}
    ]


    return (
        <InfoBlockOuter>
            <GeneralTitle margin_bottom='17px'>{t("Bookings/CARGO")}</GeneralTitle>
            <ShippingModeBlock>
                <ShippingModeLabel>{operation_info?.freight_rate.shipping_mode.title}</ShippingModeLabel>
                <TableContainer className={classes.container} component={Paper}>
                    <Table aria-label="collapsible table">
                        <TableHead>
                            {operation_info?.freight_rate.shipping_mode.id === ShippingModeEnum.FCL
                                ? <TableRow>
                                    {fcl_cargos_header.map(f => <TableCell className={classes.cell} align='left'>
                                        {f.name}
                                    </TableCell>)}
                                </TableRow>
                                : <TableRow>
                                    {other_cargos_header.map(o => <TableCell className={classes.cell} align="left">
                                            {o.name}
                                        </TableCell>
                                    )}
                                </TableRow>
                            }
                        </TableHead>
                        <TableBody>
                            {operation_info?.cargo_groups?.map((c, index) => <TableRow key={index}
                                                                                       className={classes.row}>
                                    {operation_info?.freight_rate.shipping_mode.id === ShippingModeEnum.FCL
                                        ? <>
                                            <TableCell className={classes.innerCell} align="left">
                                                {c.volume}
                                            </TableCell>
                                            <TableCell className={classes.innerCell} align="left">
                                                {c.container_type?.code}
                                            </TableCell>
                                            <TableCell className={classes.innerCell} align="left">
                                                {c.description}
                                            </TableCell>
                                        </>
                                        : <>
                                            <TableCell className={classes.innerCell} align="left">
                                                {c.total_wm}
                                            </TableCell>
                                            <TableCell className={classes.innerCell} align="left">
                                                {c.volume}
                                            </TableCell>
                                            <TableCell className={classes.innerCell} align="left">
                                                {operation_info?.freight_rate.shipping_mode.id === ShippingModeEnum.ULD
                                                    ? c.container_type?.code
                                                    : c.packaging_type?.description}
                                            </TableCell>
                                            <TableCell className={classes.innerCell} align="left">
                                                {c.height + c.length_measurement},{' '}
                                                {c.width + c.length_measurement}, {' '}
                                                {c.length + c.length_measurement}, {' '}
                                                {c.weight + c.weight_measurement}
                                            </TableCell>
                                            <TableCell className={classes.innerCell} align="left">
                                                {c.description}
                                            </TableCell>
                                        </>
                                    }
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </ShippingModeBlock>
            <div style={{
                fontFamily: 'Helvetica Bold',
                fontSize: '16px',
                color: '#1B1B25',
                display: 'flex',
                alignItems: 'flex-end',
                margin: ' 17px 0'
            }}>
                to
            </div>
            <TableContainer className={classes.changed_container} component={Paper}>
                <Table aria-label="collapsible table">
                    <TableHead>
                        {operation_info?.freight_rate.shipping_mode.id === ShippingModeEnum.FCL
                            ? <TableRow>
                                {fcl_cargos_header.map(f => <TableCell className={classes.cell} align='left'>
                                    {f.name}
                                </TableCell>)}
                            </TableRow>
                            : <TableRow>
                                {other_cargos_header.map(o => <TableCell className={classes.cell} align="left">
                                        {o.name}
                                    </TableCell>
                                )}
                            </TableRow>
                        }
                    </TableHead>
                    <TableBody>
                        {change_requests_cargos?.map((c, index) => <TableRow key={index} className={classes.row}>
                                {operation_info?.freight_rate.shipping_mode.id === ShippingModeEnum.FCL
                                    ? <>
                                        <TableCell className={classes.innerCellBlue} align="left">
                                            {c.volume}
                                        </TableCell>
                                        <TableCell className={classes.innerCellBlue} align="left">
                                            {c.container_type?.code}
                                        </TableCell>
                                        <TableCell className={classes.innerCellBlue} align="left">
                                            {c.description}
                                        </TableCell>
                                    </>
                                    : <>
                                        <TableCell className={classes.innerCellBlue} align="left">
                                            {c.total_wm}
                                        </TableCell>
                                        <TableCell className={classes.innerCellBlue} align="left">
                                            {c.volume}
                                        </TableCell>
                                        <TableCell className={classes.innerCellBlue} align="left">
                                            {operation_info?.freight_rate.shipping_mode.id === ShippingModeEnum.ULD
                                                ? c.container_type?.code
                                                : c.packaging_type?.description}
                                        </TableCell>
                                        <TableCell className={classes.innerCellBlue} align="left">
                                            {c.height + c.length_measurement},{' '}
                                            {c.width + c.length_measurement}, {' '}
                                            {c.length + c.length_measurement}, {' '}
                                            {c.weight + c.weight_measurement}
                                        </TableCell>
                                        <TableCell className={classes.innerCellBlue} align="left">
                                            {c.description}
                                        </TableCell>
                                    </>
                                }
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </InfoBlockOuter>
    )
}

export default Cargos
