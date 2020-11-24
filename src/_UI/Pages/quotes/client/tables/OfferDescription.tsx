import React, {useState} from 'react'
import {TableRow} from "@material-ui/core";
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import makeStyles from "@material-ui/core/styles/makeStyles";
import {BookLittleButton} from "../quotes-client-styles";
import {StatusesQuoteType} from "../../../../../_BLL/types/quotes/quotesTypes";
import SearchCard from "../../../dashboard/search/search_rate_card/SearchCard";
import {CardsAbsoluteWrapper} from "../../../dashboard/search/search_rate_card/search-card-styles";

type PropsType = {
    isOpen?: boolean,
    offers: StatusesQuoteType[],
    setShowRating: (value: boolean) => void,
    offerViewedHandler: (value: number) => void,
}

const useStyles = makeStyles({
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
        fontSize: '16px',
        padding: '5px 10px'
    },
    collapseMainInnerCell: {
        borderBottom: 0,
        fontFamily: 'Helvetica Reg',
        fontSize: '14px',
        padding: '0 7px'
    },
    collapseInnerCell: {
        borderBottom: 0,
        fontFamily: 'Helvetica Light',
        fontSize: '14px'
    }
});

const OfferDescription:React.FC<PropsType> = ({isOpen, offers, setShowRating, offerViewedHandler}) => {
    const classes = useStyles();
    const [showTotals, setShowTotals] = useState(false)
    let [totalId, setTotalId] = useState(0);

    let totalsHandler = (id: number) => {
        offerViewedHandler(id)
        setTotalId(id)
        setShowTotals(true)
    }
    let closeTotals = () => {
        setTotalId(0)
        setShowTotals(false)
    }


    return (
        <>
            {offers.map((o, index) => <>
                    <TableRow key={index}>
                        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                            <Collapse in={isOpen} timeout="auto" unmountOnExit>
                                <Box>
                                    <Table size="small" aria-label="purchases">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell className={classes.collapseCell} align="center">OFFER NO</TableCell>
                                                <TableCell className={classes.collapseCell}>CARRIER</TableCell>
                                                <TableCell align="left" className={classes.collapseCell}>TRANSIT TIME</TableCell>
                                                <TableCell align="left" className={classes.collapseCell}>TOTAL USD</TableCell>
                                                <TableCell align="left" className={classes.collapseCell}>TOTAL BRL</TableCell>
                                                <TableCell align="left" className={classes.collapseCell}/>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            <TableRow className={classes.innerRow}>
                                                <TableCell className={classes.collapseMainInnerCell} component="th" scope="row" align="center">
                                                    {o.id}
                                                </TableCell>
                                                <TableCell className={classes.collapseInnerCell} align="left">
                                                    {o.freight_rate?.carrier_disclosure
                                                        ? 'Carrier is disclosed'
                                                        : o.freight_rate?.carrier.title
                                                    }
                                                </TableCell>
                                                <TableCell align="left" className={classes.collapseInnerCell}>
                                                    {o.charges.freight_rate?.transit_time
                                                        ? o.charges.freight_rate?.transit_time
                                                        : 0} DAYS
                                                </TableCell>
                                                <TableCell align="left" className={classes.collapseInnerCell}>
                                                    {o.charges.totals.USD
                                                        ? `$ ${o.charges.totals.USD}`
                                                        : '-'
                                                    }
                                                </TableCell>
                                                <TableCell align="left" className={classes.collapseInnerCell}>
                                                    {o.charges.totals.BRL
                                                        ? `BRL ${o.charges.totals.BRL}`
                                                        : '-'
                                                    }
                                                </TableCell>
                                                <TableCell align="left" className={classes.collapseInnerCell}>
                                                    <BookLittleButton onClick={() => totalsHandler(o.id)}>BOOK</BookLittleButton>
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </Box>
                            </Collapse>
                        </TableCell>
                    </TableRow>
                    {showTotals && (totalId === o.id) && <CardsAbsoluteWrapper>
                    <SearchCard showRatingPopup={setShowRating}
                                search_result={o.charges}
                                closeTotals={closeTotals}

                    />
                    </CardsAbsoluteWrapper>
                    }
            </>
            )}

        </>

    )
}

export default OfferDescription