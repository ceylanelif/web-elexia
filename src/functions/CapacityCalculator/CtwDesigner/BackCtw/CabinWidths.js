
export const backCabinWidths = (liftInfo, constants) => {
  const widthConstants = constants.cabinWidth;
  const width = liftInfo.shaftWidth - 2 * (widthConstants.railCabinWS + widthConstants.mainRailSizeMax);
  const cabinWidths = [];

  for (let i = widthConstants.railWallConsoleMin; i <= widthConstants.railWallConsoleMax; i ++) {
    const currentWidth = width - (2*i);
    const consoleWidth=i
    // Sadece 50'nin katları olan genişlik değerlerini ekleyin
    if (currentWidth % 50 === 0) {
      cabinWidths.push({cabinWidth:currentWidth,consoleWidth:consoleWidth} );
    }
    
  }
  return cabinWidths;
}