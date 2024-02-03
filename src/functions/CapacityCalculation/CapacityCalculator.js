import { bringCarcassLengthAndLocation } from "../CapacityCalculator/Carcass/CtwLocationDeterminer";
import { carcassDepthCalculator } from "../CapacityCalculator/Carcass/DepthCalculator";
import { carcassWidths } from "../CapacityCalculator/Carcass/WidthCalculator";
import cabinSize from "../CapacityCalculator/CtwDesigner/SideCtw/CabinSize";
import carcassDesigner from "../CapacityCalculator/CtwDesigner/SideCtw/CarcassDesigner";


export default function CapacityCalculator(ctws, liftInfo, constants, selectedOptions) {
    const ctwChecker = ctws.map((ctw) => {
        const length = bringCarcassLengthAndLocation(liftInfo, constants, ctw);
        const depth=carcassDepthCalculator(ctw,constants);
        const width=carcassWidths(ctw,selectedOptions,constants);
        const checker=carcassDesigner(ctw,liftInfo,constants,selectedOptions);
        const checker2=cabinSize(ctw,liftInfo,constants,selectedOptions);
        return {length,depth,width,checker,cabinSize:checker2};
    });

    return ctwChecker;
}
