import React, {useEffect} from 'react'
import {
    Card, CardTitle,
    CompanyInfoWrap,
    CompanyWrap,  Count, InfoLine, InfoTitle, InfoValue,
    Name,
    NameWrap, RatingCardWrapper,
    RatingHeader,
    RatingInner,
    RatingPopupContainer, ReviewsInner, ReviewTitle, ReviewWrapper,
    TypeWrap,
} from "./rating-popup-styles";
import sea from '../../../../_UI/assets/icons/rates&services/ship-surcharge.svg'
import air from '../../../../_UI/assets/icons/rates&services/plane-surcharge.svg'
import close from '../../../../_UI/assets/icons/close-icon.svg'
import ReviewCard from "./ReviewCard";
import ScrollbarStyled from "../../_commonComponents/ScrollbarStyled/ScrollbarStyled";
import {useDispatch, useSelector} from "react-redux";
import {getCompanyRatingThunk} from "../../../../_BLL/thunks/search_client_thunks/searchClientThunks";
import {getSearchedCompanyRatingSelector} from "../../../../_BLL/selectors/search/searchClientSelector";
import {IconButton, withStyles} from "@material-ui/core";
import {StarsWrapper} from "../client_review_popup/client-review-styles";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import {Rating} from "@material-ui/lab";
import {VoidFunctionType} from "../../../../_BLL/types/commonTypes";

type PropsType = {
    closeReviewPopupHandler: VoidFunctionType,
    clickedReview: number
}

const StyledRating = withStyles({
    iconFilled: {
        color: "#000000",
    },
})(Rating);

const RatingInfoPopup:React.FC<PropsType> = ({closeReviewPopupHandler, clickedReview}) => {
    //hooks
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getCompanyRatingThunk(clickedReview))
    }, [])

    let default_value = 0



    //data from store
    const rating_data = useSelector(getSearchedCompanyRatingSelector)


    useEffect(() => {
        if(rating_data) {
            default_value = rating_data.rating/2
        }
    }, [rating_data])

    return (
        <RatingPopupContainer>
            <RatingInner>
                <RatingHeader>
                    <CompanyWrap>
                        <NameWrap>
                            <Name>{rating_data?.name}</Name>
                            <TypeWrap>
                                <img src={sea} alt=""/>
                                <img src={air} alt=""/>
                            </TypeWrap>
                        </NameWrap>
                        <CompanyInfoWrap>
                            <InfoLine>
                                <InfoTitle>On service since:</InfoTitle>
                                <InfoValue>{rating_data?.date_created}</InfoValue>
                            </InfoLine>
                            <InfoLine>
                                <InfoTitle>Operations done:</InfoTitle>
                                <InfoValue>{rating_data?.operations_are_done}</InfoValue>
                            </InfoLine>
                        </CompanyInfoWrap>
                    </CompanyWrap>
                    <RatingCardWrapper>
                        <Card>
                            <CardTitle style={{color: '#000000'}}>Rating</CardTitle>
                            <Count>{rating_data?.rating}</Count>
                            {rating_data && <StarsWrapper marginBottom={'0px'}>
                                <StyledRating
                                    name="rating"
                                    precision={0.5}
                                    emptyIcon={<StarBorderIcon fontSize="inherit" />}
                                    defaultValue={rating_data.rating/2}
                                    readOnly
                                />
                            </StarsWrapper>}
                        </Card>
                        <IconButton onClick={closeReviewPopupHandler}>
                            <img src={close} alt=""/>
                        </IconButton>
                    </RatingCardWrapper>
                </RatingHeader>
                <ReviewWrapper>
                    <ReviewTitle>REVIEWS ({rating_data?.reviews.length})</ReviewTitle>
                    <ScrollbarStyled {...{style: {height: 640}}}>
                        <ReviewsInner>
                            {rating_data?.reviews.map(r => <ReviewCard review={r ? r : null}/>)}
                        </ReviewsInner>
                    </ScrollbarStyled>
                </ReviewWrapper>
            </RatingInner>
        </RatingPopupContainer>
    )
}

export default RatingInfoPopup

