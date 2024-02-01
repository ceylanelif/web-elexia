import { bringCarcassLengthAndLocation } from "../CapacityCalculator/Carcass/CtwLocationDeterminer";
import { carcassDepthCalculator } from "../CapacityCalculator/Carcass/DepthCalculator";
import { carcassWidths } from "../CapacityCalculator/Carcass/WidthCalculator";
import cabinWidth from "../CapacityCalculator/CtwDesigner/SideCtw/CabinWidth";


export default function CapacityCalculator(ctws, liftInfo, constants, selectedOptions) {
    const ctwChecker = ctws.map((ctw) => {
        const length = bringCarcassLengthAndLocation(liftInfo, constants, ctw);
        const depth=carcassDepthCalculator(ctw,constants);
        const width=carcassWidths(ctw,selectedOptions,constants);
        const checker=cabinWidth(ctw,liftInfo,constants,selectedOptions);
        return {length,depth,width,checker};
    });

    return ctwChecker;
}
