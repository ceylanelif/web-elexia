export function carcassWidths(ctw, constants) {
    const widthConstants = constants.carcassWidth; 
    
    const pudrelWSTotal = 2 * (
        widthConstants.pudrelWallWS +
        widthConstants.pudrelWidth +
        widthConstants.ctwRailSizeMax +
        widthConstants.railCarcassWs
    );

    const doubleSided=pudrelWSTotal +ctw.two_X_a
    const single=pudrelWSTotal +ctw.ctwA
    return {doubleSided,single,description:"Ağırlık sisteminin genişliği barit dahil"};
}
