import React, {useEffect, useState} from 'react'
//react hook form
import {Controller, useForm} from "react-hook-form";
//material ui
import {IconButton} from "@material-ui/core";
import Radio from "@material-ui/core/Radio";
import {makeStyles} from "@material-ui/core/styles";
//types
import {ContainerType, PackagingType} from "../../../../_BLL/types/rates&surcharges/surchargesTypes";
import {CargoGroupType} from "../../../../_BLL/types/search/search_types";
import {CurrentShippingType} from "../../../../_BLL/types/rates&surcharges/newSurchargesTypes";
//BLL
import {useDispatch} from "react-redux";
import {searchActions} from "../../../../_BLL/reducers/search_client/searchClientReducer";
//components
import FormField from "../../_commonComponents/Input/FormField";
import FormSelect from "../../_commonComponents/select/FormSelect";
import GeneralCustomCheckbox from "../../_commonComponents/customCheckbox/GeneralCustomCheckbox";
//styles
import {
    ActionsWrapper, CalculationWrapper, CancelButton, CargoTitle, ChargeableWeightInner, ChargeableWeightOuter,
    CheckboxWrap, ConfirmButton, FormRow, NewPackageWrapper, WeightIcon, WeightWrapper
} from "./chargeable-weght-popup-styles";
import {
    ActionsWrapRadio,
    CommonWrap,
    RadioLabel
} from "../../_commonComponents/settingsNotification/settings-notification-styles";
//icons
import weight from '../../../../_UI/assets/icons/widgets/weight.svg';
import height from '../../../../_UI/assets/icons/widgets/height.svg';
import length from '../../../../_UI/assets/icons/widgets/length.svg';
import width from '../../../../_UI/assets/icons/widgets/width.svg';
import close_icon from '../../../../_UI/assets/icons/close-icon.svg';


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
    current_shipping_type: CurrentShippingType,
    editable_cargo_group: CargoGroupType | null,
}

const ChargeableWeightPopup: React.FC<PropsType> = ({
                                                        setOpenCalcPopup, calc_success, packaging_types, container_types, getCalculation,
                                                        shippingValue, current_shipping_type, editable_cargo_group
                                                    }) => {

    const {control, errors, setValue, handleSubmit, register, reset,} = useForm({
        reValidateMode: "onBlur"
    })

    const dispatch = useDispatch()
    const onSubmit = (values: CargoGroupType) => {
        if (!editable_cargo_group) {
            values.volume
                ? getCalculation({...values, shipping_type: current_shipping_type})
                : getCalculation({
                    volume: 1,
                    weight: values.weight,
                    weight_measurement: values.weight_measurement,
                    width: values.width,
                    height: values.height,
                    length: values.length,
                    length_measurement: values.length_measurement,
                    container_type: values.container_type,
                    shipping_type: current_shipping_type,
                    dangerous: values.dangerous

                })
        } else {
            getCalculation({...values, shipping_type: current_shipping_type, id: editable_cargo_group.id})
        }
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

    //set data to popup if user is editing some cargo group
    useEffect(() => {
        if (editable_cargo_group) {
            Object.keys(editable_cargo_group).forEach((key: string) => {
                setValue(key, editable_cargo_group[key])
            })
            setSelectedValueWeight(editable_cargo_group.weight_measurement)
            setSelectedValueLength(editable_cargo_group.length_measurement)
        }
    }, [editable_cargo_group, setValue])

    //close popup and clear store data
    useEffect(() => {
        if (calc_success) {
            setOpenCalcPopup(false)
            dispatch(searchActions.setSuccessCalculate(false))
            dispatch(searchActions.setEditableCargoGroupToNull(null))
            reset()
        }
    }, [calc_success])

    const closeHandler = () => {
        setOpenCalcPopup(false)
        dispatch(searchActions.setEditableCargoGroupToNull(null))
    }

    return (
        <ChargeableWeightOuter onSubmit={handleSubmit(onSubmit)}>
            <ChargeableWeightInner>
                <IconButton onClick={() => closeHandler()}
                            style={{
                                top: '20px',
                                right: '20px',
                                width: '10.5px',
                                height: '10.5px',
                                position: 'absolute'
                            }}>
                    <img src={close_icon} alt=""/>
                </IconButton>
                <CargoTitle>Please enter the details of your cargo</CargoTitle>
                <>
                    <CalculationWrapper>
                        <FormRow>
                            {container_types && container_types?.length > 0
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
                                : <Controller name='packaging_type'
                                              control={control}
                                              defaultValue=''
                                              rules={{
                                                  required: 'Field is required'
                                              }}
                                              as={
                                                  <FormSelect error={errors?.packaging_type?.message}
                                                              label='Packaging type'
                                                              placeholder='Placeholder'
                                                              maxW='140px'
                                                              options={packaging_types}
                                                  />
                                              }
                                />
                            }
                            <FormField error={errors?.volume}
                                       label='No. of packs'
                                       max_width='135px'
                                       type='number'
                                       inputRef={register({required: true})}
                                       disabled={shippingValue === 2}
                                       defaultValue={1}
                                       name='volume'
                            />
                            <Controller name='weight'
                                        control={control}
                                        defaultValue={''}
                                        rules={{
                                            required: 'Field is required'
                                        }}
                                        as={
                                            <WeightWrapper>
                                                <WeightIcon><img src={weight} alt=""/></WeightIcon>
                                                <FormField error={errors?.weight}
                                                           label={selectedValueWeight === 'kg' ? 'Weight, kgs' : 'Weight, t'}
                                                           max_width='90px'
                                                           placeholder={selectedValueWeight === 'kg' ? '0, kg' : '0, t'}
                                                           type='number'
                                                           defaultValue={editable_cargo_group ? editable_cargo_group.weight : ''}
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
                                                           max_width='90px'
                                                           placeholder={selectedValueLength === 'cm' ? '0, cm' : '0, m'}
                                                           type='number'
                                                           defaultValue={editable_cargo_group ? editable_cargo_group.height : ''}
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
                                                           max_width='90px'
                                                           placeholder={selectedValueLength === 'cm' ? '0, cm' : '0, m'}
                                                           type='number'
                                                           defaultValue={editable_cargo_group ? editable_cargo_group.length : ''}
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
                                                           max_width='90px'
                                                           placeholder={selectedValueLength === 'cm' ? '0, cm' : '0, m'}
                                                           type='number'
                                                           defaultValue={editable_cargo_group ? editable_cargo_group.width : ''}
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
                                               name='dangerous'
                                               value={isCheck}
                            //setIsDangerous={setIsDangerous}
                                               setValue={setValue}
                                               setIsCheck={setIsCheck}
                                               span_text='Dangerous'
                        />
                    </CheckboxWrap>
                </>
                <NewPackageWrapper>
                </NewPackageWrapper>
                <ActionsWrapper>
                    <ConfirmButton type='submit'>CONFIRM</ConfirmButton>
                    <CancelButton onClick={() => closeHandler()} type='button'>CANCEL</CancelButton>
                </ActionsWrapper>
            </ChargeableWeightInner>
        </ChargeableWeightOuter>
    )
}

export default ChargeableWeightPopup