
import React from 'react';
import Flickity from 'react-flickity-component'
import lan1 from '../../../_UI/assets/icons/landing/3620.jpg'
import lan2 from '../../../_UI/assets/icons/landing/Landing1.jpg'
import lan3 from '../../../_UI/assets/icons/landing/Landing3.png'
import './flickity.css'
import SliderHeaderComponent from "../../Pages/landing/components/header/SliderHeaderComponent";
import {useDispatch} from "react-redux";
import {authActions} from "../../../_BLL/reducers/authReducer";
import {useTranslation} from "react-i18next";

const SliderCarousel = () => {

    const flickityOptions = {
        initialIndex: 0,
        prevNextButtons: false,
        autoPlay: 3000,
        pauseAutoPlayOnHover: true
    }
    const dispatch = useDispatch();

    const {t} = useTranslation();
    return (
           <Flickity
               className={'carousel'} // default ''
               elementType={'div'} // default 'div'
               options={flickityOptions} // takes flickity options {}
               disableImagesLoaded={false} // default false
               reloadOnUpdate // default false
               static // default false
           >
               <SliderHeaderComponent background_img={lan1}
                                      background_size='cover'
                                      title_text={t("Landing Page/Air and Sea shipmens")}
                                      subtitle_text={t('Landing Page/Acemaven_title1')}
                                      callback={()=>{dispatch(authActions.setOpenSignIn(true))}}
               />
               <SliderHeaderComponent background_img={lan2}
                                      background_repeat='no-repeat'
                                      background_size='cover'
                                      title_text={t("Landing Page/Search for the best rates")}
                                      subtitle_text={t('Landing Page/Acemaven_title2')}
                                      callback={()=>{dispatch(authActions.setOpenSignIn(true))}}
               />
               <SliderHeaderComponent background_img={lan3}
                                      background_repeat='no-repeat'
                                      background_size='cover'
                                      button_background='#115b86'
                                      login_color='#1b1b25'
                                      borderColor='transparent'
                                      title_text={t("Landing Page/Track your shipment")}
                                      subtitle_text={t('Landing Page/Acemaven_title3')}
                                      subtitle_max_width='326px'
                                      callback={()=>{dispatch(authActions.setOpenSignIn(true))}}
               />
       </Flickity>

    )
}

export default SliderCarousel


