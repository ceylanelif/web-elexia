import { backCtwCabinSize } from "../BackCtw/BackCtwCabinSize";
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
 //2.***Ağırlık Konumlarına Göre kabin ölçüleri************************** */
 const cabinSize=backCtwCabinSize(ctw, liftInfo, constants, selectedOptions); //arkadan kabin ölçüleri
          //yandan kabin ölçüleri
 //************karkas kapasitesine göre kabin ölçüsü filitrelemek  */
  return {ctwLocation,cabinSize
  };
}