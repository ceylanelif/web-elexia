import { carcassDepthCalculator } from "../Carcass/DepthCalculator";
import { carcassLengthCalculator } from "../Carcass/LengthCalculator";
import { carcassWidthCalculator } from "../Carcass/WidthCalculator";
import { ctwLocationDeterminer } from "./CtwLocationDeterminer";

export function ctwMainDesigner(ctw, liftInfo, constants, selectedOptions) {
  const depth = carcassDepthCalculator(ctw, liftInfo, selectedOptions, constants);
  const width = carcassWidthCalculator(ctw, selectedOptions, constants);
  const length = carcassLengthCalculator(ctw, liftInfo, constants);
 

  //1.**** Ağırlık Konumu Belirleme************* */
 const ctwLocation=ctwLocationDeterminer(liftInfo);
 //2.***Ağırlık Konumlarına Göre Ağırlıkların İşgal Ettikleri Alanların Bulunması************************** */
 let occupiedAreas;

 if (ctwLocation.location.sideCtw && ctwLocation.location.backCtw) {
   occupiedAreas = "Both side and back CTW are true";
 } else if (ctwLocation.location.sideCtw) {
   occupiedAreas = "Side CTW is true";
 } else if (ctwLocation.location.backCtw) {
   occupiedAreas = "Back CTW is true";
 } else {
   occupiedAreas = "None of the conditions met";
 }

 
  return {ctwLocation, occupiedAreas
  };
}