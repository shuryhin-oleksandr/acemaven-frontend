import React from 'react';
import Flickity from 'react-flickity-component'
import lan1 from '../../../_UI/assets/icons/landing/3620.jpg'
import lan2 from '../../../_UI/assets/icons/landing/Landing1.png'
import lan3 from '../../../_UI/assets/icons/landing/Landing3.png'
import './slider.css'


const Slider:React.FC = () => {
    const flickityOptions = {
        initialIndex: 2,
        autoPlay: 1500,
        pauseAutoPlayOnHover: true,
        prevNextButtons: false,
        pageDots: true,
        lazyLoad: true
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
            <img src={lan1} alt=''/>
            <img src={lan2} alt=''/>
            <img src={lan3} alt=''/>
        </Flickity>
    )
}

export default Slider


