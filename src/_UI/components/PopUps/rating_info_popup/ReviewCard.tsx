import React from 'react'
import {
    CompName,
    LeftPart,
    ModeDirection,
    OpinionTime,
    PhotoWrap,
    Rating, ReviewCardWrap,
    ReviewCompany,
    ReviewInfo, ReviewWords, Words
} from "./rating-popup-styles";
import user from "../../../assets/icons/user.png";
import blue_fill_star from "../../../assets/icons/search/filled_star.svg";
import blue_part_fill_star from "../../../assets/icons/search/part_filled_star.svg";
import blue_empty_star from "../../../assets/icons/search/empty_star.svg";

type PropsType = {
    user_opinion?: any
}

const ReviewCard:React.FC<PropsType> = () => {
    return (
        <ReviewCardWrap>
            <PhotoWrap><img src={user} alt=""/></PhotoWrap>
            <ReviewInfo>
                <ReviewCompany>
                    <LeftPart>
                        <CompName>Coca Cola Co.</CompName>
                        <ModeDirection>FCL, SRZ-BRL</ModeDirection>
                        <Rating>
                            <img src={blue_fill_star} alt=""/>
                            <img src={blue_fill_star} alt=""/>
                            <img src={blue_fill_star} alt=""/>
                            <img src={blue_part_fill_star} alt=""/>
                            <img src={blue_empty_star} alt=""/>
                        </Rating>
                    </LeftPart>
                    <OpinionTime>07:44 am 10 MAY 2020</OpinionTime>
                </ReviewCompany>
                <ReviewWords>
                    <Words>
                        Document Fee will have the condition fixed permanent because this cost doesn’t
                        depend on the characteristics of the cargo. If this fee has a value, one will
                        apply as default per operation unless the client request more during the booking
                        request or operation. EX: If we’re going to book 1 x 20’ container and 2 x 40’
                        container in the same shipment, the customer will pay for 1 Bill of Lading only but
                        3 x Handling charges. If the client requires 5 document.
                    </Words>
                </ReviewWords>
            </ReviewInfo>
        </ReviewCardWrap>
    )
}

export default ReviewCard