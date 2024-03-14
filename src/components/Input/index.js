import React from 'react';
import { Formik, Field, ErrorMessage } from 'formik';
import styles from "./styles.module.css";

const ElexiaInput = ({ labelName, inputPlaceholder, value, handleChange, type, initialValues, validationSchema,fieldName }) => {

  return (
    <div className={styles.elexiaInputWrapper}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={() => {}}
      >
        {({ values, setFieldValue }) => (
          <form>
            <div className={styles.labelWrapper}>
              <label htmlFor={labelName}>{labelName}</label>
            </div>

            <div className={styles.inputWrapper}>
              <Field
                as="input"
                type={type ? type : "text"}
                name={fieldName}
                placeholder={inputPlaceholder}
                value={value}
                onChange={(e) => {
                  handleChange(e, setFieldValue);
                }}
              />
              <ErrorMessage name="offerName" component="div" className={styles.error} />
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default ElexiaInput;
