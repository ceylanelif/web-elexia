import { carcassDepthCalculator } from "../../Carcass/DepthCalculator";
import { cabinAreaToCapacityFinder } from "../CabinAreaToCapacityFinder";
import { sideCabinDepths } from "./CabinDepths";
import carcassDesigner from "./CarcassDesigner";

export default function cabinSize(ctw, liftInfo, constants, selectedOptions) {
    const { slimCtwWithPudrel, fatCtwWithPudrel } = carcassDepthCalculator(ctw, constants);


    function cabinWidthWithouthWallConsole(ctwDepthType, wallConsoleWidth) {
        const sideCtwCabinWidth =
            liftInfo.shaftWidth -
            (ctwDepthType +
                constants.cabinWidth.pudrelConsole +
                (constants.cabinWidth.mainRailSizeMax) * 2 +
                (constants.cabinWidth.railCabinWS) * 2 +
                wallConsoleWidth);

        return sideCtwCabinWidth;
    }

    function getCabinWidths() {
        const widths = [];

        for (let i = constants.cabinWidth.railWallConsoleMin; i <= constants.cabinWidth.railWallConsoleMax; i++) {
            const slimCabinWidth = cabinWidthWithouthWallConsole(slimCtwWithPudrel, i);
            const fatCabinWidth = cabinWidthWithouthWallConsole(fatCtwWithPudrel, i);

            if (slimCabinWidth % 50 === 0 && slimCabinWidth >= 800) {
                widths.push({ size: slimCabinWidth, consoleWidth: i, type: "slim" });
            }

            if (fatCabinWidth % 50 === 0 && fatCabinWidth >= 800) {
                widths.push({ size: fatCabinWidth, consoleWidth: i, type: "fat" });
            }
        }

        return widths;
    }

    function getCabinSizes() {
        const widths = getCabinWidths();
        const sizes = [];
        const filteredDepths = sideCabinDepths(liftInfo, selectedOptions);


        filteredDepths.forEach((depth) => {
            widths.forEach((cabinWidth) => {
                const cabinSize = (depth.cabinDepth * cabinWidth.size) / 1000000;
                const type = cabinWidth.type;
                const fatTypeMaxBariCapacity = carcassDesigner(ctw, liftInfo, constants, selectedOptions).CtwTypeWidhCapacity.fat.baritCapacityKg;
                const slimTypeMaxBariCapacity = carcassDesigner(ctw, liftInfo, constants, selectedOptions).CtwTypeWidhCapacity.slim.baritCapacityKg;
                let slimTypeKgCapacityStatus;
                let fatTypeKgCapacityStatus;
                const neededBarit = cabinAreaToCapacityFinder(cabinSize).neededBarit;

                if (fatTypeMaxBariCapacity >= neededBarit) {
                    fatTypeKgCapacityStatus = true;
                } else {
                    fatTypeKgCapacityStatus = false;
                }

                if (slimTypeMaxBariCapacity >= neededBarit) {
                    slimTypeKgCapacityStatus = true;
                } else {
                    slimTypeKgCapacityStatus = false;
                }

                let maxBaritCapacity;
                let kgCapacityStatus;
                let baritDetails;
                if (type === "fat") {
                    baritDetails = carcassDesigner(ctw, liftInfo, constants, selectedOptions).CtwTypeWidhCapacity.fat;
                    maxBaritCapacity = fatTypeMaxBariCapacity;
                    kgCapacityStatus = fatTypeKgCapacityStatus;
                } else if (type === "slim") {
                    baritDetails = carcassDesigner(ctw, liftInfo, constants, selectedOptions).CtwTypeWidhCapacity.slim;
                    maxBaritCapacity = slimTypeMaxBariCapacity;
                    kgCapacityStatus = slimTypeKgCapacityStatus;
                }
                

                sizes.push({
                    location:"side",
                    name: ctw.ctwName,
                    capacity: cabinAreaToCapacityFinder(cabinSize).cabinAreaInKg,
                    width: cabinWidth.size,
                    depth: depth.cabinDepth,
                    cabinArea: cabinSize,
                    ctwMaterial:ctw.ctwMaterial,
                    kgCapacityStatus,
                    details:{
                        neededBarit,
                        cabinToWallBackSpace: depth.cabinToBackWallWs,
                        wallSideConsoleWidth: cabinWidth.consoleWidth,
                        type,
                        maxBaritCapacity,
                                        },
                    baritDetails,
                });

            });
        });

        return sizes;
    }

    return getCabinSizes();
}
