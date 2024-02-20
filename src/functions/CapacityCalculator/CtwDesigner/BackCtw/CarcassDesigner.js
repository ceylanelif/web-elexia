import { bringCarcassLengthAndLocation } from "../../Carcass/CtwLocationDeterminer";
import { carcassDepthCalculator } from "../../Carcass/DepthCalculator";
import { carcassWidths } from "../../Carcass/WidthCalculator";
import { cabinAreaToCapacityFinder } from "../CabinAreaToCapacityFinder";
import { backCabinDepths } from "./CabinDepths";
import { backCabinWidths } from "./CabinWidths";

export default function carcassDesigner(ctw, liftInfo, constants, selectedOptions) {
    const carcassLength = bringCarcassLengthAndLocation(liftInfo, constants, ctw);
    const carcassWidth = carcassWidths(ctw, constants);
    const carcassDepth = carcassDepthCalculator(ctw, constants);
    const cabinDepths = backCabinDepths(ctw, liftInfo, constants, selectedOptions);
    const cabinWidths = backCabinWidths(liftInfo, constants);
    const possibleOptions = [];

    // Kabin boyutlarını depolamak için bir dizi oluşturalım
    const cabinSizes = [];

    // Her bir kabin genişliği için
    for (const widthObj of cabinWidths) {
        const width = widthObj.cabinWidth;
        // Her bir kabin derinliği ile çarpıp kabin boyutlarını hesaplayalım
        for (const depthObj of cabinDepths) {
            const depth = depthObj.cabinDepth;
            const size = {
                ctw: ctw.ctwName,
                width: width,
                depth: depth,
                type: depthObj.type,
                size: width * depth /1000000,
                capacity:cabinAreaToCapacityFinder(width * depth /1000000).cabinAreaInKg,
                neededBarit:cabinAreaToCapacityFinder(width * depth /1000000).neededBarit,
                otherMeasurements: {
                    railWallConsoleWidth:widthObj.consoleWidth,
                    seperatorWS:depthObj.seperatorWsMin,
                }
            };
            // Hesaplanan boyutları diziye ekleyelim
            cabinSizes.push(size);
        }
    }

    return cabinSizes;
}
