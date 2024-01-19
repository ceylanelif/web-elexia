import doorSpaceReducer from "../door";

export function carcassDepthCalculator(ctws, liftInfo, selectedOptions, constants) {
    const remainedFromDoors = doorSpaceReducer(liftInfo, selectedOptions, constants).emptyWidthRemains;//kuyu genişliğinden kapı genişliği düşüldüğünde kalan alan
    const depthConstants = constants.carcassDepth;
    const pudrelDimensions = depthConstants.ctw_D_WS + // Barit hariç yandan ağırlıktaki diğer çalışma boşluklarının toplamı
        depthConstants.ctwPudrelWs +
        depthConstants.pudrelWidth;
    const oneCtwDepthWithPudrel = pudrelDimensions + ctws.ctwB;
    const doubleCtwDepthWithPudrel = pudrelDimensions + ctws.two_X_b;
    const noPudrelDimensions = depthConstants.ctw_B_WS +
        depthConstants.seperatorCtwWs +
        depthConstants.seperatorWidth +
        depthConstants.seperatorCabinWs;
    const noPudrelCtwDepth = { oneRow: noPudrelDimensions + ctws.ctwB, doubleRow: noPudrelDimensions + ctws.two_X_b }
    const pudrelCtwOneRow = { oneRow: oneCtwDepthWithPudrel, status: isDoorSideCTWfit().oneRow }
    const pudrelCtwDoubleRow = { doubleRow: doubleCtwDepthWithPudrel, status: isDoorSideCTWfit().doubleRow }

    const pudrelCtwDepth = { pudrelCtwOneRow, pudrelCtwDoubleRow }

    function isDoorSideCTWfit() {
        if (remainedFromDoors - pudrelDimensions >= ctws.two_X_b) {
            return { doubleRow: true, oneRow: true };
        } if (remainedFromDoors - pudrelDimensions >= ctws.ctwB) {
            return {
                doubleRow: false,
                oneRow: true,
            };
        } else {
            return {
                doubleRow: false,
                oneRow: false,
            };
        }
    }



    return { noPudrelCtwDepth, pudrelCtwDepth };
}
