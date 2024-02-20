import { carcassDepthCalculator } from "../../Carcass/DepthCalculator";
import doorSpaceReducer from "../DoorSpaceReducer";

export function backCabinDepths(ctw, liftInfo, constants, selectedOptions) {

    const { slimCtwNoPudrel, fatCtwNoPudrel } = carcassDepthCalculator(ctw, constants);
    const depthRemainedAfterDoor = doorSpaceReducer(liftInfo, selectedOptions, constants).emptyDepthRemains;

    const slimCabinDepth = depthRemainedAfterDoor - slimCtwNoPudrel;
    const fatCabinDepth = depthRemainedAfterDoor - fatCtwNoPudrel;
    let seperatorWsMin = constants.carcassDepth.seperatorCabinWs;
    let possibleCabinDepths = [];

    // İnce kabin derinliklerini hesapla
    while (seperatorWsMin <= slimCabinDepth) {
        let cabinDepth = slimCabinDepth - seperatorWsMin;

        if (cabinDepth < 800) {
            break; // 800'den küçükse döngüden çık
        }

        if (cabinDepth % 50 === 0) {
            possibleCabinDepths.push({ cabinDepth, seperatorWsMin ,type: "slim"});
        }
        seperatorWsMin++;
    }

    // Kalın kabin derinliklerini hesapla
    seperatorWsMin = constants.carcassDepth.seperatorCabinWs; // ikinci döngü için başlangıç değeri resetleniyor
    while (seperatorWsMin <= fatCabinDepth) {
        let cabinDepth = fatCabinDepth - seperatorWsMin;

        if (cabinDepth < 800) {
            break; // 800'den küçükse döngüden çık
        }

        if (cabinDepth % 50 === 0) {
            possibleCabinDepths.push({ cabinDepth, seperatorWsMin ,type: "fat"});
        }
        seperatorWsMin++;
    }

    return possibleCabinDepths;
}
