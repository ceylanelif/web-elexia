
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
    function usableCarcassWidths() {
        let isEmptySpaceForSlim;
        let isEmptySpaceForFat;
        if (widthRemainedAfterDoor >= carcassDepth.fatCtwWithPudrel) {
            isEmptySpaceForFat = true;
            isEmptySpaceForSlim = true;
        } if (widthRemainedAfterDoor >= carcassDepth.slimCtwWithPudrel) {
            isEmptySpaceForSlim = true;
            isEmptySpaceForFat = false;
        } else {
            isEmptySpaceForSlim = false;
            isEmptySpaceForFat = false;
        }

        let emptyWidthForSlim;
        let slimCtwType;
        let emptyWidthForFat;
        let fatCtwType;

        if (isEmptySpaceForSlim === true) {
            emptyWidthForSlim = liftInfo.shaftDepth;
            slimCtwType = "shaftLenght";
        } else {
            emptyWidthForSlim = depthRemainedAfterDoor;
            slimCtwType = "doorLenght";
        }

        if (isEmptySpaceForFat === true) {
            emptyWidthForFat = liftInfo.shaftDepth;
            fatCtwType = "shaftLenght";
        }
        else {
            emptyWidthForFat = depthRemainedAfterDoor;
            fatCtwType = "doorLenght";
        }

        return { emptyWidthForFat, slimCtwType, emptyWidthForSlim, fatCtwType, description: "Ağırlık Sistemi için kullanılabilir boş alanlar  " };
    }

    //2.adım: Ağırlık sisteminin toplam uzunluğu belirleme
    //çift sıra baş başa sığıyor mu? tek sıra sığıyor mu?
    //slim ağırlık uzunluğu, fat ağırlık uzunluğu

    function maxCtwBaritCapacity() {
        const { emptyWidthForFat, slimCtwType, emptyWidthForSlim, fatCtwType } = usableCarcassWidths();
        let fatCarcassWidth;
        let fatDescription;
    
        if (emptyWidthForFat >= carcassWidth.double) {
            fatCarcassWidth = carcassWidth.double;
            fatDescription = "Çift Sıra Ağırlık Sistemi Kapasitesi";
        } else if (emptyWidthForFat >= carcassWidth.single) {
            fatCarcassWidth = carcassWidth.single;
            fatDescription = "Tek Sıra Ağırlık Sistemi Kapasitesi";
        } else {
            fatCarcassWidth = null;
            fatDescription = "Barit uygun değil";
        }
    
        let slimCarcassWidth;
        let slimDescription;
    
        if (emptyWidthForSlim >= carcassWidth.double) {
            slimCarcassWidth = carcassWidth.double;
            slimDescription = "Çift Sıra Ağırlık Sistemi Kapasitesi";
        } else if (emptyWidthForSlim >= carcassWidth.single) {
            slimCarcassWidth = carcassWidth.single;
            slimDescription = "Tek Sıra Ağırlık Sistemi Kapasitesi";
        } else {
            slimCarcassWidth = null;
            slimDescription = "Barit uygun değil";
        }
    
        return { slimCarcassWidth, slimDescription, fatCarcassWidth, fatDescription };
    }
    

    return { pudrelicinbosalan:  usableCarcassWidths(),maxBaritLength:maxCtwBaritCapacity()};

}