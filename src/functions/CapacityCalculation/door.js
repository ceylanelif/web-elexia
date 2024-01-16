export default function doorSpaceReducer(liftInfo, selectedOptions) {
    const shaftDepth = liftInfo.shaftDepth;
    const shaftWidth = liftInfo.shaftWidth;
    const selectedDoor = selectedOptions.DoorDimension;

    const spaceFromDepth=shaftDepth-selectedDoor.depth;
    const spaceFromWidth=shaftWidth-selectedDoor.mechanismWidth; // bu veri yandan ağırlıkta kapı yanında ağırlık olup olmayacağını belirler.

    return {
        spaceFromDepth,
        spaceFromWidth,
    }
}