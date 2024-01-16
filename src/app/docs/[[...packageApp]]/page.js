import React from 'react'
import PackageAppContainer from '@/containers/packageAppContainer';
import styles from './styles.module.css'


async function PackageAppPage() {
    return (
    <div className={styles.packageApp}>
    <PackageAppContainer/>
    </div>
  )
}
export default PackageAppPage;