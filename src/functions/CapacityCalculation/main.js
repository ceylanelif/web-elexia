import React from 'react'
import { useSelector } from 'react-redux'
import CapacityList from './CapacityList';
import CapacityCalculator from './CapacityCalculator';
import { ctwSide } from './BackCtw/CtwSide';

export default function Capacity() {
const liftInfo = useSelector((state) => state.lift);
const ctws=useSelector((state)=>state.ctw.ctwList);
const selectedOptions=useSelector((state)=>state.selectedOptions);
const constants=useSelector((state)=>state.extraGlobal.constantData);

//-----------------Kapı Seçimi-----------------//
let contentToDisplay; // İçeriği göstermek için değişken
if (selectedOptions.DoorDimension) {
  contentToDisplay = CapacityList(ctws, liftInfo, constants, selectedOptions)
  const checker=CapacityCalculator(ctws, liftInfo, constants, selectedOptions);
  const checker2=ctwSide(ctws, liftInfo, constants, selectedOptions);
  console.log("arkadan ağırlık karkas ölçüleri",checker2);
  console.log(checker);
} else {
  contentToDisplay = <div>Lütfen Kapı Seçimi yapınız!</div>;
}  
return (
    <div>
        {contentToDisplay}
    </div>  )
}

