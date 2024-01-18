import React from 'react'
import { useSelector } from 'react-redux'
import CapacityList from './CapacityList';
import { DepthCalculator } from './Carcass/DepthCalculator';

export default function CapacityCalculator() {
const liftInfo = useSelector((state) => state.lift);
const ctws=useSelector((state)=>state.ctw.ctwList);
const selectedOptions=useSelector((state)=>state.selectedOptions);
const constants=useSelector((state)=>state.extraGlobal.constantData);

//-----------------Kapı Seçimi-----------------//
let contentToDisplay; // İçeriği göstermek için değişken
if (selectedOptions.DoorDimension) {
  contentToDisplay = CapacityList(ctws, liftInfo, constants, selectedOptions)
  
  const checker = ctws.map((ctw) => {
    const result = DepthCalculator(ctw, liftInfo, selectedOptions, constants);
    return { ...result, ctwName: ctw.ctwName };
});

  console.log(checker);
} else {
  contentToDisplay = <div>Lütfen Kapı Seçimi yapınız!</div>;
}  
return (
    <div>
        {contentToDisplay}
    </div>  )
}

