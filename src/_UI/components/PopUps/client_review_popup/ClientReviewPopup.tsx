import React, { useState } from "react";
import {
  Wrapper,
  Inner,
  Content,
  Title,
  Subtitle,
  ButtonsWrapper,
  ConfirmButton,
  StarsWrapper,
  ErrorMessage,
} from "./client-review-styles";
import { IconButton, withStyles } from "@material-ui/core";
import close_icon from "../../../assets/icons/close-icon.svg";
import { Controller, useForm } from "react-hook-form";
import { FormTextarea } from "../accept_booking_popup/accept-popup-styles";
import { Rating } from "@material-ui/lab";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import { useDispatch } from "react-redux";
import {postCompaniesRating} from "../../../../_BLL/thunks/operations/client/OperationsClientThunk";

type PropsType = {
  setReviewPopup: (value: boolean) => void;
  id: number
};

const StyledRating = withStyles({
  iconFilled: {
    color: "#115B86",
  },
})(Rating);

const ClientReviewPopup: React.FC<PropsType> = ({ setReviewPopup, id }) => {
  const { handleSubmit, errors, control } = useForm({
    reValidateMode: "onBlur",
  });

  let dispatch = useDispatch();

  const [ratingValue, setRatingValue] = useState(0);

  const onSubmit = (values: any) => {
    let rating;
    if (ratingValue === 0) {
      rating = 1;
    } else {
      rating = ratingValue * 2;
    }
    const data = { ...values, rating };
    dispatch(postCompaniesRating(data, id,setReviewPopup));

  };

  return (
    <Wrapper>
      <Inner onSubmit={handleSubmit(onSubmit)}>
        <IconButton
          onClick={() => setReviewPopup(false)}
          style={{ position: "absolute", top: "20px", right: "20px" }}
        >
          <img src={close_icon} alt="" />
        </IconButton>
        <Content>
          <Title>Rate and review the shipment</Title>
          <Subtitle>
            Leave your review on agent and his services. The review will be
            approved by the platform’s support team and posted on the agent
            profile page.
          </Subtitle>
          <StarsWrapper>
            <StyledRating
              name="rating"
              precision={0.5}
              emptyIcon={<StarBorderIcon fontSize="inherit" />}
              value={ratingValue}
              onChange={(event, newValue) => {
                setRatingValue(Number(newValue));
              }}
            />
          </StarsWrapper>
        </Content>

        <Controller
          name="comment"
          control={control}
          defaultValue=""
          rules={{
            required: "Field is required",
          }}
          as={
            <div style={{ width: "100%", padding: "0 70px" }}>
              <FormTextarea
                error={!!errors?.comment}
                placeholder="Comments.."
              />
              {!!errors?.comment && (
                <ErrorMessage>Field is required</ErrorMessage>
              )}
            </div>
          }
        />
        <ButtonsWrapper>
          <ConfirmButton>submit</ConfirmButton>
        </ButtonsWrapper>
      </Inner>
    </Wrapper>
  );
};

export default ClientReviewPopup;
