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
import {useTranslation} from "react-i18next";

const ShippingModePart = () => {
    let dispatch = useDispatch();
    const {t} = useTranslation();
    return (
        <ModesWrapper>
            <ModesInner>
                <Mode>
                    <ShipModeImage/>
                    <Block>
                        <Description>
                            {t("Landing Page/Marine shipping mode")}
                        </Description>
                        <MarineTitle>{t("Landing Page/description_Marine_shipping_mode")}</MarineTitle>
                    </Block>

                </Mode>
                <Mode direction='row-reverse'>
                    <AirModeImage/>
                    <Block back='#115B86'>
                        <Description>
                            {t("Landing Page/description_Air_shipping_mode")}
                        </Description>
                        <AirTitle>{t("Landing Page/Air shipping mode")}</AirTitle>
                    </Block>

                </Mode>
                <div style={{width: '100%', display: 'flex', justifyContent: 'center', marginTop: '76px'}}><RouteButton
                    callback={() => {
                        dispatch(authActions.setOpenSignIn(true));
                    }} text={t('Landing Page/GET STARTED')} textColor='white' back='#1B1B25' w='203px'/></div>
            </ModesInner>
        </ModesWrapper>
    )
}

export default ShippingModePart