"use client"
import LiftInfo from '@/components/LiftInfo'
import LiftSummaryTable from '@/components/LiftSummaryTable'
import React from 'react'
import styles from './styles.module.css'
import ElexiaGreenButton from '@/components/Button/ElexiaGreenButton'
import Link from 'next/link'


export default function PackageAppContainer() {


  return (
    <div className={styles.packageAppContainer}>
      <div className={styles.tableWrapper}>
        <LiftSummaryTable />
        <LiftInfo />
      </div>
      <div className={styles.buttonWrapper}>
        <Link href="/docs/doorSelection">
      <ElexiaGreenButton buttonName="Next" className={"nextButton"} />
      </Link>
      </div>
    </div>
  )
}
