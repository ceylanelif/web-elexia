import cabinSize from "./CabinSize";

export default function SideCabinSizeFilterer(ctws,liftInfo,constants,selectedOptions) {
    const mainSafe=[];//Herbir ctw için hesaplanan kabinlerin toplandığı array
    const usableCabinSizes=[]
    ctws.map((ctw) => {
        const checker=cabinSize(ctw,liftInfo,constants,selectedOptions);
        checker.forEach((cabin) => {mainSafe.push(cabin);})
        
    });

    mainSafe.map((content) => {
    if(content.baritDetails.carcassSystemWidth && content.kgCapacityStatus===true){
            usableCabinSizes.push(content);
        }
    });

    const filteredData = usableCabinSizes.filter((currentItem, currentIndex) => {
        // currentIndex'ten sonraki öğelerle kontrol et
        const isDuplicate = usableCabinSizes.slice(currentIndex + 1).some(otherItem =>
          otherItem.cabinWidth === currentItem.cabinWidth &&
          otherItem.cabinDepth === currentItem.cabinDepth
        );
      
        // Eğer başka bir öğeyle eşleşen varsa, bu öğeyi filtrele
        return !isDuplicate;
      });

    return filteredData;

}