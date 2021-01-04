import React, { useState } from "react";
import { Title, Container } from "./payment-styles";
import BaseButton from "../../../base/BaseButton";
import { BackButton } from "../client-popup-styles";
import { bookingActions } from "../../../../../_BLL/reducers/booking/bookingReducer";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import BankAccountForm from "./ActivePaymentForms/BankAccountForm";
import CreditCardForm from "./ActivePaymentForms/CreditCardForm";
import { useForm } from "react-hook-form";

type PropsType = {};

const ActivePayment: React.FC<PropsType> = () => {
  const [paymentType, setPaymentType] = useState("bank_account");
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    errors,
    control,
    setValue,
    reset,
  } = useForm();
  const onSubmit = (values: any) => {
    console.log("V", values);
  };

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "15px",
            justifyContent: "space-between",
          }}
        >
          <Title>PAYMENT</Title>
          <div>
            <BackButton
              onClick={() => {
                dispatch(bookingActions.changeBookingStep("fee-table"));
              }}
              type="button"
            >
              Back
            </BackButton>
            <BaseButton onClick={() => {}} type="submit">
              Confirm and SEND
            </BaseButton>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            marginBottom: "25px",
          }}
        >
          <div style={{ marginBottom: "15px" }}>
            <RadioWrapper onClick={() => setPaymentType("bank_account")}>
              <StyledRadio>
                {paymentType === "bank_account" && <InnerCircle />}
              </StyledRadio>
              Bank account debit
            </RadioWrapper>
          </div>
          <RadioWrapper onClick={() => setPaymentType("credit_card")}>
            <StyledRadio>
              {paymentType === "credit_card" && <InnerCircle />}
            </StyledRadio>
            Credit card
          </RadioWrapper>
        </div>
        {paymentType === "bank_account" ? (
          <BankAccountForm
            register={register}
            errors={errors}
            control={control}
            setValue={setValue}
            reset={reset}
          />
        ) : (
          <CreditCardForm
            register={register}
            errors={errors}
            control={control}
            setValue={setValue}
            reset={reset}
          />
        )}
      </form>
    </Container>
  );
};

export default ActivePayment;

const StyledRadio = styled.div`
  height: 10px;
  width: 10px;
  border: 1px solid;
  border-radius: 8px;
  margin-right: 5px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    cursor: pointer;
  }
`;

const InnerCircle = styled.div`
  height: 4px;
  width: 4px;
  border-radius: 30px;
  background-color: #115b86;
`;

const RadioWrapper = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  font-family: "Helvetica Light", sans-serif;
  font-size: 14px;
`;
