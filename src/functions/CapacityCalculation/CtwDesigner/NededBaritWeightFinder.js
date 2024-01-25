import { cabinAreaToCapacityFinder } from "./CabinAreaToCapacityFinder";
import { capacityToCtwWeightFinder } from "./CapacityToCtwWeightFinder";

export default function neededBaritWeightFinder(cabinArea) {
    const neededCabinWeight = capacityToCtwWeightFinder(cabinAreaToCapacityFinder(
        cabinArea))
    return neededCabinWeight
}