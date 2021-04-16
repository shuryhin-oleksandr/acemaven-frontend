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
import {useTranslation} from "react-i18next";

const AddBankForm: React.FC = () => {
  const { register, handleSubmit, errors, control, reset } = useForm<
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
           reset()
        }
    }, [success_bank])
  const {t} = useTranslation();
  return (
    <FormWrap onSubmit={handleSubmit(onSubmit)}>
      <FormField
        label={t("Add bank account/Bank Name")}
        name="bank_name"
        placeholder={t("Add bank account/Bank Name")}
        error={errors?.bank_name}
        inputRef={register({
          required: `${t("Error message/Field is required")}`,
          minLength: 1,
          maxLength: 100,
        })}
        max="100"
      />
        <FormField
            label={t("Add bank account/Bank No.")}
            name="bank_number"
            placeholder="000"
            error={errors?.bank_number}
            inputRef={register({
                required: `${t("Error message/Field is required")}`,
                minLength: 1,
                maxLength: 3,
            })}
            max="3"
        />
      <FormField
        label={t("Add bank account/Branch No.")}
        placeholder={t("Add bank account/Branch No.")}
        inputRef={register({
          required: `${t("Error message/Field is required")}`,
          pattern: /^\d{4}-\d{1}$/,
          maxLength: 6,
          minLength: 1,
        })}
        name="branch"
        error={errors?.branch}
        max="6"
        pattern_message={t('Error message/Branch No. has to be in 0000-0 format')}
      />
      <FormField
        label={t("Add bank account/Account No.")}
        placeholder={t("Add bank account/Account No.")}
        inputRef={register({
          required: `${t("Error message/Field is required")}`,
          pattern: /^\d+$/,
          minLength: 1,
          maxLength: 50,
        })}
        name="number"
        error={errors?.number}
        max="50"
        type='number'
        pattern_message={t('Error message/Account No. must contain only numbers')}
      />
        {errorBank && <ErrorServerMessage>{errorBank}</ErrorServerMessage>}
      <Controller
        name="account_type"
        control={control}
        defaultValue=""
        as={
          <FormSelect
            label={t("Add bank account/Account Type")}
            options={options2}
            error={errors?.account_type?.message}
          />
        }
        rules={{ required: `${t("Error message/Field is required")}` }}
      />

      <SubmitButton type="submit">{t("Add bank account/Add bank account")}</SubmitButton>
    </FormWrap>
  );
};

export default AddBankForm;
