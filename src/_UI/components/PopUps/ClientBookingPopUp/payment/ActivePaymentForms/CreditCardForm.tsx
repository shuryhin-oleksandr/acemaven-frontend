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

const CreditCardForm: React.FC<PropsType> = ({
  register,
  control,
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
                { title: "Add Credit card", id: 1 },
                { title: "Credit card #1", id: 2 },
              ]}
              max_width="300px"
              label="Select Credit Card"
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
            labelText="Save card information"
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
                label="Name on Card"
                inputRef={register({
                  required: "Field is required",
                })}
                placeholder="Name on Card"
                name="branch_number"
                // error={errors?.first_name}
                max_width="300px"
              />
              <FormField
                label="CPF/CNPJ"
                inputRef={register({
                  required: "Field is required",
                })}
                placeholder="CPF/CNPJ"
                name="branch_number"
                // error={errors?.first_name}
                max_width="300px"
              />
              <FormField
                label="Card Number "
                inputRef={register({
                  required: "Field is required",
                })}
                placeholder="Card Number "
                name="branch_number"
                // error={errors?.first_name}
                max_width="300px"
              />
              <FormField
                label="CVV"
                inputRef={register({
                  required: "Field is required",
                })}
                placeholder="CVV"
                name="branch_number"
                // error={errors?.first_name}
                max_width="300px"
              />
              <FormField
                label="Card Expiration"
                inputRef={register({
                  required: "Field is required",
                })}
                placeholder="Card Expiration"
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
                    label="Address"
                    inputRef={register({
                      required: "Field is required",
                    })}
                    placeholder="Address"
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
                      required: "Field is required",
                    })}
                    placeholder="0000-0"
                    name="branch_number"
                    // error={errors?.first_name}
                    max_width="300px"
                  />
                </div>
              </div>
              <FormField
                label="City"
                inputRef={register({
                  required: "Field is required",
                })}
                placeholder="City"
                name="branch_number"
                // error={errors?.first_name}
                max_width="300px"
              />
              <FormField
                label="State"
                inputRef={register({
                  required: "Field is required",
                })}
                placeholder="State"
                name="branch_number"
                // error={errors?.first_name}
                max_width="300px"
              />
              <FormField
                label="Zip Code"
                inputRef={register({
                  required: "Field is required",
                })}
                placeholder="Zip Code"
                name="branch_number"
                // error={errors?.first_name}
                max_width="300px"
              />
              <FormField
                label="Country"
                inputRef={register({
                  required: "Field is required",
                })}
                placeholder="Country"
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
