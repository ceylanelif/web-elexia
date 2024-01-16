import React from "react";
import Link from "next/link";
import xLogo from"./xLogo.svg";

import styles from "./styles.module.css";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className={styles.footer}>
     
      <Link href="https://twitter.com/scey_00" target="_blank">
      <Image src={xLogo} alt="x logo"></Image>
   
      </Link>
    </footer>
  );
}

export { Footer };