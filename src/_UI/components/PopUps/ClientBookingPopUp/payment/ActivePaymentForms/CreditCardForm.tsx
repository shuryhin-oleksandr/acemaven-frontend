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
import {useTranslation} from "react-i18next";

type PropsType = {
  register?: any;
  handleSubmit?: any;
  errors?: any;
  control?: any;
  setValue?: any;
  reset?: any;
};

const CreditCardForm: React.FC<PropsType> = ({
  register,
  control,
  reset,
}) => {
  const [saveCheck, setSaveCheck] = useState(false);
  const [selectValue, setSelectValue] = useState(0);
  const {t} = useTranslation();
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
                { title: t("Billing/Add Credit card"), id: 1 },
                { title: t("Add bank account/Credit card #1"), id: 2 },
              ]}
              max_width="300px"
              label={t("Billing/Select Credit Card")}
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
            labelText={t("Add bank account/Save card information")}
            color="#000000"
          />
          <div
            style={{
              marginTop: "22px",
              paddingRight: "125px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div style={{ width: "48%" }}>
              <FormField
                label={t("Add bank account/Name on Card")}
                inputRef={register({
                  required: `${t("Error message/Field is required")}`,
                })}
                placeholder={t("Add bank account/Name on Card")}
                name="branch_number"
                // error={errors?.first_name}
                max_width="300px"
              />
              <FormField
                label="CPF/CNPJ"
                inputRef={register({
                  required: `${t("Error message/Field is required")}`,
                })}
                placeholder="CPF/CNPJ"
                name="branch_number"
                // error={errors?.first_name}
                max_width="300px"
              />
              <FormField
                label={t("Add bank account/Card Number")}
                inputRef={register({
                  required: `${t("Error message/Field is required")}`,
                })}
                placeholder={t("Add bank account/Card Number")}
                name="branch_number"
                // error={errors?.first_name}
                max_width="300px"
              />
              <FormField
                label="CVV"
                inputRef={register({
                  required: `${t("Error message/Field is required")}`,
                })}
                placeholder="CVV"
                name="branch_number"
                // error={errors?.first_name}
                max_width="300px"
              />
              <FormField
                label={t("Add bank account/Card Expiration")}
                inputRef={register({
                  required: `${t("Error message/Field is required")}`,
                })}
                placeholder={t("Add bank account/Card Expiration")}
                name="branch_number"
                // error={errors?.first_name}
                max_width="300px"
              />
            </div>
            <div
              style={{
                width: "48%",
                justifyContent: "space-between",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ width: "48%" }}>
                  <FormField
                    label={t("Register/Address")}
                    inputRef={register({
                      required: `${t("Error message/Field is required")}`,
                    })}
                    placeholder={t("Register/Address")}
                    name="branch_number"
                    // error={errors?.first_name}
                    max_width="300px"
                  />
                </div>
                <div
                  style={{
                    width: "48%",
                    display: "flex",
                    alignItems: "flex-end",
                  }}
                >
                  <FormField
                    label=""
                    inputRef={register({
                      required: `${t("Error message/Field is required")}`,
                    })}
                    placeholder="0000-0"
                    name="branch_number"
                    // error={errors?.first_name}
                    max_width="300px"
                  />
                </div>
              </div>
              <FormField
                label={t("Register/City")}
                inputRef={register({
                  required: `${t("Error message/Field is required")}`,
                })}
                placeholder={t("Register/City")}
                name="branch_number"
                // error={errors?.first_name}
                max_width="300px"
              />
              <FormField
                label={t("Register/State")}
                inputRef={register({
                  required: `${t("Error message/Field is required")}`,
                })}
                placeholder={t("Register/State")}
                name="branch_number"
                // error={errors?.first_name}
                max_width="300px"
              />
              <FormField
                label={t("Register/Zip Code")}
                inputRef={register({
                  required: `${t("Error message/Field is required")}`,
                })}
                placeholder={t("Register/Zip Code")}
                name="branch_number"
                // error={errors?.first_name}
                max_width="300px"
              />
              <FormField
                label={t("Register/Country")}
                inputRef={register({
                  required: `${t("Error message/Field is required")}`,
                })}
                placeholder={t("Register/Country")}
                name="branch_number"
                // error={errors?.first_name}
                max_width="300px"
              />
            </div>
          </div>
        </MainFormInputsWrapper>
      )}
    </>
  );
};

export default CreditCardForm;
