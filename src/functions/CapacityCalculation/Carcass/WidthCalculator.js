export function carcassWidthCalculator(ctw, selectedOptions, constants) {
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

    return {shaftLength, doorLength};
}
