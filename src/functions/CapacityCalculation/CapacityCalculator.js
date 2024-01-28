import { backCtwCabinSize } from "./BackCtw/BackCtwCabinSize";
import { bringCarcassDetails, ctwLocationDeterminer } from "./CtwDesigner/CtwLocationDeterminer";
import { ctwMainDesigner } from "./CtwDesigner/CtwMainDesigner";
import { SideCtwCabinDepth } from "./SideCtw/CabinDepths";


export default function CapacityCalculator(ctws, liftInfo, constants, selectedOptions) {

    const checker = ctws.map((ctw) => {
       const locationDeterminer=ctwLocationDeterminer(liftInfo);
       const location=bringCarcassDetails(liftInfo, constants, ctw, locationDeterminer.carcassType);
        const backCabinSize=backCtwCabinSize(ctw, liftInfo, constants, selectedOptions);

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
                oneRow: {
                    cabinSize: null,
                    cabinCapacity: null,
                    neededCtwWeight: null,
                    carcassWidth: null,
                    railBetween: null,
                    weightStatus: null,
                    generalStatus: null,
                },
                longDoubleRow: {
                    cabinSize: null,
                    cabinCapacity: null,
                    neededCtwWeight: null,
                    carcassWidth: null,
                    railBetween: null,
                    weightStatus: null,
                    generalStatus: null,
                },
                shortDoubleRow: {
                    cabinSize: null,
                    cabinCapacity: null,
                    neededCtwWeight: null,
                    carcassWidth: null,
                    railBetween: null,
                    weightStatus: null,
                    generalStatus: null,
                }
            },

        }
return reverseLogic
    });
    return checker;
}