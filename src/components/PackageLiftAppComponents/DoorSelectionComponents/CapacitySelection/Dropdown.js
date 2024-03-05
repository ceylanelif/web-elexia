import React from 'react';
import { Dropdown } from 'semantic-ui-react';
import { useDispatch} from 'react-redux';
import CapacityCalculator from '@/functions/CapacityCalculator/CapacityCalculator';
import { setCapacity } from '@/lib/features/packageAppFeatures/selectedOptionsSlice';
import styles from './styles.module.css';

export default function CapacityList(ctws, liftInfo, constants, selectedOptions) {


    const capacitCalculator = CapacityCalculator(ctws, liftInfo, constants, selectedOptions).filteredSizes;
    const dispatch = useDispatch();


    const handleDropdownChange = (event, data) => {
        dispatch(setCapacity(data.value));
    };

    // Filtrelenmiş ve tekil kapasite seçeneklerini oluştur
    const uniqueCapacities = [...new Set(capacitCalculator.map(item => item.capacity))];
    uniqueCapacities.sort((a, b) => a - b);
    const friendOptions = uniqueCapacities.map(capacity => ({
        key: capacity,
        text: capacity + " kg",
        value: capacity
    }));

    return (
        <div>
           <h1 >Capacity Selection <span className={styles.wH}>(Kg)</span></h1>

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
