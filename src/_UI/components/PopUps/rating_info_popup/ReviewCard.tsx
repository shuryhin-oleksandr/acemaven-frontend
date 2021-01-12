import React from 'react'
//types
import {ReviewType} from "../../../../_BLL/types/search/search_types";
//components
import RatingStars from "../../_commonComponents/rating_stars/RatingStars";
//styles
import {
    CompName,
    LeftPart,
    ModeDirection,
    OpinionTime,
    PhotoWrap,
    ReviewCardWrap,
    ReviewCompany,
    ReviewInfo, ReviewWords, Words
} from "./rating-popup-styles";
//icons
import user_default from "../../../assets/icons/profile/miniDEfaultPhoto.svg";


type PropsType = {
    review: ReviewType | null
}

const ReviewCard:React.FC<PropsType> = ({review}) => {
    return (
        <ReviewCardWrap>
            <PhotoWrap>
                <img src={review?.reviewer_photo ? review?.reviewer_photo : user_default} alt=""/>
            </PhotoWrap>
            <ReviewInfo>
                <ReviewCompany>
                    <LeftPart>
                        <CompName>{review?.company}</CompName>
                        <ModeDirection>{review?.route}</ModeDirection>
                        <RatingStars rating_value={Number(review?.rating)} marginBottom={'0px'}/>
                    </LeftPart>
                    <OpinionTime>{review?.date_created}</OpinionTime>
                </ReviewCompany>
                <ReviewWords>
                    <Words>
                        {review?.comment}
                    </Words>
                </ReviewWords>
            </ReviewInfo>
        </ReviewCardWrap>
    )
}

export default ReviewCard