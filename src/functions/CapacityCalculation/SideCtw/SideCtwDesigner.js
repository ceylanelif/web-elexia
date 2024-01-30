import { carcassDepthCalculator } from "../Carcass/DepthCalculator";
import { carcassWidthCalculator } from "../Carcass/WidthCalculator";
import { bringCarcassDetails, ctwLocationDeterminer } from "../CtwDesigner/CtwLocationDeterminer";

export default function sideCtwDesigner(ctw, liftInfo, selectedOptions, constants) {
    const width = carcassWidthCalculator(ctw, selectedOptions, constants);
    const depth = carcassDepthCalculator(ctw, liftInfo, selectedOptions, constants).pudrelCtwDepth;
    const location = ctwLocationDeterminer(liftInfo).carcassType; // Corrected function name
    const carcassCapacity = bringCarcassDetails(liftInfo,constants,ctw,location);
    
    let possibleWidths;
    // Çift Sıra Uzun
    if (liftInfo.shaftDepth >= width.doorLength.double) {
        possibleWidths = {
            longDoubleRow: { status: true, widthOccupation: depth.oneRow, carcassCapacity: carcassCapacity.doubleKg },
            oneRow: { status: true, widthOccupation: depth.oneRow, carcassCapacity: carcassCapacity.singleKg },
            shortDoubleRow: { status: true, widthOccupation: depth.doubleRow, carcassCapacity: carcassCapacity.doubleKg }
        };
        return possibleWidths;
    } else if (liftInfo.shaftDepth >= width.doorLength.single) {
        possibleWidths = {
            longDoubleRow: { status: false, widthOccupation: depth.oneRow, carcassCapacity: carcassCapacity.doubleKg },
            oneRow: { status: true, widthOccupation: depth.oneRow, carcassCapacity: carcassCapacity.singleKg },
            shortDoubleRow: { status: true, widthOccupation: depth.doubleRow, carcassCapacity: carcassCapacity.doubleKg }
        };
        return possibleWidths;
    } else {
        possibleWidths = { longDoubleRow: { status: false }, oneRow: { status: false }, shortDoubleRow: { status: false } }; // Updated the structure
        return possibleWidths;
    }
    
}