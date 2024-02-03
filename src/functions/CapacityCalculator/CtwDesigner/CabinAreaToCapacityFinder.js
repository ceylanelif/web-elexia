import { capacityToCtwWeightFinder } from "./CapacityToCtwWeightFinder";

export const cabinSizeTable = {
    100: 0.37,
    180: 0.58,
    225: 0.7,
    300: 0.9,
    375: 1.1,
    400: 1.17,
    450: 1.3,
    525: 1.45,
    600: 1.6,
    630: 1.66,
    675: 1.75,
    750: 1.9,
    800: 2,
    825: 2.05,
    900: 2.2,
    1000: 2.4,
    1050: 2.5,
    1125: 2.65,
    1200: 2.8,
    1250: 2.9,
    1350: 3.1,
    1425: 3.25,
    1500: 3.4,
    1600: 3.56
   
  }
  
  export function cabinAreaToCapacityFinder(cabinArea) {
      let cabinAreaInKg = null;
      let minDiff = Infinity;
      
      for (const key in cabinSizeTable) {
        const diff = Math.abs(cabinArea - cabinSizeTable[key]);
        if (diff < minDiff) {
          minDiff = diff;
          cabinAreaInKg = key;
        }
      }
    const neededBarit = capacityToCtwWeightFinder(cabinAreaInKg);
      return {cabinAreaInKg,neededBarit};
    }