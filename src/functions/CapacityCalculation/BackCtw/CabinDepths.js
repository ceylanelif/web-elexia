import { noPudrelController } from "./noPudrelContoller";

export function BackCabinDepths(ctw, liftInfo, constants, selectedOptions) {
    
    const doordepth = selectedOptions.DoorDimension.depth;
    const noPudrel = noPudrelController(ctw, liftInfo, constants, selectedOptions);

    const oneRowCabinDepth = {
        cabinDepth: Math.floor((liftInfo.shaftDepth - doordepth - noPudrel.oneRow.occupied_area)/50)*50,
        status: noPudrel.oneRow.status
    };

    const doubleRowShortCabinDepth = {
        cabinDepth:Math.floor((liftInfo.shaftDepth - doordepth - noPudrel.doubleRowShort.occupied_area)/50)*50,
        status: noPudrel.doubleRowShort.status
    };

    const doubleRowLongCabinDepth = {
        cabinDepth: Math.floor((liftInfo.shaftDepth - doordepth - noPudrel.oneRow.occupied_area)/50)*50,
        status: noPudrel.doubleRowLong.status
    };



    return { oneRowCabinDepth: oneRowCabinDepth, doubleRowShortCabinDepth: doubleRowShortCabinDepth, doubleRowLongCabinDepth: doubleRowLongCabinDepth }
}
