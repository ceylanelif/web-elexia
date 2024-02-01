
import { carcassDepthCalculator } from "../../Carcass/DepthCalculator";
import { carcassWidths } from "../../Carcass/WidthCalculator";
import doorSpaceReducer from "../DoorSpaceReducer";

export default function cabinWidth(ctw, liftInfo, constants, selectedOptions) {
    //1.adım: kapıdan alan kalıyor mu?

    //önce kapıdan alan kalıyor mu ona bakalım
    //sonra çift sıra için kapıdan yer kalıyor mu ona bakalım

    const widthRemainedAfterDoor = doorSpaceReducer(liftInfo, selectedOptions, constants).emptyWidthRemains;
    const depthRemainedAfterDoor = doorSpaceReducer(liftInfo, selectedOptions, constants).emptyDepthRemains;
    const carcassDepth = carcassDepthCalculator(ctw, constants);
    const carcassWidth = carcassWidths(ctw, selectedOptions, constants);
    function shaftLengthCtwStatusChecker() {
        let isEmptySpaceForSlim;
        let isEmptySpaceForFat;
        if (widthRemainedAfterDoor <= carcassDepth.fatCtwWithPudrel) {
            isEmptySpaceForFat = true;
            isEmptySpaceForSlim = true;
        } if (widthRemainedAfterDoor <= carcassDepth.slimCtwWithPudrel) {
            isEmptySpaceForSlim = true;
            isEmptySpaceForFat = false;
        } else {
            isEmptySpaceForSlim = false;
            isEmptySpaceForFat = false;
        }

        let emptyWidthForSlim;
        let emptyWidthForFat;

        if (isEmptySpaceForSlim === true) {
            emptyWidthForSlim=liftInfo.shaftDepth;
        }else{
            emptyWidthForSlim=depthRemainedAfterDoor;
        }

        if (isEmptySpaceForFat === true) {
            emptyWidthForFat=liftInfo.shaftDepth;}
        else{ emptyWidthForFat=depthRemainedAfterDoor;}

        return {emptyWidthForFat,emptyWidthForSlim};
    }

    //2.adım: Ağırlık sisteminin toplam uzunluğu belirleme
    //çift sıra baş başa sığıyor mu? tek sıra sığıyor mu?
    //slim ağırlık uzunluğu, fat ağırlık uzunluğu

    function usableCarcassWidths() {
        let slimCarcassWidth;
        let fatCarcassWidth;

        if (isEmptySpaceForFat === true) {
            
        }
        
        

        
    }



    return { tamboypudrelolurmu: shaftLengthCtwStatusChecker() };

}