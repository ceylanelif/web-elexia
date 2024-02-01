import { carcassLengths } from "../Carcass/LengthCalculator";

export function ctwLocationAndFrameDeterminer(liftInfo) {
    
        let motorFrame;
        let location = {sideCtw:false,backCtw:false};

    if (liftInfo.machineRoom && (liftInfo.ropeType === "2:1"|| liftInfo.ropeType === "1:1")) {
        motorFrame = "MrFrame";
        location.sideCtw = true;
        location.backCtw = true;
    } else if (!liftInfo.machineRoom && liftInfo.overhead <= 3400) {
        motorFrame = "MrlRailBase";
        location.sideCtw = true;
        location.backCtw = false;
    } else if (!liftInfo.machineRoom && liftInfo.overhead > 3400) {
        motorFrame = "MrlBeam";
        location.sideCtw = true;
        if (liftInfo.overhead >= 3800) {
            location.backCtw = true;
        }else{
            location.backCtw = false;
        }
    }
    // Sonuçları döndür
    return  {motorFrame, location} ;
}

export function bringCarcassLengthAndLocation(liftInfo, constants, ctw) {
  const motorFrame= ctwLocationAndFrameDeterminer(liftInfo).motorFrame
  const carcassLocation= ctwLocationAndFrameDeterminer(liftInfo).location
  const lengthDetails= carcassLengths(ctw,liftInfo, constants)
    switch (motorFrame) {
      case "MrFrame":
        return {CarcassLengthDetails: lengthDetails.MrCarcass  ,location:carcassLocation,frame:motorFrame}
      case "MrlRailBase":
        return {CarcassLengthDetails: lengthDetails.MrlRailBase,location:carcassLocation,frame:motorFrame}
      case "MrlBeam":
        return {CarcassLengthDetails: lengthDetails.MrlBeam,location:carcassLocation,frame:motorFrame}
      default:
        // Eğer motorFrame yukarıdaki case'lerden hiçbirine uymuyorsa bir varsayılan değer veya işlem belirtilebilir
        return null;
    }
  }
  