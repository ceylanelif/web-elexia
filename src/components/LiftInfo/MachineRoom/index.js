"use client"
import React from 'react';
import styles from './styles.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { setMachineRoom } from '@/lib/features/packageAppFeatures/liftInfoSlice';
import ElexiaRadioButton from '@/components/RadioButton';

export default function MachineRoom() {
  const dispatch = useDispatch();
  const liftInfo = useSelector((state) => state.lift);
  
  const handleMachineRoomChange = (e) => {
    const value = e.target.value;
    dispatch(setMachineRoom(value === 'MR'));
  };

  return (
    <div className={styles.radioGroupContainer}>
      <ElexiaRadioButton
        value='MR'
        checked={liftInfo.machineRoom === true}
        handleChange={handleMachineRoomChange}
        buttonName="Machine Room"
      />
      <ElexiaRadioButton
        value='MRL'
        checked={liftInfo.machineRoom === false}
        handleChange={handleMachineRoomChange}
        buttonName="Machine Roomless"
      />
    </div>
  );
}
