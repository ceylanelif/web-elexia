import doorSpaceReducer from "../door";

export function DepthCalculator(ctws, liftInfo, selectedOptions, constants) {
    const remainedFromDoors = doorSpaceReducer(liftInfo, selectedOptions, constants).emptyWidthRemains;
    const depthConstants = constants.carcassDepth;
    const pudrelDimensions = depthConstants.ctw_D_WS + depthConstants.ctwPudrelWs + depthConstants.pudrelWidth;
    const doorSidePudrelDimensions = pudrelDimensions + depthConstants.pudrelDoorWs;
    const oneCtwDepthWithPudrel=pudrelDimensions+ctws.ctwB;
    const doubleCtwDepthWithPudrel=pudrelDimensions+ctws.two_X_b;


    function isDoorSideCTWfit() {
        if (remainedFromDoors - doorSidePudrelDimensions >= ctws.two_X_b) {
            return { doubleRow: true,oneRow: true};
        } if (remainedFromDoors - doorSidePudrelDimensions >= ctws.ctwB) {
            return { doubleRow: false, 
                        oneRow: true, };
        } else {
            return { doubleRow: false,
                 oneRow: false, };
        }
    }




    return isDoorSideCTWfit();
}
