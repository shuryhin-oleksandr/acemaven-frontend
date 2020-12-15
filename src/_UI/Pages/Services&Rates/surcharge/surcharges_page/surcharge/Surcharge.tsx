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
    editUsageAndCharges,
} from "../../../../../../_BLL/thunks/rates&surcharge/surchargeThunks";
import SurchargesDates from "../../register_new_surcharge/SurchargeDates";
import moment from "moment";
import {SurchargeInfoType} from "../../../../../../_BLL/types/rates&surcharges/surchargesTypes";
import _ from "lodash";

type PropsType = {
    handleSubmit: any,
    setValue: any,
    surcharge: SurchargeInfoType | null
    control: any
    errors: any
    formMode: boolean
    setFormMode: (value: boolean) => void,
    history: any
}

const Surcharge:React.FC<PropsType> = ({handleSubmit, setValue, formMode, setFormMode, surcharge, control, errors, history}) => {


    let fees_from_server = surcharge?.usage_fees?.map(u => ({
            id: u.id,
            date_updated: u.date_updated,
            updated_by: u.updated_by,
            charge: u.charge,
            container_type: u.container_type.id,
            currency: u.currency.id
    }))

    let charges_from_server = surcharge?.charges?.map(c => ({
        id: c.id,
        date_updated: c.date_updated,
        updated_by: c.updated_by,
        charge: c.charge,
        additional_surcharge: c.additional_surcharge.id,
        currency: c.currency.id,
        conditions: c.conditions
    }))

    const dispatch = useDispatch()
    const onSubmit = (values: any) => {
       //EDIT DATES
        let server_dates = [{
            start_date: surcharge?.start_date,
            expiration_date: surcharge?.expiration_date
        }]
        let dates = [{
            start_date: moment(values.from).format('DD/MM/YYYY'),
            expiration_date: moment(values.to).format('DD/MM/YYYY')
        }]
        let dates_to_submit = server_dates && (dates[0].start_date !== 'Invalid date' && dates[0].expiration_date !== 'Invalid date')
            && _.differenceWith( dates, server_dates, _.isEqual)


        //EDIT USAGE FEES
        let fees: any[] = [];
        values.usage_fees && Object.keys(values.usage_fees).forEach((key : any) => (values.usage_fees[key] !== null
            && fees.push({id: Number(key), ...values.usage_fees[key]})
        ))
        let fees_to_submit = fees_from_server && _.differenceWith(fees, fees_from_server, _.isEqual)

        //EDIT ADDITIONALS
        let additonals : any[] = [];
        Object.keys(values.charges).forEach((key:any) => ( values.charges[key] !== null
            && additonals.push({id: Number(key), ...values.charges[key]})
        ))
        let charges_to_submit = charges_from_server &&  _.differenceWith(additonals, charges_from_server, _.isEqual) //charges_to_submit && charges_to_submit?.length > 0 && dispatch(editCharges(Number(surcharge?.id), charges_to_submit, history))

        //DISPATCH
        dispatch(editUsageAndCharges(Number(surcharge?.id), dates_to_submit, fees_to_submit, charges_to_submit, history))
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
                                         required_dates={true}
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
                            setValue={setValue}
                />
            </SurchargeContent>
        </SurchargeContainer>
    )
}

export default Surcharge


