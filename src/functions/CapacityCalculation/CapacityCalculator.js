import { BackCtwCabinSize } from "./BackCtw/BackCtwCabinSize";
import { SideCtwCabinDepth } from "./SideCtw/CabinDepths";


export default function CapacityCalculator(ctws, liftInfo, constants, selectedOptions) {
   
    const checker = ctws.map((ctw) => {
        const backCTW=BackCtwCabinSize(ctw, liftInfo, constants, selectedOptions);
        const sideCTW=SideCtwCabinDepth(selectedOptions, liftInfo);
        return {  ctwName: ctw,backctw:backCTW,sidectw:sideCTW};
    });
    return checker;  
}