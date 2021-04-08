import React from 'react'
//material ui
import StarBorderIcon from "@material-ui/icons/StarBorder";
import {withStyles} from "@material-ui/core";
import {Rating} from "@material-ui/lab";
//styles
import {CompanyName,  RatingPart, } from "./search-card-styles";
import {StarsWrapper} from "../../../../components/PopUps/client_review_popup/client-review-styles";
import {useTranslation} from "react-i18next";


type PropsType = {
    showRatingPopup: (value: boolean) => void,
    company: {id: number, name: string, rating: number | null},
    setClickedReview?: (value: number) => void
}

const StyledRating = withStyles({
    iconFilled: {
        color: "#115B86",
    },
})(Rating);

const RatingPartContainer:React.FC<PropsType> = ({showRatingPopup, company, ...props}) => {

    let ratingHandler = () => {
        showRatingPopup(true)
        props.setClickedReview && props.setClickedReview(company.id)
    }
    const {t} = useTranslation();
    return (
        <RatingPart >
               <CompanyName>{company?.name}</CompanyName>
            {company.rating
                ? <StarsWrapper onClick={() => ratingHandler()}
                                justifyContent={'flex-start'}
                >
                    <StyledRating
                        name="rating"
                        precision={0.5}
                        emptyIcon={<StarBorderIcon fontSize="inherit" />}
                        defaultValue={company.rating/2}
                        readOnly
                    />
                </StarsWrapper>
                : <span style={{fontFamily: 'Helvetica Reg', fontSize: '13px', color: '#7C7C89'}}>*{t("Company profile/Agent Rating")}</span>
            }

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