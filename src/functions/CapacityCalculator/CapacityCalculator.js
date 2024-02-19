
import { backCabinDepths } from "./CtwDesigner/BackCtw/CabinDepths";
import { backCabinWidths } from "./CtwDesigner/BackCtw/CabinWidths";
import carcassDesigner from "./CtwDesigner/BackCtw/CarcassDesigner";
import SideCabinSizeFilterer from "./CtwDesigner/SideCtw/CabinSizeFilterer";


export default function CapacityCalculator(ctws, liftInfo, constants, selectedOptions) {
//  const sideCabinSizes = SideCabinSizeFilterer(ctws, liftInfo, constants, selectedOptions);
 const result=[]

ctws.map((ctw) => {
const backctwsizes=carcassDesigner(ctw, liftInfo, constants, selectedOptions);
  result.push(backctwsizes);
});


  return { kabinolculeri:result};
}
