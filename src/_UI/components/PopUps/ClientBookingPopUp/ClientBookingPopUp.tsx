import React, { useEffect } from "react";
//material ui
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import makeStyles from "@material-ui/core/styles/makeStyles";
//react-redux
import { useDispatch, useSelector } from "react-redux";
//BLL
import { AppStateType } from "../../../../_BLL/store";
import { getCompanyInfo } from "../../../../_BLL/reducers/profileReducer";
import { bookingActions } from "../../../../_BLL/reducers/booking/bookingReducer";
import { getReleaseTypeChoices } from "../../../../_BLL/thunks/booking_client_thunk/bookingClientThunk";
//types
import { SearchResultType } from "../../../../_BLL/types/search/search_types";
//components
import RootShippingForm from "./forms/RootShippingForm";
import BaseButton from "../../base/BaseButton";
import PaymentContainer from "./payment/PaymentContainer";
//styles
import {
  PopupContainer,
  PopupContent,
  Heading,
  CloseBtn,
} from "./client-popup-styles";
import {
  HiddenTable,
  HiddenTitle,
  HiddenWrapper,
  TableTotal,
  TotalLine,
  TotalName,
  TotalValue,
} from "../../../Pages/dashboard/search/search_rate_card/search-card-styles";
//icons
import close from "../../../assets/icons/close-icon.svg";
import BookingCard from "../../../Pages/dashboard/search/search_rate_card/BookingCard";
import {VoidFunctionType} from "../../../../_BLL/types/commonTypes";
import {quotesClientActions} from "../../../../_BLL/reducers/quotes/quotesClientReducer";

const useStyles = makeStyles({
  container: {
    boxShadow: "none",
  },
  info_row: {
    "&:hover": {
      cursor: "pointer",
    },
  },
  cell: {
    color: "#115B86",
    fontFamily: "Helvetica Bold",
    fontSize: "16px",
    borderBottom: "1px solid white",
    padding: "16px 0 0",
  },
  innerMainCell: {
    borderBottom: "1px solid #E0E0E0;",
    fontFamily: "Helvetica Bold",
    fontSize: "16px",
    color: "#115B86",
  },
  innerCell: {
    borderBottom: "1px solid #E0E0E0;",
    fontFamily: "Helvetica Light",
    fontSize: "16px",
    color: "#1B1B25",
    padding: "8px 0 0",
  },
});

type PropsType = {
  setBookingPopupVisible: (value: boolean) => void;
  setWidgetsVisible?: (value: boolean) => void;
  shippingValue: number;
  currentFreightRate: SearchResultType;
  newSearch?: any;
  quote_dates?: {date_from: string, date_to: string}
  close_totals?: VoidFunctionType,
  quotes_mode?: boolean
};

