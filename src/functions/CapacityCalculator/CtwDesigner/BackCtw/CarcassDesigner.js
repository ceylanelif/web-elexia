import { bringCarcassLengthAndLocation } from "../../Carcass/CtwLocationDeterminer";
import { carcassDepthCalculator } from "../../Carcass/DepthCalculator";
import { carcassWidths } from "../../Carcass/WidthCalculator";
import { backCabinDepths } from "./CabinDepths";
import { backCabinWidths } from "./CabinWidths";

export default function carcassDesigner(ctw, liftInfo, constants, selectedOptions) {

    const carcasslength = bringCarcassLengthAndLocation(liftInfo, constants, ctw);
    const carcassWidth = carcassWidths(ctw, constants);
    const carcassDepth = carcassDepthCalculator(ctw, constants)
    const cabinDepths = backCabinDepths(ctw, liftInfo, constants, selectedOptions);
    const cabinWidths = backCabinWidths(liftInfo, constants);
    const possibleOptions = [];

    // cabinWidths.map(cabinWidthOptions => {
    //     cabinWidthOptions.map(cabinOption=>{
    //         possibleWidth=cabinOption.cabinWidth
            
    //     })


    //         return {
    //             cabinSize
    //         }
    //     })
    // })

return cabinWidths;



}