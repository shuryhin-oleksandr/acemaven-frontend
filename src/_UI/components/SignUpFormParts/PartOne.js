//Core
import React from "react";
import BaseInputGroup from "../base/BaseInputGroup";
import { ErrorMessage, useFormikContext } from "formik";
import BaseNextButton from "../base/BaseNextButton";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

const PartOne = ({ changePage }) => {
  const { values, touched, errors } = useFormikContext();

  const isAgentButtonDisabled =
    !values.name ||
    errors.name ||
    !values.phone ||
    errors.phone ||
    !values.address_line_first ||
    errors.address_line_first ||
    !values.state ||
    errors.state ||
    !values.city ||
    errors.city ||
    !values.zip_code ||
    errors.zip_code ||
    !values.tax_id ||
    errors.tax_id ||
    !values.employees_number ||
    errors.employees_number ||
    !values.website ||
    errors.website;

  const isClientButtonDisabled =
    !values.name ||
    errors.name ||
    !values.phone ||
    errors.phone ||
    !values.address_line_first ||
    errors.address_line_first ||
    !values.state ||
    errors.state ||
    !values.city ||
    errors.city ||
    !values.zip_code ||
    errors.zip_code ||
    !values.tax_id ||
    errors.tax_id;

  const { t } = useTranslation();

  return (
    <>
      <BaseInputGroup
        name="name"
        placeholder={t('Register/Company Name')}
        values={values}
        labelText={t('Register/Company Name')}
        marginBot={46}
        valid={touched.name && !errors.name}
        error={touched.name && errors.name}
      />
      <BaseInputGroup
        name="phone"
        placeholder="+000000000000"
        values={values}
        labelText={t('Register/Phone Number')}
        marginBot={46}
        valid={touched.phone && !errors.phone}
        error={touched.phone && errors.phone}
      />
      <BaseInputGroup
        name="address_line_first"
        placeholder="Address Line 1"
        values={values}
        labelText={t('Register/Address')}
        marginBot={15}
        withoutErrorMessage
        valid={touched.address_line_first && !errors.address_line_first}
        error={touched.address_line_first && errors.address_line_first}
      />
      <div style={{ marginBottom: "46px", position: "relative" }}>
        <BaseInputGroup
          name="address_line_second"
          placeholder="Address Line 2 (optional)"
          values={values}
        />
        <ErrorMessage name="address_line_first" component={Error} />
      </div>
      <BaseInputGroup
        name="state"
        placeholder={t('Register/State')}
        values={values}
        labelText={t('Register/State')}
        marginBot={46}
        valid={touched.state && !errors.state}
        error={touched.state && errors.state}
      />
      <BaseInputGroup
        name="city"
        placeholder={t('Register/City')}
        values={values}
        labelText={t('Register/City')}
        marginBot={46}
        valid={touched.city && !errors.city}
        error={touched.city && errors.city}
      />
      <BaseInputGroup
        name="zip_code"
        placeholder={t('Register/Zip Code')}
        values={values}
        labelText={t('Register/Zip Code')}
        marginBot={46}
        valid={touched.zip_code && !errors.zip_code}
        error={touched.zip_code && errors.zip_code}
      />
      <BaseInputGroup
        name="tax_id"
        placeholder={t('Register/Tax ID No.')}
        values={values}
        labelText={t('Register/Tax ID No.')}
        marginBot={46}
        valid={touched.tax_id && !errors.tax_id}
        error={touched.tax_id && errors.tax_id}
      />
      {values.type === "agent" && (
        <>
          <BaseInputGroup
            name="employees_number"
            placeholder={t('Register/No. Of Employees')}
            values={values}
            labelText={t('Register/No. Of Employees')}
            marginBot={46}
            type="number"
            valid={touched.employees_number && !errors.employees_number}
            error={touched.employees_number && errors.employees_number}
          />
          <BaseInputGroup
            name="website"
            placeholder={t('Register/Website')}
            values={values}
            labelText={t('Register/Website')}
            marginBot={46}
            valid={touched.website && !errors.website}
            error={touched.website && errors.website}
          />
        </>
      )}

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <BaseNextButton
          disabled={
            values.type === "agent"
              ? isAgentButtonDisabled
              : isClientButtonDisabled
          }
          onClick={() => changePage(false)}
        >
            {t('Register/NEXT')}
        </BaseNextButton>
      </div>
    </>
  );
};

export default PartOne;

const Error = styled.div`
  position: absolute;
  right: 0;
  margin-top: 5px;
  font-family: "Helvetica Reg", sans-serif;
  font-size: 14px;
  color: #e76767;
`;
