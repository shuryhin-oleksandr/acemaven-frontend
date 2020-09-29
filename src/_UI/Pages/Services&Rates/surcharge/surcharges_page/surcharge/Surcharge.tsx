import React from "react";
import {
    Content,
    ContentDate,
    FieldOuter,
    FieldsWrap,
    InfoWrap, Label,
    LineWrap,
    ShippingMode,
    SurchargeContainer,
    SurchargeContent,
    SurchargeTitle
} from "./surcharge-style";
import ship from '../../../../../../_UI/assets/icons/rates&services/ship-surcharge.svg'
import HandlingSurcharge from "./HandlingSurcharge";
import Additional from "./Additional";


const Surcharge = () => {
    return (
        <SurchargeContainer>
            <SurchargeContent>
                <SurchargeTitle>
                    Surcharge
                </SurchargeTitle>
                <InfoWrap>
                    <ShippingMode>
                        <img src={ship} alt=""/>
                    </ShippingMode>
                    <FieldsWrap>
                        <FieldOuter>
                            <Label>Carrier</Label>
                            <Content>BestAmericanairlines Co.</Content>
                        </FieldOuter>
                        <FieldOuter>
                            <Label>Shipping mode</Label>
                            <Content>Loose Cargo</Content>
                        </FieldOuter>
                    </FieldsWrap>
                    <FieldsWrap>
                        <FieldOuter>
                            <Label>direction</Label>
                            <Content c='#115B86'>Export</Content>
                        </FieldOuter>
                        <FieldOuter>
                            <Label>Location</Label>
                            <Content c='#115B86'>Rio</Content>
                        </FieldOuter>
                    </FieldsWrap>
                    <FieldsWrap>
                        <FieldOuter style={{marginBottom: '8px'}}>
                            <Label>Start date</Label>
                            <ContentDate>12/12/2020</ContentDate>
                        </FieldOuter>
                        <FieldOuter>
                            <Label>Expiration Date</Label>
                            <ContentDate>20/12/2020</ContentDate>
                        </FieldOuter>
                    </FieldsWrap>
                </InfoWrap>
                <LineWrap />
                <HandlingSurcharge />
                <LineWrap bc='#BDBDBD'/>
                <Additional />
            </SurchargeContent>
        </SurchargeContainer>
    )
}

export default Surcharge