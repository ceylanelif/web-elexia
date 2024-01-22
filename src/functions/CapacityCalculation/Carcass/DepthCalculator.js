import doorSpaceReducer from "../CtwDesigner/door";

export function carcassDepthCalculator(ctw, liftInfo, selectedOptions, constants) {
    const remainedFromDoors = doorSpaceReducer(liftInfo, selectedOptions, constants).emptyWidthRemains;//kuyu genişliğinden kapı genişliği düşüldüğünde kalan alan
    const depthConstants = constants.carcassDepth;
   
    const pudrelDimensions = depthConstants.ctw_D_WS + // Barit hariç yandan ağırlıktaki diğer çalışma boşluklarının toplamı
        depthConstants.ctwPudrelWs +
        depthConstants.pudrelWidth;
    const noPudrelDimensions = depthConstants.ctw_B_WS +// Barit hariç arkadan ağırlıktaki diğer çalışma boşluklarının toplamı
        depthConstants.seperatorCtwWs +
        depthConstants.seperatorWidth +
        depthConstants.seperatorCabinWs;

    const oneCtwDepthWithPudrel = pudrelDimensions + ctw.ctwB; //Yandan ağırlık toplam işgal alanı barit dahil
    const doubleCtwDepthWithPudrel = pudrelDimensions + ctw.two_X_b; //Yandan çift sıra yan yana ağırlık toplam işgal alanı barit dahil

    const pudrelCtwOneRow = { oneRow: oneCtwDepthWithPudrel, shaftLengthCtw: isDoorSideCTWfit().oneRow } //Yandan Ağırlık Kapı uzunluğu düşüldüğünde yer var mı?
    const pudrelCtwDoubleRow = { doubleRow: doubleCtwDepthWithPudrel, shaftLenghtCtw: isDoorSideCTWfit().doubleRow }//Yandan Çift Sıra Ağırlık Kapı uzunluğu düşüldüğünde yer var mı?

    const noPudrelCtwDepth = { oneRow: noPudrelDimensions + ctw.ctwB, doubleRow: noPudrelDimensions + ctw.two_X_b }//Arkadan Ağırlık tek sıra ve çift sıra işgal alanları
    const pudrelCtwDepth = { oneRow:oneCtwDepthWithPudrel, doubleRow: doubleCtwDepthWithPudrel }//Yandan Ağırlık tek sıra ve çift sıra işgal alanları

    function isDoorSideCTWfit() {
        if (remainedFromDoors - pudrelDimensions >= ctw.two_X_b) {
            return { doubleRow: true, oneRow: true };
        } if (remainedFromDoors - pudrelDimensions >= ctw.ctwB) {
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
