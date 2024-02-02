export function sideCabinDepths(liftInfo,selectedOptions) {
  const shaftDepth = liftInfo.shaftDepth;
  const doorDepth = selectedOptions.DoorDimension.depth;
  let cabinToBackWallWs = 75;
  const cabinDepths = [];

  while (true) {
    const cabinDepth = shaftDepth - doorDepth - cabinToBackWallWs;

    if (cabinDepth < 800) {
      break; // 500'den küçükse döngüden çık
    }

    cabinDepths.push({ cabinToBackWallWs, cabinDepth });
    cabinToBackWallWs++;
  }

  // Sadece 50'nin katları olanları filtrele
  const filteredDepths = cabinDepths.filter((depth) => depth.cabinDepth % 50 === 0);

  return filteredDepths;
}
