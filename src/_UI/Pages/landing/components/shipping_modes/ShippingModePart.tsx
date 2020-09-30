import React from "react";
import {AirModeImage, AirTitle, Block, Description, MarineTitle, Mode, ModesInner, ModesWrapper, ShipModeImage } from "./shippping_mode-styles";
import RouteButton from "../../../../components/_commonComponents/buttons/route_button/RouteButton";

const ShippingModePart = () => {
    return (
        <ModesWrapper>
            <ModesInner>
                <Mode>
                    <ShipModeImage />
                    <Block>
                        <Description>There would be text about marine shipping.
                            There would be text about marine shipping.
                            There would be text about marine shipping
                        </Description>
                        <RouteButton text='GET STARTED' textColor='white' back='#00C5FF' path='#' w='203px'/>
                    </Block>
                    <MarineTitle>Marine shipping mode</MarineTitle>
                </Mode>
                <Mode direction='row-reverse'>
                    <AirModeImage />
                    <Block back='#115B86'>
                        <Description>There would be text about marine shipping.
                            There would be text about marine shipping.
                            There would be text about marine shipping
                        </Description>
                        <RouteButton text='GET STARTED' textColor='white' back='#1B1B25' path='#' w='203px'/>
                    </Block>
                    <AirTitle>Air <br/> shipping mode</AirTitle>
                </Mode>
            </ModesInner>
        </ModesWrapper>
    )
}

export default ShippingModePart