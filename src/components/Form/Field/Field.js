import { useField } from "formik";
import React from "react";
import "./Field.css";

const FormField = ({ name, id, label, ...restProps }) => {
  const [field, meta] = useField({ name, id, ...restProps });

  return (
    <>
      {label && (
        <label
          className="form-fiel_label"
          htmlFor={field.id ? field.id : field.name}
        >
          {label}
        </label>
      )}

      <input
        className={`form-fiel_input ${
          meta.error && `form-fiel_input--has-error`
        } `}
        {...field}
        name={field.name}
        id={field.id ? field.id : field.name}
      />
    </>
  );
};

export default FormField;
