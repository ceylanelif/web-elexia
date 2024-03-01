import carcassDesigner from "./CarcassDesigner";

export default function backCabinSizeFilterer(ctw, liftInfo, constants, selectedOptions) {
  
    const backctwsizes=carcassDesigner(ctw, liftInfo, constants, selectedOptions);
    const filteredSizes=[];

    backctwsizes.map((backctwsize) => {
         if( backctwsize.ctwWidthStatus===true && backctwsize.carcassCapacityStatus===true 
        
            
            
             ){
        filteredSizes.push(backctwsize)
        ;}
    });

   return filteredSizes; 
}