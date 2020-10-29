import React from "react";
import SliderCarousel from "../../../../components/slider_carousel/SliderCarousel";


const LandingHeader = ({openSignIn, openSignUp}) => {

    return (
        <SliderCarousel openSignIn={openSignIn} openSignUp={openSignUp}/>
    )
}

export default LandingHeader