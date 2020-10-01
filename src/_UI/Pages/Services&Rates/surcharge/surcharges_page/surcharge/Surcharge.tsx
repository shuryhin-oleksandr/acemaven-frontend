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
import { useState } from "react";
import FormField from "src/_UI/components/_commonComponents/Input/FormField";
import styled from "styled-components";



const Surcharge = () => {
    const [formMode, setFormMode] = useState(false)

    return (
        <SurchargeContainer>
            <SurchargeContent>
                <Wrap>
                    <SurchargeTitle>
                        Surcharge
                    </SurchargeTitle>
                    {formMode && <FormButtons>
                        <SaveButton type='submit'>SAVE CHANGES</SaveButton>
                        <CancelButtonWrap onClick={() => setFormMode(false)}>CANCEL</CancelButtonWrap>
                    </FormButtons>
                    }
                </Wrap>
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
                            {!formMode
                                ? <ContentDate onClick={() => setFormMode(true)}>12/12/2020</ContentDate>
                                : <FormField name='start_date'
                                             maxW='110px'
                                             focusBack='#E5F7FD'
                                             height='33px'
                                />
                            }
                        </FieldOuter>
                        <FieldOuter>
                            <Label>Expiration Date</Label>
                            { !formMode
                                ? <ContentDate onClick={() => setFormMode(true)}>20/12/2020</ContentDate>
                                :  <FormField name='exp_date'
                                              maxW='110px'
                                              focusBack='#E5F7FD'
                                              height='33px'
                                    />
                            }



                        </FieldOuter>
                    </FieldsWrap>
                </InfoWrap>
                <LineWrap />
                <HandlingSurcharge setFormMode={setFormMode}/>
                <LineWrap bc='#BDBDBD'/>
                <Additional setFormMode={setFormMode}/>
            </SurchargeContent>
        </SurchargeContainer>
    )
}

export default Surcharge


type PropsStyle = {
    w?: string
}
const Wrap = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`
const FormButtons = styled.div`
display: flex;
max-width: 325px;
width: 100%;
justify-content: space-between;
`
const SaveButton = styled.button`
  outline: none;
  background-color: black;
  color: white;
  font-family: "Helvetica Reg", sans-serif;
  font-size: 14px;
  border: none;
  height: 40px;
  width: 200px;
  padding: 0;
  &:hover {
    cursor: pointer
  }
`

const CancelButtonWrap = styled.button<PropsStyle>`
font-family: "Helvetica Reg", sans-serif;
font-size: 14px;
background: white;
outline: none;
border: 1px solid #3B3B41;
height: 40px;
max-width: ${({w}) => w ? w : '115px'};
width: 100%;
color: #3B3B41;
transition: .3s;

&:hover {
 transition: .3s;
 background-color: #E0E0E0;
cursor: pointer
}
`