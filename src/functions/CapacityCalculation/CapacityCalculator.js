import { carcassDepthCalculator } from "./Carcass/DepthCalculator";
import { carcassLengthCalculator } from "./Carcass/LengthCalculator";
import { carcassWidthCalculator } from "./Carcass/WidthCalculator";
import { ctwMainDesigner } from "./CtwDesigner/CtwMainDesigner";


export default function CapacityCalculator(ctws, liftInfo, constants, selectedOptions) {
   
    const checker = ctws.map((ctw) => {
        const depth=carcassDepthCalculator(ctw, liftInfo, selectedOptions, constants);
        const width=carcassWidthCalculator(ctw, selectedOptions, constants);
        const length=carcassLengthCalculator(ctw,liftInfo, constants);
        const ctwDesigner=ctwMainDesigner(ctw, liftInfo, constants, selectedOptions);


        return {  ctwName: ctw,depth:depth,width:width,length:length,designer:ctwDesigner};
    });
    return checker;  
}