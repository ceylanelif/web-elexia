
import { bringCarcassLengthAndLocation } from "../../Carcass/CtwLocationDeterminer";
import { carcassDepthCalculator } from "../../Carcass/DepthCalculator";
import { carcassWidths } from "../../Carcass/WidthCalculator";
import doorSpaceReducer from "../DoorSpaceReducer";
import railBetweenFinder from "../RailBetweenFinder";


export default function carcassDesigner(ctw, liftInfo, constants, selectedOptions, neededBarit) {
    //1.adım: kapıdan alan kalıyor mu?

    //önce kapıdan alan kalıyor mu ona bakalım
    //sonra çift sıra için kapıdan yer kalıyor mu ona bakılıyor 
    //ve ağırlık sistemi için kullanılabilir alanlar belirleniyor 
    const carcasslength = bringCarcassLengthAndLocation(liftInfo, constants, ctw);
    const widthRemainedAfterDoor = doorSpaceReducer(liftInfo, selectedOptions, constants).emptyWidthRemains;
    const depthRemainedAfterDoor = doorSpaceReducer(liftInfo, selectedOptions, constants).emptyDepthRemains;
    const carcassDepth = carcassDepthCalculator(ctw, constants);
    const carcassWidth = carcassWidths(ctw, constants);

    function usableCarcassWidths() {
        let isEmptySpaceForSlim;
        let isEmptySpaceForFat;
        if (widthRemainedAfterDoor >= carcassDepth.fatCtwWithPudrel) {
            isEmptySpaceForFat = true;
            isEmptySpaceForSlim = true;
        } else if (widthRemainedAfterDoor >= carcassDepth.slimCtwWithPudrel) {
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
            description: "Ağırlık sistemi için kullanılabilir boş alan "
        };
    }

    //2.adım: Ağırlık sisteminin toplam uzunluğu belirleme
    //çift sıra baş başa sığıyor mu? tek sıra sığıyor mu?
    //slim ağırlık uzunluğu, fat ağırlık uzunluğu

    function ctwWidthTypeCapacity() {
        const { emptyWidthForFat, slimCtwType, emptyWidthForSlim, fatCtwType } = usableCarcassWidths();

        let fatCarcassSystemWidth;
        let fatDescription;
        let fatLongDoubleRowBarit;
        let fatTypeMaxBaritCapacityInKg;
        let fatRailBetween;


        if (emptyWidthForFat >= carcassWidth.doubleSided) {
            fatCarcassSystemWidth = carcassWidth.doubleSided;
            fatLongDoubleRowBarit = true;
            fatRailBetween = railBetweenFinder(ctw.two_X_a)
            fatTypeMaxBaritCapacityInKg = carcasslength.CarcassLengthDetails.doubleKg * 2;
            fatDescription = "Çift Sıra baş başa ve yanyana Ağırlık Sistemi Kapasitesi - " + fatCtwType;
        } else if (emptyWidthForFat >= carcassWidth.single) {
            fatCarcassSystemWidth = carcassWidth.single;
            fatLongDoubleRowBarit = false;
            fatRailBetween = railBetweenFinder(ctw.ctwA)
            fatTypeMaxBaritCapacityInKg = carcasslength.CarcassLengthDetails.doubleKg;
            fatDescription = "Tek Sıra Yan Yana Kalın Ağırlık Sistemi Kapasitesi - " + fatCtwType;
        } else {
            fatCarcassSystemWidth = null;
            fatLongDoubleRowBarit = false;
            fatDescription = "Barit uygun değil";
        }

        let slimCarcassSystemWidth;
        let slimDescription;
        let slimLongDoubleRowBarit;
        let slimTypeMaxBaritCapacityInKg;
        let slimRailBetween;
        if (emptyWidthForSlim >= carcassWidth.double) {
            slimCarcassSystemWidth = carcassWidth.double;
            slimLongDoubleRowBarit = false;
            slimRailBetween = railBetweenFinder(ctw.two_X_a)
            slimTypeMaxBaritCapacityInKg = carcasslength.CarcassLengthDetails.doubleKg;
            slimDescription = "Çift Sıra Baş Başa Ağırlık Sistemi Kapasitesi - " + slimCtwType;
        } else if (emptyWidthForSlim >= carcassWidth.single) {
            slimCarcassSystemWidth = carcassWidth.single;
            slimLongDoubleRowBarit = false;
            slimRailBetween = railBetweenFinder(ctw.ctwA)
            slimTypeMaxBaritCapacityInKg = carcasslength.CarcassLengthDetails.singleKg;
            slimDescription = "Tek Sıra Ağırlık Sistemi Kapasitesi - " + slimCtwType;
        } else {
            slimCarcassSystemWidth = null;
            slimLongDoubleRowBarit = false;
            slimDescription = "Barit uygun değil";
        }




        return {
            slim: {
                carcassSystemWidth:slimCarcassSystemWidth,
                description:slimDescription,
                type:slimCtwType,
                railBetween:slimRailBetween,
                baritCapacityKg:slimTypeMaxBaritCapacityInKg,
                longDoubleBarit:slimLongDoubleRowBarit
            },
            fat: {
                carcassSystemWidth:fatCarcassSystemWidth,
                description:fatDescription,
                type:fatCtwType,
                railBetween: fatRailBetween,
                baritCapacityKg: fatTypeMaxBaritCapacityInKg,
                longDoubleBarit:fatLongDoubleRowBarit,
            }
        };
    }




    return {
        emptySpacesForBarit: usableCarcassWidths(),
        CtwTypeWidhCapacity: ctwWidthTypeCapacity(),
    };

}



////STATÜ KONTROLÜ KALDI AĞIRLIK YETERLİ Mİ, BARİT SIĞIYOR MU. iKİSİDE OKEYSE BU BARİT KULLANILABİLİR.