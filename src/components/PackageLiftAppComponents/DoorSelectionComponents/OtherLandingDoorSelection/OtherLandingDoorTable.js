import { setOtherLandingAmount, setOtherLandingDoor } from '@/lib/features/packageAppFeatures/selectedOptionsSlice';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Button } from 'semantic-ui-react';
import styles from "./styles.module.css";


export default function OtherLandingDoorTable({ onClose }) {
  const dispatch = useDispatch();
  const doors = useSelector((state) => state.product.products.data);
  const selectedOptions = useSelector((state) => state.selectedOptions);
  const liftInfo = useSelector((state) => state.lift);
  const doorAmount=liftInfo.stop-selectedOptions.LandingDoor.amount
  
  useEffect(() => {
  }, [doors,liftInfo]);

  const handleLandingDoorClick = (value) => {
    dispatch(setOtherLandingDoor(value));
    dispatch(setOtherLandingAmount(doorAmount))
    onClose();
  };
  const filteredDoors = doors.filter((product) => {
    return (
      product.door.doorVariation.type.typeId === 2 &&
      product.door.doorVariation.dimension.dimensionId === selectedOptions.LandingDoor.landingDoor.door.doorVariation.dimension.dimensionId &&
      product.door.brand===selectedOptions.LandingDoor.landingDoor.door.brand
    );
  });

  return (
    <div>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Description</Table.HeaderCell>
            <Table.HeaderCell>Price</Table.HeaderCell>
              <Table.HeaderCell>Number</Table.HeaderCell>
            <Table.HeaderCell>Selection</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {filteredDoors.map((product) => (
            <Table.Row key={product.productId}>
              <Table.Cell>{product.door.doorName}</Table.Cell>
              <Table.Cell>{product.price} $</Table.Cell>
                <Table.Cell>
                {doorAmount}
                </Table.Cell>
             
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
