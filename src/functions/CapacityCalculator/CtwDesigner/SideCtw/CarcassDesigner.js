
import { bringCarcassLengthAndLocation } from "../../Carcass/CtwLocationDeterminer";
import { carcassDepthCalculator } from "../../Carcass/DepthCalculator";
import { carcassWidths } from "../../Carcass/WidthCalculator";
import doorSpaceReducer from "../DoorSpaceReducer";


export default function carcassDesigner(ctw, liftInfo, constants, selectedOptions, neededBarit) {
    //1.adım: kapıdan alan kalıyor mu?

    //önce kapıdan alan kalıyor mu ona bakalım
    //sonra çift sıra için kapıdan yer kalıyor mu ona bakılıyor 
    //ve ağırlık sistemi için kullanılabilir alanlar belirleniyor 
    const carcasslength = bringCarcassLengthAndLocation(liftInfo, constants, ctw);
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

        return {
            emptyWidthForFat,
            slimCtwType,
            emptyWidthForSlim,
            fatCtwType,
            description: "Barit için kullanılabilir boş alan "
        };
    }

    //2.adım: Ağırlık sisteminin toplam uzunluğu belirleme
    //çift sıra baş başa sığıyor mu? tek sıra sığıyor mu?
    //slim ağırlık uzunluğu, fat ağırlık uzunluğu

    function maxCtwBaritCapacity() {
        const { emptyWidthForFat, slimCtwType, emptyWidthForSlim, fatCtwType } = usableCarcassWidths();

        let fatCarcassWidth;
        let fatDescription;
        let fatLongDoubleRowBarit;
        function maxbaritCapacityInKg(drowStatus) {
            if (drowStatus === true) {
                return carcasslength.CarcassLengthDetails.doubleKg
                    ;
            } else {
                return carcasslength.CarcassLengthDetails.singleKg;
            }

        }

        if (emptyWidthForFat >= ctw.two_X_a) {

            if (fatCtwType === "shaftLenght") {
                fatCarcassWidth = carcassWidth.shaftLength.double;
            }
            if (fatCtwType === "doorLenght") {
                fatCarcassWidth = carcassWidth.doorLength.double;
            }

            fatLongDoubleRowBarit = true;
            fatDescription = "Çift Sıra Ağırlık Sistemi Kapasitesi";

        } else if (emptyWidthForFat >= ctw.ctwA) {

            if (fatCtwType === "shaftLenght") {
                fatCarcassWidth = carcassWidth.shaftLength.single;
            }
            if (fatCtwType === "doorLenght") {
                fatCarcassWidth = carcassWidth.doorLength.single;
            }
            fatLongDoubleRowBarit = false;
            fatDescription = "Tek Sıra Ağırlık Sistemi Kapasitesi";
        } else {
            fatCarcassWidth = null;
            fatDescription = "Barit uygun değil";
        }

        let slimCarcassWidth;
        let slimDescription;
        let slimLongDoubleRowBarit;

        if (emptyWidthForSlim >= ctw.two_X_a) {

            if (slimCtwType === "shaftLenght") {
                slimCarcassWidth = carcassWidth.shaftLength.double;
            } if (slimCtwType === "doorLenght") {
                slimCarcassWidth = carcassWidth.doorLength.double;
            }
            slimLongDoubleRowBarit = false;
            slimDescription = "Çift Sıra Ağırlık Sistemi Kapasitesi";
        } else if (emptyWidthForSlim >= ctw.ctwA) {
            
            if (slimCtwType === "shaftLenght") {
                slimCarcassWidth = carcassWidth.shaftLength.single;
            } if (slimCtwType === "doorLenght") {
                slimCarcassWidth = carcassWidth.doorLength.single;
            }
            slimLongDoubleRowBarit = false;
            slimDescription = "Tek Sıra Ağırlık Sistemi Kapasitesi";
        } else {
            slimCarcassWidth = null;
            slimDescription = "Barit uygun değil";
        }

        let slimTypeMaxBaritCapacityInKg = maxbaritCapacityInKg(slimLongDoubleRowBarit);
        let fatTypeMaxBaritCapacityInKg = maxbaritCapacityInKg(fatLongDoubleRowBarit);


        return {
            slimCarcassWidth,
            slimDescription,
            slimCtwType,
            slimTypeMaxBaritCapacityInKg,
            slimLongDoubleRowBarit,
            fatCarcassWidth,
            fatDescription,
            fatCtwType,
            fatTypeMaxBaritCapacityInKg,
            fatLongDoubleRowBarit,
        };
    }




    return {
        pudrelicinbosalan: usableCarcassWidths(),
        maxBaritCapacity: maxCtwBaritCapacity(),
    };

}



////STATÜ KONTROLÜ KALDI AĞIRLIK YETERLİ Mİ, BARİT SIĞIYOR MU. iKİSİDE OKEYSE BU BARİT KULLANILABİLİR.