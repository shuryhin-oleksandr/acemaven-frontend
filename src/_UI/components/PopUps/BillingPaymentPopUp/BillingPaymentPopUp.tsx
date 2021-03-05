import React, { useState } from "react";

import { IconButton } from "@material-ui/core";
import close_icon from "../../../assets/icons/close-icon.svg";

import { useDispatch } from "react-redux";
import {
  Heading,
  PopUpInner,
  PopUpWrapper,
  Title,
} from "./billing-payment-popup-styles";
import { BillingOperationType } from "../../../../_BLL/types/billing/billingTypes";
import BookingCard from "../../../Pages/dashboard/search/search_rate_card/BookingCard";
import ChargesChangeTable from "../ClientOperationChangeRequestPopUp/ChargesChangeTable/ChargesChangeTable";
import BaseButton from "../../base/BaseButton";
import ActiveQRPayment from "../ClientBookingPopUp/payment/ActiveQRPayment";

type PropsType = {
  setBillingPaymentPopUpVisible: (value: boolean) => void;
  booking?: BillingOperationType;
};

const BillingPaymentPopUp: React.FC<PropsType> = ({
  booking,
  setBillingPaymentPopUpVisible,
}) => {
  const dispatch = useDispatch();
  // let result_obj = { ...booking?.charges, freight_rate: booking?.freight_rate };
  const [QRStep, setQRStep] = useState(false);

  return (
    <PopUpWrapper>
      <PopUpInner>
        <Heading>Payment process</Heading>
        <IconButton
          onClick={() => setBillingPaymentPopUpVisible(false)}
          style={{ position: "absolute", top: "20px", right: "20px" }}
        >
          <img src={close_icon} alt="" />
        </IconButton>
        <BookingCard
          button_display={false}
          search_result={booking?.charges}
          showRatingPopup={() => {}}
        />

        {QRStep ? (
          <div style={{ marginTop: "20px" }}>
            <ActiveQRPayment
              setBookingPopupVisible={setBillingPaymentPopUpVisible}
              transactions={booking?.transactions}
            />
          </div>
        ) : (
          <>
            <div
              style={{
                display: "flex",
                margin: "20px 0 30px",
                alignItems: "center",
              }}
            >
              <Title>CHARGES</Title>
              <BaseButton
                onClick={() => {
                  setQRStep(true);
                }}
                type="button"
              >
                Pay
              </BaseButton>
            </div>
            <ChargesChangeTable
              operation_charges={booking?.charges}
              number_of_docs={booking?.number_of_documents}
            />
          </>
        )}
      </PopUpInner>
    </PopUpWrapper>
  );
};

export default BillingPaymentPopUp;
