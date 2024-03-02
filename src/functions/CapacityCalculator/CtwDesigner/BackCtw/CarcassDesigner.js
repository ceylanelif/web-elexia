import { bringCarcassLengthAndLocation } from "../../Carcass/CtwLocationDeterminer";
import { carcassDepthCalculator } from "../../Carcass/DepthCalculator";
import { carcassWidths } from "../../Carcass/WidthCalculator";
import { cabinAreaToCapacityFinder } from "../CabinAreaToCapacityFinder";
import railBetweenFinder from "../RailBetweenFinder";
import { backCabinDepths } from "./CabinDepths";
import { backCabinWidths } from "./CabinWidths";

export default function carcassDesigner(ctw, liftInfo, constants, selectedOptions) {
    const carcassLength = bringCarcassLengthAndLocation(liftInfo, constants, ctw);
    const carcassWidth = carcassWidths(ctw, constants);
    const carcassDepth = carcassDepthCalculator(ctw, constants);
    const cabinDepths = backCabinDepths(ctw, liftInfo, constants, selectedOptions);
    const cabinWidths = backCabinWidths(liftInfo, constants);

    // Kabin boyutlarını depolamak için bir dizi oluşturalım
    const cabinSizes = [];
    let carcassSize;
    let carcassFrame = carcassLength.frame;
    let carcassBaritCapacity;
    let carcassCapacityStatus;
    let ctwWidthStatus;
    let ctwWidthType;
    let railBetweenProdcut;
    let railBetween;
    // Her bir kabin genişliği için
    for (const widthObj of cabinWidths) {
        const width = widthObj.cabinWidth;
        // Her bir kabin derinliği ile çarpıp kabin boyutlarını hesaplayalım
        for (const depthObj of cabinDepths) {
            const depth = depthObj.cabinDepth;

            if (liftInfo.shaftWidth >= carcassWidth.doubleSided) {
                ctwWidthStatus = true
                ctwWidthType = "doubleSided"
            } else if (liftInfo.shaftWidth >= carcassWidth.singleSided) {
                ctwWidthStatus = true
                ctwWidthType = "singleSided"
            } else { ctwWidthStatus = false }
            
            if (depthObj.type === "slim") {
                carcassSize = carcassDepth.slimCtwNoPudrel

                if (ctwWidthType === "singleSided") {
                    carcassBaritCapacity = carcassLength.CarcassLengthDetails.singleKg
                    railBetweenProdcut=railBetweenFinder(ctw.ctwA)
                    railBetween=ctw.ctwA+100
                }
                else if (ctwWidthType === "doubleSided") {
                    carcassBaritCapacity = carcassLength.CarcassLengthDetails.doubleKg
                    railBetweenProdcut=railBetweenFinder(ctw.two_X_a)
                    railBetween=ctw.two_X_a+100
                }else {carcassBaritCapacity = 0}

            } else if (depthObj.type === "fat") {
                carcassSize = carcassDepth.fatCtwNoPudrel
                if (ctwWidthType === "singleSided") {
                    carcassBaritCapacity = carcassLength.CarcassLengthDetails.doubleKg
                    railBetweenProdcut=railBetweenFinder(ctw.ctwA)
                    railBetween=ctw.ctwA+100
                }
                else if (ctwWidthType === "doubleSided") {
                    carcassBaritCapacity = carcassLength.CarcassLengthDetails.doubleKg * 2
                    railBetweenProdcut=railBetweenFinder(ctw.two_X_a)
                    railBetween=ctw.two_X_a+100
                }else {carcassBaritCapacity = 0}

            }

            if (carcassBaritCapacity >= cabinAreaToCapacityFinder(width * depth / 1000000).neededBarit) {
                carcassCapacityStatus = true
            } else { carcassCapacityStatus = false }

            const size = {
                location: "back",
                ctw: ctw.ctwName,
                width: width,
                depth: depth,
                type: depthObj.type,
                size: width * depth / 1000000,
                capacity: cabinAreaToCapacityFinder(width * depth / 1000000).cabinAreaInKg,
                neededBarit: cabinAreaToCapacityFinder(width * depth / 1000000).neededBarit,
                otherMeasurements: {
                    railWallConsoleWidth: widthObj.consoleWidth,
                    seperatorWS: depthObj.seperatorWsMin,
                },
                carcassFrame,
                carcassLengthDetails: carcassLength,
                carcassWidthDetails: carcassWidth,
                carcassDepthDetails: carcassSize,
                carcassBaritCapacity,
                carcassCapacityStatus,
                ctwWidthStatus,
                ctwWidthType,
                railBetweenProdcut,
                railBetween
            };
            // Hesaplanan boyutları diziye ekleyelim
            cabinSizes.push(size);
        }
    }

    return cabinSizes;
}
