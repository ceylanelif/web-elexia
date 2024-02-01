import { bringCarcassLengthAndLocation } from "../CapacityCalculator/Carcass/CtwLocationDeterminer";
import { carcassDepthCalculator } from "../CapacityCalculator/Carcass/DepthCalculator";


export default function CapacityCalculator(ctws, liftInfo, constants, selectedOptions) {
    const ctwChecker = ctws.map((ctw) => {
        const checker = bringCarcassLengthAndLocation(liftInfo, constants, ctw);
        const checker2=carcassDepthCalculator(ctw,constants);
        return {checker,checker2};
    });

    return ctwChecker;
}
