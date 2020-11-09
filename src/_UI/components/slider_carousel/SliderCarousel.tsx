
import React from 'react';
import Flickity from 'react-flickity-component'
import lan1 from '../../../_UI/assets/icons/landing/3620.jpg'
import lan2 from '../../../_UI/assets/icons/landing/Landing1.jpg'
import lan3 from '../../../_UI/assets/icons/landing/Landing3.png'
import './flickity.css'
import SliderHeaderComponent from "../../Pages/landing/components/header/SliderHeaderComponent";

const SliderCarousel = () => {

    const flickityOptions = {
        initialIndex: 0,
        prevNextButtons: false,
        //autoPlay: 3000,
        pauseAutoPlayOnHover: true
    }


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
                                      title_text={['AIR', 'AND SEA', 'SHIPMENTS']}
                                      subtitle_text='Acemaven supports imports and exports and various types of air and sea shipments.'
               />
               <SliderHeaderComponent background_img={lan2}
                                      background_repeat='no-repeat'
                                      background_size='cover'
                                      title_text={['SEARCH', 'FOR THE', 'BEST RATES']}
                                      subtitle_text='Compare freight rates from various agents and book the best conditions for your shipment.'
               />
               <SliderHeaderComponent background_img={lan3}
                                      background_repeat='no-repeat'
                                      background_size='cover'
                                      button_background='#115b86'
                                      login_color='#1b1b25'
                                      borderColor='transparent'
                                      title_text={['TRACK', 'YOUR', 'SHIPMENT']}
                                      subtitle_text='Once you shipment has departed, track its position in real time.'
                                      subtitle_max_width='326px'
               />
       </Flickity>

    )
}

export default SliderCarousel


