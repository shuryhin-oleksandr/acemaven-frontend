import React from "react";
import {SpinnerAuthContainer, SpinnerAuthContent} from "./spinner-styles";
import spinner from '../../../../_UI/assets/icons/fly_loading.gif'

const SpinnerForAuthorizedPages:React.FC = () => {
    return (
        <SpinnerAuthContainer>
            <SpinnerAuthContent>
                <img src={spinner} alt=""/>
            </SpinnerAuthContent>
        </SpinnerAuthContainer>
    )
}

export default SpinnerForAuthorizedPages