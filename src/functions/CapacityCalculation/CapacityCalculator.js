import { ctwMainDesigner } from "./CtwDesigner/CtwMainDesigner";
import { SideCtwCabinDepth } from "./SideCtw/CabinDepths";


export default function CapacityCalculator(ctws, liftInfo, constants, selectedOptions) {

    const checker = ctws.map((ctw) => {
        // const csize=ctwMainDesigner(ctw, liftInfo, constants, selectedOptions).cabinSize
        // const ctwLocation=ctwMainDesigner(ctw, liftInfo, constants, selectedOptions).ctwLocation    
        // const sideCtwDepths=SideCtwCabinDepth(selectedOptions, liftInfo);
        //     return{csize,ctwLocation,sideCtwDepths}
        const reverseLogic = {
            id: ctw.id,
            name: ctw.ctwName,
            material: ctw.ctwMaterial,
            length: ctw.cwtA,
            carcassType: null,//kuyuya uygun karkas tipi
            singleCarcassCapacity: null,
            doubleCarcassCapacity: null,
            backCtw: {
                oneRow: {
                    cabinSize: null,
                    cabinCapacity: null,
                    neededCtwWeight: null,
                    carcassWidth: null,
                    railBetween: null,
                    weightStatus: null,
                    generalStatus: null,
                },
                longDoubleRow: {
                    cabinSize: null,
                    cabinCapacity: null,
                    neededCtwWeight: null,
                    carcassWidth: null,
                    railBetween: null,
                    weightStatus: null,
                    generalStatus: null,
                },
                shortDoubleRow: {
                    cabinSize: null,
                    cabinCapacity: null,
                    neededCtwWeight: null,
                    carcassWidth: null,
                    railBetween: null,
                    weightStatus: null,
                    generalStatus: null,
                }
            },  
            sideCtw: {
                oneRow: {
                    cabinSize: null,
                    cabinCapacity: null,
                    neededCtwWeight: null,
                    carcassWidth: null,
                    railBetween: null,
                    weightStatus: null,
                    generalStatus: null,
                },
                longDoubleRow: {
                    cabinSize: null,
                    cabinCapacity: null,
                    neededCtwWeight: null,
                    carcassWidth: null,
                    railBetween: null,
                    weightStatus: null,
                    generalStatus: null,
                },
                shortDoubleRow: {
                    cabinSize: null,
                    cabinCapacity: null,
                    neededCtwWeight: null,
                    carcassWidth: null,
                    railBetween: null,
                    weightStatus: null,
                    generalStatus: null,
                }
            },

        }
return reverseLogic
    });
    return checker;
}