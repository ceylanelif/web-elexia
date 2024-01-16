
import React from 'react'
import { useSelector } from 'react-redux'
import doorSpaceReducer from './door';

export default function CapacityCalculator() {
const liftInfo = useSelector((state) => state.lift);
const product=useSelector((state)=>state.product);
const door=useSelector((state)=>state.door);
const selectedOptions=useSelector((state)=>state.selectedOptions);
if(selectedOptions.DoorDimension){
const doorSpace=doorSpaceReducer(liftInfo,selectedOptions);
console.log(doorSpace);}
  return (
    <div>


    </div>
  )
}

