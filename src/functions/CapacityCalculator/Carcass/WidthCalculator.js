export function carcassWidths(ctw, selectedOptions, constants) {
    const widthConstants = constants.carcassWidth; 
    
    const shaftLengthPudrel = 2 * (
        widthConstants.pudrelWallWS +
        widthConstants.pudrelWidth +
        widthConstants.ctwRailSizeMax +
        widthConstants.railCarcassWs
    );
    
    const doorLengthPudrel = shaftLengthPudrel + (selectedOptions.DoorDimension.depth + widthConstants.doorPudrelWs);
    const shaftLength = {double:shaftLengthPudrel +ctw.two_X_a, single:shaftLengthPudrel +ctw.ctwA};
    const doorLength = {double:doorLengthPudrel +ctw.two_X_a, single:doorLengthPudrel +ctw.ctwA};
    const double=shaftLengthPudrel +ctw.two_X_a
    const single=shaftLengthPudrel +ctw.ctwA
    return {double,single,description:"Ağırlık sisteminin genişliği barit dahil"};
}
