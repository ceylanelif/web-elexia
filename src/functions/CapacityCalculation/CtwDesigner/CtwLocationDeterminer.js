import { carcassLengthCalculator } from "../Carcass/LengthCalculator";

export function ctwLocationDeterminer(liftInfo) {
    
        let carcassType;
        let location = {sideCtw:false,backCtw:false};
        

    if (liftInfo.machineRoom && (liftInfo.ropeType === "2:1"|| liftInfo.ropeType === "1:1")) {
        carcassType = "MRcarcass";
        location.sideCtw = true;
        location.backCtw = true;
    } else if (!liftInfo.machineRoom && liftInfo.overhead <= 3400) {
        carcassType = "MrlRailBase";
        location.sideCtw = true;
        location.backCtw = false;
    } else if (!liftInfo.machineRoom && liftInfo.overhead > 3400) {
        carcassType = "MrlBeam";
        location.sideCtw = true;
        if (liftInfo.overhead >= 3800) {
            location.backCtw = true;
        }else{
            location.backCtw = false;
        }
    }
    // Sonuçları döndür
    return  {carcassType, location} ;
}

export function bringCarcassDetails(liftInfo, constants, ctw, carcassType) {
    switch (carcassType) {
      case "MRcarcass":
        return carcassLengthCalculator(ctw,liftInfo, constants).MrCarcass;
      case "MrlRailBase":
        return carcassLengthCalculator(ctw,liftInfo, constants).MrlRailBase;
      case "MrlBeam":
        return carcassLengthCalculator(ctw,liftInfo, constants).MrlBeam;
      default:
        // Eğer carcassType yukarıdaki case'lerden hiçbirine uymuyorsa bir varsayılan değer veya işlem belirtilebilir
        return null;
    }
  }
  