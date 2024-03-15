import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMachineRoom } from '@/lib/features/packageAppFeatures/liftInfoSlice';
import { Radio } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css'; // Semantic UI CSS import edildiği varsayılıyor
import styles from "./styles.module.css";

export default function MachineRoom() {
  const dispatch = useDispatch();
  const liftInfo = useSelector((state) => state.lift);

  const handleMachineRoomChange = (e, { value }) => {
    dispatch(setMachineRoom(value === 'MR'));
  };

  return (
    <div className={styles.wrapper}>
      <Radio
        label='Machine Room'
        name='machineRoomRadioGroup'
        value='MR'
        checked={liftInfo.machineRoom === true}
        onChange={handleMachineRoomChange}
      />
      <Radio
        label='Machine Roomless'
        name='machineRoomRadioGroup'
        value='MRL'
        checked={liftInfo.machineRoom === false}
        onChange={handleMachineRoomChange}
      />
    </div>
  );
}
