import backCtwDesigner from "./BackCtwDesigner";

export function backCabinDepths(ctw, liftInfo, constants, selectedOptions) {

    const doordepth = selectedOptions.DoorDimension.depth;
    const ctwDesigner = backCtwDesigner(ctw, liftInfo, selectedOptions, constants);
    let oneRowCabinDepth;
    let doubleRowLongCabinDepth;
    let doubleRowShortCabinDepth;

    if (ctwDesigner.oneRow.status === true) {
        oneRowCabinDepth = {
            cabinDepth: Math.floor((liftInfo.shaftDepth - doordepth - ctwDesigner.oneRow.depthOccupation) / 50) * 50,
            carcassCapacity: ctwDesigner.oneRow.carcassCapacity
        }
    }else {oneRowCabinDepth=null} ;


    if (ctwDesigner.longDoubleRow.status === true) {
        doubleRowLongCabinDepth = {
            cabinDepth: Math.floor((liftInfo.shaftDepth - doordepth - ctwDesigner.longDoubleRow.depthOccupation) / 50) * 50,
            carcassCapacity: ctwDesigner.longDoubleRow.carcassCapacity
        }
    }else {doubleRowLongCabinDepth=null};



    if (ctwDesigner.shortDoubleRow.status === true) {
        doubleRowShortCabinDepth = {
            cabinDepth: Math.floor((liftInfo.shaftDepth - doordepth - ctwDesigner.shortDoubleRow.depthOccupation) / 50) * 50,
            carcassCapacity: ctwDesigner.shortDoubleRow.carcassCapacity
        }
    }else {doubleRowShortCabinDepth=null};

    return { oneRowCabinDepth, doubleRowLongCabinDepth, doubleRowShortCabinDepth }
}
