//Karkasın karşıdan görünümde yüksekliği.
// BİTTİ
export function carcassLengths(ctw,liftInfo, constants) {
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
        description:"Projenin Pit ve Oh değerlendirilerek ,Sorgusu yapılan barit türünden kaç adet alabileceği, bunun kg karşılığını gösterir.",
        length: MrCarcassLength,
        piece: Math.floor(MrCarcassLength / ctw.ctwC),
        doublePiece: Math.floor(MrCarcassLength / ctw.ctwC) * 2,
        singleKg: Math.floor((MrCarcassLength / ctw.ctwC) * ctw.ctwKg),
        doubleKg: Math.floor((MrCarcassLength / ctw.ctwC) * ctw.two_X_kg)
    };

    const MrlBeam = {
        description:"Projenin Pit ve Oh değerlendirilerek ,Sorgusu yapılan barit türünden kaç adet alabileceği, bunun kg karşılığını gösterir.",
        length: MrlBeamLength,
        piece: Math.floor(MrlBeamLength / ctw.ctwC),
        doublePiece: Math.floor(MrCarcassLength / ctw.ctwC) * 2,
        singleKg: Math.floor((MrlBeamLength / ctw.ctwC) * ctw.ctwKg),
        doubleKg: Math.floor((MrlBeamLength / ctw.ctwC) * ctw.two_X_kg)
    };

    const MrlRailBase = {
        description:"Projenin Pit ve Oh değerlendirilerek ,Sorgusu yapılan barit türünden kaç adet alabileceği, bunun kg karşılığını gösterir.",
        length: MrlRailBaseLength,
        piece: Math.floor(MrlRailBaseLength / ctw.ctwC),
        doublePiece: Math.floor(MrCarcassLength / ctw.ctwC) * 2,
        singleKg: Math.floor((MrlRailBaseLength / ctw.ctwC) * ctw.ctwKg),
        doubleKg: Math.floor((MrlRailBaseLength / ctw.ctwC) * ctw.two_X_kg)
    };
    return {MrCarcass, MrlBeam, MrlRailBase };
}

