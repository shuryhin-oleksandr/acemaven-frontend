import React from "react";
import {SpinnerContainer, SpinnerContent} from "./spinner-styles";
import spinner from '../../../../_UI/assets/icons/fly_loading.gif'

const Spinner:React.FC = () => {
    return (
        <SpinnerContainer>
            <SpinnerContent>
                <img src={spinner} alt=""/>
            </SpinnerContent>
        </SpinnerContainer>
    )
}

export default Spinner