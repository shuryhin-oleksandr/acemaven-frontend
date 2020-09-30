import React from 'react';
import {CardContent, LabelWrap, PartnersCardOuter, SpanWrap, TextWrap} from './partenrs-table-style';


const PartnersCard:React.FC = () => {
    return (
        <PartnersCardOuter>
            <CardContent>
                <SpanWrap>
                    <LabelWrap>Company name</LabelWrap>
                    <TextWrap>Transfer Co.</TextWrap>
                </SpanWrap>
                <SpanWrap>
                    <LabelWrap>Address</LabelWrap>
                    <TextWrap>Transfer Co.</TextWrap>
                </SpanWrap>
                <SpanWrap>
                    <LabelWrap>City</LabelWrap>
                    <TextWrap>Transfer Co.</TextWrap>
                </SpanWrap>
                <SpanWrap>
                    <LabelWrap>State</LabelWrap>
                    <TextWrap>Transfer Co.</TextWrap>
                </SpanWrap>
                <SpanWrap>
                    <LabelWrap>Zip code</LabelWrap>
                    <TextWrap>Transfer Co.</TextWrap>
                </SpanWrap>
                <SpanWrap>
                    <LabelWrap>Phone number</LabelWrap>
                    <TextWrap>Transfer Co.</TextWrap>
                </SpanWrap>
                <SpanWrap>
                    <LabelWrap>Zip email address</LabelWrap>
                    <TextWrap>Transfer Co.</TextWrap>
                </SpanWrap>
                <SpanWrap>
                    <LabelWrap>Contact name</LabelWrap>
                    <TextWrap>Transfer Co.</TextWrap>
                </SpanWrap>
            </CardContent>
        </PartnersCardOuter>
    )
}

export default PartnersCard

