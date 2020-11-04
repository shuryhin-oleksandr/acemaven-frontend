import React, {useState} from 'react'
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
    TotalWrapper,
    WeightIcon,
    WeightWrapper
} from "./chargeable-weght-popup-styles";
import {Controller, useFieldArray, useForm} from "react-hook-form";
import FormField from "../../_commonComponents/Input/FormField";
import weight from '../../../../_UI/assets/icons/widgets/weight.svg';
import height from '../../../../_UI/assets/icons/widgets/height.svg';
import length from '../../../../_UI/assets/icons/widgets/length.svg';
import width from '../../../../_UI/assets/icons/widgets/width.svg';
import close_icon from '../../../../_UI/assets/icons/close-icon.svg';
import add_new_icon from '../../../../_UI/assets/icons/search/add_new_package.svg';
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

let useStyles = makeStyles ({
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
}

const ChargeableWeightPopup:React.FC<PropsType> = ({disable_no_of_packs, select_label}) => {
    const {control, errors, setValue, getValues, handleSubmit, register, reset, watch} = useForm({
        reValidateMode: "onBlur",
        defaultValues: {
            test: [{ uld_type: "Bill", number_of_packs: 1, weight: 0, height: 0, length: 0, width: 0, weight_measurement: 't', length_measurement: 'm' }]
        }
    })

    const { fields, append } = useFieldArray(
        {
            control,
            name: "test"
        }
    );

    const onSubmit = (values: any) => {
        console.log(values)
    }

    const [isCheck, setIsCheck] = useState(true)
    const [selectedValueWeight, setSelectedValueWeight] = React.useState('t');
    const [selectedValueLength, setSelectedValueLength] = React.useState('m');
    const handleChangeWeight = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedValueWeight(event.target.value);
    };
    const handleChangeLength = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedValueLength(event.target.value);
    };

    const classes = useStyles()


    return (
        <ChargeableWeightOuter onSubmit={handleSubmit(onSubmit)}>
            <ChargeableWeightInner>
                <IconButton style={{top: '20px', right: '20px',width: '10.5px',height: '10.5px', position: 'absolute'}}>
                    <img src={close_icon} alt=""/>
                </IconButton>
                <CargoTitle>Please enter the details of your cargo</CargoTitle>
                    {fields.map((item, index) => {
                        return (
                            <>
                                <CalculationWrapper>
                                    <FormRow>
                                        <Controller name={`test[${index}].container_type`} //package_type
                                                    control={control}
                                                    defaultValue=''
                                            /*rules={{
                                                required: 'Field is required'
                                            }}*/
                                                    as={
                                                        <FormSelect //error={errors?.container_type?.message}
                                                                    label='ULD type'
                                                                    placeholder='Placeholder'
                                                                    maxW='140px'
                                                        />
                                                    }
                                        />
                                        <Controller name={`test[${index}].volume`}
                                                    control={control}
                                                    defaultValue={1}
                                                    rules={{
                                                        required: 'Field is required'
                                                    }}
                                                    as={
                                                        <FormField //error={errors?.volume}
                                                                   label='No. of packs'
                                                                   maxW='135px'
                                                                   type='number'
                                                                   disabled={true}
                                                        />
                                                    }
                                        />
                                        <Controller name={`test[${index}].weight`}
                                                    control={control}
                                                    defaultValue=''
                                                    rules={{
                                                        required: 'Field is required'
                                                    }}
                                                    as={
                                                        <WeightWrapper>
                                                            <WeightIcon><img src={weight} alt=""/></WeightIcon>
                                                            <FormField //error={errors?.weight}
                                                                       label='Weight, kgs'
                                                                       maxW='90px'
                                                                       placeholder='0 (kgs)'
                                                                       type='number'
                                                            />
                                                        </WeightWrapper>

                                                    }
                                        />
                                        <Controller name={`test[${index}].weight_measurement`}
                                                    control={control}
                                                    as={
                                                        <ActionsWrapRadio>
                                                            <CommonWrap>
                                                                <Radio
                                                                    checked={selectedValueWeight === 'kg'}
                                                                    onChange={handleChangeWeight}
                                                                    value="kg"
                                                                    name="radio-button-demo"
                                                                    inputProps={{ 'aria-label': 'kg' }}
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
                                                                    inputProps={{ 'aria-label': 't' }}
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
                                        <Controller name={`test[${index}].height`}
                                                    control={control}
                                                    defaultValue=''
                                                    rules={{
                                                        required: 'Field is required'
                                                    }}
                                                    as={
                                                        <WeightWrapper>
                                                            <WeightIcon><img src={height} alt=""/></WeightIcon>
                                                            <FormField //error={errors?.height}
                                                                       label='Height, cm'
                                                                       maxW='90px'
                                                                       placeholder='0 (cm)'
                                                                       type='number'
                                                            />
                                                        </WeightWrapper>
                                                    }
                                        />
                                        <Controller name={`test[${index}].length`}
                                                    control={control}
                                                    defaultValue=''
                                                    rules={{
                                                        required: 'Field is required'
                                                    }}
                                                    as={
                                                        <WeightWrapper>
                                                            <WeightIcon><img src={length} alt=""/></WeightIcon>
                                                            <FormField //error={errors?.length}
                                                                       label='Length, cm'
                                                                       maxW='90px'
                                                                       placeholder='0 (cm)'
                                                                       type='number'
                                                            />
                                                        </WeightWrapper>

                                                    }
                                        />
                                        <Controller name={`test[${index}].width`}
                                                    control={control}
                                                    defaultValue=''
                                                    rules={{
                                                        required: 'Field is required'
                                                    }}
                                                    as={
                                                        <WeightWrapper>
                                                            <WeightIcon><img src={width} alt=""/></WeightIcon>
                                                            <FormField //error={errors?.test[${index}]?.width`)}
                                                                       label='Width, cm'
                                                                       maxW='90px'
                                                                       placeholder='0 (cm)'
                                                                       type='number'
                                                            />
                                                        </WeightWrapper>

                                                    }
                                        />
                                        <Controller name={`test[${index}].length_measurement`}
                                                    control={control}
                                                    as={
                                                        <ActionsWrapRadio>
                                                            <CommonWrap>
                                                                <Radio
                                                                    checked={selectedValueLength === 'cm'}
                                                                    onChange={handleChangeLength}
                                                                    value="cm"
                                                                    name="radio-button-demo"
                                                                    inputProps={{ 'aria-label': 'cm' }}
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
                                                                    inputProps={{ 'aria-label': 'm' }}
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
                                                           name={`test[${index}].is_dangerous`}
                                                           value={isCheck}
                                        //setIsDangerous={setIsDangerous}
                                                           setValue={setValue}
                                                           setIsCheck={setIsCheck}
                                    />
                                </CheckboxWrap>
                                <TotalWrapper>
                                    <span style={{fontFamily: 'Helvetica Reg', marginRight: '5px'}}>Total:</span> 15w/m
                                </TotalWrapper>
                            </>
                        )
                    })}
                <NewPackageWrapper>
                    <IconButton onClick={() => {
                                    append({ uld_type: "", number_of_packs: "1", weight: '', height: '', length: '', width: '' })
                                }}
                                style={{padding: '0', marginBottom: '24px'}}
                    >
                        <img src={add_new_icon} alt=""/>
                    </IconButton>
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