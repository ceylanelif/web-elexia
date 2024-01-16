"use client"
import LiftInfo from '@/components/LiftInfo'
import LiftSummaryTable from '@/components/LiftSummaryTable'
import React from 'react'
import styles from './styles.module.css'
import ElexiaGreenButton from '@/components/Button/ElexiaGreenButton'

export default function PackageAppContainer() {
const nextPage=() => window.location.href = "/docs/doorSelection";
  return (
    <div className={styles.packageAppContainer}>
      <div className={styles.tableWrapper}>
        <LiftSummaryTable />
        <LiftInfo />
      </div>
      <div className={styles.buttonWrapper}>
      <ElexiaGreenButton onClick={nextPage} buttonName="Next" className={"nextButton"} />

      </div>
    </div>
  )
}
