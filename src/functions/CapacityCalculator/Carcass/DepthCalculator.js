
export function carcassDepthCalculator(ctw, constants) {
    const depthConstants = constants.carcassDepth;
   
    const pudrelDimensions = depthConstants.ctw_D_WS + // Barit hariç yandan ağırlıktaki diğer çalışma boşluklarının toplamı
        depthConstants.ctwPudrelWs +
        depthConstants.pudrelWidth;
    const noPudrelDimensions = depthConstants.ctw_B_WS +// Barit hariç arkadan ağırlıktaki diğer çalışma boşluklarının toplamı
        depthConstants.seperatorCtwWs +
        depthConstants.seperatorWidth ;

    const slimCtwWithPudrel = pudrelDimensions + ctw.ctwB;
    const fatCtwWithPudrel = pudrelDimensions + ctw.two_X_b; 
    const slimCtwNoPudrel = noPudrelDimensions + ctw.ctwB; 
    const fatCtwNoPudrel = noPudrelDimensions + ctw.two_X_b; 
 
    const carcassDepth= {
        slimCtwNoPudrel,
        fatCtwNoPudrel,
        slimCtwWithPudrel,
        fatCtwWithPudrel,
        description: "Karkasın Barit eklenmiş derinlik ölçüsü"
    }
    return  carcassDepth;
}