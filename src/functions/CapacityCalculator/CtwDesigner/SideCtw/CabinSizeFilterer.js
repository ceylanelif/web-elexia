import cabinSize from "./CabinSize";

export default function SideCabinSizeFilterer(ctws, liftInfo, constants, selectedOptions) {
  const mainSafe = []; // Her bir ctw için hesaplanan kabinlerin toplandığı array
  const usableCabinSizes = [];

  ctws.map((ctw) => {
      const checker = cabinSize(ctw, liftInfo, constants, selectedOptions);
      checker.forEach((cabin) => {
          // Her bir kabinin carcassSystemWidth değerinin null olmadığını kontrol et
          if (cabin.baritDetails && 
            cabin.baritDetails.carcassSystemWidth !== null &&
            cabin.kgCapacityStatus === true) {
              // Değeri null olmayan kabinleri mainSafe dizisine ekle
              mainSafe.push(cabin);
          }
      });
  });

  return mainSafe;
}

