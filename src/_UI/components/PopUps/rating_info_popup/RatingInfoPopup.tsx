import React from 'react'
import {
    Card, CardTitle,
    CloseIcon,
    CompanyInfoWrap,
    CompanyWrap,  Count, CountStar, InfoLine, InfoTitle, InfoValue,
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
import white_fill_star from '../../../../_UI/assets/icons/search/white_fill_star.svg'
import white_part_fill_star from '../../../../_UI/assets/icons/search/white_part_fill_star.svg'
import white_empty_star from '../../../../_UI/assets/icons/search/white_empty_star.svg'
import ReviewCard from "./ReviewCard";
import ScrollbarStyled from "../../_commonComponents/ScrollbarStyled/ScrollbarStyled";

type PropsType = {
    showRatingPopup: (value: boolean) => void
}

const RatingInfoPopup:React.FC<PropsType> = ({showRatingPopup}) => {
    return (
        <RatingPopupContainer>
            <RatingInner>
                <RatingHeader>
                    <CompanyWrap>
                        <NameWrap>
                            <Name>Company Co.</Name>
                            <TypeWrap>
                                <img src={sea} alt=""/>
                                <img src={air} alt=""/>
                            </TypeWrap>
                        </NameWrap>
                        <CompanyInfoWrap>
                            <InfoLine>
                                <InfoTitle>On service since:</InfoTitle>
                                <InfoValue>2 MAY 2017 (3 YEARS)</InfoValue>
                            </InfoLine>
                            <InfoLine>
                                <InfoTitle>Operations done:</InfoTitle>
                                <InfoValue>24</InfoValue>
                            </InfoLine>
                        </CompanyInfoWrap>
                    </CompanyWrap>
                    <RatingCardWrapper>
                        <Card>
                            <CardTitle>Rating</CardTitle>
                            <Count>3,7</Count>
                            <CountStar>
                                <img src={white_fill_star} alt=""/>
                                <img src={white_fill_star} alt=""/>
                                <img src={white_fill_star} alt=""/>
                                <img src={white_part_fill_star} alt=""/>
                                <img src={white_empty_star} alt=""/>
                            </CountStar>
                        </Card>
                        <CloseIcon onClick={() => showRatingPopup(false)}><img src={close} alt=""/></CloseIcon>
                    </RatingCardWrapper>
                </RatingHeader>
                <ReviewWrapper>
                    <ReviewTitle>REVIEWS (7)</ReviewTitle>
                    <ScrollbarStyled {...{style: {height: 640}}}>
                        <ReviewsInner>
                            <ReviewCard />
                            <ReviewCard />
                            <ReviewCard />
                            <ReviewCard />
                            <ReviewCard />
                            <ReviewCard />
                            <ReviewCard />
                        </ReviewsInner>
                    </ScrollbarStyled>
                </ReviewWrapper>
            </RatingInner>
        </RatingPopupContainer>
    )
}

export default RatingInfoPopup

