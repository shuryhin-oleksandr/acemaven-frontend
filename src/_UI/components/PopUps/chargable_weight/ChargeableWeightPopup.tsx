import React, {useEffect, useState} from 'react'
import {
    ActionsWrapper,
    CalculationWrapper,
    CancelButton,
    CargoTitle,
    ChargeableWeightInner,
    ChargeableWeightOuter,
    CheckboxWrap,
    ConfirmButton,
    FormRow,
    NewPackageWrapper,
    WeightIcon,
    WeightWrapper
} from "./chargeable-weght-popup-styles";
import {Controller,  useForm} from "react-hook-form";
import FormField from "../../_commonComponents/Input/FormField";
import weight from '../../../../_UI/assets/icons/widgets/weight.svg';
import height from '../../../../_UI/assets/icons/widgets/height.svg';
import length from '../../../../_UI/assets/icons/widgets/length.svg';
import width from '../../../../_UI/assets/icons/widgets/width.svg';
import close_icon from '../../../../_UI/assets/icons/close-icon.svg';
import FormSelect from "../../_commonComponents/select/FormSelect";
import GeneralCustomCheckbox from "../../_commonComponents/customCheckbox/GeneralCustomCheckbox";
import {IconButton} from "@material-ui/core";
import Radio from "@material-ui/core/Radio";
import {
    ActionsWrapRadio,
    CommonWrap,
    RadioLabel
} from "../../_commonComponents/settingsNotification/settings-notification-styles";
import {makeStyles} from "@material-ui/core/styles";
import {ContainerType, PackagingType} from "../../../../_BLL/types/rates&surcharges/surchargesTypes";
import {CargoGroupType} from "../../../../_BLL/types/search/search_types";
import {CurrentShippingType} from "../../../../_BLL/types/rates&surcharges/newSurchargesTypes";
import {useDispatch} from "react-redux";
import {searchActions} from "../../../../_BLL/reducers/search_client/searchClientReducer";

let useStyles = makeStyles({
    root: {
        color: '#115b86',
        padding: '0',
        marginBottom: '3px',

        '&.Mui-checked': {
            color: '#115b86',
        },
    }
})

type PropsType = {
    disable_no_of_packs?: boolean //disable no. of packs = 1 (for ULD),
    select_label?: string, //packaging type or ULD type
    setOpenCalcPopup: (value: boolean) => void,
    calc_success: boolean,
    packaging_types: PackagingType[] | null,
    container_types: ContainerType[] | null,
    shippingValue: number,
    getCalculation: (data: CargoGroupType) => void,
    current_shipping_type: CurrentShippingType
}

