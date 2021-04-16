import React from 'react'
//react-hook-form
import {useForm} from "react-hook-form";
//components
import FinishFormButtons from "../../../../components/_commonComponents/buttons/actionsFormButtons/finishFormButtons";
import FormField from "../../../../components/_commonComponents/Input/FormField";
//styles
import {CreditCardFormInner, CreditCardFormWrapper} from "./credit-cards-styles";
import {useTranslation} from "react-i18next";


type PropsType = {
    setIsAdd: any
}

const CreditCardForm:React.FC<PropsType> = ({setIsAdd}) => {
    const {register, errors, handleSubmit} = useForm({
        reValidateMode: 'onBlur',
        mode: 'onSubmit'
    })
    const onSubmit = (values: any) => {
        console.log(values)
    }
  const {t} = useTranslation();
    return (
        <CreditCardFormWrapper onSubmit={handleSubmit(onSubmit)}>
            <FinishFormButtons closeCallback={setIsAdd}/>
            <CreditCardFormInner>
                <div style={{width: '46%'}}>
                    <FormField label={t("Add bank account/Name on Card")}
                               name='card_name'
                               placeholder={t("Add bank account/Name on Card")}
                               error={errors?.card_name}
                               inputRef={register({
                                   required: `${t("Error message/Field is required")}`
                               })}
                               max_width='300px'
                    />
                    <FormField label='CPF/CNPJ'
                               name='CPF'
                               placeholder='CPF/CNPJ'
                               error={errors?.CPF}
                               inputRef={register({
                                   required: `${t("Error message/Field is required")}`
                               })}
                               max_width='300px'
                    />
                    <FormField label={t("Add bank account/Card Number")}
                               name='card_number'
                               placeholder={t("Add bank account/Card Number")}
                               error={errors?.card_number}
                               inputRef={register({
                                   required: `${t("Error message/Field is required")}`
                               })}
                               max_width='300px'
                    />
                    <FormField label='CVV'
                               name='cvv'
                               placeholder='CVV'
                               error={errors?.cvv}
                               inputRef={register({
                                   required: `${t("Error message/Field is required")}`
                               })}
                               max_width='300px'
                    />
                    <FormField label={t("Add bank account/Card Expiration")}
                               name='card_expiration'
                               placeholder='00/0000'
                               error={errors?.card_expiration}
                               inputRef={register({
                                   required: `${t("Error message/Field is required")}`
                               })}
                               max_width='300px'
                    />
                </div>
                <div style={{width: '49%'}}>
                    <div style={{width: '100%', display: "flex", justifyContent: 'space-between'}}>
                        <FormField label={t("Register/Address")}
                                   name='address_first_line'
                                   placeholder={t("Register/Address")}
                                   error={errors?.address_first_line}
                                   inputRef={register({
                                       required: `${t("Error message/Field is required")}`
                                   })}
                                   max_width='140px'
                        />
                        <FormField label={t("Register/Address")}
                                   color_label='transparent'
                                   name='address_second_line'
                                   placeholder='000'
                                   error={errors?.address_second_line}
                                   inputRef={register({
                                       required: `${t("Error message/Field is required")}`
                                   })}
                                   max_width='130px'
                        />
                    </div>
                    <FormField label={t("Register/City")}
                               name='city'
                               placeholder={t("Register/City")}
                               error={errors?.city}
                               inputRef={register({
                                   required: `${t("Error message/Field is required")}`
                               })}
                               max_width='300px'
                    />
                    <FormField label={t("Register/State")}
                               name='state'
                               placeholder={t("Register/State")}
                               error={errors?.state}
                               inputRef={register({
                                   required: `${t("Error message/Field is required")}`
                               })}
                               max_width='300px'
                    />
                    <FormField label={t("Register/Zip Code")}
                               name='zip'
                               placeholder={t("Register/Zip Code")}
                               error={errors?.zip}
                               inputRef={register({
                                   required: `${t("Error message/Field is required")}`
                               })}
                               max_width='300px'
                    />
                    <FormField label={t("Register/Country")}
                               name='country'
                               placeholder={t("Register/Country")}
                               error={errors?.country}
                               inputRef={register({
                                   required: `${t("Error message/Field is required")}`
                               })}
                               max_width='300px'
                    />
                </div>
            </CreditCardFormInner>
        </CreditCardFormWrapper>
    )
}

export default CreditCardForm