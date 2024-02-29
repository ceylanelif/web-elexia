import backCabinSizeFilterer from "./CtwDesigner/BackCtw/CabinSizeFilterer";

export default function CapacityCalculator(ctws, liftInfo, constants, selectedOptions) {
    const filteredSizes = [];

    const uniqueSizes = new Set(); // Benzersiz boyutları saklamak için bir Set oluşturuyoruz

    ctws.forEach((ctw) => {
        const backctwsizes = backCabinSizeFilterer(ctw, liftInfo, constants, selectedOptions);
        backctwsizes.forEach((size) => {
            // Eğer boyutun genişliği ve derinliği benzersizse ve ctw "MRL96" ise ekle
            //if (!uniqueSizes.has(`${size.width}-${size.depth}`) ) {
                filteredSizes.push(size);
            //    uniqueSizes.add(`${size.width}-${size.depth}`);
            //}
        });
    });

    return { kabinolculeri: filteredSizes };
}
