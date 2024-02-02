import { carcassDepthCalculator } from "../../Carcass/DepthCalculator";
import { sideCabinDepths } from "./CabinDepths";

export default function cabinSize(ctw, liftInfo, constants, selectedOptions) {
    const { slimCtwWithPudrel, fatCtwWithPudrel } = carcassDepthCalculator(ctw, constants);
    const cdepth=sideCabinDepths(liftInfo, selectedOptions);
    console.log(cdepth);
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

            if (slimCabinWidth % 50 === 0) {
                widths.push({ size: slimCabinWidth, consoleWidth: i ,type:"slim" });
            }

            if (fatCabinWidth % 50 === 0) {
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
                sizes.push(cabinSize);
            });
        });

        return sizes;
    }

    return getCabinSizes();
}
