import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setRopeType } from '@/lib/features/packageAppFeatures/liftInfoSlice';
import { Radio } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css'; // Semantic UI CSS import edildiği varsayılıyor
import styles from "./styles.module.css";

export default function RopeType() {
  const dispatch = useDispatch();
  const liftInfo = useSelector((state) => state.lift);
  
  const handleRopeTypeChange = (e, { value }) => {
    dispatch(setRopeType(value));
  };

  return (
    <div className={styles.wrapper}>
      {liftInfo.machineRoom && (
        <div >
          <label>Rope Type:</label>
          <Radio
           id='ropeTypeRadioGroupTwoToOne'
            label='2:1'
            name='ropeTypeRadioGroup'
            value='2:1'
            checked={liftInfo.ropeType === "2:1"}
            onChange={handleRopeTypeChange}
          />
          <Radio
            id='ropeTypeRadioGroupOneToOne'
            label='1:1'
            name='ropeTypeRadioGroup'
            value='1:1'
            checked={liftInfo.ropeType === "1:1"}
            onChange={handleRopeTypeChange}
          />
        </div>
      )}
    </div>
  );
}
