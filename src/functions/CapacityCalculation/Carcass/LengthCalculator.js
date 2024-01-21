//Karkasın karşıdan görünümde yüksekliği.
export function carcassLengthCalculator(ctw,liftInfo, constants) {
    const overhead = parseInt(liftInfo.overhead, 10);
    const pit = parseInt(liftInfo.pit, 10);
    const constantData = constants.carcassLength;

    const MrCarcassLength = ((overhead + pit)
        - constantData.bufferHeightMin
        - constantData.bufferWS
        - constantData.downside
        - constantData.ctwWs
        - constantData.upside
        - constantData.pulley
        - constantData.pulleyProtection
        - constantData.ceilingWs);

    const MrlBeamLength = ((overhead + pit)
        - constantData.bufferHeightMin
        - constantData.bufferWS
        - constantData.downside
        - constantData.ctwWs
        - constantData.upside
        - constantData.pulley
        - constantData.pulleyProtection
        - constantData.ceilingWs
        - constantData.machineBeam
        - constantData.machineBeam
        - constantData.motorHeight
        - constantData.motorToCeilingWS);

    const MrlRailBaseLength = ((overhead + pit)
        - constantData.bufferHeightMin
        - constantData.bufferWS
        - constantData.downside
        - constantData.ctwWs
        - constantData.upside
        - constantData.pulley
        - constantData.pulleyProtection
        - constantData.carcassMotorWs
        - constantData.motorHeight
        - constantData.motorToCeilingWS
    );
    
    const MrCarcass = {
        length: MrCarcassLength,
        piece: Math.floor(MrCarcassLength / ctw.ctwC),
        singleKg: Math.floor((MrCarcassLength / ctw.ctwC) * ctw.ctwKg),
        doubleKg: Math.floor((MrCarcassLength / ctw.ctwC) * ctw.two_X_kg)
    };

    const MrlBeam = {
        length: MrlBeamLength,
        piece: Math.floor(MrlBeamLength / ctw.ctwC),
        singleKg: Math.floor((MrlBeamLength / ctw.ctwC) * ctw.ctwKg),
        doubleKg: Math.floor((MrlBeamLength / ctw.ctwC) * ctw.two_X_kg)
    };

    const MrlRailBase = {
        length: MrlRailBaseLength,
        piece: Math.floor(MrlRailBaseLength / ctw.ctwC),
        singleKg: Math.floor((MrlRailBaseLength / ctw.ctwC) * ctw.ctwKg),
        doubleKg: Math.floor((MrlRailBaseLength / ctw.ctwC) * ctw.two_X_kg)
    };



    return {MrCarcass, MrlBeam, MrlRailBase };
}

