import React, {useEffect} from "react";
import { Controller, useForm } from "react-hook-form";
import { IAddNewBank } from "../../../../_BLL/types/addNewUserTypes";
import { FormWrap, SubmitButton } from "../CreateNewUser/AddUserForm";
import FormField from "../../../components/_commonComponents/Input/FormField";
import FormSelect from "../../../components/_commonComponents/select/FormSelect";
import {useDispatch, useSelector} from "react-redux";
import {addBank, companyActions} from "../../../../_BLL/reducers/employeesAndBanksReducer";
import {AppStateType} from "../../../../_BLL/store";
import {ErrorServerMessage} from "../../SignInPage";

const AddBankForm: React.FC = () => {
  const { register, handleSubmit, errors, control, getValues, setValue } = useForm<
    IAddNewBank
  >();
  const dispatch = useDispatch();
  const errorBank = useSelector((state:AppStateType) => state.company.addingBankError)
    let success_bank = useSelector((state: AppStateType) => state.company.successBank)

  const onSubmit = (values: IAddNewBank) => {
    dispatch(companyActions.setAddingBankError(''))
    dispatch(addBank(values));
  };

  let options2 = [
    { name: "Savings", id: 1, value: "savings" },
    { name: "Checking", id: 2, value: "checking" },
  ];

    useEffect(() => {
        if(success_bank) {
            setValue('bank_name', '')
            setValue('branch', '')
            setValue('number', '')
            setValue('account_type', '')
        }
    }, [setValue, success_bank])

  return (
    <FormWrap onSubmit={handleSubmit(onSubmit)}>
      <FormField
        label="Bank Name"
        name="bank_name"
        placeholder="Bank Name"
        error={errors?.bank_name}
        inputRef={register({
          required: "Field is required",
          minLength: 1,
          maxLength: 100,
        })}
        getValues={getValues}
        max="100"
      />
        <FormField
            label="Bank Number"
            name="bank_number"
            placeholder="000"
            error={errors?.bank_number}
            inputRef={register({
                required: "Field is required",
                minLength: 1,
                maxLength: 3,
            })}
            getValues={getValues}
            max="3"
        />
      <FormField
        label="Branch No."
        placeholder="Branch No."
        inputRef={register({
          required: "Field is required",
          pattern: /^\d{4}-\d{1}$/,
          maxLength: 6,
          minLength: 1,
        })}
        name="branch"
        error={errors?.branch}
        getValues={getValues}
        max="6"
        pattern_message='Branch No. has to be in 0000-0 format'
      />
      <FormField
        label="Account No."
        placeholder="Account No."
        inputRef={register({
          required: "Field is required",
          pattern: /^\d+$/,
          minLength: 1,
          maxLength: 50,
        })}
        name="number"
        error={errors?.number}
        getValues={getValues}
        max="50"
        type='number'
        pattern_message='Account No. must contain only numbers'
      />
        {errorBank && <ErrorServerMessage>{errorBank}</ErrorServerMessage>}
      <Controller
        name="account_type"
        control={control}
        defaultValue=""
        as={
          <FormSelect
            label="Account Type"
            options={options2}
            error={errors?.account_type?.message}
          />
        }
        rules={{ required: "Field is required" }}
      />

      <SubmitButton type="submit">ADD BANK ACCOUNT</SubmitButton>
    </FormWrap>
  );
};

export default AddBankForm;
