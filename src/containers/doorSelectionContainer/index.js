"use client"
import ElexiaGreenButton from '@/components/Button/ElexiaGreenButton'
import React, { useEffect } from 'react'
import styles from './styles.module.css'
import LiftSummaryTable from '@/components/LiftSummaryTable'
import PossibleDoorOptions from '@/components/PackageLiftAppComponents/DoorSelectionComponents/PossibleDoorOptions/PossibleDoorOptions'
import notFound from '@/app/not-found'
import LandingDoorModal from '@/components/PackageLiftAppComponents/DoorSelectionComponents/LandingDoorSelection/Modal'
import CabinDoorModal from '@/components/PackageLiftAppComponents/DoorSelectionComponents/CabinDoorSelection/Modal'
import { useDispatch, useSelector } from 'react-redux'
import {  searchProducts } from '@/lib/features/packageAppFeatures/productSlice'
import OtherLandingDoorModal from '@/components/PackageLiftAppComponents/DoorSelectionComponents/OtherLandingDoorSelection/Modal'
import CapacityCalculator from '@/functions/CapacityCalculator/main'

export default function DoorSelectionContainer() {
const selectedDoor = useSelector((state) => state.selectedOptions.DoorDimension);
const otherLandingDoor = useSelector((state) => state.extraGlobal.otherLandingDoor);

const dispatch = useDispatch(); 
useEffect(() => {
    if(selectedDoor){
    dispatch(searchProducts({  
        numberOfPanel:selectedDoor.numberOfPanel, 
        opening:selectedDoor.opening, 
        width: selectedDoor.width
     }))}
    }, [dispatch,selectedDoor]);
  
const nextPage=() => window.location.href = "/docs/";
const backPage=() => window.location.href = "/docs/packageApp";
 
    return (
    <div className={styles.mainWrapper}>
        <div className={styles.tableWrapper}>
        <LiftSummaryTable />
        <div className={styles.rightContentWrapper}>

        <PossibleDoorOptions/>
        <CabinDoorModal/>
        <LandingDoorModal/>
        {otherLandingDoor && <OtherLandingDoorModal  />}   
        <CapacityCalculator/>
        </div>
        </div>
        <div className={styles.buttonWrapper}>
            <ElexiaGreenButton onClick={nextPage} className={styles.nextButton} buttonName={"Next"}/>
            <ElexiaGreenButton onClick={backPage} className={styles.backButton} buttonName={"Back"}/>
        </div>
    </div>
  )
}
