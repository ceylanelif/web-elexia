import { cabinAreaToCapacityFinder } from "../CtwDesigner/CabinAreaToCapacityFinder";
import { capacityToCtwWeightFinder } from "../CtwDesigner/CapacityToCtwWeightFinder";
import { backCabinDepths } from "./CabinDepths";
import { backCabinWidths } from "./CabinWidths";

export function backCtwCabinSize(ctw, liftInfo, constants, selectedOptions) {
  const widths = backCabinWidths(liftInfo, constants);
  const depths = backCabinDepths(ctw, liftInfo, constants, selectedOptions);

  const cabinSizes = widths.cabinWidths.map((width) => {
    const oneRowCabinDepth = depths.oneRowCabinDepth;
    const doubleRowShortCabinDepth = depths.doubleRowShortCabinDepth;
    const doubleRowLongCabinDepth = depths.doubleRowLongCabinDepth;

    const oneRow = oneRowCabinDepth
      ? {
          cabinArea: (oneRowCabinDepth.cabinDepth * width) / 1000000,
          width: width,
          depth: oneRowCabinDepth.cabinDepth,
          areaCapacityKg: cabinAreaToCapacityFinder((oneRowCabinDepth.cabinDepth * width) / 1000000),
          neededBaritWeight: capacityToCtwWeightFinder(
            cabinAreaToCapacityFinder((oneRowCabinDepth.cabinDepth * width) / 1000000),          
          ),
        }
      : null;

    const doubleRowShort = doubleRowShortCabinDepth
      ? {
          cabinArea: (doubleRowShortCabinDepth.cabinDepth * width) / 1000000,
          width: width,
          depth: doubleRowShortCabinDepth.cabinDepth,
          areaCapacityKg: cabinAreaToCapacityFinder(
            (doubleRowShortCabinDepth.cabinDepth * width) / 1000000
          ),
          neededBaritWeight: capacityToCtwWeightFinder(
            cabinAreaToCapacityFinder((doubleRowShortCabinDepth.cabinDepth * width) / 1000000)
          ),
        }
      : null;

    const doubleRowLong = doubleRowLongCabinDepth
      ? {
          cabinArea: (doubleRowLongCabinDepth.cabinDepth * width) / 1000000,
          width: width,
          depth: doubleRowLongCabinDepth.cabinDepth,
          areaCapacityKg: cabinAreaToCapacityFinder(
            (doubleRowLongCabinDepth.cabinDepth * width) / 1000000
          ),
          neededBaritWeight: capacityToCtwWeightFinder(
            cabinAreaToCapacityFinder((doubleRowLongCabinDepth.cabinDepth * width) / 1000000)
          ),
        }
      : null;

    return { oneRow, doubleRowShort, doubleRowLong };
  });

  return { cabinSizes };
}
