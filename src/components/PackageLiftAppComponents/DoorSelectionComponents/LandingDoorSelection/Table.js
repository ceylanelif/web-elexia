import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Button, Dropdown, Checkbox } from 'semantic-ui-react';
import styles from "./styles.module.css";
import { setGlobalOtherLandingDoor } from '@/lib/features/packageAppFeatures/extraGlobalSlice';
import { setLandingAmount, setLandingDoor } from '@/lib/features/packageAppFeatures/selectedOptionsSlice';

export default function LandingDoorTable({ onClose }) {
  const dispatch = useDispatch();
  const doors = useSelector((state) => state.product.products.data);
  const otherLandingDoor = useSelector((state) => state.extraGlobal.otherLandingDoor);
  const cabinDoor = useSelector((state) => state.selectedOptions.CabinDoor.cabinDoor);
  const liftInfo = useSelector((state) => state.lift);

  const [selectedMaterials, setSelectedMaterials] = useState([]);

  const uniqueMaterialsSet = new Set();
  const filteredMaterials = doors.reduce((result, product) => {
    const materialName = product.door.doorVariation.material.materialName;
    if (!uniqueMaterialsSet.has(materialName)) {
      uniqueMaterialsSet.add(materialName);
      result.push({
        key: materialName,
        text: materialName,
        value: materialName
      });
    }
    return result;
  }, []);

 

  const handleMaterialChange = (e, { value }) => setSelectedMaterials(value);

  const handleLandingDoorClick = (product) => {
    dispatch(setLandingDoor(product));
    if (!otherLandingDoor) {
      dispatch(setLandingAmount(liftInfo.stop));
    }
    onClose();
  };

  const filteredDoors = doors.filter((product) => {
    return (
      product.door.doorVariation.type.typeId === 2 &&
      (selectedMaterials.length === 0 || selectedMaterials.includes(product.door.doorVariation.material.materialName)) &&
      product.door.doorVariation.dimension.dimensionId ===cabinDoor.door.doorVariation.dimension.dimensionId &&
      product.door.brand=== cabinDoor.door.brand
    );
  });

  return (
    <div>
      <Dropdown
        placeholder='Materials'
        multiple
        selection
        options={filteredMaterials}
        value={selectedMaterials}
        onChange={handleMaterialChange}
      />
      <Checkbox
        label='Other Landing Door Material Different'
        checked={otherLandingDoor}
        onChange={() => dispatch(setGlobalOtherLandingDoor(!otherLandingDoor))}
      />
      {otherLandingDoor && (<h1 className={styles.notice}>Choose Your First Landing Door and Amount</h1>)}
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Description</Table.HeaderCell>
            <Table.HeaderCell>Price</Table.HeaderCell>
            {otherLandingDoor && (<Table.HeaderCell>Number</Table.HeaderCell>)}
            <Table.HeaderCell>Selection</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {filteredDoors.map((product) => (
            <Table.Row key={product.productId}>
              <Table.Cell>{product.door.doorName}</Table.Cell>
              <Table.Cell>{product.price} $</Table.Cell>
              {otherLandingDoor && (
                <Table.Cell>
                  <input
                    type="number"
                    min="1" max="10" step="1"
                    value={product.number}
                    onChange={(event) => dispatch(setLandingAmount(event.target.value))}
                  />

                </Table.Cell>
              )}
              <Table.Cell>
                <Button onClick={() => handleLandingDoorClick(product)} color="yellow">Seç</Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}
