import { carcassDepthCalculator } from "../../Carcass/DepthCalculator";
import doorSpaceReducer from "../DoorSpaceReducer";

export function backCabinDepths(ctw, liftInfo, constants, selectedOptions) {

    const { slimCtwNoPudrel, fatCtwNoPudrel } = carcassDepthCalculator(ctw, constants);
    const depthRemainedAfterDoor = doorSpaceReducer(liftInfo, selectedOptions, constants).emptyDepthRemains;

    const slimCabinDepth = depthRemainedAfterDoor - slimCtwNoPudrel;
    const fatCabinDepth = depthRemainedAfterDoor - fatCtwNoPudrel;
    let seperatorWsMin = constants.carcassDepth.seperatorCabinWs;
    let possibleSlimCabinDepths = [];
    let possibleFatCabinDepths = [];

    // İlk döngü için işlemler
    while (seperatorWsMin <= slimCabinDepth) {
        let cabinDepth = slimCabinDepth - seperatorWsMin;

        if (cabinDepth < 800) {
            break; // 800'den küçükse döngüden çık
        }

        possibleSlimCabinDepths.push({ cabinDepth, seperatorWsMin });
        seperatorWsMin++;
    }
    const filteredSlimDepths = possibleSlimCabinDepths.filter((depth) => depth.cabinDepth % 50 === 0);

    // İkinci döngü için işlemler
    seperatorWsMin = constants.carcassDepth.seperatorCabinWs; // ikinci döngü için başlangıç değeri resetleniyor
    while (seperatorWsMin <= fatCabinDepth) {
        let cabinDepth = fatCabinDepth - seperatorWsMin;

        if (cabinDepth < 800) {
            break; // 800'den küçükse döngüden çık
        }

        possibleFatCabinDepths.push({ cabinDepth, seperatorWsMin });
        seperatorWsMin++;
    }
    const filteredFatDepths = possibleFatCabinDepths.filter((depth) => depth.cabinDepth % 50 === 0);

    return { filteredSlimDepths, filteredFatDepths };
}
