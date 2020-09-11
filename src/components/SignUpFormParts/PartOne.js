//Core
import React from "react";
import BaseInputGroup from "../base/BaseInputGroup";
import { useFormikContext } from "formik";
import BaseNextButton from "../base/BaseNextButton";

const PartOne = ({ changePage }) => {
  const { values } = useFormikContext();
  const isAgentButtonDisabled =
    !values.companyName ||
    !values.email ||
    !values.phone ||
    !values.employees ||
    !values.website;

  const isClientButtonDisabled =
    !values.companyName || !values.email || !values.phone;
  return (
    <>
      <BaseInputGroup
        name="companyName"
        placeholder="Company Name"
        values={values}
        labelText="Company Name"
        marginBot={46}
      />
      <BaseInputGroup
        name="email"
        placeholder="Email"
        values={values}
        labelText="Email"
        marginBot={46}
      />
      <BaseInputGroup
        name="phone"
        placeholder="Phone number"
        values={values}
        labelText="Phone number"
        marginBot={46}
      />
      {values.companyType === "agent" && (
        <>
          <BaseInputGroup
            name="employees"
            placeholder="No. of employees"
            values={values}
            labelText="No. of employees"
            marginBot={46}
          />
          <BaseInputGroup
            name="website"
            placeholder="Website"
            values={values}
            labelText="Website"
            marginBot={46}
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
            values.companyType === "agent"
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
