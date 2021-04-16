import React, {useState} from "react";
import {Controller} from "react-hook-form";
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

const BankAccountForm: React.FC<PropsType> = ({
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
                                {title: t("Add bank account/Add bank account"), id: 1},
                                {title: t("Add bank account/Credit card #1"), id: 2},
                            ]}
                            max_width="300px"
                            label={t("Add bank account/Select Bank account")}
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
                        labelText={t("Add bank account/Save Bank information")}
                        color="#000000"
                    />
                    <div style={{marginTop: "22px"}}>
                        <Controller
                            control={control}
                            name={`bank_name`}
                            defaultValue=""
                            as={
                                <SurchargeRateSelect
                                    options={[
                                        {title: "Prior", id: 1},
                                        {title: "Belagro", id: 2},
                                    ]}
                                    max_width="300px"
                                    label={t("Add bank account/Bank Name")}
                                />
                            }
                        />
                        <FormField
                            label={t("Add bank account/Branch No.")}
                            inputRef={register({
                                required: `${t("Error message/Field is required")}`,
                            })}
                            placeholder="0000-0"
                            name="branch_number"
                            // error={errors?.first_name}
                            max_width="300px"
                        />
                        <FormField
                            label={t("Add bank account/Account No.")}
                            inputRef={register({
                                required: `${t("Error message/Field is required")}`,
                            })}
                            placeholder={t("Add bank account/Account No.")}
                            name="account_number"
                            //error={errors?.first_name}
                            max_width="300px"
                        />
                        <Controller
                            control={control}
                            name={`account_type`}
                            defaultValue=""
                            as={
                                <SurchargeRateSelect
                                    options={[
                                        {title: `${t("Bookings/Type")} 1`, id: 1},
                                        {title: `${t("Bookings/Type")} 2`, id: 2},
                                    ]}
                                    max_width="300px"
                                    label={t("Add bank account/Account Type")}
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
