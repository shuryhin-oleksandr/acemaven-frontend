import React from "react";
import {
    AirModeImage,
    AirTitle,
    Block,
    Description,
    MarineTitle,
    Mode,
    ModesInner,
    ModesWrapper,
    ShipModeImage
} from "./shippping_mode-styles";
import RouteButton from "../../../../components/_commonComponents/buttons/route_button/RouteButton";
import {authActions} from "../../../../../_BLL/reducers/authReducer";
import {useDispatch} from "react-redux";

const ShippingModePart = () => {
    let dispatch = useDispatch();
    return (
        <ModesWrapper>
            <ModesInner>
                <Mode>
                    <ShipModeImage/>
                    <Block>
                        <Description>There would be text about marine shipping.
                            There would be text about marine shipping.
                            There would be text about marine shipping
                        </Description>
                        <MarineTitle>Marine shipping mode</MarineTitle>
                    </Block>

                </Mode>
                <Mode direction='row-reverse'>
                    <AirModeImage/>
                    <Block back='#115B86'>
                        <Description>There would be text about marine shipping.
                            There would be text about marine shipping.
                            There would be text about marine shipping
                        </Description>
                        <AirTitle>Air <br/> shipping mode</AirTitle>
                    </Block>

                </Mode>
                <div style={{width: '100%', display: 'flex', justifyContent: 'center', marginTop: '76px'}}><RouteButton
                    callback={() => {
                        dispatch(authActions.setOpenSignIn(true));
                    }} text='GET STARTED' textColor='white' back='#1B1B25' path='#' w='203px'/></div>
            </ModesInner>
        </ModesWrapper>
    )
}

export default ShippingModePart