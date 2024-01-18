//Karkasın karşıdan görünümde yüksekliği.
export function carcassLengthCalculator(liftInfo, constants) {
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

    return { MrCarcassLength, MrlBeamLength, MrlRailBaseLength };
}

