import { setCabinDoor } from '@/lib/features/packageAppFeatures/selectedOptionsSlice';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Button, Dropdown } from 'semantic-ui-react';

export default function CabinDoorTable({ onClose }) {
  const dispatch = useDispatch();
  const doors = useSelector((state) => state.product.products.data);
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
  const uniqueBrandsSet = new Set();

  const filteredBrands = doors.reduce((result, product) => {
    const brandName = product.door.brand;
    if (!uniqueBrandsSet.has(brandName)) {
      uniqueBrandsSet.add(brandName);
      result.push({
        key: brandName,
        text: brandName,
        value: brandName
      });
    }
    return result;
  }, []);
  
  const heights = [
    { key: '2000', text: '2000', value: 2000 },
    { key: '2100', text: '2100', value: 2100 },
    { key: '2200', text: '2200', value: 2200 },
  ] 

  const [selectedMaterials, setSelectedMaterials] = useState([]);

  const handleMaterialChange = (e, { value }) => {
    setSelectedMaterials(value);
  }

  const [selectedHeights, setSelectedHeights] = useState([]);

  const handleHeightChange = (e, { value }) => {
    setSelectedHeights(value);
  } 
  const [selectedBrands, setSelectedBrands] = useState([]);

  const handleBrandChange = (e, { value }) => {
    setSelectedBrands(value);
  }

  const handleCarDoorClick = (value) => {
    dispatch(setCabinDoor(value));
    onClose(); // Modal'ı kapat
  };

  const filteredDoors = doors.filter((product) => {
    return (
      product.door.doorVariation.type.typeId === 1 &&
      (selectedMaterials.length === 0 || selectedMaterials.includes(product.door.doorVariation.material.materialName)) &&
      (selectedHeights.length === 0 || selectedHeights.includes(product.door.doorVariation.dimension.height)) &&
      (selectedBrands.length === 0 || selectedBrands.includes(product.door.brand))
   
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
      <Dropdown
        placeholder='Door Height'
        multiple
        selection
        options={heights}
        value={selectedHeights}
        onChange={handleHeightChange}
      />   
      <Dropdown
        placeholder='Brands'
        multiple
        selection
        options={filteredBrands}
        value={selectedBrands}
        onChange={handleBrandChange}
      />
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Kapı Adı</Table.HeaderCell>
            <Table.HeaderCell>Fiyat</Table.HeaderCell>
            <Table.HeaderCell>Seç</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {filteredDoors.map((product) => (
            <Table.Row key={product.productId}>
              <Table.Cell>{product.door.doorName}</Table.Cell>
              <Table.Cell>{product.price} $</Table.Cell>
              <Table.Cell>
                <Button onClick={() => handleCarDoorClick(product)} color="yellow">Seç</Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}
