//Core
import React from "react";
import BaseInputGroup from "../base/BaseInputGroup";
import { useFormikContext } from "formik";
import BaseNextButton from "../base/BaseNextButton";

const PartOne = ({ changePage }) => {
  const { values, touched, errors } = useFormikContext();

  const isAgentButtonDisabled =
    !values.name ||
    !values.master_email ||
    !values.phone ||
    !values.employees_number ||
    !values.website;

  const isClientButtonDisabled =
    !values.name || !values.master_email || !values.phone;

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
          paddingRight: "20px",
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
          Next
        </BaseNextButton>
      </div>
    </>
  );
};

export default PartOne;
