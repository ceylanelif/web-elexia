"use client"
import React, { useState } from 'react';
import styles from './styles.module.css'
import { useSelector } from 'react-redux';

export default function LiftSummaryTable() {
  const liftInfo = useSelector((state) => state.lift);
  const selectedOptions = useSelector((state) => state.selectedOptions);
  return (
    <div className={styles.summaryTable} >
      <table >
        <thead>
          <tr>
            <th colSpan="2">Lift Details / {liftInfo.offerName} /ID {liftInfo.offerId}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Shaft Size</td>
            <td>{liftInfo.shaftWidth}W x {liftInfo.shaftDepth}D</td>
          </tr>
          <tr>
            <td>Number of Stop</td>
            <td>{liftInfo.stop}</td>
          </tr>
          <tr>
            <td>Overhead</td>
            <td>{liftInfo.overhead}</td>
          </tr>
          <tr>
            <td>Travel Distance</td>
            <td>{liftInfo.travelDistance}</td>
          </tr>
          <tr>
            <td>Pit</td>
            <td>{liftInfo.pit}</td>
          </tr>
          <tr>
            <td>Shaft Distance</td>
            <td>{parseInt(liftInfo.pit) + parseInt(liftInfo.travelDistance) + parseInt(liftInfo.overhead)}</td>
          </tr>
          <tr>
            <td>Machine Room</td>
            <td>{liftInfo.machineRoom ? 'Machine Room' : 'Machine Roomless'}</td>
          </tr>
          <tr>
            <td>Rope Type</td>
            <td>{liftInfo.ropeType}</td>
          </tr>
          <tr>
            <td>Speed</td>
            <td>{liftInfo.speed} m/s</td>
          </tr>
          {selectedOptions.DoorDimension &&
            <tr>
              <td>Selected Door </td>
              <td>{selectedOptions.DoorDimension.dimensionInfo} /
                {selectedOptions.CabinDoor.cabinDoor && selectedOptions.CabinDoor.cabinDoor.door.brand} </td>
            </tr>
          }
          {selectedOptions.CabinDoor.cabinDoor &&
            <tr>
              <td>Cabin Door</td>
              <td><span>{selectedOptions.CabinDoor.amount} PCS</span> {selectedOptions.CabinDoor.cabinDoor.door.doorVariation.material.materialName}
              </td>
            </tr>
          }
          {selectedOptions.LandingDoor.landingDoor &&
            <tr>
              <td>Landing Doors</td>
              <td><span>{selectedOptions.LandingDoor.amount} PCS</span> {selectedOptions.LandingDoor.landingDoor.door.doorVariation.material.materialName}
              </td>
            </tr>
          }
          {selectedOptions.OtherLandingDoor.otherLandingDoor &&
            <tr>
              <td>Other Landing Doors</td>
              <td>{selectedOptions.OtherLandingDoor.otherLandingDoor.door.doorVariation.material.materialName}
              </td>
            </tr>
          }
        </tbody>
      </table>
    </div>
  );
}
