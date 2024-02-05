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
                widths.push({ size: slimCabinWidth, consoleWidth: i ,type:"slim" });
            }

            if (fatCabinWidth % 50 === 0 && fatCabinWidth >= 800) {
                widths.push({ size: fatCabinWidth, consoleWidth: i ,type:"fat" });
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
                const cabinSize = (depth.cabinDepth * cabinWidth.size)/1000000;
                const type=cabinWidth.type;
                sizes.push({ 
                    size: cabinSize, 
                    capacity:cabinAreaToCapacityFinder(cabinSize).cabinAreaInKg,
                    neededBarit:cabinAreaToCapacityFinder(cabinSize).neededBarit,
                    depth: depth.cabinDepth,
                    cabinToWallBackSpace: depth.cabinToBackWallWs, 
                    width: cabinWidth.size, 
                    wallSideConsoleWidth: cabinWidth.consoleWidth,
                    consoleWidth: cabinWidth.consoleWidth,
                    type,
                    baritDetails:carcassDesigner(ctw, liftInfo, constants, selectedOptions).maxBaritCapacity
                });
                
            });
        });

        return sizes;
    }

    return getCabinSizes();
}
