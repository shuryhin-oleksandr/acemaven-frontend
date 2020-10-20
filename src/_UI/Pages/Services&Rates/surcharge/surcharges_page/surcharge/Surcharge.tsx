import React from "react";
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
import {useDispatch} from "react-redux";
import {
    editCharges,
    editDates,
    editUsageFees
} from "../../../../../../_BLL/thunks/rates&surcharge/surchargeThunks";
import SurchargesDates from "../../register_new_surcharge/SurchargeDates";
import moment from "moment";
import {SurchargeInfoType} from "../../../../../../_BLL/types/rates&surcharges/surchargesTypes";

type PropsType = {
    handleSubmit: any,
    setValue: any,
    surcharge: SurchargeInfoType | null
    control: any
    errors: any
    formMode: boolean
    setFormMode: (value: boolean) => void
}

const Surcharge:React.FC<PropsType> = ({handleSubmit, setValue, formMode, setFormMode, surcharge, control, errors}) => {

    const dispatch = useDispatch()
    const onSubmit = (values: any) => {
       //edit surcharge dates
        if(values.from !== surcharge?.start_date) {
            let edit_dates = {start_date: moment(values.from).format('DD/MM/YYYY'),
                expiration_date: moment(values.to).format('DD/MM/YYYY')}
            dispatch(editDates(surcharge?.id, edit_dates))
        } else {
            dispatch(editDates(surcharge?.id, {start_date: values.from, expiration_date: values.to}))
        }
        //edit containers
       /*let b = values.usage_fees.map((u: any, key: string) => (typeof u[key] === 'object' && !Array.isArray(u[key])) && u[key]
         )*/
        values.usage_fees && Object.keys(values.usage_fees).forEach((key : any) => (values.usage_fees[key] !== null
            && dispatch(editUsageFees(key, values.usage_fees[key]))))

        //edit additionals
        Object.keys(values.charges).forEach((key:any) => ( values.charges[key] !== null && dispatch(editCharges(key, values.charges[key]))))
    }

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

export default Surcharge


