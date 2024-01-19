import { backCtwCabinSize } from "../SecoundWay/BackCtwCabinSize";
import { ctwLocationDeterminer } from "../SecoundWay/CtwLocationDeterminer";
import { ctwSide } from "./BackCtw/CtwSide";
import { carcassDepthCalculator } from "./Carcass/DepthCalculator";
import { carcassLengthCalculator } from "./Carcass/LengthCalculator";
import { carcassWidthCalculator } from "./Carcass/WidthCalculator";

export default function CapacityCalculator(ctws, liftInfo, constants, selectedOptions) {
   
    const checker = ctws.map((ctw) => {
        const result = carcassDepthCalculator(ctw, liftInfo, selectedOptions, constants);
        const lengths=carcassLengthCalculator(liftInfo, constants,ctw);
        const widths=carcassWidthCalculator(ctw, liftInfo, selectedOptions, constants);
       const ctwLocation=ctwLocationDeterminer(ctw, liftInfo, constants);
    

        return { depths:result, ctwName: ctw, lengths:lengths, widths:widths,location:ctwLocation};
    });
    return checker;  
}