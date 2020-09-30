import React from "react";
import {
    ScopeContent,
    ScopeIcon,
    ScopeInner,
    ScopeNavigation,
    ScopeOuter,
    ScopeSubtitle,
    ScopeTitle
} from "./scope-style";
import loop from '../../../../../_UI/assets/icons/landing/surface1.svg'
import weight from '../../../../../_UI/assets/icons/landing/weight1.svg'
import tracker from '../../../../../_UI/assets/icons/landing/track1.svg'
import RouteButton from "src/_UI/components/_commonComponents/buttons/route_button/RouteButton";

const ScopePart = () => {
    return (
        <ScopeOuter>
            <ScopeInner>
                <ScopeContent>
                    <ScopeIcon><img src={loop} alt=""/></ScopeIcon>
                    <ScopeTitle>Select freight forwarder</ScopeTitle>
                    <ScopeSubtitle>There would be a description of the feature.</ScopeSubtitle>
                </ScopeContent>
                <ScopeContent>
                    <ScopeIcon><img src={weight} alt=""/></ScopeIcon>
                    <ScopeTitle>CBM calculator</ScopeTitle>
                    <ScopeSubtitle>There would be a description of the feature.</ScopeSubtitle>
                </ScopeContent>
                <ScopeContent>
                    <ScopeIcon><img src={tracker} alt=""/></ScopeIcon>
                    <ScopeTitle>Track transfer</ScopeTitle>
                    <ScopeSubtitle>There would be a description of the feature.</ScopeSubtitle>
                </ScopeContent>
            </ScopeInner>
            <ScopeNavigation>
                <RouteButton path='#' text='START AS CLIENT' back='#1B1B25' textColor='white' w='235px'/>
                <RouteButton border='1px solid #1B1B25'  path='#' text='START AS CLIENT' textColor='#1B1B25' back='transparent' w='235px'/>
            </ScopeNavigation>
        </ScopeOuter>
    )
}

export default ScopePart