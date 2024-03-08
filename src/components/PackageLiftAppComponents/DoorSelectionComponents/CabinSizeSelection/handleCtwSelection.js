import CapacityCalculator from "@/functions/CapacityCalculator/CapacityCalculator";

export function handleCtwSelection(widh, depth, capacity, location, ctws, liftInfo, constants, selectedOptions) {
    const calculator = CapacityCalculator(ctws, liftInfo, constants, selectedOptions);
   const selectedCtw= calculator.filteredSizes.filter(item => 
        item.width === widh && 
        item.depth === depth && 
        item.capacity === capacity && 
        item.location === location);

return selectedCtw;
}