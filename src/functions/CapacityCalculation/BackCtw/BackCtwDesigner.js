import { carcassDepthCalculator } from "../Carcass/DepthCalculator";
import { carcassWidthCalculator } from "../Carcass/WidthCalculator";
import { bringCarcassDetails, ctwLocationDeterminer } from "../CtwDesigner/CtwLocationDeterminer"; // Corrected import

export default function backCtwDesigner(ctw, liftInfo, selectedOptions, constants) {

    const width = carcassWidthCalculator(ctw, selectedOptions, constants);
    const depth = carcassDepthCalculator(ctw, liftInfo, selectedOptions, constants).noPudrelCtwDepth;
    const location = ctwLocationDeterminer(liftInfo).carcassType; // Corrected function name
    const carcassCapacity = bringCarcassDetails(liftInfo,constants,ctw,location);

    let possibleWidths;
    // Çift Sıra Uzun
    if (liftInfo.shaftWidth >= width.shaftLength.double) {
        possibleWidths = {
            longDoubleRow: { status: true, depthOccupation: depth.oneRow, carcassCapacity: carcassCapacity.doubleKg },
            oneRow: { status: true, depthOccupation: depth.oneRow, carcassCapacity: carcassCapacity.singleKg },
            shortDoubleRow: { status: true, depthOccupation: depth.doubleRow, carcassCapacity: carcassCapacity.doubleKg }
        };
        return possibleWidths;
    } else if (liftInfo.shaftWidth >= width.shaftLength.single) {
        possibleWidths = {
            longDoubleRow: { status: false, depthOccupation: depth.oneRow, carcassCapacity: carcassCapacity.doubleKg },
            oneRow: { status: true, depthOccupation: depth.oneRow, carcassCapacity: carcassCapacity.singleKg },
            shortDoubleRow: { status: true, depthOccupation: depth.doubleRow, carcassCapacity: carcassCapacity.doubleKg }
        };
        return possibleWidths;
    } else {
        possibleWidths = { longDoubleRow: { status: false }, oneRow: { status: false }, shortDoubleRow: { status: false } }; // Updated the structure
        return possibleWidths;
    }
}
