"use client"
import React, { useState } from 'react';
import styles from "./styles.module.css";

export default function ElexiaInput({ labelName, inputPlaceholder,value, handleChange }) {

  return (
    <div className={styles.elexiaInputWrapper}>

      <div className={styles.labelWrapper}>
        <label htmlFor={labelName}>{labelName} </label>
      </div >

      <div className={styles.inputWrapper}>
        <input
          type="text"
          placeholder={inputPlaceholder}
          value={value}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}
