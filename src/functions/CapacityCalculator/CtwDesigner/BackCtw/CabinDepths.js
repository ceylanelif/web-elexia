import { bringCarcassLengthAndLocation } from "../../Carcass/CtwLocationDeterminer";
import { carcassDepthCalculator } from "../../Carcass/DepthCalculator";
import { carcassWidths } from "../../Carcass/WidthCalculator";
import doorSpaceReducer from "../DoorSpaceReducer";

export function backCabinDepths(ctw, liftInfo, constants, selectedOptions) {

    const carcasslength = bringCarcassLengthAndLocation(liftInfo, constants, ctw);
    const {slimCtwNoPudrel,fatCtwNoPudrel,description} = carcassDepthCalculator(ctw, constants);
    const carcassWidth = carcassWidths(ctw, constants);
    const depthRemainedAfterDoor = doorSpaceReducer(liftInfo, selectedOptions, constants).emptyDepthRemains;
    const depthConstants = constants.carcassDepth;
   
    const slimCabinDepth = depthRemainedAfterDoor-slimCtwNoPudrel;
    const fatCabinDepth = depthRemainedAfterDoor-fatCtwNoPudrel;

    let possibleSlimCabinDepths = []; 
    let possibleFatCabinDepths = [];

    // for (let i = 0; slimCabinDepth >= 800; i++) {
    //     const currentDepth = slimCabinDepth - (i+50) ; // Her adımda 50 azalt
    
    //     possibleSlimCabinDepths.push(currentDepth);
    // }
    
    
    // for (let i = fatCabinDepth; i >= 800; i++) {
    //     const currentDepth = i + depthConstants.seperatorCabinWs;
        
    //     // 50'nin katı olup olmadığını kontrol et
    //     if (currentDepth % 50 === 0) {
    //         possibleFatCabinDepths.push(currentDepth);
    //     }
    // }
    


return {possibleSlimCabinDepths };
}

