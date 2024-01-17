import React from 'react'
import { Dropdown } from 'semantic-ui-react';

export default function CapacityList() {

    const handleDropdownChange = (event, data) => {
        dispatch(setSelectedCapacity(data.value));
    };
    // const friendOptions = ctwler.map(item => ({
    //     key: item,
    //     text: `${item} Kg`, // Düzgün bir string birleştirme yapısı kullanılmalı
    //     value: item,
    // }));
        const friendOptions = {
        key: "item1",
        text: ` Kg`, // Düzgün bir string birleştirme yapısı kullanılmalı
        value: "item",
    };
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
