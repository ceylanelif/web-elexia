import { cabinAreaToCapacityFinder } from "./CabinAreaToCapacityFinder";
import { capacityToCtwWeightFinder } from "./CapacityToCtwWeightFinder";

export function weightStatusDeterminer(cabinArea, carcassCapacity) {

    const neededBaritWeight = capacityToCtwWeightFinder(cabinAreaToCapacityFinder(cabinArea))
    if (neededBaritWeight < carcassCapacity) {
        return true
    }
    else {
        return false
    }
}
