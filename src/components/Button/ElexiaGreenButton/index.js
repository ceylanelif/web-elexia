"use client"
import React from 'react';
import styles from './styles.module.css';

const ElexiaGreenButton = ({ buttonName, className, onClick }) => {
  return (
    <div className={className}>
      <button onClick={onClick} className={styles.elexiaGreenButton}>{buttonName}</button>
    </div>
  );
};
export default ElexiaGreenButton;
