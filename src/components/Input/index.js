"use client"
import React, { useState } from 'react';
import styles from "./styles.module.css";

export default function ElexiaInput({ labelName, inputPlaceholder,value, handleChange,type ,min,max,required}) {

  return (
    <div className={styles.elexiaInputWrapper}>

      <div className={styles.labelWrapper}>
        <label htmlFor={labelName}>{labelName} </label>
      </div >

      <div className={styles.inputWrapper}>
        <input
          type={type ? type : "text"}
          required={required ? required : false}
          min={min ? min : null}
          max={max ? max : null}
          placeholder={inputPlaceholder}
          value={value}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}
