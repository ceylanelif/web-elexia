export const backCtwCabinSize = (liftInfo, selectedOptions, constants) => {
  const widthConstants = constants.cabinWidth;
  const width = liftInfo.shaftWidth - 2 * (widthConstants.railCabinWS + widthConstants.mainRailSizeMax);
  const resultList = []; // Boş bir dizi oluştur

  for (let i = widthConstants.railWallConsoleMin; i <= widthConstants.railWallConsoleMax; i += 10) {
    resultList.push(width-i); // Her bir i değerine karşılık gelen width değerini diziyi ekle
  }

  console.log("backCtwCabinWidths", resultList);
  return resultList; // Sonuç dizisini döndür
}
