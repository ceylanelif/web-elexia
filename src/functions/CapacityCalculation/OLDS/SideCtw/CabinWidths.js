import sideCtwDesigner from "./SideCtwDesigner";

export function sideCabinWidths(ctw, liftInfo, constants, selectedOptions) {

    const ctwDesigner = sideCtwDesigner(ctw, liftInfo, selectedOptions, constants);
    const otherWidthConstants = constants.cabinWidth.pudrelConsole +
        (constants.cabinWidth.mainRailSizeMax + constants.cabinWidth.railCabinWS) * 2;
    const results = [];
    const uniqueCabinWidths = [];

    for (let i = constants.cabinWidth.railWallConsoleMin; i <= constants.cabinWidth.railWallConsoleMax; i += 10) {
        let oneRowCabinWidth;
        let doubleRowLongCabinWidth;
        let doubleRowShortCabinWidth;

        if (ctwDesigner.oneRow.status === true) {
            oneRowCabinWidth = {
                cabinWidth: Math.floor((liftInfo.shaftWidth - ctwDesigner.oneRow.widthOccupation - otherWidthConstants - i) / 50) * 50,
                carcassCapacity: ctwDesigner.oneRow.carcassCapacity,
                consoleLength: i,
                type: "oneRow"
            };

            if (!uniqueCabinWidths.includes(oneRowCabinWidth.cabinWidth)) {
                uniqueCabinWidths.push(oneRowCabinWidth.cabinWidth);
                results.push({ oneRowCabinWidth });
            }
        }

        if (ctwDesigner.longDoubleRow.status === true) {
            doubleRowLongCabinWidth = {
                cabinWidth: Math.floor((liftInfo.shaftWidth - ctwDesigner.longDoubleRow.widthOccupation - otherWidthConstants - i) / 50) * 50,
                carcassCapacity: ctwDesigner.longDoubleRow.carcassCapacity,
                consoleLength: i,
                type: "longDoubleRow"
            };

            if (!uniqueCabinWidths.includes(doubleRowLongCabinWidth.cabinWidth)) {
                uniqueCabinWidths.push(doubleRowLongCabinWidth.cabinWidth);
                results.push({ doubleRowLongCabinWidth });
            }
        }

        if (ctwDesigner.shortDoubleRow.status === true) {
            doubleRowShortCabinWidth = {
                cabinWidth: Math.floor((liftInfo.shaftWidth - ctwDesigner.shortDoubleRow.widthOccupation - otherWidthConstants - i) / 50) * 50,
                carcassCapacity: ctwDesigner.shortDoubleRow.carcassCapacity,
                consoleLength: i,
                type: "shortDoubleRow"
            };

            if (!uniqueCabinWidths.includes(doubleRowShortCabinWidth.cabinWidth)) {
                uniqueCabinWidths.push(doubleRowShortCabinWidth.cabinWidth);
                results.push({ doubleRowShortCabinWidth });
            }
        }
    }

    return results;
}
