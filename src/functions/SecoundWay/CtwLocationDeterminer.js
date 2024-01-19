import { carcassLengthCalculator } from "../CapacityCalculation/Carcass/LengthCalculator";

export function ctwLocationDeterminer(ctw, liftInfo, constants) {

    let carcassType;
    let carcasDetails;
    
    if (liftInfo.machineRoom && (liftInfo.ropeType === "2:1"|| liftInfo.ropeType === "1:1")) {
        carcassType = "MRcarcass";
        carcasDetails = carcassLengthCalculator(liftInfo, constants,ctw).MrCarcass;
    } else if (!liftInfo.machineRoom && liftInfo.overhead <= 3400) {
        carcassType = "MrlRailBase";
        carcasDetails = carcassLengthCalculator(liftInfo, constants,ctw).MrlRailBase;
    } else if (!liftInfo.machineRoom && liftInfo.overhead > 3400) {
        carcassType = "MrlBeam";
        carcasDetails = carcassLengthCalculator(liftInfo, constants,ctw).MrlBeam;
    }

    // Sonuçları döndür
    return { carcassType, carcasDetails };
}

