import { carcassDepthCalculator } from "../Carcass/DepthCalculator";
import { carcassLengthCalculator } from "../Carcass/LengthCalculator";
import { carcassWidthCalculator } from "../Carcass/WidthCalculator";

export function ctwSide(ctw, liftInfo, constants, selectedOptions) {

const carcassDepths=carcassDepthCalculator(ctw, liftInfo, selectedOptions, constants);
const carcassLengths=carcassLengthCalculator(liftInfo,constants);
const carcasWidths=carcassWidthCalculator(ctw, liftInfo, selectedOptions, constants);

function oneRow(){
    if(liftInfo.shaftWidth>=carcassWidths.shaftLength.single)
  
    return {oneRow:true, occupied_area:carcassDepths.noPudrelCtwDepth.oneRow}
}

function doubleRowLong(){
if(liftInfo.shaftWidth>=carcassWidths.shaftLength.double)
return {doubleRow:true,occupied_area:carcassDepths.noPudrelCtwDepth.oneRow}
}
function doubleRowShort(){
return {doubleRow:true,occupied_area:carcassDepths.noPudrelCtwDepth.doubleRow}
}
    return {oneRow:oneRow(),doubleRowLong:doubleRowLong(),doubleRowShort:doubleRowShort()}
}