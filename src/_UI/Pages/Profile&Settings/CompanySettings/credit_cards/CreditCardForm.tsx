import React from 'react'
//react-hook-form
import {useForm} from "react-hook-form";
//components
import FinishFormButtons from "../../../../components/_commonComponents/buttons/actionsFormButtons/finishFormButtons";
import FormField from "../../../../components/_commonComponents/Input/FormField";
//styles
import {CreditCardFormInner, CreditCardFormWrapper} from "./credit-cards-styles";


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

    return (
        <CreditCardFormWrapper onSubmit={handleSubmit(onSubmit)}>
            <FinishFormButtons closeCallback={setIsAdd}/>
            <CreditCardFormInner>
                <div style={{width: '46%'}}>
                    <FormField label='Name on Card'
                               name='card_name'
                               placeholder='Full name'
                               error={errors?.card_name}
                               inputRef={register({
                                   required: 'Field is required'
                               })}
                               max_width='300px'
                    />
                    <FormField label='CPF/CNPJ'
                               name='CPF'
                               placeholder='CPF/CNPJ'
                               error={errors?.CPF}
                               inputRef={register({
                                   required: 'Field is required'
                               })}
                               max_width='300px'
                    />
                    <FormField label='Card Number'
                               name='card_number'
                               placeholder='Card Number'
                               error={errors?.card_number}
                               inputRef={register({
                                   required: 'Field is required'
                               })}
                               max_width='300px'
                    />
                    <FormField label='CVV'
                               name='cvv'
                               placeholder='CVV'
                               error={errors?.cvv}
                               inputRef={register({
                                   required: 'Field is required'
                               })}
                               max_width='300px'
                    />
                    <FormField label='Card Expiration'
                               name='card_expiration'
                               placeholder='00/0000'
                               error={errors?.card_expiration}
                               inputRef={register({
                                   required: 'Field is required'
                               })}
                               max_width='300px'
                    />
                </div>
                <div style={{width: '49%'}}>
                    <div style={{width: '100%', display: "flex", justifyContent: 'space-between'}}>
                        <FormField label='Address'
                                   name='address_first_line'
                                   placeholder='Example str.'
                                   error={errors?.address_first_line}
                                   inputRef={register({
                                       required: 'Field is required'
                                   })}
                                   max_width='140px'
                        />
                        <FormField label='Address'
                                   color_label='transparent'
                                   name='address_second_line'
                                   placeholder='000'
                                   error={errors?.address_second_line}
                                   inputRef={register({
                                       required: 'Field is required'
                                   })}
                                   max_width='130px'
                        />
                    </div>
                    <FormField label='City'
                               name='city'
                               placeholder='City'
                               error={errors?.city}
                               inputRef={register({
                                   required: 'Field is required'
                               })}
                               max_width='300px'
                    />
                    <FormField label='State'
                               name='state'
                               placeholder='State'
                               error={errors?.state}
                               inputRef={register({
                                   required: 'Field is required'
                               })}
                               max_width='300px'
                    />
                    <FormField label='Zip code'
                               name='zip'
                               placeholder='Zip code'
                               error={errors?.zip}
                               inputRef={register({
                                   required: 'Field is required'
                               })}
                               max_width='300px'
                    />
                    <FormField label='Country'
                               name='country'
                               placeholder='Country'
                               error={errors?.country}
                               inputRef={register({
                                   required: 'Field is required'
                               })}
                               max_width='300px'
                    />
                </div>
            </CreditCardFormInner>
        </CreditCardFormWrapper>
    )
}

export default CreditCardForm