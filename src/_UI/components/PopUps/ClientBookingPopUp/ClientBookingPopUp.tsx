import React, { useEffect, useState } from "react";

import {
  PopupContainer,
  PopupContent,
  Heading,
  CloseBtn,
} from "./client-popup-styles";
import close from "../../../assets/icons/close-icon.svg";
import BookingCard from "../../../Pages/dashboard/search/search_rate_card/BookingCard";
import { useDispatch, useSelector } from "react-redux";
import { AppStateType } from "../../../../_BLL/store";
import { getCompanyInfo } from "../../../../_BLL/reducers/profileReducer";
import RootShippingForm from "./forms/RootShippingForm";
import {
  HiddenTable,
  HiddenTitle,
  HiddenWrapper,
  TableTotal,
  TotalLine,
  TotalName,
  TotalValue,
} from "../../../Pages/dashboard/search/search_rate_card/search-card-styles";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { bookingActions } from "../../../../_BLL/reducers/bookingReducer";
import BaseButton from "../../base/BaseButton";
import PaymentContainer from "./payment/PaymentContainer";

const useStyles = makeStyles({
  container: {
    boxShadow: "none",
  },
  table: {
    "& .MuiTableHead-root": {},
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
};

const ClientBookingPopUp: React.FC<PropsType> = ({
  setBookingPopupVisible,
}) => {
  const dispatch = useDispatch();
  const companyId = sessionStorage.getItem("u");
  useEffect(() => {
    dispatch(getCompanyInfo(Number(companyId)));
    return () => {
      dispatch(bookingActions.changeBookingStep("shipping-form"));
    };
  }, [dispatch]);

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
        <CloseBtn onClick={() => setBookingPopupVisible(false)}>
          <img src={close} alt="" />
        </CloseBtn>
        <BookingCard button_display={false} />
        {bookingStep === "shipping-form" && (
          <RootShippingForm
            companyInfo={companyInfo}
            currentUser={currentUser}
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
                <Table className={classes.table} aria-label="simple table">
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
                    <TableRow className={classes.info_row}>
                      <TableCell className={classes.innerCell} scope="row">
                        1
                      </TableCell>
                      <TableCell className={classes.innerCell} align="left">
                        40GH
                      </TableCell>
                      <TableCell className={classes.innerCell} align="left">
                        <div>FREIGHT</div>
                        <div>HANDING</div>
                        <div>OTHERS</div>
                      </TableCell>
                      <TableCell className={classes.innerCell} align="left">
                        <div>USD</div>
                        <div>BRL</div>
                        <div>USD</div>
                      </TableCell>
                      <TableCell className={classes.innerCell} align="right">
                        <div>1000</div>
                        <div>500</div>
                        <div>599</div>
                      </TableCell>
                      <TableCell className={classes.innerCell} align="right">
                        <div>1000.00</div>
                        <div>500.6</div>
                        <div>599.68</div>
                      </TableCell>
                    </TableRow>
                    <TableRow className={classes.info_row}>
                      <TableCell className={classes.innerCell} scope="row">
                        1
                      </TableCell>
                      <TableCell className={classes.innerCell} align="left">
                        40GH
                      </TableCell>
                      <TableCell className={classes.innerCell} align="left">
                        <div>FREIGHT</div>
                        <div>HANDING</div>
                        <div>OTHERS</div>
                      </TableCell>
                      <TableCell className={classes.innerCell} align="left">
                        <div>USD</div>
                        <div>BRL</div>
                        <div>USD</div>
                      </TableCell>
                      <TableCell className={classes.innerCell} align="right">
                        <div>1000</div>
                        <div>500</div>
                        <div>599</div>
                      </TableCell>
                      <TableCell className={classes.innerCell} align="right">
                        <div>1000.00</div>
                        <div>500.6</div>
                        <div>599.68</div>
                      </TableCell>
                    </TableRow>
                    <TableRow className={classes.info_row}>
                      <TableCell className={classes.innerCell} scope="row">
                        1
                      </TableCell>
                      <TableCell className={classes.innerCell} align="left">
                        40GH
                      </TableCell>
                      <TableCell className={classes.innerCell} align="left">
                        <div>FREIGHT</div>
                        <div>HANDING</div>
                        <div>OTHERS</div>
                      </TableCell>
                      <TableCell className={classes.innerCell} align="left">
                        <div>USD</div>
                        <div>BRL</div>
                        <div>USD</div>
                      </TableCell>
                      <TableCell className={classes.innerCell} align="right">
                        <div>1000</div>
                        <div>500</div>
                        <div>599</div>
                      </TableCell>
                      <TableCell className={classes.innerCell} align="right">
                        <div>1000.00</div>
                        <div>500.6</div>
                        <div>599.68</div>
                      </TableCell>
                    </TableRow>
                    <TableRow className={classes.info_row}>
                      <TableCell
                        className={classes.innerCell}
                        scope="row"
                      ></TableCell>
                      <TableCell
                        className={classes.innerCell}
                        align="left"
                      ></TableCell>
                      <TableCell className={classes.innerCell} align="left">
                        DOC FEE
                      </TableCell>
                      <TableCell className={classes.innerCell} align="left">
                        BRL
                      </TableCell>
                      <TableCell className={classes.innerCell} align="right">
                        700
                      </TableCell>
                      <TableCell className={classes.innerCell} align="right">
                        50.00
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
        {bookingStep === "payment" && <PaymentContainer />}
      </PopupContent>
    </PopupContainer>
  );
};

export default ClientBookingPopUp;
