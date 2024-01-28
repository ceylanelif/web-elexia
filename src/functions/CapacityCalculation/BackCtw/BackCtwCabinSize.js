import { cabinAreaToCapacityFinder } from "../CtwDesigner/CabinAreaToCapacityFinder";
import neededBaritWeightFinder from "../CtwDesigner/NededBaritWeightFinder";
import railBetweenFinder from "../CtwDesigner/RailBetweenFinder";
import { weightStatusDeterminer } from "../CtwDesigner/WeightStatusDeterminer";
import { backCabinDepths } from "./CabinDepths";
import { backCabinWidths } from "./CabinWidths";

export function backCtwCabinSize(ctw, liftInfo, constants, selectedOptions) {
  const widths = backCabinWidths(liftInfo, constants);
  const depths = backCabinDepths(ctw, liftInfo, constants, selectedOptions);

  const oneRowCabinDepth = depths.oneRowCabinDepth;
  const doubleRowShortCabinDepth = depths.doubleRowShortCabinDepth;
  const doubleRowLongCabinDepth = depths.doubleRowLongCabinDepth;
  console.log(doubleRowLongCabinDepth)
  const cabinSizes = widths.cabinWidths.map((width) => {

    const oneRow = oneRowCabinDepth
      ? {
        cabinArea: (oneRowCabinDepth.cabinDepth * width) / 1000000,
        cabinWidth: width,
        cabinDepth: oneRowCabinDepth.cabinDepth,
        cabinCapacityKg: cabinAreaToCapacityFinder((oneRowCabinDepth.cabinDepth * width) / 1000000),
        neededBaritWeight: neededBaritWeightFinder((oneRowCabinDepth.cabinDepth * width) / 1000000),
        neededBaritPcs: Math.ceil(neededBaritWeightFinder((oneRowCabinDepth.cabinDepth * width) / 1000000) / ctw.ctwKg),
        carcassCapacityKg: depths.oneRowCabinDepth.carcassCapacity,
        carcasDepth: depths.oneRowCabinDepth.carcassDepth,
        railbetween: railBetweenFinder(ctw.ctwA),
        weightStatus: weightStatusDeterminer(((oneRowCabinDepth.cabinDepth * width) / 1000000), depths.oneRowCabinDepth.carcassCapacity),
        generalStatus: null,
      }
      : null;

    const doubleRowShort = doubleRowShortCabinDepth
      ? {
        cabinArea: (doubleRowShortCabinDepth.cabinDepth * width) / 1000000,
        cabinWidth: width,
        cabinDepth: doubleRowShortCabinDepth.cabinDepth,
        cabinCapacityKg: cabinAreaToCapacityFinder((doubleRowShortCabinDepth.cabinDepth * width) / 1000000),
        neededBaritWeight: neededBaritWeightFinder((doubleRowShortCabinDepth.cabinDepth * width) / 1000000),
        neededBaritPcs: Math.ceil(neededBaritWeightFinder((doubleRowShortCabinDepth.cabinDepth * width) / 1000000) / ctw.ctwKg),
        carcassCapacityKg: depths.doubleRowShortCabinDepth.carcassCapacity,
        carcasDepth: depths.doubleRowShortCabinDepth.carcassDepth,
        railbetween: railBetweenFinder(ctw.ctwA),
        weightStatus: weightStatusDeterminer(((doubleRowShortCabinDepth.cabinDepth * width) / 1000000), depths.doubleRowShortCabinDepth.carcassCapacity),
        generalStatus: null,
      }
      : null;

    const doubleRowLong = doubleRowLongCabinDepth
      ? {
        cabinArea: (doubleRowLongCabinDepth.cabinDepth * width) / 1000000,
        cabinWidth: width,
        cabinDepth: doubleRowLongCabinDepth.cabinDepth,
        cabinCapacityKg: cabinAreaToCapacityFinder((doubleRowLongCabinDepth.cabinDepth * width) / 1000000),
        neededBaritWeight: neededBaritWeightFinder((doubleRowLongCabinDepth.cabinDepth * width) / 1000000),
        neededBaritPcs: Math.ceil(neededBaritWeightFinder((doubleRowLongCabinDepth.cabinDepth * width) / 1000000) / ctw.ctwKg),
        carcassCapacityKg: depths.doubleRowLongCabinDepth.carcassCapacity,
        carcasDepth: depths.doubleRowLongCabinDepth.carcassDepth,
        railbetween: railBetweenFinder(ctw.ctwA),
        weightStatus: weightStatusDeterminer(((doubleRowLongCabinDepth.cabinDepth * width) / 1000000), depths.doubleRowLongCabinDepth.carcassCapacity),
        generalStatus: null,
      }
      : null;


    if (oneRow !== null, doubleRowShort !== null, doubleRowLong !== null) {
      return { oneRow, doubleRowShort, doubleRowLong };
    } if (oneRow !== null, doubleRowShort !== null) {
      return { oneRow, doubleRowShort };
    }
    else {
      return null;
    }



  });

  return  cabinSizes ;
}
