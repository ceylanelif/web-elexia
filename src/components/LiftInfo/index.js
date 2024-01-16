"use client"
import React from 'react'
import Stop from './Stop'
import MachineRoom from './MachineRoom'
import PitOhTravel from './PitOhTravel'
import RopeType from './RopeType'
import Speed from './Speed'
import WidthAndDepth from './WidthAndDepth'
import styles from './styles.module.css'
import OfferName from './OfferName'

export default function LiftInfo() {
  return (
    <div className={styles.liftInfoContainer}>
      <OfferName />
      <Stop />
      <WidthAndDepth />
      <MachineRoom />
      <PitOhTravel />
      <RopeType />
      <Speed />
    </div>
  )
}
