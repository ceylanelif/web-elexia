"use client"
import React, { useState } from 'react';
import styles from "./styles.module.css";
import { ErrorMessage, Field, Formik } from 'formik';

export default function ElexiaLabeledInput({ spanPlaceholder,labelName, inputPlaceholder, value, handleChange, type, initialValues, validationSchema,fieldName}) {
 
  return (
    <div className={styles.elexiaLabeledInputWrapper}>

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

            <div className={styles.inputAndSpanWrapper}>
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
              <span>{spanPlaceholder}</span>
              <ErrorMessage name="offerName" component="div" className={styles.error} />

            </div>
          </form>
        )}
      </Formik>
    </div>
  );
}
