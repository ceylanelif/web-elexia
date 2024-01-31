import { backCtwCabinSize } from "./BackCtw/BackCtwCabinSize";
import { bringCarcassDetails, ctwLocationDeterminer } from "./CtwDesigner/CtwLocationDeterminer";
import { sideCabinDepths } from "./SideCtw/CabinDepths";
import { sideCabinWidths } from "./SideCtw/CabinWidths";



export default function CapacityCalculator(ctws, liftInfo, constants, selectedOptions) {

    const checker = ctws.map((ctw) => {
       const locationDeterminer=ctwLocationDeterminer(liftInfo);
       const location=bringCarcassDetails(liftInfo, constants, ctw, locationDeterminer.carcassType);
        const backCabinSize=backCtwCabinSize(ctw, liftInfo, constants, selectedOptions);
        //const sideCabinSize=sideCtwCabinSize(ctw, liftInfo, constants, selectedOptions);
        const cabinDepth=sideCabinDepths(liftInfo,selectedOptions);
        const cabinWidth=sideCabinWidths(ctw, liftInfo, constants, selectedOptions)
        const reverseLogic = {
            id: ctw.ctwId,
            name: ctw.ctwName,
            material: ctw.ctwMaterial,
            length: ctw.ctwA,
            carcassType: locationDeterminer.carcassType,//kuyuya uygun karkas tipi
            singleCarcassCapacity: location.singleKg,
            doubleCarcassCapacity: location.doubleKg,
            backCtw: {
                cabinSize: backCabinSize,
            },  
            sideCtw: {
                //cabinSize: sideCabinSize,
            cabinWidth:cabinWidth,
            cabinDepth:cabinDepth
            },

        }
return reverseLogic
    });
    return checker;
}