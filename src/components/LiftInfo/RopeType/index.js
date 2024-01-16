
import React from 'react';
import styles from "./styles.module.css";
import { useDispatch, useSelector } from 'react-redux';
import { setRopeType } from '@/lib/features/packageAppFeatures/liftInfoSlice';
import ElexiaRadioButton from '@/components/RadioButton';

export default function RopeType() {
  const dispatch = useDispatch();
  const liftInfo = useSelector((state) => state.lift);
  
  const handleRopeTypeChange = (e) => {
    dispatch(setRopeType(e.target.value));
  };

  return (
    <div className={styles.radioGroupContainer}>
      {liftInfo.machineRoom && (
        <div className={styles.wrapper}>
          <div className={styles.textArea}>
            Rope Type :
          </div>
          <ElexiaRadioButton 
            buttonName="2:1"
            value='2:1'
            checked={liftInfo.ropeType === "2:1"}
            handleChange={handleRopeTypeChange}
          />
          <ElexiaRadioButton 
            value='1:1'
            checked={liftInfo.ropeType === "1:1"}
            handleChange={handleRopeTypeChange}
            buttonName="1:1"
          />
        </div>
      )}
    </div>
  );
}