const ClientBookingPopUp: React.FC<PropsType> = ({
  setBookingPopupVisible,
  shippingValue,
  currentFreightRate,
  setWidgetsVisible,
  newSearch,
    ...props
}) => {

  const dispatch = useDispatch();
  const company = useSelector((state: AppStateType) => state.profile.authUserInfo?.companies && state.profile.authUserInfo.companies[0]);
  const new_total = useSelector((state: AppStateType) => state.booking.recalculated_cost)

  useEffect(() => {
    dispatch(getCompanyInfo(Number(company?.id)));
    return () => {
      dispatch(bookingActions.changeBookingStep("shipping-form"));
    };
  }, [dispatch]);

  useEffect(() => {
    dispatch(getReleaseTypeChoices());
  }, []);

  let companyInfo = useSelector(
    (state: AppStateType) => state.profile.companyInfo
  );
  let currentUser = useSelector(
    (state: AppStateType) => state.profile.authUserInfo
  );
  let bookingStep = useSelector(
    (state: AppStateType) => state.booking.booking_step
  );
  const classes = useStyles();

  //change step depends on 'paid' or 'not paid' & role
  let setNextStep = () => {
    if(new_total.is_paid) {
      dispatch(bookingActions.changeBookingStep("payment"))
    } else {
      if(currentUser?.roles?.includes('client')) {
        dispatch(bookingActions.changeBookingStep("payment"))
      } else {
        dispatch(bookingActions.changeBookingStep("payment"))
        //qr code
      }
    }
  }

  return (
    <PopupContainer>
      <PopupContent>
        <Heading>Booking process</Heading>
        <CloseBtn
          onClick={() => {
            setBookingPopupVisible(false);
            setWidgetsVisible && setWidgetsVisible(true);
            props.quotes_mode && dispatch(quotesClientActions.setFutureArchiveQuoteId(0))
          }}
        >
          <img src={close} alt="" />
        </CloseBtn>
        <BookingCard
          button_display={false}
          search_result={currentFreightRate}
          showRatingPopup={() => {}}
        />
        {bookingStep === "shipping-form" && (
          <RootShippingForm
            companyInfo={companyInfo}
            currentUser={currentUser}
            shippingValue={shippingValue}
            currentFreightRate={currentFreightRate}
            quote_dates={props.quote_dates}
            quotes_mode={props.quotes_mode}
          />
        )}
        {bookingStep === "fee-table" && (
          <HiddenWrapper>
            <div style={{ display: "flex" }}>
              <HiddenTitle>CHARGES</HiddenTitle>
              <BaseButton
                onClick={() => {
                  dispatch(bookingActions.changeBookingStep("payment"));
                }}
                type="button"
              >
                Next
              </BaseButton>
            </div>
            <HiddenTable>
              <TableContainer className={classes.container} component={Paper}>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell className={classes.cell}>VOLUME</TableCell>
                      <TableCell className={classes.cell} align="left">
                        TYPE
                      </TableCell>
                      <TableCell className={classes.cell} align="left">
                        CHARGE
                      </TableCell>
                      <TableCell className={classes.cell} align="left">
                        CURRENCY
                      </TableCell>
                      <TableCell className={classes.cell} align="right">
                        COST
                      </TableCell>
                      <TableCell className={classes.cell} align="right">
                        SUBTOTAL
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {new_total?.charges?.cargo_groups?.map((s: any, index: number) => (
                      <TableRow key={index} className={classes.info_row}>
                        <TableCell className={classes.innerCell} scope="row">
                          {s?.volume}
                        </TableCell>
                        <TableCell className={classes.innerCell} align="left">
                          {s?.cargo_type}
                        </TableCell>
                        <TableCell className={classes.innerCell} align="left">
                          <div>FREIGHT</div>
                          <div>HANDLING</div>
                          <div>OTHERS</div>
                        </TableCell>
                        <TableCell className={classes.innerCell} align="left">
                          <div>{s.freight?.currency}</div>
                          <div>{s.handling?.currency}</div>
                          <div>{s.other?.currency}</div>
                        </TableCell>
                        <TableCell className={classes.innerCell} align="right">
                          <div>{s.freight?.cost}</div>
                          <div>{s.handling?.cost}</div>
                          <div>{s.other?.cost}</div>
                        </TableCell>
                        <TableCell className={classes.innerCell} align="right">
                          <div>{s.freight?.subtotal}</div>
                          <div>{s.handling?.subtotal}</div>
                          <div>{s.other?.subtotal}</div>
                        </TableCell>
                      </TableRow>
                    ))}
                    <TableRow className={classes.info_row}>
                      <TableCell className={classes.innerCell} scope="row" />
                      <TableCell className={classes.innerCell} align="left" />
                      <TableCell className={classes.innerCell} align="left">
                        DOC FEE
                      </TableCell>
                      <TableCell className={classes.innerCell} align="left">
                        {new_total?.charges?.doc_fee?.currency}
                      </TableCell>
                      <TableCell className={classes.innerCell} align="right">
                        {new_total?.charges?.doc_fee?.cost}
                      </TableCell>
                      <TableCell className={classes.innerCell} align="right">
                        {new_total?.charges?.doc_fee?.subtotal}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </HiddenTable>
            <TableTotal>
              <TotalLine>
                <TotalName>TOTAL FREIGHT in {new_total?.charges?.total_freight_rate?.BRL >= 0 ? 'BRL' : 'USD'}</TotalName>
                <TotalValue>
                  {new_total?.charges?.total_freight_rate?.BRL >= 0
                      ? new_total?.charges?.total_freight_rate?.BRL
                      : new_total?.charges?.total_freight_rate?.USD}
                </TotalValue>
              </TotalLine>
              {new_total?.charges?.total_surcharge?.BRL
                && <TotalLine>
                    <TotalName>CHARGES IN BRL</TotalName>
                    <TotalValue>{new_total?.charges?.total_surcharge?.BRL}</TotalValue>
                   </TotalLine>
              }
              {new_total?.charges?.total_surcharge?.USD
              && <TotalLine>
                  <TotalName>CHARGES IN USD</TotalName>
                  <TotalValue>{new_total?.charges?.total_surcharge?.USD}</TotalValue>
                </TotalLine>
              }
              <TotalLine>
                <TotalName>ACEMAVEN SERVICE FEE: IN {new_total?.charges?.service_fee?.currency === 'BRL' ? 'BRL' : 'USD'}</TotalName>
                <TotalValue>{new_total?.charges?.service_fee?.subtotal}</TotalValue>
              </TotalLine>
                <TotalLine>
                  <TotalName>SUBTOTAL IN {new_total?.charges?.pay_to_book?.currency}</TotalName>
                  <TotalValue>{new_total?.charges?.pay_to_book?.pay_to_book}</TotalValue>
                </TotalLine>
            </TableTotal>
          </HiddenWrapper>
        )}
        {bookingStep === "payment" && (
          <PaymentContainer
            setBookingPopupVisible={setBookingPopupVisible}
            setWidgetsVisible={setWidgetsVisible}
            newSearch={newSearch}
            close_totals={props.close_totals}
            current_user={currentUser}
            new_total_paid={new_total.is_paid}
            quotes_mode={props.quotes_mode}
          />
        )}
      </PopupContent>
    </PopupContainer>
  );
};

export default ClientBookingPopUp;
