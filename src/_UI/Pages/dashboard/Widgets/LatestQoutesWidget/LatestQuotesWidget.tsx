import React from "react";
//react-redux
import { useSelector} from "react-redux";
//react-router-dom
import {useHistory} from "react-router-dom";
//material ui
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
//BLL
import {AppStateType} from "../../../../../_BLL/store";
import {getAgentQuotesLIstSelector} from "../../../../../_BLL/selectors/quotes/agent/agentQuoteSelector";
import {getClientQuotesListSelector} from "../../../../../_BLL/selectors/quotes/client/quotesClientSelector";
//helper
import {getTwoLastElementsHelper} from "../../../../../_BLL/helpers/widgets/getTwoLastElementsHelper";
//types
import {ShippingTypesEnum} from "../../../../../_BLL/types/rates&surcharges/newSurchargesTypes";
import {AppCompaniesTypes} from "../../../../../_BLL/types/commonTypes";
//components
import BaseWidget from "../BaseWidgetContainer/BaseWidgetContainer";
//styles
import {useStyles} from "../WidgetTableStyles";
import {BookLittleButton} from "../../../quotes/client/quotes-client-styles";
//icons
import ShipIcon from "../../../../assets/icons/widgets/widget-ship-icon.svg";
import PlaneIcon from "../../../../assets/icons/widgets/widget-plane-icon.svg";
import {useTranslation} from "react-i18next";
import ScrollbarStyled from "../../../../components/_commonComponents/ScrollbarStyled/ScrollbarStyled";



const LatestQuotesWidget: React.FC = () => {
    //hooks
    const classes = useStyles();
    const history = useHistory()

    //data from store
    let company_type = useSelector((state: AppStateType) => state.profile.authUserInfo?.companies && state.profile.authUserInfo?.companies[0])
    const my_quotes_list = useSelector(getClientQuotesListSelector) //client
    const agent_quotes_list = useSelector(getAgentQuotesLIstSelector) //agent


    //local state (get last 2 elements from an array)
    let latest_list = company_type?.type === AppCompaniesTypes.AGENT
        ? getTwoLastElementsHelper(agent_quotes_list)
        : getTwoLastElementsHelper(my_quotes_list)



    //handlers
    let setCardOpen = (quote_id: number) => {
        history.push(`/quotes/${quote_id}`)
    }
    let goToClientsQuotes = ( ) => {
        history.push(`/quotes`)
    }
const {t} = useTranslation() ;

    return (
        <>
            {latest_list.length > 0 && latest_list[0] ?
                <BaseWidget heading={company_type?.type === AppCompaniesTypes.CLIENT ? t("Dashboard/latest quotes received") : t("Dashboard Menu/QUOTES") }>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell className={classes.cell} align="left"/>
                                <TableCell className={classes.cell} align="left">
                                    {t("Dashboard/Route")}
                                </TableCell>
                                <TableCell className={classes.cell} align="left">
                                    {t("Dashboard/Volume")}
                                </TableCell>
                                <TableCell className={classes.cell} align="left">
                                    {t("Dashboard/Departure Date")}
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {latest_list.map((quote, idx) => (
                              !quote.is_submitted && (
                                <TableRow key={idx}
                                className={classes.row}
                                onClick={() => company_type?.type === AppCompaniesTypes.AGENT ?
                              setCardOpen(Number(quote.id))
                              :
                              goToClientsQuotes()
                            }
                                >
                                <TableCell className={classes.quoteCell}>
                                <div
                                style={{
                                display: "flex",
                                alignItems: "center",
                                paddingRight: 10,
                            }}
                                >
                                <img src={quote?.shipping_type === ShippingTypesEnum.SEA ? ShipIcon : PlaneIcon}
                                alt=""/>
                                </div>
                                </TableCell>
                                <TableCell className={classes.pageCell} align="left">
                                {quote?.origin.code} - {quote?.destination.code}
                                </TableCell>
                                <TableCell className={classes.pageCell} align="left">
                                <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'left'}}>
                                {quote?.cargo_groups.map((c: any) =>
                                  <span key={c?.id}>
                                          {c.volume}{'x'}{' '}{c.container_type ? c.container_type.code : c.packaging_type?.description}
                                        </span>)
                                }
                                </div>
                                </TableCell>
                                <TableCell className={classes.innerCell} align="left">
                                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                                {quote?.date_from}
                                {company_type?.type === AppCompaniesTypes.AGENT
                                && (!quote.is_submitted
                                    ? <BookLittleButton
                                      onClick={() => setCardOpen(Number(quote?.id))}>{t("Quotes/OFFER")}</BookLittleButton>
                                    : <span style={{
                                        color: '#115b86',
                                        fontFamily: 'Helvetica Bold, sans-serif',
                                        fontSize: '12px'
                                    }}>
                                                        {t("Quotes/SUBMITTED")}
                                                </span>
                                )}
                                </div>
                                </TableCell>
                                </TableRow>
                                )))}
                        </TableBody>
                    </Table>
                </BaseWidget>
                :
                null
            }
        </>

    );
};

export default LatestQuotesWidget;
