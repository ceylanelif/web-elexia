import { BackCtwCabinSize } from "./BackCtw/BackCtwCabinSize";
import { carcassDepthCalculator } from "./Carcass/DepthCalculator";
import { carcassLengthCalculator } from "./Carcass/LengthCalculator";
import { carcassWidthCalculator } from "./Carcass/WidthCalculator";
import { SideCtwCabinDepth } from "./SideCtw/CabinDepths";


export default function CapacityCalculator(ctws, liftInfo, constants, selectedOptions) {
   
    const checker = ctws.map((ctw) => {
        const backCTW=BackCtwCabinSize(ctw, liftInfo, constants, selectedOptions);
        const sideCTW=SideCtwCabinDepth(selectedOptions, liftInfo);
        const depth=carcassDepthCalculator(ctw, liftInfo, selectedOptions, constants).pudrelCtwDepth;
        const width=carcassWidthCalculator(ctw, selectedOptions, constants);
        const length=carcassLengthCalculator(ctw,liftInfo, constants);
        return {  ctwName: ctw,backctw:backCTW,sidectw:sideCTW,depth:depth,width:width,length:length};
    });
    return checker;  
}