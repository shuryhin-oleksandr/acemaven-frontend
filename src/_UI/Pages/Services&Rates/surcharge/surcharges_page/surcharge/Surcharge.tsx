import React, {useEffect} from "react";
import {
    CancelButtonWrap,
    Content,
    FieldOuter,
    FieldsWrap, FormButtons,
    InfoWrap, Label,
    LineWrap, SaveButton,
    ShippingMode,
    SurchargeContainer,
    SurchargeContent,
    SurchargeTitle, Wrap
} from "./surcharge-style";
import ship from '../../../../../../_UI/assets/icons/rates&services/ship-surcharge.svg'
import plane from '../../../../../../_UI/assets/icons/rates&services/plane-surcharge.svg'
import HandlingSurcharge from "./HandlingSurcharge";
import Additional from "./Additional";
import { useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    checkSurchargeDates,
    editCharges,
    editDates,
    editUsageFees,
    getSurchargeInfo
} from "../../../../../../_BLL/thunks/rates&surcharge/surchargeThunks";
import {withRouter} from 'react-router'
import {useForm} from "react-hook-form";
import {
    getEditSurchargeSelector,
    getSurcharge
} from "../../../../../../_BLL/selectors/rates&surcharge/surchargeSelectors";
import SurchargesDates from "../../register_new_surcharge/SurchargeDates";
import moment from "moment";
import {surchargeActions} from "../../../../../../_BLL/reducers/surcharge&rates/surchargeReducer";


const Surcharge = ({...props}) => {
    const {handleSubmit, errors, setValue, control} = useForm<any>({
        reValidateMode: "onBlur",
    })
    const onSubmit = (values: any) => {
       //edit surcharge dates
        debugger
        if(values.from !== surcharge?.start_date) {
            let edit_dates = {start_date: moment(values.from).format('DD/MM/YYYY'),
                expiration_date: moment(values.to).format('DD/MM/YYYY')}
            dispatch(editDates(props.match.params.id, edit_dates))
        } else {
            dispatch(editDates(props.match.params.id, {start_date: values.from, expiration_date: values.to}))
        }
        //edit containers
        values.usage_fees && Object.keys(values.usage_fees).map(u => (u !== null
            && dispatch(editUsageFees(values.usage_fees[u].id, values.usage_fees[u]))))

        //edit additionals
        Object.keys(values.charges).map(o => (o !== null && dispatch(editCharges(values.charges[o].additional_surcharge, values.charges[o]))))
    }

    const [formMode, setFormMode] = useState(false)
    const dispatch = useDispatch()

    let surcharge = useSelector(getSurcharge)
    let edit_success = useSelector(getEditSurchargeSelector)
    let id = props.match.params.id

    useEffect(() => {
        sessionStorage.removeItem('reg')
        dispatch(getSurchargeInfo(id, props.history))
    }, [dispatch])


    useEffect(() => {
        surcharge && dispatch(checkSurchargeDates({location: surcharge.location.id,
            direction: surcharge.direction, shipping_mode: surcharge.shipping_mode.id, carrier: surcharge.carrier.id}))
        if(surcharge && formMode) {
            setValue('start_date', surcharge.start_date)
            setValue('expiration_date', surcharge.expiration_date)
        }
    }, [setValue, surcharge, formMode])

    useEffect(() => {
        if(edit_success) {
            setFormMode(false)
            dispatch(surchargeActions.setEditSurchargeSuccess(''))
        }
    }, [edit_success])

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
                        <SurchargesDates textColor='#115B86'
                                         textTransform='uppercase'
                                         textFont='Helvetica Bold'
                                         errors={{from: errors.from, to: errors.to}}
                                         control={control}
                                         setValue={setValue}
                                         setFormMode={setFormMode}
                        />
                    </FieldsWrap>
                </InfoWrap>
                <LineWrap />
                {surcharge && surcharge.usage_fees && surcharge.usage_fees.length > 0
                && <HandlingSurcharge setFormMode={setFormMode}
                                      containers={surcharge?.usage_fees}
                                      control={control}
                                      errors={errors}
                />
                }
                {surcharge && surcharge.usage_fees && surcharge.usage_fees.length > 0 && <LineWrap bc='#BDBDBD'/>}
                <Additional setFormMode={setFormMode}
                            charges={surcharge?.charges}
                            control={control}
                           errors={errors}
                />
            </SurchargeContent>
        </SurchargeContainer>
    )
}

export default withRouter(Surcharge)


