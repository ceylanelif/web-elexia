import Link from 'next/link'
import React from 'react'
import styles from'./styles.module.css'
import FullLogo from './FullLogo.svg'
import Image from 'next/image'
import { Icon } from 'semantic-ui-react'


export default function Header() {
  return <header className={`${styles.header} container fluid`}>
    <div className={styles.headerWrapper}>
      <Link href="/" className={styles.logo}>
      <Image src={FullLogo} alt="Full Logo" />
      </Link>
      <nav className={styles.navigationMenu}>
      <Link href="/docs/packageApp">Package Lift App</Link>
      <Link href="/">Apply to Be Member</Link>
      <Link href="/">Log in</Link>

      </nav>
    </div>
  </header>
}
