import { setDoorDimension } from '@/lib/features/packageAppFeatures/selectedOptionsSlice';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dropdown } from 'semantic-ui-react';
import styles from "./styles.module.css"

export default function PossibleDoorOptions() {
  const dimensions =useSelector((state) => state.door.dimensions.data);
  const dispatch = useDispatch();

  const dropdownOptions = dimensions
    ? dimensions.map((dimension) => ({
      key: dimension.dimensionId,
      text: dimension.dimensionInfo,
      value: dimension,
    }))
    : [];

  const handleDropdownChange = (event, data) => {
    dispatch(setDoorDimension(data.value));
  };

  return (
    <div className={styles.doorDropdownWrapper}>
      <h1 >Door Size Selection <span className={styles.wH}>(Width x Height)</span></h1>
      <Dropdown
        placeholder="Seçim yapın"
        fluid
        selection
        options={dropdownOptions}
        onChange={handleDropdownChange}
      />
     
    </div>
  );
}