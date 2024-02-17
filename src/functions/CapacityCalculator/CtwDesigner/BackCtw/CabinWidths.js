
export const backCabinWidths = (liftInfo, constants) => {
  const widthConstants = constants.cabinWidth;
  const width = liftInfo.shaftWidth - 2 * (widthConstants.railCabinWS + widthConstants.mainRailSizeMax);
  const cabinWidths = [];

  for (let i = widthConstants.railWallConsoleMin; i <= widthConstants.railWallConsoleMax; i ++) {
    const currentWidth = width - i;
    // Sadece 50'nin katları olan genişlik değerlerini ekleyin
    if (currentWidth % 50 === 0) {
      cabinWidths.push(currentWidth);
    }
  }
  return {cabinWidths};
}