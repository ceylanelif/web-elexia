import CapacityCalculator from "@/functions/CapacityCalculator/CapacityCalculator";
import { useDispatch } from "react-redux";
import { Dropdown } from "semantic-ui-react";
import styles from './styles.module.css';
import { setCabinDepth, setCabinWidth } from "@/lib/features/packageAppFeatures/selectedOptionsSlice";

export default function CabinSizeList(ctws, liftInfo, constants, selectedOptions) {
    const capacitCalculator = CapacityCalculator(ctws, liftInfo, constants, selectedOptions).filteredSizes;
    const dispatch = useDispatch();

    const handleDropdownChange = (event, data) => {
        dispatch(setCabinWidth(data.value.width));
        dispatch(setCabinDepth(data.value.depth));
    };
    
    // Filtrelenmiş ve tekil kapasite seçeneklerini oluştur
    const filteredCapacities = capacitCalculator.filter(item => item.capacity === selectedOptions.Capacity);
    const uniqueCapacities = [...new Set(filteredCapacities.map(item => item))];

    const friendOptions = uniqueCapacities.map(capacity => ({
        key: capacity,
        text: `W ${capacity.width} mm x D ${capacity.depth} mm`,
        value: capacity
    }));

    return (
        <div>
            <h1>Cabin Size Selection <span className={styles.wH}>(Width x Height)</span></h1>
            
                <Dropdown
                    placeholder='Capacity Selection'
                    fluid
                    selection
                    options={friendOptions}
                    onChange={(event, data) => handleDropdownChange(event, data)}
                />
           
        </div>
    );
}
