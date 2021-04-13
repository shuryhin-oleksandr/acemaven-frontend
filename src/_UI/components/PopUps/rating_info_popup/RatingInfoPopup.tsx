import React, {useEffect} from 'react'
//material ui
import {IconButton} from "@material-ui/core";
//react-redux
import {useDispatch, useSelector} from "react-redux";
//BLL
import {getCompanyRatingThunk} from "../../../../_BLL/thunks/search_client_thunks/searchClientThunks";
import {
    getSearchedCompanyRatingSelector,
    getSearchIsFetching
} from "../../../../_BLL/selectors/search/searchClientSelector";
//types
import {VoidFunctionType} from "../../../../_BLL/types/commonTypes";
//components
import ReviewCard from "./ReviewCard";
import ScrollbarStyled from "../../_commonComponents/ScrollbarStyled/ScrollbarStyled";
import RatingStars from "../../_commonComponents/rating_stars/RatingStars";
//styles
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
//icons
import sea from '../../../../_UI/assets/icons/rates&services/ship-surcharge.svg'
import air from '../../../../_UI/assets/icons/rates&services/plane-surcharge.svg'
import close from '../../../../_UI/assets/icons/close-icon.svg'
import SpinnerForAuthorizedPages from "../../_commonComponents/spinner/SpinnerForAuthorizedPages";
import {useTranslation} from "react-i18next";



type PropsType = {
    closeReviewPopupHandler: VoidFunctionType,
    clickedReview: number
}


const RatingInfoPopup:React.FC<PropsType> = ({closeReviewPopupHandler, clickedReview}) => {
    //hooks
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getCompanyRatingThunk(clickedReview))
    }, [])


    //data from store
    const rating_data = useSelector(getSearchedCompanyRatingSelector)
    const isFetching = useSelector(getSearchIsFetching)
    const {t} = useTranslation();

    return (
        <RatingPopupContainer>
            {isFetching
                ? <SpinnerForAuthorizedPages />
                : <RatingInner>
                    <IconButton onClick={closeReviewPopupHandler}
                                style={{position: 'absolute', top: '20px', right: '20px'}}
                    >
                        <img src={close} alt=""/>
                    </IconButton>
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
                                    <InfoTitle>{t("Dashboard/On service since")}:</InfoTitle>
                                    <InfoValue>{rating_data?.date_created}</InfoValue>
                                </InfoLine>
                                <InfoLine>
                                    <InfoTitle>{t("Dashboard/Operations done")}:</InfoTitle>
                                    <InfoValue>{rating_data?.operations_are_done}</InfoValue>
                                </InfoLine>
                            </CompanyInfoWrap>
                        </CompanyWrap>
                        <RatingCardWrapper>
                            <Card>
                                <CardTitle style={{color: '#000000'}}>{t("Company profile/Rating")}</CardTitle>
                                <Count>{rating_data?.rating}</Count>
                                {rating_data && <RatingStars marginBottom={'0px'}
                                                             rating_value={rating_data?.rating}
                                />}
                            </Card>
                        </RatingCardWrapper>
                    </RatingHeader>
                    <ReviewWrapper>
                        <ReviewTitle>{t("Company profile/Reviews")} ({rating_data?.reviews.length})</ReviewTitle>
                        <ScrollbarStyled {...{style: {height: 500}}}>
                            <ReviewsInner>
                                {rating_data?.reviews.map(r => <ReviewCard review={r ? r : null}/>)}
                            </ReviewsInner>
                        </ScrollbarStyled>
                    </ReviewWrapper>
                </RatingInner>
            }
        </RatingPopupContainer>
    )
}

export default RatingInfoPopup

