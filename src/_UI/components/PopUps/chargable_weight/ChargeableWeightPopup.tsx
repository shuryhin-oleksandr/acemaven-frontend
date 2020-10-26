import React, {useState} from 'react'
import {
    ActionsWrapper,
    AddNewPackageButton,
    CalculationWrapper,
    CancelButton,
    CargoTitle,
    ChargeableWeightInner,
    ChargeableWeightOuter,
    CheckboxWrap,
    CloseIcon,
    ConfirmButton,
    FormRow,
    NewPackageWrapper,
    TotalWrapper,
    WeightIcon,
    WeightWrapper
} from "./chargeable-weght-popup-styles";
import {Controller, useForm} from "react-hook-form";
import FormField from "../../_commonComponents/Input/FormField";
import weight from '../../../../_UI/assets/icons/widgets/weight.svg';
import height from '../../../../_UI/assets/icons/widgets/height.svg';
import length from '../../../../_UI/assets/icons/widgets/length.svg';
import width from '../../../../_UI/assets/icons/widgets/width.svg';
import close_icon from '../../../../_UI/assets/icons/close-icon.svg';

import FormSelect from "../../_commonComponents/select/FormSelect";
import GeneralCustomCheckbox from "../../_commonComponents/customCheckbox/GeneralCustomCheckbox";



const ChargeableWeightPopup:React.FC = () => {
    const {control, errors, setValue, getValues, handleSubmit, register} = useForm({
        reValidateMode: "onBlur"
    })

    const onSubmit = (values: any) => {
        console.log(values)
    }

    const [isCheck, setIsCheck] = useState(true)

    return (
        <ChargeableWeightOuter onSubmit={handleSubmit(onSubmit)}>
            <ChargeableWeightInner>
                <CloseIcon type='button'><img src={close_icon} alt=""/></CloseIcon>
                <CargoTitle>Please enter the details of your cargo</CargoTitle>
                <CalculationWrapper>
                    <FormRow>
                        <Controller name='uld_type'
                                    control={control}
                                    defaultValue=''
                                    /*rules={{
                                        required: 'Field is required'
                                    }}*/
                                    as={
                                       <FormSelect error={errors?.uld_type?.message}
                                                   label='ULD type'
                                                   placeholder='Placeholder'
                                                   maxW='144px'
                                       />
                                    }
                        />
                        <Controller name='number_of_packs'
                                    control={control}
                                    defaultValue={1}
                                    rules={{
                                        required: 'Field is required'
                                    }}
                                    as={
                                        <FormField error={errors?.number_of_packs}
                                                   label='No. of packs'
                                                   maxW='144px'
                                                   type='number'
                                        />
                                    }
                        />
                        <Controller name='weight'
                                    control={control}
                                    defaultValue=''
                                    rules={{
                                        required: 'Field is required'
                                    }}
                                    as={
                                        <WeightWrapper>
                                            <WeightIcon><img src={weight} alt=""/></WeightIcon>
                                            <FormField error={errors?.weight}
                                                       label='Weight, kgs'
                                                       maxW='90px'
                                                       placeholder='0 (kgs)'
                                                       type='number'
                                            />
                                        </WeightWrapper>

                                    }
                        />
                    </FormRow>
                    <FormRow>
                        <Controller name='height'
                                    control={control}
                                    defaultValue=''
                                    rules={{
                                        required: 'Field is required'
                                    }}
                                    as={
                                        <WeightWrapper>
                                            <WeightIcon><img src={height} alt=""/></WeightIcon>
                                        <FormField error={errors?.height}
                                                   label='Height, cm'
                                                   maxW='90px'
                                                   placeholder='0 (cm)'
                                                   type='number'
                                        />
                                        </WeightWrapper>
                                    }
                        />
                        <Controller name='length'
                                    control={control}
                                    defaultValue=''
                                    rules={{
                                        required: 'Field is required'
                                    }}
                                    as={
                                        <WeightWrapper>
                                            <WeightIcon><img src={length} alt=""/></WeightIcon>
                                            <FormField error={errors?.length}
                                                       label='Length, cm'
                                                       maxW='90px'
                                                       placeholder='0 (cm)'
                                                       type='number'
                                            />
                                        </WeightWrapper>

                                    }
                        />
                        <Controller name='width'
                                    control={control}
                                    defaultValue=''
                                    rules={{
                                        required: 'Field is required'
                                    }}
                                    as={
                                        <WeightWrapper>
                                            <WeightIcon><img src={width} alt=""/></WeightIcon>
                                            <FormField error={errors?.width}
                                                       label='Width, cm'
                                                       maxW='90px'
                                                       placeholder='0 (cm)'
                                                       type='number'
                                            />
                                        </WeightWrapper>

                                    }
                        />
                    </FormRow>
                </CalculationWrapper>
                <CheckboxWrap>
                    <GeneralCustomCheckbox inputRef={register}
                        name='is_dangerous'
                        value={isCheck}
                        //setIsDangerous={setIsDangerous}
                        setValue={setValue}
                        setIsCheck={setIsCheck}
                    />
                </CheckboxWrap>
                <TotalWrapper>
                    <span style={{fontFamily: 'Helvetica Reg', marginRight: '5px'}}>Total:</span> 15w/m
                </TotalWrapper>
                <NewPackageWrapper>
                        <AddNewPackageButton type='button' />
                </NewPackageWrapper>
                <ActionsWrapper>
                    <ConfirmButton type='submit'>CONFIRM</ConfirmButton>
                    <CancelButton type='button'>CANCEL</CancelButton>
                </ActionsWrapper>
            </ChargeableWeightInner>
        </ChargeableWeightOuter>
    )
}

export default ChargeableWeightPopup