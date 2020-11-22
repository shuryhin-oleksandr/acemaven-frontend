import React from 'react'
//styles
import {CompanyName, NoRatingUnderText, NoRatingUpperText, RatingPart, RatingWrap} from "./search-card-styles";
//icons
import blue_fill_star from "../../../../assets/icons/search/filled_star.svg";
import blue_part_fill_star from "../../../../assets/icons/search/part_filled_star.svg";
import blue_empty_star from "../../../../assets/icons/search/empty_star.svg";

type PropsType = {
    showRatingPopup: (value: boolean) => void
}

const RatingPartContainer:React.FC<PropsType> = ({showRatingPopup}) => {
    let is_rating = false

    return (
        <RatingPart >
            {is_rating
                ? <>
               <CompanyName>TransferCo.</CompanyName>
               <RatingWrap onClick={() => showRatingPopup(true)}>
                   <img src={blue_fill_star} alt=""/>
                   <img src={blue_fill_star} alt=""/>
                   <img src={blue_fill_star} alt=""/>
                   <img src={blue_part_fill_star} alt=""/>
                   <img src={blue_empty_star} alt=""/>
               </RatingWrap>
           </>
                : <>
                    <NoRatingUpperText>*Agent Company name</NoRatingUpperText>
                    <NoRatingUpperText margin_bottom='7px'>*Agent Rating</NoRatingUpperText>
                    <NoRatingUnderText>
                        **Will be displayed after booking confirmation
                    </NoRatingUnderText>
                    <NoRatingUnderText>
                        ***Will be displayed after payment is completed
                    </NoRatingUnderText>
                </>
            }

        </RatingPart>
    )
}

export default RatingPartContainer