const ChargeableWeightPopup: React.FC<PropsType> = ({ setOpenCalcPopup, calc_success, packaging_types, container_types,getCalculation, shippingValue,  current_shipping_type}) => {
    const {control, errors, setValue, getValues, handleSubmit, register, reset,} = useForm({
        reValidateMode: "onBlur"
    })

    const dispatch = useDispatch()
    const onSubmit = (values: CargoGroupType) => {
        getCalculation({...values, shipping_type: current_shipping_type})
    }

    const [isCheck, setIsCheck] = useState(false)
    const [selectedValueWeight, setSelectedValueWeight] = React.useState('t');
    const [selectedValueLength, setSelectedValueLength] = React.useState('m');
    const handleChangeWeight = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedValueWeight(event.target.value);
    };
    const handleChangeLength = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedValueLength(event.target.value);
    };

    const classes = useStyles()

    useEffect(() => {
        if(calc_success) {
            setOpenCalcPopup(false)
            dispatch(searchActions.setSuccessCalculate(false))
            reset()
        }
    }, [calc_success])

    return (
        <ChargeableWeightOuter onSubmit={handleSubmit(onSubmit)}>
            <ChargeableWeightInner>
                <IconButton onClick={() => setOpenCalcPopup(false)}
                    style={{top: '20px', right: '20px', width: '10.5px', height: '10.5px', position: 'absolute'}}>
                    <img src={close_icon} alt=""/>
                </IconButton>
                <CargoTitle>Please enter the details of your cargo</CargoTitle>
                            <>
                                <CalculationWrapper>
                                    <FormRow>
                                        { container_types && container_types?.length > 0
                                            ? <Controller name='container_type'
                                                    control={control}
                                                    defaultValue=''
                                                    rules={{
                                                        required: 'Field is required'
                                                    }}
                                                    as={
                                                        <FormSelect error={errors?.container_type?.message}
                                                                    label='ULD type'
                                                                    placeholder='Placeholder'
                                                                    maxW='140px'
                                                                    options={container_types}
                                                        />
                                                    }
                                            />
                                            : <Controller name='package_type'
                                                          control={control}
                                                          defaultValue=''
                                                          rules={{
                                                              required: 'Field is required'
                                                          }}
                                                          as={
                                                              <FormSelect error={errors?.package_type?.message}
                                                                          label='Packaging type'
                                                                          placeholder='Placeholder'
                                                                          maxW='140px'
                                                                          options={packaging_types}
                                                              />
                                                          }
                                            />
                                        }
                                        {/*<Controller name='volume'
                                                    control={control}
                                                    defaultValue=''
                                                    rules={{
                                                        required: 'Field is required'
                                                    }}
                                                    as={
                                                        <FormField error={errors?.volume}
                                                                   label='No. of packs'
                                                                   maxW='135px'
                                                                   type='number'
                                                                   //disabled={shippingValue === 4 ? true : false}
                                                        />
                                                    }
                                        />*/}
                                        <FormField error={errors?.volume}
                                                   label='No. of packs'
                                                   maxW='135px'
                                                   type='number'
                                                   inputRef={register({required: true})}
                                                   disabled={shippingValue === 2 }
                                                   defaultValue={1}
                                                   name='volume'
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
                                                                       label={selectedValueWeight === 'kg' ? 'Weight, kgs' : 'Weight, t'}
                                                                       maxW='90px'
                                                                       placeholder={selectedValueWeight === 'kg' ? '0, kg' : '0, t'}
                                                                       type='number'
                                                            />
                                                        </WeightWrapper>

                                                }
                                    />
                                    <Controller name='weight_measurement'
                                                control={control}
                                                defaultValue={'t'}
                                                as={
                                                    <ActionsWrapRadio>
                                                        <CommonWrap>
                                                            <Radio
                                                                checked={selectedValueWeight === 'kg'}
                                                                onChange={handleChangeWeight}
                                                                value="kg"
                                                                name="radio-button-demo"
                                                                inputProps={{'aria-label': 'kg'}}
                                                                className={classes.root}
                                                                size='small'
                                                            />
                                                            <RadioLabel>kg</RadioLabel>
                                                        </CommonWrap>
                                                        <CommonWrap>
                                                            <Radio
                                                                checked={selectedValueWeight === 't'}
                                                                onChange={handleChangeWeight}
                                                                value="t"
                                                                name="radio-button-demo"
                                                                inputProps={{'aria-label': 't'}}
                                                                className={classes.root}
                                                                size='small'
                                                            />
                                                            <RadioLabel>t</RadioLabel>
                                                        </CommonWrap>
                                                    </ActionsWrapRadio>
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
                                                                    label={selectedValueLength === 'cm' ? 'Height, cm' : 'Height, m'}
                                                                    maxW='90px'
                                                                    placeholder={selectedValueLength === 'cm' ? '0, cm' : '0, m'}
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
                                                                label={selectedValueLength === 'cm' ? 'Length, cm' : 'Length, m'}
                                                                maxW='90px'
                                                                placeholder={selectedValueLength === 'cm' ? '0, cm' : '0, m'}
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
                                                                label={selectedValueLength === 'cm' ? 'Width, cm' : 'Width, m'}
                                                                maxW='90px'
                                                                placeholder={selectedValueLength === 'cm' ? '0, cm' : '0, m'}
                                                                type='number'
                                                        />
                                                    </WeightWrapper>

                                                }
                                    />
                                    <Controller name='length_measurement'
                                                control={control}
                                                defaultValue='m'
                                                as={
                                                    <ActionsWrapRadio>
                                                        <CommonWrap>
                                                            <Radio
                                                                checked={selectedValueLength === 'cm'}
                                                                onChange={handleChangeLength}
                                                                value="cm"
                                                                name="radio-button-demo"
                                                                inputProps={{'aria-label': 'cm'}}
                                                                className={classes.root}
                                                                size='small'
                                                            />
                                                            <RadioLabel>cm</RadioLabel>
                                                        </CommonWrap>
                                                        <CommonWrap>
                                                            <Radio
                                                                checked={selectedValueLength === 'm'}
                                                                onChange={handleChangeLength}
                                                                value="m"
                                                                name="radio-button-demo"
                                                                inputProps={{'aria-label': 'm'}}
                                                                className={classes.root}
                                                                size='small'
                                                            />
                                                            <RadioLabel>m</RadioLabel>
                                                        </CommonWrap>
                                                    </ActionsWrapRadio>
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
                           {/* <TotalWrapper>
                                <span style={{fontFamily: 'Helvetica Reg', marginRight: '5px'}}>Total:</span> 15w/m
                            </TotalWrapper>*/}
                        </>
                <NewPackageWrapper>
                    {/*<IconButton onClick={() => {
                        append({uld_type: "", number_of_packs: "1", weight: '', height: '', length: '', width: ''})
                    }}
                                style={{padding: '0', marginBottom: '24px'}}
                    >
                        <img src={add_new_icon} alt=""/>
                    </IconButton>*/}
                </NewPackageWrapper>
                <ActionsWrapper>
                    <ConfirmButton type='submit'>CONFIRM</ConfirmButton>
                    <CancelButton onClick={() => setOpenCalcPopup(false)} type='button'>CANCEL</CancelButton>
                </ActionsWrapper>
            </ChargeableWeightInner>
        </ChargeableWeightOuter>
    )
}

export default ChargeableWeightPopup