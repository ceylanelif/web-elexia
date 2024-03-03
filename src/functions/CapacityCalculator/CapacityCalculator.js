import { ctwLocationAndFrameDeterminer } from "./Carcass/CtwLocationDeterminer";
import backCabinSizeFilterer from "./CtwDesigner/BackCtw/CabinSizeFilterer";
import SideCabinSizeFilterer from "./CtwDesigner/SideCtw/CabinSizeFilterer";

export default function CapacityCalculator(ctws, liftInfo, constants, selectedOptions) {
    const filteredSizes = [];
    const uniqueSizes = new Set(); // Benzersiz boyutları saklamak için bir Set oluşturuyoruz
    const ctwLocation=ctwLocationAndFrameDeterminer(liftInfo).location;


    ctws.forEach((ctw) => {
        
      if(ctwLocation.backCtw===true){ 
        const backctwsizes = backCabinSizeFilterer(ctw, liftInfo, constants, selectedOptions);
        backctwsizes.forEach((size) => {
            if (!uniqueSizes.has(`${size.width}-${size.depth}`) ) {
                filteredSizes.push(size);
                uniqueSizes.add(`${size.width}-${size.depth}`);
            }
        });}
    });
    if(ctwLocation.sideCtw===true){
        const sideCtwSizes = SideCabinSizeFilterer(ctws, liftInfo, constants, selectedOptions);
        filteredSizes.push(...sideCtwSizes);
    
    }
    return { filteredSizes };
}
