//Core
import React from "react";
import BaseInputGroup from "../base/BaseInputGroup";
import { ErrorMessage, useFormikContext } from "formik";
import BaseNextButton from "../base/BaseNextButton";
import styled from "styled-components";

const PartOne = ({ changePage, error }) => {
  const { values, touched, errors } = useFormikContext();

  const isAgentButtonDisabled =
    !values.name ||
    !values.master_email ||
    !values.phone ||
    !values.address_line_first ||
    !values.state ||
    !values.city ||
    !values.zip_code ||
    !values.tax_id ||
    !values.employees_number ||
    !values.website;

  const isClientButtonDisabled =
    !values.name ||
    !values.master_email ||
    !values.phone ||
    !values.address_line_first ||
    !values.state ||
    !values.city ||
    !values.zip_code ||
    !values.tax_id;

  return (
    <>
      <BaseInputGroup
        name="name"
        placeholder="Company Name"
        values={values}
        labelText="Company Name"
        marginBot={46}
        valid={touched.name && !errors.name}
        error={touched.name && errors.name}
      />
      <BaseInputGroup
        name="master_email"
        placeholder="Email"
        values={values}
        labelText="Email"
        marginBot={46}
        valid={touched.master_email && !errors.master_email}
        error={touched.master_email && errors.master_email}
      />
      <BaseInputGroup
        name="phone"
        placeholder="Phone number"
        values={values}
        labelText="Phone number"
        marginBot={46}
        valid={touched.phone && !errors.phone}
        error={touched.phone && errors.phone}
      />
      <BaseInputGroup
        name="address_line_first"
        placeholder="Address Line 1"
        values={values}
        labelText="Address"
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
        placeholder="State"
        values={values}
        labelText="State"
        marginBot={46}
        valid={touched.state && !errors.state}
        error={touched.state && errors.state}
      />
      <BaseInputGroup
        name="city"
        placeholder="City"
        values={values}
        labelText="City"
        marginBot={46}
        valid={touched.city && !errors.city}
        error={touched.city && errors.city}
      />
      <BaseInputGroup
        name="zip_code"
        placeholder="Zip Code"
        values={values}
        labelText="Zip Code"
        marginBot={46}
        valid={touched.zip_code && !errors.zip_code}
        error={touched.zip_code && errors.zip_code}
      />
      <BaseInputGroup
        name="tax_id"
        placeholder="Tax id Number"
        values={values}
        labelText="Tax id Number"
        marginBot={46}
        valid={touched.tax_id && !errors.tax_id}
        error={touched.tax_id && errors.tax_id}
      />
      {values.type === "agent" && (
        <>
          <BaseInputGroup
            name="employees_number"
            placeholder="No. of employees"
            values={values}
            labelText="No. of employees"
            marginBot={46}
            type="number"
            valid={touched.employees_number && !errors.employees_number}
            error={touched.employees_number && errors.employees_number}
          />
          <BaseInputGroup
            name="website"
            placeholder="Website"
            values={values}
            labelText="Website"
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
          NEXT
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
