import React from 'react'
import { useSelector } from 'react-redux'
import CapacityCalculator from './CapacityCalculator';
import CabinSizeList from '@/components/PackageLiftAppComponents/DoorSelectionComponents/CabinSizeSelection/Dropdown';
import CapacityList from '@/components/PackageLiftAppComponents/DoorSelectionComponents/CapacitySelection/Dropdown';

export default function Capacity() {
  const liftInfo = useSelector((state) => state.lift);
  const ctws = useSelector((state) => state.ctw.ctwList);
  const selectedOptions = useSelector((state) => state.selectedOptions);
  const constants = useSelector((state) => state.extraGlobal.constantData);

  //-----------------Kapı Seçimi-----------------//
  let contentToDisplay; // İçeriği göstermek için değişken
  if (selectedOptions.DoorDimension) {
    contentToDisplay = CapacityList(ctws, liftInfo, constants, selectedOptions)
    const checker = CapacityCalculator(ctws, liftInfo, constants, selectedOptions);
    console.log(checker);
  } else {
    contentToDisplay = <div>Lütfen Kapı Seçimi yapınız!</div>;
  }

  let contentToDisplay2; // İçeriği göstermek için değişken
if (selectedOptions.Capacity) {
  contentToDisplay2 = CabinSizeList(ctws, liftInfo, constants, selectedOptions)
}else {
  contentToDisplay2 = <div>Lütfen Kapasite Seçimi yapınız!</div>;}

  return (
    <div>
      {contentToDisplay}
      { contentToDisplay2}
    </div>)
}

