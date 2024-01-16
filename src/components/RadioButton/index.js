"use client"
import React from 'react';
import styles from "./styles.module.css";

export default function ElexiaRadioButton({ buttonName, value, handleChange, checked }) {
  return (
    <div className={styles.container}>
      <label>
        <input
          type="radio"
          name='radioGroup'
          value={value}
          checked={checked}
          onChange={handleChange}
        /> {buttonName}
      </label>
    </div>
  );
}
