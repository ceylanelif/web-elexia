import { carcassWidthCalculator } from "../Carcass/WidthCalculator";

export default function backCtwDesigner(ctw, liftInfo, selectedOptions, constants) {
    
const width=carcassWidthCalculator(ctw,selectedOptions,constants);

if(liftInfo.shaftWidth>=width.shaftLength.double){


}
}
