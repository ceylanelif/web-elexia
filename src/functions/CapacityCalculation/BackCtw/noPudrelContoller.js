import { carcassDepthCalculator } from "../Carcass/DepthCalculator";
import { carcassWidthCalculator } from "../Carcass/WidthCalculator";

export function noPudrelController(ctw, liftInfo, constants, selectedOptions) {

    const carcassDepths = carcassDepthCalculator(ctw, liftInfo, selectedOptions, constants);
    const carcassWidths = carcassWidthCalculator(ctw, liftInfo, selectedOptions, constants);

    function oneRow() {
        if (liftInfo.shaftWidth >= carcassWidths.shaftLength.single)

            return { status: true, occupied_area: carcassDepths.noPudrelCtwDepth.oneRow }
    }

    function doubleRowLong() {
        if (liftInfo.shaftWidth >= carcassWidths.shaftLength.double)
            return { status: true, occupied_area: carcassDepths.noPudrelCtwDepth.oneRow }
        else
            return { status: false }
    }
    function doubleRowShort() {
        return { status: true, occupied_area: carcassDepths.noPudrelCtwDepth.doubleRow }
    }
    return { oneRow: oneRow(), doubleRowLong: doubleRowLong(), doubleRowShort: doubleRowShort() }
}