import React, {useEffect} from "react";
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
import plane from '../../../../../../_UI/assets/icons/rates&services/plane-surcharge.svg'
import HandlingSurcharge from "./HandlingSurcharge";
import Additional from "./Additional";
import { useState } from "react";
import FormField from "src/_UI/components/_commonComponents/Input/FormField";
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {getSurchargeInfo} from "../../../../../../_BLL/reducers/surcharge&rates/surchargeThunks";
import {useHistory} from 'react-router-dom'
import {AppStateType} from "../../../../../../_BLL/store";
import {withRouter} from 'react-router'
import {useForm} from "react-hook-form";
import {SurchargeObjectType} from "../../../../../../_BLL/types/rates&surcharges/surchargesTypes";
import {getSurcharge} from "../../../../../../_BLL/thunks/surchargeSelectors";
import SurchargesDates from "../../SurchargeRegistrationForm/SurchargeDates";



const Surcharge = ({...props}) => {
    const {register, handleSubmit, errors, setValue, control} = useForm<any>()
    const onSubmit = (values: any) => {
        console.log(values)
    }

    const [formMode, setFormMode] = useState(false)
    const dispatch = useDispatch()

    let surcharge = useSelector(getSurcharge)
    let history = useHistory()
    let id = props.match.params.id

    useEffect(() => {
        sessionStorage.removeItem('reg')
        dispatch(getSurchargeInfo(id, history))
    }, [dispatch])
    useEffect(() => {
        if(surcharge && formMode) {
            setValue('start_date', surcharge.start_date)
            setValue('expiration_date', surcharge.expiration_date)
        }
    }, [setValue, surcharge, formMode])


    return (
        <SurchargeContainer onSubmit={handleSubmit(onSubmit)}>
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
                        <img src={surcharge?.shipping_type === 'sea' ? ship : plane} alt=""/>
                    </ShippingMode>
                    <FieldsWrap>
                        <FieldOuter>
                            <Label>Carrier</Label>
                            <Content>{surcharge?.carrier.title}</Content>
                        </FieldOuter>
                        <FieldOuter>
                            <Label>Shipping mode</Label>
                            <Content>{surcharge?.shipping_mode.title}</Content>
                        </FieldOuter>
                    </FieldsWrap>
                    <FieldsWrap>
                        <FieldOuter>
                            <Label>Direction</Label>
                            <Content c='#115B86'>{surcharge?.direction}</Content>
                        </FieldOuter>
                        <FieldOuter>
                            <Label>Location</Label>
                            <Content c='#115B86'>{surcharge?.location.name}</Content>
                        </FieldOuter>
                    </FieldsWrap>
                    <FieldsWrap>
                        <SurchargesDates errors={{from: errors.from, to: errors.to}} control={control} setValue={setValue} />
                    </FieldsWrap>
                </InfoWrap>
                <LineWrap />
                {surcharge && surcharge.usage_fees && surcharge.usage_fees.length > 0
                && <HandlingSurcharge setFormMode={setFormMode}
                                      containers={surcharge?.usage_fees}
                                      control={control}
                />
                }
                <LineWrap bc='#BDBDBD'/>
                <Additional setFormMode={setFormMode}
                            charges={surcharge?.charges}
                            control={control}
                />
            </SurchargeContent>
        </SurchargeContainer>
    )
}

export default withRouter(Surcharge)


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