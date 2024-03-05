import CapacityCalculator from "@/functions/CapacityCalculator/CapacityCalculator";
import { useDispatch } from "react-redux";
import { Dropdown } from "semantic-ui-react";

export default function CabinSizeList(ctws, liftInfo, constants, selectedOptions) {

    const capacitCalculator = CapacityCalculator(ctws, liftInfo, constants, selectedOptions).filteredSizes;
    const dispatch = useDispatch();

    const handleDropdownChange = (event, data) => {
        dispatch(setCabinSize(data.value));
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
            <Dropdown
                placeholder='Capacity Selection'
                fluid
                selection
                options={friendOptions}
                onChange={handleDropdownChange}
            />
        </div>
    );
}
