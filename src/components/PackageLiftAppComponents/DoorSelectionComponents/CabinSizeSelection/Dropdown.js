import React from 'react';
import { Dropdown } from 'semantic-ui-react';
import CapacityCalculator from './CapacityCalculator';
import { setCabinSize } from '@/lib/features/packageAppFeatures/selectedOptionsSlice';
import { useDispatch } from 'react-redux';

export default function CabinSizeList(ctws, liftInfo, constants, selectedOptions) {

    const capacitCalculator = CapacityCalculator(ctws, liftInfo, constants, selectedOptions).filteredSizes;
    const dispatch = useDispatch();


    const handleDropdownChange = (event, data) => {
        dispatch(setCabinSize(data.value));
    };

    // Filtrelenmiş ve tekil kapasite seçeneklerini oluştur
    const uniqueCapacities = [...new Set(capacitCalculator.map(item => item.capacity===selectedOptions.Capacity))];
    uniqueCapacities.sort((a, b) => a - b);
    const friendOptions = uniqueCapacities.map(capacity => ({
        key: capacity,
        text: capacity.width + capacity.depth + " mm",
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
