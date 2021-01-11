import React from 'react'
//styles
import {CompanyName, NoRatingUnderText, NoRatingUpperText, RatingPart, RatingWrap} from "./search-card-styles";
//icons
import blue_fill_star from "../../../../assets/icons/search/filled_star.svg";
import blue_part_fill_star from "../../../../assets/icons/search/part_filled_star.svg";
import blue_empty_star from "../../../../assets/icons/search/empty_star.svg";

type PropsType = {
    showRatingPopup: (value: boolean) => void,
    company: {id: number, name: string, rating: number | null}
}

const RatingPartContainer:React.FC<PropsType> = ({showRatingPopup, company}) => {


    return (
        <RatingPart >
               <CompanyName>{company?.name}</CompanyName>
               <RatingWrap onClick={() => showRatingPopup(true)}>
                   <img src={blue_fill_star} alt=""/>
                   <img src={blue_fill_star} alt=""/>
                   <img src={blue_fill_star} alt=""/>
                   <img src={blue_part_fill_star} alt=""/>
                   <img src={blue_empty_star} alt=""/>
               </RatingWrap>
                   {/* <NoRatingUnderText>
                        **Will be displayed after booking confirmation
                    </NoRatingUnderText>
                    <NoRatingUnderText>
                        ***Will be displayed after payment is completed
                    </NoRatingUnderText>*/}
        </RatingPart>
    )
}

export default RatingPartContainer