import React from "react";
import {SpinnerAuthContainer, SpinnerAuthContent} from "./spinner-styles";
import spinner from '../../../../_UI/assets/icons/fly_loading.gif'

type PropsType = {
    min_height?: string
}

const SpinnerForAuthorizedPages:React.FC<PropsType> = ({min_height}) => {
    return (
        <SpinnerAuthContainer min_height={min_height}>
            <SpinnerAuthContent >
                <img src={spinner} alt=""/>
            </SpinnerAuthContent>
        </SpinnerAuthContainer>
    )
}

export default SpinnerForAuthorizedPages