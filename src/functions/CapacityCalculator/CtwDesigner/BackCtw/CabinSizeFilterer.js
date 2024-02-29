import carcassDesigner from "./CarcassDesigner";

export default function backCabinSizeFilterer(ctw, liftInfo, constants, selectedOptions) {
  
    const backctwsizes=carcassDesigner(ctw, liftInfo, constants, selectedOptions);
    const filteredSizes=[];

    backctwsizes.map((backctwsize) => {
        // if( backctwsize.neededBarit<=backctwsize.carcassLengthDetails.CarcassLengthDetails.singleKg &&
        //     backctwsize.width>=backctwsize.carcassWidthDetails.single
            
            
        //     ){
        filteredSizes.push(backctwsize)
        //;}
    });

   return filteredSizes; 
}