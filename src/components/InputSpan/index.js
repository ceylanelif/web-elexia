"use client"
import React, { useState } from 'react';
import styles from "./styles.module.css";

export default function ElexiaLabeledInput({ labelName, placeholder ,spanPlaceholder,value,handleChange}) {
 
  return (
    <div className={styles.elexiaLabeledInputWrapper}>
    <div className={styles.labelWrapper}>
      <label htmlFor={labelName}>{labelName} </label>
    </div>
    <div className={styles.inputAndSpanWrapper}>
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
        />
        <span>{spanPlaceholder}</span>
      </div>
    </div>
  );
}
