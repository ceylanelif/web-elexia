export const cabinKgTable={ //Metrekare ağırlığı*1,40=50nin katına yuvarlanmış hali KAPASİTE:GEREKEN KARŞI AĞIRLIK
    225:350,
    300:450,
    375:550,
    400:600,
    450:650,
    525:750,
    600:850,
    630:900,
    675:950,
    750:1050,
    800:1150,
    825:1200,
    900:1300,
    975:1400,
    1000:1400,
    1050:1500,
    1125:1600,
    1200:1700,
    1250:1750,
    1275:1800,
    1350:1900,
    1425:2000,
    1500:2100,
    1600:2250,
}

export function capacityToCtwWeightFinder(weight) {
    let closestCapacity = null;
    let minDiff = Infinity;
    
    for (const key in cabinKgTable) {
      const diff = Math.abs(weight - key);
      if (diff < minDiff) {
        minDiff = diff;
        closestCapacity = cabinKgTable[key];
      }
    }
  
    return closestCapacity;
  }