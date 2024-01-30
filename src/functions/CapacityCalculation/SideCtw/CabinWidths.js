import sideCtwDesigner from "./SideCtwDesigner";

export function sideCabinWidths(ctw, liftInfo, constants, selectedOptions){
    const doordepth = selectedOptions.DoorDimension.depth;
    const ctwDesigner = sideCtwDesigner(ctw, liftInfo, selectedOptions, constants);
    let oneRowCabinWidth;
    let doubleRowLongCabinWidth;
    let doubleRowShortCabinWidth;

    if (ctwDesigner.oneRow.status === true) {
        oneRowCabinWidth = {
            cabinWidth: Math.floor((liftInfo.shaftWidth - ctwDesigner.oneRow.widthOccupation) / 50) * 50,
            carcassCapacity: ctwDesigner.oneRow.carcassCapacity
        }
    }else {oneRowCabinWidth=null} ;


    if (ctwDesigner.longDoubleRow.status === true) {
        doubleRowLongCabinWidth = {
            cabinDepth: Math.floor((liftInfo.shaftDepth - doordepth - ctwDesigner.longDoubleRow.widthOccupation) / 50) * 50,
            carcassCapacity: ctwDesigner.longDoubleRow.carcassCapacity
        }
    }else {doubleRowLongCabinWidth=null};



    if (ctwDesigner.shortDoubleRow.status === true) {
        doubleRowShortCabinWidth = {
            cabinDepth: Math.floor((liftInfo.shaftDepth - doordepth - ctwDesigner.shortDoubleRow.widthOccupation) / 50) * 50,
            carcassCapacity: ctwDesigner.shortDoubleRow.carcassCapacity
        }
    }else {doubleRowShortCabinWidth=null};

    return { oneRowCabinWidth, doubleRowLongCabinWidth, doubleRowShortCabinWidth }
}