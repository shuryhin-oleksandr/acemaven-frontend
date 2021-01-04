import React, { useState } from "react";
import { Controller } from "react-hook-form";
import SurchargeRateSelect from "../../../../_commonComponents/select/SurchargeRateSelect";
import {
  ActionSelectWrapper,
  MainFormInputsWrapper,
  CloseImg,
} from "./payment-forms-styles";
import SearchCheckbox from "../../../../_commonComponents/customCheckbox/searchCheckbox";
import FormField from "../../../../_commonComponents/Input/FormField";
import close_icon from "../../../../../assets/icons/close-icon.svg";

type PropsType = {
  register?: any;
  handleSubmit?: any;
  errors?: any;
  control?: any;
  setValue?: any;
  reset?: any;
};

const BankAccountForm: React.FC<PropsType> = ({
  register,
  errors,
  control,
  setValue,
  reset,
}) => {
  const [saveCheck, setSaveCheck] = useState(false);
  const [selectValue, setSelectValue] = useState(0);

  return (
    <>
      <ActionSelectWrapper>
        <Controller
          control={control}
          name={`selectedAction`}
          defaultValue=""
          as={
            <SurchargeRateSelect
              options={[
                { title: "Add Bank account", id: 1 },
                { title: "Credit card #1", id: 2 },
              ]}
              maxW="300px"
              label="Select Bank account"
              callback={setSelectValue}
            />
          }
        />
      </ActionSelectWrapper>
      {selectValue === 1 && (
        <MainFormInputsWrapper>
          <CloseImg
            src={close_icon}
            alt=""
            onClick={() => {
              setSelectValue(0);
              setSaveCheck(false);
              reset();
            }}
          />
          <SearchCheckbox
            isCheck={saveCheck}
            setIsCheck={setSaveCheck}
            inputref={register}
            name="save"
            labelText="Save Bank information"
            color="#000000"
          />
          <div style={{ marginTop: "22px" }}>
            <Controller
              control={control}
              name={`bank_name`}
              defaultValue=""
              as={
                <SurchargeRateSelect
                  options={[
                    { title: "Prior", id: 1 },
                    { title: "Belagro", id: 2 },
                  ]}
                  maxW="300px"
                  label="Bank Name"
                />
              }
            />
            <FormField
              label="Branch No."
              inputRef={register({
                required: "Field is required",
              })}
              placeholder="0000-0"
              name="branch_number"
              // error={errors?.first_name}
              maxW="300px"
            />
            <FormField
              label="Account No."
              inputRef={register({
                required: "Field is required",
              })}
              placeholder="Account No."
              name="account_number"
              //error={errors?.first_name}
              maxW="300px"
            />
            <Controller
              control={control}
              name={`account_type`}
              defaultValue=""
              as={
                <SurchargeRateSelect
                  options={[
                    { title: "Type 1", id: 1 },
                    { title: "Type 2", id: 2 },
                  ]}
                  maxW="300px"
                  label="Account type"
                />
              }
            />
          </div>
        </MainFormInputsWrapper>
      )}
    </>
  );
};

export default BankAccountForm;
