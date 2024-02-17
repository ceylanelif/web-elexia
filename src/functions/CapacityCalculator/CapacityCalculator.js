
import { backCabinDepths } from "./CtwDesigner/BackCtw/CabinDepths";
import SideCabinSizeFilterer from "./CtwDesigner/SideCtw/CabinSizeFilterer";


export default function CapacityCalculator(ctws, liftInfo, constants, selectedOptions) {
//  const sideCabinSizes = SideCabinSizeFilterer(ctws, liftInfo, constants, selectedOptions);
 const result=[]

ctws.map((ctw) => {
 const backDepths= backCabinDepths(ctw, liftInfo, constants, selectedOptions);
  result.push(backDepths);
});


  return result;
}
