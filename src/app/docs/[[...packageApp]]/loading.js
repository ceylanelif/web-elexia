import React from 'react'
import xLogo from './xLogo.svg'
import Image from 'next/image'
import styles from './styles.module.css'

export default function loading() {
  return (
    <div className={styles.loading}>
      <div role="status" >
        <Image src={xLogo} alt="x logo" />
        <span class="sr-only">Loading...</span>
      </div>
    </div>
  )
}
