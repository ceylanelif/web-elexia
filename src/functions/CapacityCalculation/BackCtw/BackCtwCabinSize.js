import { cabinAreaToCapacityFinder } from "../CtwDesigner/CabinAreaToCapacityFinder";
import { capacityToCtwWeightFinder } from "../CtwDesigner/CapacityToCtwWeightFinder";
import { BackCabinDepths } from "./CabinDepths";
import { BackCabinWidths } from "./CabinWidths";

export function BackCtwCabinSize(ctw, liftInfo, constants, selectedOptions) {
  const widths = BackCabinWidths(liftInfo, constants);
  const depths = BackCabinDepths(ctw, liftInfo, constants, selectedOptions);


  const cabinSizes = widths.cabinWidths.map((width) => {
    const oneRow = {
      cabinArea: (depths.oneRowCabinDepth.cabinDepth * width) / 1000000,
      width: width,
      depth: depths.oneRowCabinDepth.cabinDepth,
      status: depths.oneRowCabinDepth.status,
      areaCapacityKg: cabinAreaToCapacityFinder((depths.oneRowCabinDepth.cabinDepth * width) / 1000000),
      neededBaritWeight:capacityToCtwWeightFinder(cabinAreaToCapacityFinder((depths.oneRowCabinDepth.cabinDepth * width) / 1000000))
    };
    const doubleRowShort = {
      cabinArea: (depths.doubleRowShortCabinDepth.cabinDepth * width) / 1000000,
      width: width,
      depth: depths.doubleRowShortCabinDepth.cabinDepth,
      status: depths.doubleRowShortCabinDepth.status,
      areaCapacityKg: cabinAreaToCapacityFinder((depths.doubleRowShortCabinDepth.cabinDepth * width) / 1000000),
      neededBaritWeight:capacityToCtwWeightFinder(cabinAreaToCapacityFinder((depths.doubleRowShortCabinDepth.cabinDepth * width) / 1000000))
    };
    const doubleRowLong = {
      cabinArea: (depths.doubleRowLongCabinDepth.cabinDepth * width) / 1000000,
      width: width,
      depth: depths.doubleRowLongCabinDepth.cabinDepth,
      status: depths.doubleRowLongCabinDepth.status,
      areaCapacityKg: cabinAreaToCapacityFinder((depths.doubleRowLongCabinDepth.cabinDepth * width) / 1000000),
      neededBaritWeight:capacityToCtwWeightFinder(cabinAreaToCapacityFinder((depths.doubleRowLongCabinDepth.cabinDepth * width) / 1000000))
    };
    return { oneRow, doubleRowShort, doubleRowLong };
  });

  return { cabinSizes };
}
