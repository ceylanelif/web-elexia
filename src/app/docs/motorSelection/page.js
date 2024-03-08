"use client"
import React, { useState } from 'react'
import { Button, Dropdown, Segment, Table } from 'semantic-ui-react'
import { useDispatch, useSelector } from 'react-redux';
import { setMotor } from '@/lib/features/packageAppFeatures/selectedOptionsSlice';


export default function MotorTable() {
  const fetchProducts = useSelector((state) => state.product.products.data);
  const selectedCapacity = useSelector((state) => state.selectedOptions.Capacity);
  const liftInfo = useSelector((state) => state.lift);
  const dispatch = useDispatch();
  const handleMotorSelection = (event, data) => {
    const selectedProductId = data.key; // Seçilen ürünün ID'si
    dispatch(setMotor(selectedProductId)); // Seçilen ürünün ID'sini setSelectedMotor'a gönder
  };
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedSpeed, setSelectedSpeed] = useState([]);
  const getMotors = fetchProducts.filter((product) => {
    return (product.category.categoryId === 2)
  })

  const filteredMotors = getMotors.filter((product) => {
    const isMachineRoom = liftInfo.machineRoom;
    const isGearless = product.motor.gear === 'GEARLESS';
    const isGearNotEmpty = !!product.motor.gear;
    const isSausaggeType = product.motor.type === 'SAUSAGGE'; // Yeni eklenen kontrol


    return (
      (selectedCapacity <= product.motor.capacity) &&
      (liftInfo.speed === product.motor.speed) &&
      (
        // Önceki koşulların değişmemesi için parantez içinde aynı kontroller devam ediyor
        (isMachineRoom && ((selectedTypes.length === 0 || selectedTypes.includes(product.motor.gear)) && isGearNotEmpty)) ||
        (!isMachineRoom && isGearless && (selectedTypes.length === 0 || selectedTypes.includes(product.motor.gear)) && isGearNotEmpty)
      ) &&
      (selectedBrands.length === 0 || selectedBrands.includes(product.supplier.supplierName)) &&
      (selectedSpeed.length === 0 || selectedSpeed.includes(product.motor.speed)) &&
      (
        (!isMachineRoom && isSausaggeType) || isMachineRoom
      )
    );
  });
  const brands = [
    { key: 'Akış', text: 'Akış', value: 'Akış' },
    { key: 'ALBERTO SASSI', text: 'A.Sassi', value: 'ALBERTO SASSI' },
    { key: 'BLUELIGHT', text: 'Bluelight', value: 'BLUELIGHT' },
    { key: 'FURDER', text: 'Furder', value: 'FURDER' },
  ]
  const types = [
    { key: 'GEARED', text: 'Geared', value: 'GEARED' },
    { key: 'GEARLESS', text: 'Gearless', value: 'GEARLESS' },

  ]
  const speeds = [
    { key: 1, text: '1.0', value: 1 },
    { key: 1.6, text: '1.6', value: 1.6 },
    { key: 2, text: '2.0', value: 2 }

  ]
  return (
    <div>
      <Segment floated='left'>
        <Dropdown
          placeholder='Motor Brands'
          fluid
          multiple
          selection
          options={brands}
          value={selectedBrands}
          onChange={(e, { value }) => setSelectedBrands(value)}
        />
        <Dropdown
          placeholder='Speed'
          fluid
          multiple
          selection
          options={speeds}
          value={selectedSpeed}
          onChange={(e, { value }) => setSelectedSpeed(value)}
        />
        <Dropdown
          placeholder='Motor Types'
          fluid
          multiple
          selection
          options={types}
          value={selectedTypes}
          onChange={(e, { value }) => setSelectedTypes(value)}
        />
      </Segment>


      <Table striped>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Motor Markası</Table.HeaderCell>
            <Table.HeaderCell>Motor Adı</Table.HeaderCell>
            <Table.HeaderCell>Kapasite</Table.HeaderCell>
            <Table.HeaderCell>Hız</Table.HeaderCell>
            <Table.HeaderCell>Güç</Table.HeaderCell>
            <Table.HeaderCell>Kasnak</Table.HeaderCell>
            <Table.HeaderCell>Tip</Table.HeaderCell>
            <Table.HeaderCell>Fiyatı</Table.HeaderCell>
            <Table.HeaderCell>Seçim</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {filteredMotors.map((product) => (
            <Table.Row key={product.productId}>
              <Table.Cell>{product.supplier.supplierName}</Table.Cell>
              <Table.Cell>{product.motor.modelName}</Table.Cell>
              <Table.Cell>{product.motor.capacity} kg</Table.Cell>
              <Table.Cell>{product.motor.speed} m/s</Table.Cell>
              <Table.Cell>{product.motor.kw} kW</Table.Cell>
              <Table.Cell>{product.motor.pulleySize}*{product.motor.ropeRow}*{product.motor.ropeSize}mm</Table.Cell>
              <Table.Cell>{product.motor.type}</Table.Cell>
              <Table.Cell>{product.price} $</Table.Cell>
              <Table.Cell>
                <Button color="yellow"
                  key={product}
                  onClick={(e) => handleMotorSelection(e, { key: product })}>Seç</Button>

              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table></div>
  )
}