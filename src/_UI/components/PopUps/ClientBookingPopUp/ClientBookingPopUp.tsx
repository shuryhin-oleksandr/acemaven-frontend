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
  close_totals?: VoidFunctionType
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
  useEffect(() => {
    dispatch(getCompanyInfo(Number(company.id)));
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

  return (
    <PopupContainer>
      <PopupContent>
        <Heading>Booking process</Heading>
        <CloseBtn
          onClick={() => {
            setBookingPopupVisible(false);
            setWidgetsVisible && setWidgetsVisible(true);
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
                    {currentFreightRate.cargo_groups.map((s) => (
                      <TableRow key={s.cargo_type} className={classes.info_row}>
                        <TableCell className={classes.innerCell} scope="row">
                          {s.volume}
                        </TableCell>
                        <TableCell className={classes.innerCell} align="left">
                          {s.cargo_type}
                        </TableCell>
                        <TableCell className={classes.innerCell} align="left">
                          <div>FREIGHT</div>
                          <div>HANDLING</div>
                          <div>OTHERS</div>
                        </TableCell>
                        <TableCell className={classes.innerCell} align="left">
                          <div>{s.freight.currency}</div>
                          <div>{s.handling.currency}</div>
                          <div>{s.other.currency}</div>
                        </TableCell>
                        <TableCell className={classes.innerCell} align="right">
                          <div>{s.freight.cost}</div>
                          <div>{s.handling.cost}</div>
                          <div>{s.other.cost}</div>
                        </TableCell>
                        <TableCell className={classes.innerCell} align="right">
                          <div>{s.freight.subtotal}</div>
                          <div>{s.handling.subtotal}</div>
                          <div>{s.other.subtotal}</div>
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
                        {currentFreightRate.doc_fee.currency}
                      </TableCell>
                      <TableCell className={classes.innerCell} align="right">
                        {currentFreightRate.doc_fee.cost}
                      </TableCell>
                      <TableCell className={classes.innerCell} align="right">
                        {currentFreightRate.doc_fee.subtotal}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </HiddenTable>
            <TableTotal>
              <TotalLine>
                <TotalName>TOTAL FREIGHT</TotalName>
                <TotalValue>8.802</TotalValue>
              </TotalLine>
              <TotalLine>
                <TotalName>CHARGES IN BRL</TotalName>
                <TotalValue>3000</TotalValue>
              </TotalLine>
              <TotalLine>
                <TotalName>CHARGES IN BRL</TotalName>
                <TotalValue>100</TotalValue>
              </TotalLine>
              <TotalLine>
                <TotalName>ACEMAVEN SERVICE FEE: IN BRL</TotalName>
                <TotalValue>50</TotalValue>
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
          />
        )}
      </PopupContent>
    </PopupContainer>
  );
};

export default ClientBookingPopUp;
