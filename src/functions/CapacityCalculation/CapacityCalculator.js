import { bringCarcassLengthAndLocation } from "../CapacityCalculator/Carcass/CtwLocationDeterminer";
import { carcassDepthCalculator } from "../CapacityCalculator/Carcass/DepthCalculator";
import { carcassWidths } from "../CapacityCalculator/Carcass/WidthCalculator";
import cabinSize from "../CapacityCalculator/CtwDesigner/SideCtw/CabinSize";
import SideCabinSizeFilterer from "../CapacityCalculator/CtwDesigner/SideCtw/CabinSizeFilterer";
import carcassDesigner from "../CapacityCalculator/CtwDesigner/SideCtw/CarcassDesigner";


export default function CapacityCalculator(ctws, liftInfo, constants, selectedOptions) {
    const mainSafe=[];//Herbir ctw için hesaplanan kabinlerin toplandığı array
    const usableCabinSizes=[]
    ctws.map((ctw) => {
        const checker=SideCabinSizeFilterer(ctw,liftInfo,constants,selectedOptions);
        checker.forEach((cabin) => {mainSafe.push(cabin);})
        
    });

    mainSafe.map((content) => {
    if(content.kgCapacityStatus===true){
            usableCabinSizes.push(content);
        }
    });
    return usableCabinSizes;


}
