export default function doorSpaceReducer(liftInfo, selectedOptions, constants) {
    const shaftDepth = liftInfo.shaftDepth;
    const shaftWidth = liftInfo.shaftWidth;
    const selectedDoor = selectedOptions.DoorDimension;
    const door_A_B_WS = constants.door.door_A_WS+constants.door.door_B_WS;
    const spaceFromDepth = shaftDepth - selectedDoor.depth;
    const spaceFromWidth = shaftWidth - (selectedDoor.mechanismWidth+door_A_B_WS); // bu veri yandan ağırlıkta kapı yanında ağırlık olup olmayacağını belirler.

    return {
        spaceFromDepth,
        spaceFromWidth,
        
    }
    
}