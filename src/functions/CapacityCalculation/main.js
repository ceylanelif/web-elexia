import React from 'react'
import { useSelector } from 'react-redux'
import CapacityList from './CapacityList';
import doorSpaceReducer from './door';

export default function CapacityCalculator() {
const liftInfo = useSelector((state) => state.lift);
const ctws=useSelector((state)=>state.ctw);
const selectedOptions=useSelector((state)=>state.selectedOptions);
const constants=useSelector((state)=>state.extraGlobal.constantData);

//-----------------Kapı Seçimi-----------------//
let contentToDisplay; // İçeriği göstermek için değişken

if (selectedOptions.DoorDimension) {
  contentToDisplay = CapacityList(ctws, liftInfo, constants, selectedOptions)
  const doorReducer=doorSpaceReducer(liftInfo, selectedOptions, constants);
  console.log(doorReducer);
} else {
  contentToDisplay = <div>Lütfen Kapı Seçimi yapınız!</div>;
}  
return (
    <div>
        {contentToDisplay}
    </div>  )
}

