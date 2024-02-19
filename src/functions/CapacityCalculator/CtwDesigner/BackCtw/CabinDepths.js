import { bringCarcassLengthAndLocation } from "../../Carcass/CtwLocationDeterminer";
import { carcassDepthCalculator } from "../../Carcass/DepthCalculator";
import { carcassWidths } from "../../Carcass/WidthCalculator";
import doorSpaceReducer from "../DoorSpaceReducer";

export function backCabinDepths(ctw, liftInfo, constants, selectedOptions) {

    const carcasslength = bringCarcassLengthAndLocation(liftInfo, constants, ctw);
    const { slimCtwNoPudrel, fatCtwNoPudrel, description } = carcassDepthCalculator(ctw, constants);
    const carcassWidth = carcassWidths(ctw, constants);
    const depthRemainedAfterDoor = doorSpaceReducer(liftInfo, selectedOptions, constants).emptyDepthRemains;

    const slimCabinDepth = depthRemainedAfterDoor - slimCtwNoPudrel;
    const fatCabinDepth = depthRemainedAfterDoor - fatCtwNoPudrel;
    let pudrelWsMin = constants.carcassDepth.seperatorCabinWs;
    let possibleSlimCabinDepths = [];
    let possibleFatCabinDepths = [];

    // İlk döngü için işlemler
    while (pudrelWsMin <= slimCabinDepth) {
        let cabinDepth = slimCabinDepth - pudrelWsMin;

        if (cabinDepth < 800) {
            break; // 800'den küçükse döngüden çık
        }

        possibleSlimCabinDepths.push({ cabinDepth, pudrelWsMin });
        pudrelWsMin++;
    }
    const filteredSlimDepths = possibleSlimCabinDepths.filter((depth) => depth.cabinDepth % 50 === 0);

    // İkinci döngü için işlemler
    pudrelWsMin = constants.carcassDepth.seperatorCabinWs; // ikinci döngü için başlangıç değeri resetleniyor
    while (pudrelWsMin <= fatCabinDepth) {
        let cabinDepth = fatCabinDepth - pudrelWsMin;

        if (cabinDepth < 800) {
            break; // 800'den küçükse döngüden çık
        }

        possibleFatCabinDepths.push({ cabinDepth, pudrelWsMin });
        pudrelWsMin++;
    }
    const filteredFatDepths = possibleFatCabinDepths.filter((depth) => depth.cabinDepth % 50 === 0);

    return { filteredSlimDepths, filteredFatDepths };
}
