import React from 'react';
import styles from "./styles.module.css";
import { useDispatch, useSelector } from 'react-redux';
import { setSpeed } from '@/lib/features/packageAppFeatures/liftInfoSlice';

export default function Speed() {
  const dispatch = useDispatch();
  const liftInfo = useSelector((state) => state.lift);
  const handleSpeed = (event) => {
      dispatch(
      setSpeed(event.target.value)); // Eğer input alanında göstermek istiyorsanız, state'i güncelleyin
  };
  const speedOptions = [
    { key: '1.0', text: '1.0 m/s', value: '1.0' },
    { key: '1.6', text: '1.6 m/s', value: '1.6' },
    { key: '2.0', text: '2.0 m/s', value: '2.0' },
  ];

  return (
    <div className={styles.dropdown}>
    <select value={liftInfo.speed} onChange={handleSpeed}>
    <option value="" disabled hidden>
        Speed
      </option>
      {speedOptions.map((option) => (
        <option key={option.key} value={option.value}>
          {option.text}
        </option>
      ))}
    </select>
    </div>
  );
}
