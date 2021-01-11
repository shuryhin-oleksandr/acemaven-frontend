import React from 'react'
import {withStyles} from "@material-ui/core";
import {Rating} from "@material-ui/lab";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import {StarsWrapper} from "../../PopUps/client_review_popup/client-review-styles";

type PropsType = {
    rating_value: number,
    marginBottom?: string
}


const StyledRating = withStyles({
    iconFilled: {
        color: "#115B86",
    },
})(Rating);

const RatingStars:React.FC<PropsType> = ({rating_value, marginBottom}) => {
    return (
        <StarsWrapper marginBottom={marginBottom}>
            <StyledRating
                name="rating"
                precision={0.5}
                emptyIcon={<StarBorderIcon fontSize="inherit" />}
                defaultValue={rating_value/2}
                readOnly
            />
        </StarsWrapper>
    )
}

export default RatingStars